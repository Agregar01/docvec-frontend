"use client";
import IconCamera from "@/components/icon/icon-camera";
import VerificationModal from "@/components/verification-stepper1";
import axios from "axios";
import { useEffect, useState } from "react";
import DropDownCards from "../../components/dropdowncard/page";


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
export default function InitiateVerification() {
    const [isModalOpen, setModalOpen] = useState(false);
    const [formData, setFormData] = useState<FormData | null>(null);
    const [image, setImage] = useState<File | null>(null);
    const [image2, setimage2] = useState<File | null>(null);
    const [image3, setimage3] = useState<File | null>(null);
    // For storing the single image
    const [selectValued, setselectValued] = useState<string>("");
    const [showForm1, setshowForm1] = useState<boolean>(false);
    const [showForm2, setshowForm2] = useState<boolean>(false);




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
        axios.get("https://mkd.collegeleagueapp.com/common/countries/").then((response) => {
            const data = response.data;
            console.log(data);
            setcountries(data);
        }).catch((err) => {
            console.log(err);
        })
    }, []);

    const [docTypes, setdocTypes] = useState([]);

    useEffect(() => {
        axios.get("https://mkd.collegeleagueapp.com/common/document-type/").then((response) => {
            const data = response.data;
            setdocTypes(data);
            console.log(data);
        })

    }, [])




    const [verificationData, setVerificationData] = useState({
        email: "",
        phone: "",
        firstname: "",
        lastname: "",
        country: "",
        idType: "",
        id_number: "",
        document_type: ""
    });

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null; // Get the first selected file or null
        setImage(file);
    };

    const handleImage2Change = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null; // Get the first selected file or null
        setimage2(file);
    }

    const handleImage3Change = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null; // Get the first selected file or null
        setimage3(file);
    }



    const prepareFormData = () => {
        const data = new FormData();
        data.append("email", verificationData.email);
        data.append("phone", verificationData.phone);
        data.append("firstname", verificationData.firstname);
        data.append("lastname", verificationData.lastname);
        data.append("country", verificationData.country);
        data.append("document_type", verificationData.document_type);
        data.append("id_number", verificationData.id_number);


        if (image) {
            data.append("selfie", image); // Append the single image file
        }
        if (image2) {
            data.append("ghana_card_front", image2); // Append the single image file
        }
        if (image3) {
            data.append("ghana_card_back", image3); // Append the single image file
        }

        axios.post("")

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
            <div className=" space-y-4">
                <DropDownCards open={!showForm1} handleClick={() => {
                    setshowForm1(!showForm1);
                }} />
                {showForm1 ?
                    <div className="w-full bg-white shadow-[4px_6px_10px_-3px_#bfc9d4] rounded-xl border border-white-light dark:border-[#1b2e4b] dark:bg-[#191e3a] dark:shadow-none p-5">
                        <div className="space-y-5 mt-5">
                            <div>
                                <div className="text-center text-xl mb-10">Kindly provide the details below to facilitate verification</div>
                            </div>
                            <div className=" px-8">
                                <div>
                                    <div className=" grid grid-cols-1 lg:grid-cols-2 gap-5 mt-5">
                                        <div>
                                            <label htmlFor="gridEmail">First Name</label>
                                            <input
                                                id="gridEmail"
                                                type="email"
                                                placeholder="Enter First Name"
                                                className="form-input"
                                                value={verificationData.firstname}
                                                onChange={(e) => setVerificationData({ ...verificationData, firstname: e.target.value })}
                                            />
                                        </div>
                                        <div >
                                            <label htmlFor="gridEmail">Last Name</label>
                                            <input
                                                id="gridEmail"
                                                type="email"
                                                placeholder="Enter Last Name"
                                                className="form-input"
                                                value={verificationData.lastname}
                                                onChange={(e) => setVerificationData({ ...verificationData, lastname: e.target.value })}
                                            />
                                        </div>

                                    </div>
                                    <div>
                                        <div className="mt-5">
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
                                            <label htmlFor="gridEmail">Phone</label>
                                            <input
                                                id="gridEmail"
                                                type="email"
                                                placeholder="Enter Phone"
                                                className="form-input"
                                                value={verificationData.phone}
                                                onChange={(e) => setVerificationData({ ...verificationData, phone: e.target.value })}
                                            />
                                        </div>
                                        <div className="mt-5">
                                            <label htmlFor="gridCity">Select Country</label>
                                            <select
                                                name='classIntructor'
                                                id="role-select"
                                                className="form-input cursor-pointer"
                                                value={verificationData.country}
                                                onChange={(e) => setVerificationData({ ...verificationData, country: e.target.value })}
                                            >
                                                <option value="" disabled>Select Country</option>
                                                {
                                                    countries.map((list: Countries) => {
                                                        return (
                                                            <option value={list.id}>{list.name}</option>
                                                        );
                                                    })
                                                }
                                            </select>
                                        </div>
                                        <div className=" grid lg:grid-cols-2 gap-6 grid-cols-1 mt-5">
                                            <div className="">
                                                <label htmlFor="gridCity">Select ID Type</label>
                                                <select
                                                    name='classIntructor'
                                                    id="role-select"
                                                    className="form-input cursor-pointer"
                                                    value={verificationData.document_type}
                                                    onChange={(e) => setVerificationData({ ...verificationData, document_type: e.target.value })}
                                                >
                                                    <option value="" disabled>Select document type</option>
                                                     
                                                    {
                                                      docTypes.map((list:IDType) => {
                                                        return(
                                                            <option value={list.id}>{list.name}</option>
                                                        );
                                                      })
                                                    }
                                                    {/* <option value="Ghana Card">Voters ID</option>
                                                    <option value="" disabled>Passpor</option>
                                                    <option value="Ghana Card">Drivers Licesnce</option> */}
                                                </select>
                                            </div>
                                            <div>
                                                <label htmlFor="gridEmail">ID Number</label>
                                                <input
                                                    id="gridEmail"
                                                    type="email"
                                                    placeholder="Enter Email"
                                                    className="form-input"
                                                    value={verificationData.id_number}
                                                    onChange={(e) => setVerificationData({ ...verificationData, id_number: e.target.value })}
                                                />
                                            </div>

                                        </div>
                                        <div className=" grid grid-cols-1 lg:grid-cols-3 mt-5 gap-5">
                                            <div className="">
                                                <label htmlFor="ctnFile">Upload passport picture</label>
                                                <input
                                                    id="imageUpload"
                                                    type="file"
                                                    className="form-input file:py-2 file:px-4 file:border-0 file:font-semibold p-0 file:bg-primary/90 ltr:file:mr-5 rtl:file-ml-5 file:text-white file:hover:bg-primary"
                                                    required
                                                    onChange={handleImageChange}
                                                    accept="image/*"
                                                />
                                            </div>
                                            <div className="">
                                                <label htmlFor="ctnFile">Upload front of National ID</label>
                                                <input
                                                    id="imageUpload"
                                                    type="file"
                                                    className="form-input file:py-2 file:px-4 file:border-0 file:font-semibold p-0 file:bg-primary/90 ltr:file:mr-5 rtl:file-ml-5 file:text-white file:hover:bg-primary"
                                                    required
                                                    onChange={handleImage2Change}
                                                    accept="image/*"
                                                />
                                            </div>
                                            <div className="">
                                                <label htmlFor="ctnFile">Upload back of National ID</label>
                                                <input
                                                    id="imageUpload"
                                                    type="file"
                                                    className="form-input file:py-2 file:px-4 file:border-0 file:font-semibold p-0 file:bg-primary/90 ltr:file:mr-5 rtl:file-ml-5 file:text-white file:hover:bg-primary"
                                                    required
                                                    onChange={handleImage3Change}
                                                    accept="image/*"
                                                />
                                            </div>
                                        </div>

                                    </div>

                                </div>
                            </div>

                            <VerificationModal isOpen={isModalOpen} closeModal={() => setModalOpen(false)} formData={formData} />
                            <button type="button" onClick={prepareFormData} className="btn btn-primary ltr:ml-auto rtl:mr-auto mt-10">
                                Initiate Verification
                            </button>

                        </div>
                    </div>
                    : null}
                <DropDownCards open={!showForm2} handleClick={() => {
                    setshowForm2(!showForm2);
                }} />
            </div>
            {showForm2 ?
                <div className="mb-5 flex items-center justify-center  mt-5">
                    <div className="w-full bg-white shadow-[4px_6px_10px_-3px_#bfc9d4] rounded-xl border border-white-light dark:border-[#1b2e4b] dark:bg-[#191e3a] dark:shadow-none p-5">
                        <div className="space-y-5 mt-5">
                            <div className="mx-10 ">
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
                                <div className=" grid grid-cols-1 lg:grid-cols-2 gap-5 mt-5">
                                    <div className="">
                                        <label htmlFor="gridCity">First Name</label>
                                        <input
                                            id="gridCity"
                                            type="text"
                                            placeholder="Enter First Name"
                                            className="form-input"
                                            value={verificationData.firstname}
                                            onChange={(e) => setVerificationData({ ...verificationData, firstname: e.target.value })}
                                        />
                                    </div>
                                    <div className="">
                                        <label htmlFor="gridCity">Last Name</label>
                                        <input
                                            id="gridCity"
                                            type="text"
                                            placeholder="Enter First Name"
                                            className="form-input"
                                            value={verificationData.firstname}
                                            onChange={(e) => setVerificationData({ ...verificationData, firstname: e.target.value })}
                                        />
                                    </div>
                                </div>
                               

                                <VerificationModal isOpen={isModalOpen} closeModal={() => setModalOpen(false)} formData={formData} />
                                <button type="button" onClick={prepareFormData} className="btn btn-primary ltr:ml-auto rtl:mr-auto mt-10">
                                    Initiate Verification
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                : null}
        </div>
    );
}
