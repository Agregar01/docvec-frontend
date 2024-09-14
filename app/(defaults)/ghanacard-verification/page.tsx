"use client";
import IconCamera from "@/components/icon/icon-camera";
import VerificationModal from "@/components/verification-stepper3";
import axios from "axios";
import { useEffect, useState } from "react";


interface Countries {
    id: string,
    name: string,
    code: string
}
export default function InitiateVerification() {
    const [isModalOpen, setModalOpen] = useState(false);
    const [formData, setFormData] = useState<FormData | null>(null);
    const [image, setImage] = useState<File | null>(null); // For storing the single image
    const [selectValued, setselectValued] = useState<string>("");


    const YearArray: number[] = [
        1991,
        1992,
        1993,
        1994,
        1995,
        1996,
        1997,
        1998,
        1999,
        2000,
        2001,
        2002,
        2003,
        2004,
        2005,
        2006,
        2007,
        2008,
        2009,
        2010,
        2011,
        2012,
        2013,
        2014,
        2015,
        2016,
        2017,
        2018,
        2019,
        2020,
        2021,
        2022,
        2023,
        20224
    ]

    const [countries, setcountries] = useState([]);

    useEffect(() => {
        axios.get("http://167.71.61.138:8000/common/countries/").then((response) => {
            const data = response.data;
            console.log(data);
            setcountries(data);
        }).catch((err) => {
            console.log(err);
        })
    }, [])



    const [verificationData, setVerificationData] = useState({
        email: "",
        phone: "",
        fullname: "",
        country: ""
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
        data.append("country", verificationData.country)

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
                <span className="ltr:mr-3 rtl:ml-3 text-xl text-primary">GHANA CARD VERIFICATION</span>
            </div>

            <div className="mb-5 flex items-center justify-center">
                <div className="w-full bg-white shadow-[4px_6px_10px_-3px_#bfc9d4] rounded-xl border border-white-light dark:border-[#1b2e4b] dark:bg-[#191e3a] dark:shadow-none p-5">

                    <div className="space-y-5 mt-5">
                        <div className="mx-10 px-[50px]">
                            <div className="text-center text-xl mb-10">Kindly provide the details below to facilitate verification</div>
                            <div className=" mt-5">
                                {/* <label htmlFor="gridEmail">Upload Ghana Card</label> */}
                                <div className=" grid grid-cols-1 lg:grid-cols-2 gap-5">
                                    <div>
                                        <label htmlFor="ctnFile">Upload front of card</label>
                                        <input
                                            id="imageUpload"
                                            type="file"
                                            className="form-input file:py-2 file:px-4 file:border-0 file:font-semibold p-0 file:bg-primary/90 ltr:file:mr-5 rtl:file-ml-5 file:text-white file:hover:bg-primary"
                                            required
                                            onChange={handleImageChange}
                                            accept="image/*"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="ctnFile">Upload  back of card</label>
                                        <input
                                            id="imageUpload"
                                            type="file"
                                            className="form-input file:py-2 file:px-4 file:border-0 file:font-semibold p-0 file:bg-primary/90 ltr:file:mr-5 rtl:file-ml-5 file:text-white file:hover:bg-primary"
                                            required
                                            onChange={handleImageChange}
                                            accept="image/*"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className=" mt-5">
                                <label htmlFor="gridCity">NIA Number</label>
                                <input
                                    id="gridCity"
                                    type="text"
                                    placeholder="Enter NIA Number"
                                    className="form-input"
                                    value={verificationData.fullname}
                                    onChange={(e) => setVerificationData({ ...verificationData, fullname: e.target.value })}
                                />
                            </div>

                            <div className=" mt-5">
                                <label htmlFor="ctnFile">Picture of face (Selfie)</label>
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
