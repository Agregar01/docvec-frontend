"use client";
import IconCamera from "@/components/icon/icon-camera";
import VerificationModal from "@/components/verification-stepper1";
import { useState } from "react";

export default function InitiateVerification() {
    const [isModalOpen, setModalOpen] = useState(false);
    const [formData, setFormData] = useState<FormData | null>(null);
    const [image, setImage] = useState<File | null>(null); // For storing the single image

    const [verificationData, setVerificationData] = useState({
        email: "",
        phone: "",
        fullname: "",
    });

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null; // Get the first selected file or null
        setImage(file);
    };

    const prepareFormData = () => {
        const data = new FormData();
        data.append("email", verificationData.email);
        data.append("phone", verificationData.phone);
        data.append("fullname", verificationData.fullname);

        if (image) {
            data.append("submitted_image", image); // Append the single image file
        }

        setFormData(data);
        setModalOpen(true);
    };
    console.log(formData);
    

    return (
        <div>
            <div className="panel flex items-center overflow-x-auto whitespace-nowrap p-3 text-primary mb-5 bg-blue-100">
                <div className="rounded-full bg-primary p-1.5 text-white ring-2 ring-primary/30 ltr:mr-3 rtl:ml-3">
                    <IconCamera />
                </div>
                <span className="ltr:mr-3 rtl:ml-3 text-xl text-primary">DOCUMENTS VERIFICATION</span>
            </div>

            <div className="mb-5 flex items-center justify-center">
                <div className="w-full bg-white shadow-[4px_6px_10px_-3px_#bfc9d4] rounded-xl border border-white-light dark:border-[#1b2e4b] dark:bg-[#191e3a] dark:shadow-none p-5">
                    <div className="space-y-5 mt-5">
                        <div className="mx-10 px-[50px]">
                            <div className="text-center text-xl mb-10">Kindly provide the details below to facilitate verification</div>
                                <div>
                                    <label htmlFor="gridEmail">Email</label>
                                    <input
                                        id="gridEmail"
                                        type="email"
                                        placeholder="Enter Email"
                                        className="form-input"
                                        value={verificationData.email}
                                        onChange={(e) => setVerificationData({ ...verificationData, email: e.target.value })}
                                    />
                                </div>
                                <div className="mt-5">
                                    <label htmlFor="phone">Phone</label>
                                    <input
                                        id="phone"
                                        type="text"
                                        placeholder="Enter Phone"
                                        className="form-input"
                                        value={verificationData.phone}
                                        onChange={(e) => setVerificationData({ ...verificationData, phone: e.target.value })}
                                    />
                                </div>
                                <div className="mt-5">
                                    <label htmlFor="gridCity">Full Name</label>
                                    <input
                                        id="gridCity"
                                        type="text"
                                        placeholder="Enter Name"
                                        className="form-input"
                                        value={verificationData.fullname}
                                        onChange={(e) => setVerificationData({ ...verificationData, fullname: e.target.value })}
                                    />
                                </div>
                                <div className="mt-5">
                                    <label htmlFor="ctnFile">Upload Clients Image</label>
                                    <input
                                        id="imageUpload"
                                        type="file"
                                        className="form-input file:py-2 file:px-4 file:border-0 file:font-semibold p-0 file:bg-primary/90 ltr:file:mr-5 rtl:file-ml-5 file:text-white file:hover:bg-primary"
                                        required
                                        onChange={handleImageChange}
                                        accept="image/*"
                                    />
                                </div>

                    <VerificationModal isOpen={isModalOpen} closeModal={() => setModalOpen(false)} formData={formData} />
                    <button type="button" onClick={prepareFormData} className="btn btn-primary ltr:ml-auto rtl:mr-auto mt-10">
                        Initiate Verification
                    </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
