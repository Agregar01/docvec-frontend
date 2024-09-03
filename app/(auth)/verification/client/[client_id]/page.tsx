"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useRef, useState, useEffect } from "react";
import Webcam from "react-webcam";
import axios from 'axios';
import * as faceapi from 'face-api.js';
import { useParams } from 'next/navigation';
import { toast, Toaster } from "sonner";
import Swal from 'sweetalert2';

export default function VerifyPhoto() {
  const webcamRef = useRef<Webcam | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [modelsLoaded, setModelsLoaded] = useState(false);
  const [apiCalled, setApiCalled] = useState(false);
  const [latLng, setLatLng] = useState({
    lat: 0.0,
    lng: 0.0,
    isLoaded: false,
  });

  const user = useParams<{ user_id: string}>()
console.log(user);

  
  const apiCalledRef = useRef(false);
  
  // Load face-api.js models
  useEffect(() => {
    const loadModels = async () => {
      try {
        await faceapi.nets.tinyFaceDetector.loadFromUri('/models');
        await faceapi.nets.faceLandmark68Net.loadFromUri('/models');
        await faceapi.nets.faceRecognitionNet.loadFromUri('/models');
        setModelsLoaded(true);
      } catch (error) {
        console.error("Error loading the models:", error);
      }
    };

    loadModels();
  }, []);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log(position);
          
          setLatLng({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
            isLoaded: true,
          });
        },
        (error) => {
          showAlert(15, "Your location is required. Refresh page to allow")
        }
      );
    }
  }, [setLatLng]);

  const lat = "latitude is : " + latLng.lat;
  const long = "longitude is : " + latLng.lng;

  // Continuously check for faces in the webcam feed
  useEffect(() => {
    console.log("mounted");
  
    const interval = setInterval(async () => {
      if (latLng.isLoaded && !apiCalledRef.current) { 
        console.log(lat, long);
  
        if (webcamRef.current && modelsLoaded) {
          console.log("yessss");
  
          const screenshot = webcamRef.current.getScreenshot();
          if (screenshot) {
  
            const img = await faceapi.fetchImage(screenshot);
  
            const detections = await faceapi.detectSingleFace(img, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceDescriptor();
            console.log("detections");
            console.log(detections);
  
            if (detections) {
              const { detection } = detections;
              const confidence = detection?.score || 0;
              console.log(confidence);
  
              if (confidence >= 0.60) {
                apiCalledRef.current = true; // Set ref to true to prevent further API calls
                setApiCalled(true);  // Update state
                await handleVerify(screenshot);
                clearCanvas();  // Clear the canvas after API call
                clearInterval(interval);  // Clear interval once face is detected and handled
              } else {
                drawBoundingBox(detections, img); // Continue drawing the bounding box
              }
            } else {
              clearCanvas();  // Clear the canvas if no face is detected
            }
          }
        }
      } else {
        clearInterval(interval); // Clear interval if location is not available
      }
    }, 1000); // Check every 1 second
  
    return () => clearInterval(interval);
  }, [webcamRef, modelsLoaded, apiCalled, latLng]);

  // Draw bounding box around detected face
  const drawBoundingBox = (detections: any, img: HTMLImageElement) => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      faceapi.matchDimensions(canvas, { width: img.width, height: img.height });
      const resizedDetections = faceapi.resizeResults(detections, { width: img.width, height: img.height });

      // Clear previous drawings
      // const context = canvas.getContext('2d');
      // if (context) {
      //   context.clearRect(0, 0, canvas.width, canvas.height);
      //   faceapi.draw.drawDetections(canvas, resizedDetections, { lineWidth: 2, boxColor: 'green' });

      // }
    }
  };

  // Clear the canvas
  const clearCanvas = () => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      if (context) {
        context.clearRect(0, 0, canvas.width, canvas.height);
      }
    }
  };

  // Handle face detection and verification
  const handleVerify = async (capturedImage: string) => {
    if (!modelsLoaded) {
      console.error('Models not loaded');
      return;
    }

    if (capturedImage && user.user_id) {
      console.log(user.user_id);
      
      try {
        // Convert captured image to an image element
        const img = await faceapi.fetchImage(capturedImage);
        const detections = await faceapi.detectSingleFace(img, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceDescriptor();

        if (detections) {
          const { descriptor } = detections;

          // Create a Blob from the captured image
          const byteString = atob(capturedImage.split(',')[1]);
          const ab = new ArrayBuffer(byteString.length);
          const ia = new Uint8Array(ab);
          for (let i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
          }
          const blob = new Blob([ab], { type: 'image/jpeg' });
          
          // Prepare form data
          const formData = new FormData();
          formData.append('video_image', blob, 'capture.jpg');
          formData.append('id', user.user_id);
          formData.append('face_descriptor', descriptor.toString());
          formData.append('latitude', latLng.lat.toString());  // Update to use latLng.lat
          formData.append('longitude', latLng.lng.toString());

          
          // Make an API call to the backend to match the face
          const url = `${process.env.NEXT_PUBLIC_BASE_VIDEOKYC_BACKEND_URL}video-kyc/complete-verification/client/`;
          console.log(url);

          const response = await axios.post(url, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
          console.log(response.data);
          

          // Handle the response from the backend
          if (response.data.status === true) {
            Swal.fire({
              title: 'Verification successful',
              text: 'Verification Successful. An agent will reach out to you shortly.',
              icon: 'success',
              customClass: 'sweet-alerts'
          });
            setTimeout(() => {
            }, 3000);
          } else {
            toast.error("Verification match not found");
          }

          // Clear the bounding box from the canvas after processing the image
          clearCanvas();
        } else {
          console.error("No face detected");
          clearCanvas();
        }
      } catch (error) {
        showAlert(15, "Face match not found");
        setTimeout(() => {
          // window.location.href ="https://www.fidelitybank.com.gh/"
        }, 3000);
      }
    }
  };
  
  const showAlert = async (type: number, title: string) => {
    if (type === 15) {
        const toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 5000,
        });
        toast.fire({
            icon: "error",
            title: title,
            padding: '10px 20px',
        });
    }
}

  return (
    <main>
      <div className="mb-5 flex items-center justify-center min-h-screen">
          <div className="max-w-[50rem] w-full bg-white shadow-[4px_6px_10px_-3px_#bfc9d4] rounded border border-white-light dark:border-[#1b2e4b] dark:bg-[#191e3a] dark:shadow-none">
              <div className="py-7 px-6">

                  
                <div className="flex items-center justify-center py-5 mx-10">
                  <div className="mx-auto grid w-[600px] gap-4">
                    <div className="mx-auto max-w-4xl px-4">
                      <Link href="/">
                        <Image
                          src="/fidelity-bank-2.png"
                          width={300}
                          height={0}
                          alt="Agregar Tech"
                        />
                      </Link>
                    </div>
                    <div className="text-justify mx-auto max-w-4xl px-4 text-sm">
                      <p className="text-3xl font-bold text-center mb-2">
                        Customer Verification Application
                      </p>
                      <p className="">
                        Before submitting the photo, here are a few checklists to follow:
                      </p>
                      <ol className="list-decimal ml-6 mt-2">
                        <li>Remove all accessories such as eye glasses and hats</li>
                        <li>Ensure your face is visible and clear</li>
                        <li>Turn on your device&apos;s location</li>
                      </ol>
                    </div>
                    <div className="relative flex items-center justify-center">
                      <div className="rounded-full overflow-hidden w-72 h-72 flex justify-center items-center border-4 border-gray-300">
                        <Webcam
                          audio={false}
                          screenshotFormat="image/jpeg"
                          ref={webcamRef}
                          className="w-full h-full object-cover transform scale-150 object-center"
                        />
                        <canvas ref={canvasRef} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }} />
                      </div>
                    </div>

                    <p className="text-justify mx-auto max-w-4xl px-4 text-sm">
                      By submitting your photo, you agree to a verification of your identity
                      by the company. This is in compliance with the company&apos;s mandate to verify
                      users before rendering certain services.
                    </p>

                  </div>
                </div>

                  <h5 className="text-[#3b3f5c] text-xl font-semibold mb-4 dark:text-white-light">Powered By:</h5>
                  <Link href = "/" className="text-blue-500">Agregar Technologies</Link>
              </div>
          </div>
      </div>
      
    </main>
  );
}
