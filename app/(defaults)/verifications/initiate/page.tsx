"use client";
import IconCamera from "@/components/icon/icon-camera";
import VerificationModal from "@/components/verification-stepper1";
import { useState } from "react";
import Flatpickr from 'react-flatpickr';
import { useSelector } from 'react-redux';
import { IRootState } from '@/store';
import 'flatpickr/dist/flatpickr.css';



export default function InitiateVerification() {
    const [isModalOpen, setModalOpen] = useState(false);
    const [formData, setFormData] = useState<FormData | null>(null);
    const [image, setImage] = useState<File | null>(null);
    // const [dateOfBirth, setDateOfBirth] = useState<Date[]>([]);

    
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl';

    const [verificationData, setVerificationData] = useState({
        email: "",
        phone: "",
        firstname: "",
        lastname: "",
        address: "",
        type:"",
        dateOfBirth: ""
    });

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setImage(file);
    };


    const prepareFormData = () => {
        const data = new FormData();
        data.append("email", verificationData.email);
        data.append("phone", verificationData.phone);
        data.append("firstname", verificationData.firstname);
        data.append("lastname", verificationData.lastname);
        data.append("address", verificationData.address);
        data.append("type",verificationData.type);
        data.append("date_of_birth",verificationData.dateOfBirth);

        if (image) {
            data.append("submitted_image", image); // Append the single image file
        }

        setFormData(data);
        setModalOpen(true);
    };    

    return (
        <div>
            <div className="panel flex items-center overflow-x-auto whitespace-nowrap p-3 text-primary mb-5 bg-blue-100">
                <div className="rounded-full bg-primary p-1.5 text-white ring-2 ring-primary/30 ltr:mr-3 rtl:ml-3">
                    <IconCamera />
                </div>
                <span className="ltr:mr-3 rtl:ml-3 text-xl text-primary">DOCUMENT VERIFICATION</span>
            </div>

            <div className="mb-5 flex items-center justify-center">
                <div className="w-full bg-white shadow-[4px_6px_10px_-3px_#bfc9d4] rounded-xl border border-white-light dark:border-[#1b2e4b] dark:bg-[#191e3a] dark:shadow-none p-5">
                    <div className="space-y-5 mt-5">
                        <div className="mx-10 px-[50px]">
                            <div className="text-center text-xl mb-10">Kindly provide the details below to facilitate verification</div>
                            <div>
                                <label htmlFor="gridEmail">Email <span className=" text-red-600">*</span></label>
                                <input
                                    id="gridEmail"
                                    type="email"
                                    placeholder="Enter Email"
                                    className="form-input"
                                    value={verificationData.email}
                                    onChange={(e) => setVerificationData({ ...verificationData, email: e.target.value })}
                                />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5 mt-5">
                                <div className="mt-5">
                                    <label htmlFor="phone">Phone <span className=" text-red-600">*</span></label>
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
                                    <label htmlFor="date_of_birth">Date of Birth <span className=" text-red-600">*</span></label>
                                    <Flatpickr
                                        placeholder="Select date"
                                        className="form-input"
                                        value={verificationData.dateOfBirth}
                                        onChange={(dates: Date[]) => {
                                            const selectedDate = dates.length > 0 ? dates[0].toISOString().split("T")[0] : "";
                                            setVerificationData({ ...verificationData, dateOfBirth: selectedDate });
                                        }}
                                        />
                                </div>
                            </div>


                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5 mt-5">
                                <div className="w-full">
                                    <label htmlFor="firstName" className="block mb-2">First Name <span className=" text-red-600">*</span></label>
                                    <input
                                        id="firstName"
                                        type="text"
                                        placeholder="Enter First Name"
                                        className="form-input w-full"
                                        value={verificationData.firstname}
                                        onChange={(e) => setVerificationData({ ...verificationData, firstname: e.target.value })}
                                    />
                                </div>
                                <div className="w-full">
                                    <label htmlFor="lastName" className="block mb-2">Last Name <span className=" text-red-600">*</span></label>
                                    <input
                                        id="lastName"
                                        type="text"
                                        placeholder="Enter Last Name"
                                        className="form-input w-full"
                                        value={verificationData.lastname}
                                        onChange={(e) => setVerificationData({ ...verificationData, lastname: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div className="mt-5">
                                <label htmlFor="gridCity">Address <span className=" text-red-600">*</span></label>
                                <input
                                    id="gridCity"
                                    type="text"
                                    placeholder="Enter Address"
                                    className="form-input"
                                    value={verificationData.address}
                                    onChange={(e) => setVerificationData({ ...verificationData, address: e.target.value })}
                                />
                            </div>
                            <div className=" mt-5">
                                <label htmlFor="gridCity">Select Verification Type <span className=" text-red-600">*</span></label>
                                <select
                                    required
                                    name='classIntructor'
                                    id="role-select"
                                    className="form-input cursor-pointer"
                                    value={verificationData.type}
                                    onChange={(e) => setVerificationData({ ...verificationData, type: e.target.value })}
                                >
                                    <option value="" disabled>Select Verification Type</option>
                                    <option value="ONBOARDING">ONBOARDING</option>
                                    <option value="STANDARD">STANDARD</option>
                                </select>
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
