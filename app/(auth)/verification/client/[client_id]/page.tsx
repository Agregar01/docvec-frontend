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
import VerificationModal from "@/components/verification-stepper4";




interface Countries {
  id: string,
  name: string,
  code: string
}

interface IDType {
  id: string,
  name: string,
  code: string
}

export default function VerifyPhoto() {

  const { client_id } = useParams<{ client_id: string }>();

  // const [countries, setcountries] = useState([]);
  const [image2, setimage2] = useState<File | null>(null);
  const [image3, setimage3] = useState<File | null>(null);
  const [formData, setFormData] = useState<FormData | null>(null);
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [countries, setCountries] = useState<Countries[]>([]);
  const [idType, setIDType] = useState<IDType[]>([]);

  // useEffect(() => {
  //   axios.get("https://verifications.agregartech.com/api/v1/common/countries/").then((response) => {
  //     const data = response.data;
  //     console.log(data);
  //     setcountries(data);
  //   }).catch((err) => {
  //     console.log(err);
  //   })
  // }, []);


  // const [docTypes, setdocTypes] = useState([]);

  // useEffect(() => {
  //   axios.get("https://verifications.agregartech.com/api/v1/common/document-type/").then((response) => {
  //     const data = response.data;
  //     setdocTypes(data);
  //     console.log(data);
  //   })

  // }, []);

  useEffect(() => {
    const countryList: Countries[] = [
      { id: 'bbad08e7-1e6e-4b40-9536-7cdc49b844c8', name: 'Ghana', code: 'GH' },
      { id: '65a225a3-aba4-407f-bd3c-deec9a8e20d3', name: 'Nigeria', code: 'NG' },
      { id: 'b0022c65-b8d3-468e-b1a4-fefed31ae919', name: 'Ivory Coast', code: 'CI' },
    ];

    setCountries(countryList); // Set the countries array in the state
  }, []);

useEffect(() => {
    const idTypeList: IDType[] = [
      { id: '4c28f31f-22fd-41ed-a5d4-758b50813f21', name: 'National ID', code: 'GH' },
      { id: '7d68dd38-7ee8-4521-9d47-caad5c280a6c', name: 'Drivers License', code: 'NG' },
      { id: '5d0f04cd-2d8a-41dd-a8b3-94f742575b82', name: 'Voters ID', code: 'CI' },
    ];

    setIDType(idTypeList); // Set the countries array in the state
  }, []);

  const handleImageChange2 = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null; // Get the first selected file or null
    setimage2(file);
  };
  const handleImageChange3 = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null; // Get the first selected file or null
    setimage3(file);
  };


  const webcamRef = useRef<Webcam>(null);
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  const capture = () => {
    if (webcamRef.current) {
      const image = webcamRef.current.getScreenshot();
      setImageSrc(image || null);
    }
  };


  const [verificationData, setVerificationData] = useState({
    country: "",
    document_type: "",
    id_number: "",
    countryname: "",
    documentname:""
  });

  const prepareFormData = () => {
    const data = new FormData();
    data.append("country", verificationData.country);
    data.append("document_type", verificationData.document_type);
    data.append("id_number", verificationData.id_number);
    data.append("id", client_id);
    data.append("documentname",verificationData.documentname);
    data.append("countryname",verificationData.countryname);
    if (imageSrc) {
      data.append("video_image", imageSrc);
    }
    if (image2) {
      data.append("id_card_front", image2);
    }

    if (image3) {
      data.append("id_card_back", image3);
    }

    setFormData(data);
    setModalOpen(true);
  };




  return (
    <main>
      <VerificationModal isOpen={isModalOpen} closeModal={() => setModalOpen(false)} formData={formData} />
      <div className="mb-5 flex items-center justify-center min-h-screen">
        <div className="max-w-[50rem] w-full mt-0 lg:mt-8 bg-white shadow-[4px_6px_10px_-3px_#bfc9d4] rounded border border-white-light dark:border-[#1b2e4b] dark:bg-[#191e3a] dark:shadow-none">
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
                    ID and Document Verification
                  </p>
                  <p className="">
                    Before submitting the photo, here are a few checklists to follow:
                  </p>
                  <ol className="list-decimal ml-6 mt-2">
                    <li>Remove all accessories such as eye glasses and hats</li>
                    <li>Ensure your face is visible and clear</li>
                  </ol>
                </div>


                <div className="selfie-capture">
                  {/* <div className=" py-5">
                    <h2>Capture Your Selfie</h2>
                    </div> */}
                  {!imageSrc ? (
                    <div className=" grid place-items-center">
                      <Webcam
                        audio={false}
                        ref={webcamRef}
                        screenshotFormat="image/jpeg"
                        width={290}
                        height={290}
                        videoConstraints={{
                          facingMode: 'user', // Use front camera
                        }}
                      />
                      <button className="btn btn-primary mt-5" onClick={capture}>Capture</button>
                    </div>
                  ) : (
                    <div className=" grid place-items-center">
                      <img src={imageSrc} alt="Selfie" className="" />
                      <button className="btn btn-primary  mt-5" onClick={() => setImageSrc(null)}>Retake</button>
                    </div>
                  )}
                </div>
                <p className="text-justify mx-auto max-w-4xl px-4 text-sm">
                  By submitting your photo, you agree to a verification of your identity
                  by the company. This is in compliance with the company&apos;s mandate to verify
                  users before rendering certain services.
                </p>
                <div>
                  <div className="mt-5">
                    <label htmlFor="gridCity">Select Country <span className=" text-red-600">*</span></label>
                    <select
                      required
                      name='classIntructor'
                      id="role-select"
                      className="form-input cursor-pointer"
                      value={verificationData.country}
                      // onChange={(e) => setVerificationData({ ...verificationData, country: e.target.value })}
                      onChange={(e) => {
                        const selectedOption = e.target.options[e.target.selectedIndex];
                        setVerificationData({
                            ...verificationData,
                            country: selectedOption.value, // id for country
                            countryname: selectedOption.getAttribute('data-country') || "", // name for country
                        });
                    }}
                  >
                      <option value="" disabled>Select Country</option>
                      {countries.map((list: Countries) => (
                      <option key={list.id} value={list.id} data-country={list.name}>
                          {list.name}
                      </option>
                      ))}
                  </select>
                  </div>
                  <div className=" grid lg:grid-cols-2 gap-6 grid-cols-1 mt-5">
                    <div className="">
                      <label htmlFor="gridCity">Select ID Type <span className=" text-red-600">*</span></label>
                      <select
                        required
                        name='classIntructor'
                        id="role-select"
                        className="form-input cursor-pointer"
                        value={verificationData.document_type}
                        onChange={(e) => {
                          const selectedOption = e.target.options[e.target.selectedIndex];
                          setVerificationData({
                              ...verificationData,
                              document_type: e.target.value, // id for document_type
                              // country: selectedOption.value, // id for country
                              documentname: selectedOption.getAttribute('data-document') || "", // name for country
                          });
                      }}
                        // onChange={(e) => setVerificationData({ ...verificationData, document_type: e.target.value })}
                    >
                        <option value="" disabled>Select ID Type</option>
                        {idType.map((list: IDType) => (
                        <option key={list.id} value={list.id} data-document={list.name}>
                            {list.name}
                        </option>
                        ))}
                    </select>
                        {/* <option value="Ghana Card">Voters ID</option>
                                                    <option value="" disabled>Passpor</option>
                                                    <option value="Ghana Card">Drivers Licesnce</option> */}
                    </div>
                    <div>
                      <label htmlFor="gridEmail">ID Number <span className=" text-red-600">*</span></label>
                      <input
                        id="gridEmail"
                        type="email"
                        placeholder="Enter ID Number"
                        className="form-input"
                        value={verificationData.id_number}
                        onChange={(e) => setVerificationData({ ...verificationData, id_number: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className=" mt-5 grid grid-cols-1 lg:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="ctnFile">Upload front of card <span className=" text-red-600">*</span></label>
                      <input
                        id="imageUpload"
                        type="file"
                        className="form-input file:py-2 file:px-4 file:border-0 file:font-semibold p-0 file:bg-primary/90 ltr:file:mr-5 rtl:file-ml-5 file:text-white file:hover:bg-primary"
                        required
                        onChange={handleImageChange2}
                        accept="image/*"
                      />
                    </div>
                    <div>
                      <label htmlFor="ctnFile">Upload back of card <span className=" text-red-600">*</span></label>
                      <input
                        id="imageUpload"
                        type="file"
                        className="form-input file:py-2 file:px-4 file:border-0 file:font-semibold p-0 file:bg-primary/90 ltr:file:mr-5 rtl:file-ml-5 file:text-white file:hover:bg-primary"
                        required
                        onChange={handleImageChange3}
                        accept="image/*"
                      />
                    </div>
                  </div>
                  <button onClick={prepareFormData} type="button" className="btn btn-primary ltr:ml-auto rtl:mr-auto mt-6">
                    Initiate Verification
                  </button>
                </div>

              </div>
            </div>

            <h5 className="text-[#3b3f5c] text-xl font-semibold mb-4 dark:text-white-light">Powered By:</h5>
            <Link href="/" className="text-blue-500">Agregar Technologies</Link>
          </div>
        </div>
      </div>

    </main>
  );
}
