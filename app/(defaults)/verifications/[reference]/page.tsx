'use client';
import IconDownload from '@/components/icon/icon-download';
import IconPrinter from '@/components/icon/icon-printer';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import dayjs from 'dayjs';
import "../../../../components/verification-loader.css";

interface Spoof {
    is_real: boolean;
    confidence: number;
    antispoof_score: number;
}
interface Comparison {
    verified: boolean;
    threshold: number;
    time_taken: number;
}
interface VerificationDetails {
    spoof: Spoof;
    comparison: Comparison;
    status: boolean;
}
interface VerificationDetails {
    personal_data: {
        candidate_name: string;
        candidate_email: string;
        candidate_phone: string;
        candidate_dob: string;
    },
    sim_swap_verification: {
        owner: string;
        phone: string;
        network: string;
        sim_date: string;
        swap_detected: boolean;
    },
    verification_records: {
        reference: string;
        link_sent: boolean;
        email_sent_time: string;
        video_verification_start_time: string;
        verification_completed_time: string;
        verification_duration: string;
        verification_completed: boolean;
        video_image: string;
        submitted_image: string;
        consent_sorted: boolean;
        type: string;
    },
    device_information: {
        ip: string;
        host: string;
        user_agent: string;
    }
    ofac_search: {
        ofac_search_done: boolean,
        ofac_search_match_found: boolean
    },

    facial_comparison_details: {
        verification_details: VerificationDetails
    }

}

const ComponentsAppsInvoicePreview = () => {
    const exportTable = () => {
        window.print();
    };

    const [details, setDetails] = useState<VerificationDetails | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const params = useParams<{ reference: string }>();
    const reference = params.reference;

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const url = `https://verifications.agregartech.com/api/v1/id-cards/verifications/${reference}/`;
                
                const response = await axios.get(url);
                setDetails(response.data);  // Assuming the response contains the data you need
            } catch (err: any) {
                setError(err.message);  // Handle any errors that occur during the fetch
            } finally {
                setLoading(false);  // Ensure loading is set to false regardless of success or error
            }
        };
        fetchDetails();
    }, [reference]);


    if (loading) return <div className=' grid place-items-center my-28'>
        <span className="loader"></span>
    </div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="mx-[50px]">
            <div className="mb-6 flex flex-wrap items-center justify-center gap-4 lg:justify-end">
                <button type="button" className="btn btn-primary gap-2" onClick={() => exportTable()}>
                    <IconPrinter />
                    Print
                </button>
                <button type="button" className="btn btn-success gap-2">
                    <IconDownload />
                    Download
                </button>
            </div>

            <div className="panel">
                <div className="flex flex-wrap justify-between gap-4 px-10">
                    <div className="text-2xl font-bold uppercase text-orange-600">Verification Report</div>
                    <div className="shrink-0">
                        <Image src="/agregar-logo.png" alt="img" width={150} height={200} />
                    </div>
                </div>
                <div className="px-10 ltr:text-right rtl:text-left">
                    <div className="mt-6 space-y-1 text-white-dark">
                        <div>Trinity Baptist Church Building</div>
                        <div>Opposite UPSA, East Legon</div>
                        <div>info@agregartech.com</div>
                        <div>+233 (0) 20 984 4376</div>
                    </div>
                </div>

                <hr className="my-6 border-orange-600 dark:border-[#1b2e4b] mx-10" />

                <div className="flex justify-between px-10">
                    <div className="space-y-1 text-white-dark grid-cols-1/2">
                        <div className="text-dark text-lg font-semibold mb-3.5 dark:text-white-light">Client Images:</div>
                        <div className="flex flex-row gap-10">
                            <div className="div flex flex-col items-center">
                                {details?.verification_records?.submitted_image && (
                                <img
                                    src={details.verification_records.submitted_image}
                                    alt="Submitted Image"
                                    className="w-40 h-40 object-cover" // Set a fixed width and height with Tailwind CSS
                                />
                                )}
                            </div>
                            <div className="div flex flex-col items-center">
                                {details?.verification_records?.video_image && (
                                <img
                                    src={details.verification_records.video_image}
                                    alt="Screenshot from video"
                                    className="w-40 h-40 object-cover" // Set a fixed width and height with Tailwind CSS
                                />
                                )}
                            </div>
                        </div>

                    </div>
                    <div className="flex flex-col sm:flex-row justify-end">
                        <div className="">
                            <h1 className="text-dark text-lg font-semibold mb-3.5 dark:text-white-light">  Client Personal Details:</h1>
                            <div className="mb-2 flex w-full items-center justify-between">
                                <div><b>Client Name:</b> {details?.personal_data.candidate_name}</div>
                            </div>
                            <div className="mb-2 flex w-full items-center justify-between">
                                <div><b>Phone: </b>{details?.personal_data.candidate_phone}</div>
                            </div>
                            <div className="mb-2 flex w-full items-center justify-between">
                                <div><b>Email: </b>{details?.personal_data.candidate_email}</div>
                            </div>
                            <div className="mb-2 flex w-full items-center justify-between">
                                <div><b>Date of Birth: </b>{details?.personal_data.candidate_dob}</div>
                            </div>
                        </div>
                    </div>
                </div>

                <hr className="my-6 border-orange-600 dark:border-[#1b2e4b] mx-10" />

                <div className="px-10">

                    <div className="div flex gap-[50px]">
                        <div className="grow basis-1/2">

                            <div className="div">
                                <h5 className="text-dark text-lg font-semibold mb-3.5 dark:text-white-light">Verification Details: </h5>
                            </div>
                            <div>
                                <div className="mb-2 flex w-full justify-between">
                                    <div className="text-white-dark">Verification Reference ID: </div>
                                    <div className="whitespace-nowrap">{details?.verification_records?.reference}</div>
                                </div>
                                <div className="mb-2 flex w-full justify-between">
                                    <div className="text-white-dark">Verification Link Sent: </div>
                                    <div className="whitespace-nowrap">{details?.verification_records?.link_sent}</div>
                                </div>
                                <div className="mb-2 flex w-full justify-between">
                                    <div className="text-white-dark">Time Verification Link Sent: </div>
                                    <div className="whitespace-nowrap">{dayjs(details?.verification_records?.email_sent_time).format('DD/MM/YYYY h:mm A')}</div>
                                </div>
                                <div className="mb-2 flex w-full justify-between">
                                    <div className="text-white-dark">Time Client Started Verification:: </div>
                                    <div className="whitespace-nowrap">{dayjs(details?.verification_records?.video_verification_start_time).format('DD/MM/YYYY h:mm A')}</div>
                                </div>
                                <div className="mb-2 flex w-full justify-between">
                                    <div className="text-white-dark">Time of completion: </div>
                                    <div className="whitespace-nowrap">{dayjs(details?.verification_records?.verification_completed_time).format('DD/MM/YYYY h:mm A')}</div>
                                </div>
                                <div className="mb-2 flex w-full justify-between">
                                    <div className="text-white-dark">Verification Completion State: </div>
                                    <div className="whitespace-nowrap">{details?.verification_records?.verification_completed === true ? "COMPLETED" : "INCOMPLETE"}</div>
                                </div>
                                
                                <div className="mb-2 flex w-full justify-between">
                                    <div className="text-white-dark">Verification Type: </div>
                                    <div className="whitespace-nowrap">{details?.verification_records?.type}</div>
                                </div>
                            </div>
                        </div>
                        <div className="grow basis-1/2">

                            <div className="div">
                                <h5 className="text-dark text-lg font-semibold mb-3.5 dark:text-white-light">Facial Biometric Details: </h5>
                            </div>
                            <div>
                                <div className="mb-2 flex w-full justify-between">
                                    <div className="text-white-dark">Deepfake, Spoof Detected: </div>
                                    <div className="whitespace-nowrap">{details?.facial_comparison_details?.verification_details?.spoof?.is_real === false ? "YES" : "NO"}</div>
                                </div>
                                <div className="mb-2 flex w-full justify-between">
                                    <div className="text-white-dark">Confidence score of face detected: </div>
                                    <div className="whitespace-nowrap">{details?.facial_comparison_details?.verification_details?.spoof?.confidence}%</div>
                                </div>
                                <div className="mb-2 flex w-full justify-between">
                                    <div className="text-white-dark">Anti-Spoofing Confidence Score: </div>
                                    <div className="whitespace-nowrap">{details?.facial_comparison_details?.verification_details?.spoof?.antispoof_score}%</div>
                                </div>
                                <div className="mb-2 flex w-full justify-between">
                                    <div className="text-white-dark">Facial Match Status: </div>
                                    <div className="whitespace-nowrap">{details?.facial_comparison_details?.verification_details?.comparison?.verified === true ? "MATCH": "MISMATCH"}</div>
                                </div>
                                <div className="mb-2 flex w-full justify-between">
                                    <div className="text-white-dark">Time Taken To Compare Faces: </div>
                                    <div className="whitespace-nowrap">{details?.facial_comparison_details?.verification_details?.comparison?.time_taken}</div>
                                </div>
                                <div className="mb-2 flex w-full justify-between">
                                    <div className="text-white-dark">Consent Sorted: </div>
                                    <div className="whitespace-nowrap">{details?.verification_records?.consent_sorted === true ? "YES" : "NO"}</div>
                                </div>
                                <div className="mb-2 flex w-full justify-between">
                                    <div className="text-white-dark">Threshold: </div>
                                    <div className="whitespace-nowrap">{details?.facial_comparison_details?.verification_details?.comparison?.threshold}</div>
                                </div>
                            </div>
                        </div>
                
                    </div>

                </div>
                <hr className="my-6 border-orange-600 dark:border-[#1b2e4b] mx-10" />

                <div className="px-10">

                    <div className="div flex gap-[50px]">
                        <div className="grow basis-1/2">

                            <div className="div">
                                <h5 className="text-dark text-lg font-semibold mb-3.5 dark:text-white-light">SIM Swap Information: </h5>
                            </div>
                            <div>
                                <div className="mb-2 flex w-full justify-between">
                                    <div className="text-white-dark">SIM Owner: </div>
                                    <div className="whitespace-nowrap">{details?.sim_swap_verification?.owner}</div>
                                </div>
                                <div className="mb-2 flex w-full justify-between">
                                    <div className="text-white-dark">Phone Number: </div>
                                    <div className="whitespace-nowrap">{details?.sim_swap_verification?.phone}</div>
                                </div>
                                <div className="mb-2 flex w-full justify-between">
                                    <div className="text-white-dark">Network: </div>
                                    <div className="whitespace-nowrap">{details?.sim_swap_verification?.network}</div>
                                </div>
                                <div className="mb-2 flex w-full justify-between">
                                    <div className="text-white-dark">SIM Registration Date: </div>
                                    <div className="whitespace-nowrap">{dayjs(details?.sim_swap_verification?.sim_date).format('DD/MM/YYYY h:mm A')}</div>
                                </div>
                                <div className="mb-2 flex w-full justify-between">
                                    <div className="text-white-dark">SIM Swap Detected: </div>
                                    <div className="whitespace-nowrap">{details?.sim_swap_verification?.swap_detected === true ? "YES" : "NO"}</div>
                                </div>

                            </div>
                        </div>
                        <div className="grow basis-1/2">
                            <div className="flex flex-col">
                                <div className="grow">
                                    <div className="div">
                                        <h5 className="text-dark text-lg font-semibold mb-3.5 dark:text-white-light">Sanctions List Check: </h5>
                                    </div>
                                    <div className="mb-2 flex w-full justify-between">
                                        <div className="text-white-dark">Sanctions list, PEP check done: </div>
                                        <div className="whitespace-nowrap">{details?.ofac_search?.ofac_search_done === false ? "NO" : "YES"}</div>
                                    </div>
                                    <div className="mb-2 flex w-full justify-between">
                                        <div className="text-white-dark">Appeared on sanctioned list: </div>
                                        <div className="whitespace-nowrap">{details?.ofac_search?.ofac_search_match_found === false ? "NO" : "YES"}</div>
                                    </div>
                                    
                                </div>
                                <div className="grow mt-5">
                                    <div className="div">
                                        <h5 className="text-dark text-lg font-semibold mb-3.5 dark:text-white-light">Device Information: </h5>
                                    </div>
                                    <div className="mb-2 flex w-full justify-between">
                                        <div className="text-white-dark">IP Address of Client&apos;s Device: </div>
                                        <div className="whitespace-nowrap">{details?.device_information?.ip}</div>
                                    </div>
                                    {/* <div className="mb-2 flex w-full justify-between">
                                        <div className="text-white-dark">Candidate Browser Information: </div>
                                        <div className="whitespace-nowrap">{details?.facial_comparison_details?.user_agent?.spoof?.confidence}</div>
                                    </div> */}
                                    <div className="mb-2 flex w-full justify-between">
                                        <div className="text-white-dark">Anti-Spoofing Confidence Score: </div>
                                        <div className="whitespace-nowrap">{details?.facial_comparison_details?.verification_details?.spoof?.antispoof_score}</div>
                                    </div>
                                </div>
                                
                            </div>

                            
                        </div>
                
                    </div>

                </div>
                
            </div>
        </div>
    );
};

export default ComponentsAppsInvoicePreview;
