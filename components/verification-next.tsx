'use client';
import React, { useState } from 'react';
import ImageUploading, { ImageListType } from 'react-images-uploading';

const VerificationNextStep = () => {
    const [images, setImages] = useState<any>([]);
    const maxNumber = 69;
    const onChange = (imageList: ImageListType, addUpdateIndex: number[] | undefined) => {
        setImages(imageList as never[]);
    }
    const [verificationData, setVerificationData] = useState({
        "email": "",
        "phone": "",
        "fullname": "",
    })

    const requestData = {
        email: verificationData.email,
        phone: verificationData.phone,
        fullname: verificationData.fullname,
        images: images
    }

    console.log(requestData)
    return (
        <div className="space-y-5 mt-5">
            <div className="mx-10">

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="gridEmail">Email</label>
                        <input id="gridEmail" type="email" placeholder="Enter Email" className="form-input" value = {verificationData.email} onChange = {(e) => setVerificationData({...verificationData, email: e.target.value})} />
                    </div>
                    <div>
                        <label htmlFor="phone">Phone</label>
                        <input id="phone" type="text" placeholder="Enter Phone" className="form-input" value = {verificationData.phone} onChange = {(e) => setVerificationData({...verificationData, phone: e.target.value})}/>
                    </div>
                </div>
            
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-5">
                    <div className="md:col-span-2">
                        <label htmlFor="gridCity">Full Name</label>
                        <input id="gridCity" type="text" placeholder="Enter Name" className="form-input" value = {verificationData.fullname} onChange = {(e) => setVerificationData({...verificationData, fullname: e.target.value})}/>
                    </div>
                    {/* <FileUpload /> */}
                    <div className="mb-5">
                        <div className="custom-file-container" data-upload-id="myFirstImage">
                            <div className="label-container">
                                <label>Upload </label>
                                <button
                                    type="button"
                                    className="custom-file-container__image-clear"
                                    title="Clear Image"
                                    onClick={() => {
                                        setImages([]);
                                    }}
                                >
                                    ×
                                </button>
                            </div>
                            <label className="custom-file-container__custom-file"></label>
                            <input type="file" className="custom-file-container__custom-file__custom-file-input" accept="image/*" />
                            <input type="hidden" name="MAX_FILE_SIZE" value="10485760" />
                            <ImageUploading value={images} onChange={onChange} maxNumber={maxNumber}>
                                {({ imageList, onImageUpload, onImageRemoveAll, onImageUpdate, onImageRemove, isDragging, dragProps }) => (
                                    <div className="upload__image-wrapper">
                                        <button className="custom-file-container__custom-file__custom-file-control" onClick={onImageUpload}>
                                            Select image to verify...
                                        </button>
                                        &nbsp;
                                        {imageList.map((image, index) => (
                                            <div key={index} className="custom-file-container__image-preview relative">
                                                <img src={image.dataURL} alt="img" className="m-auto" />
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </ImageUploading>
                            {images.length === 0 ? <img src="/assets/images/file-preview.svg" className="m-auto w-full max-w-md" alt="" /> : ''}
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default VerificationNextStep;
