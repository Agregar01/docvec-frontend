'use client';
import IconDownload from '@/components/icon/icon-download';
import IconEdit from '@/components/icon/icon-edit';
import IconPlus from '@/components/icon/icon-plus';
import IconPrinter from '@/components/icon/icon-printer';
import IconSend from '@/components/icon/icon-send';
import axios from 'axios';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';

interface VerificationDetails {
    phone?: string;
    reference?: string;
    created_at?: string;
    verification_status?: string;
    link_sent?: string;
    verification_completed_time?: string;
    verification_completed?: string;
    longitude?: string;
    latitude?: string;
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
                const url = `${process.env.NEXT_PUBLIC_BASE_VIDEOKYC_BACKEND_URL}/video-kyc/verifications/${reference}/`;
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

    const formatDate = (date: string | number | Date | undefined) => {
        if (date) {
            const dt = new Date(date);
            const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
            const month = months[dt.getMonth()];
            const day = dt.getDate() < 10 ? '0' + dt.getDate() : dt.getDate();
            return day + '-' + month + '-' + dt.getFullYear();
        }
        return '';
    };

    if (loading) return <div>Loading...</div>;
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
                <div className="flex flex-wrap justify-between gap-4 px-4">
                    <div className="text-2xl font-bold uppercase text-orange-600">Verification Report</div>
                    <div className="shrink-0">
                        <Image src="/agregar-logo.png" alt="img" width={150} height={200} />
                    </div>
                </div>
                <div className="px-4 ltr:text-right rtl:text-left">
                    <div className="mt-6 space-y-1 text-white-dark">
                        <div>Trinity Baptist Church Building</div>
                        <div>Opposite UPSA, East Legon</div>
                        <div>info@agregartech.com</div>
                        <div>+233 (0) 20 984 4376</div>
                    </div>
                </div>

                <hr className="my-6 border-orange-600 dark:border-[#1b2e4b]" />

                <div className="flex justify-between">
                    <div className="space-y-1 text-white-dark grid-cols-1/2">
                        <div>Verified For:</div>
                        <div className="font-semibold text-black dark:text-white">Fidelity Bank, Ghana</div>
                        <div>Tetteh Quarshie Head Office, Accra - Ghana</div>
                        <div>info@fidelitybankghana.com</div>
                        <div>(+233) 030 320 999</div>
                    </div>
                    <div className="flex flex-col sm:flex-row justify-end">
                        <div className="">
                            <div className="mb-2 flex w-full items-center justify-between">
                                <div className="text-white-dark">Client Name:</div>
                                <div className="whitespace-nowrap">Michael Amoo</div>
                            </div>
                            <div className="mb-2 flex w-full items-center justify-between">
                                <div className="text-white-dark">Client Phone:</div>
                                <div>{details?.phone}</div>
                            </div>
                            <div className="mb-2 flex w-full items-center justify-between">
                                <div className="text-white-dark">Verification ID:</div>
                                <div>{details?.reference}</div>
                            </div>
                            <div className="mb-2 flex w-full items-center justify-between">
                                <div className="text-white-dark">Verification Date</div>
                                <div>{formatDate(details?.created_at)}</div>
                            </div>
                            <div className="mb-2 flex w-full items-center justify-between">
                                <div className="text-white-dark">Staff Name</div>
                                <div>Michael Amoo</div>
                            </div>
                        </div>
                    </div>
                </div>

                <hr className="my-6 border-orange-600 dark:border-[#1b2e4b]" />

                <div className="flex justify-between">
                    <div>
                        <h5 className="text-dark text-lg font-semibold mb-3.5 dark:text-white-light">Verification Details</h5>
                        <div className="mb-2 flex w-full justify-between">
                            <div className="text-white-dark">Verification Status</div>
                            <div className="whitespace-nowrap">{details?.verification_status}</div>
                        </div>
                        <div className="mb-2 flex w-full justify-between">
                            <div className="text-white-dark">Verification Link Sent</div>
                            <div className="whitespace-nowrap">{details?.link_sent}</div>
                        </div>
                        <div className="mb-2 flex w-full justify-between">
                            <div className="text-white-dark">Time of completion</div>
                            <div className="whitespace-nowrap">{details?.verification_completed_time}</div>
                        </div>
                        <div className="mb-2 flex w-full justify-between">
                            <div className="text-white-dark">Verification Completed</div>
                            <div className="whitespace-nowrap">{details?.verification_completed}</div>
                        </div>
                        <div className="mb-2 flex w-full justify-between">
                            <div className="text-white-dark">Location Coordinates</div>
                            <div className="whitespace-nowrap">{details?.longitude}, {details?.latitude}</div>
                        </div>
                        <div className="mb-2 flex w-full justify-between">
                            <div className="text-white-dark">Liveliness</div>
                            <div className="whitespace-nowrap">{details?.longitude}, {details?.latitude}</div>
                        </div>
                    </div>
                </div>
                <hr className="my-6 border-orange-600 dark:border-[#1b2e4b]" />
            </div>
        </div>
    );
};

export default ComponentsAppsInvoicePreview;
