import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
import VerificationLoader from './verification-loader';
import { useRouter } from 'next/navigation';

interface VerificationModalProps {
    isOpen: boolean;
    closeModal: () => void;
    formData: FormData | null;
}

export default function VerificationModal3({ isOpen, closeModal, formData }: VerificationModalProps) {
    const [verificationData, setVerificationData] = useState<any>(null);
    const [showWaitingLoader, setshowWaitingLoader] = useState<boolean>(false);
    const router = useRouter();

    useEffect(() => {
        if (isOpen && formData) {
            const data = {
                country: formData.get("country"),
                document_type: formData.get("document_type"),
                id_number: formData.get("id_number"),
                imageSrc: formData.get("selfie"),
                image2: formData.get("ghana_card_front"),
                image3: formData.get("ghana_card_back"),
                id: formData.get("id"),
                countryname: formData.get("countryname"),
                documentname: formData.get("documentname")
                // attendant: "michael amoo",
            };
            setVerificationData(data);
        }
    }, [isOpen, formData]);

    const showVerificationConfirmAlert = async () => {
        Swal.fire({
            icon: 'warning',
            title: 'Confirm to proceed',
            text: "A link will be sent to the users email",
            showCancelButton: true,
            confirmButtonText: 'Confirm',
            confirmButtonColor: "#3085d6", // Customize as needed
            cancelButtonColor: "#d33", // Customize as needed
            padding: '2em',
            customClass: 'sweet-alerts',
        }).then(async (result) => {
            if (result.isConfirmed) {
                closeModal();
                setshowWaitingLoader(true);
                try {
                    // Create FormData for API call
                    const byteString = atob(verificationData?.imageSrc.split(',')[1]);
                    const ab = new ArrayBuffer(byteString.length);
                    const ia = new Uint8Array(ab);
                    for (let i = 0; i < byteString.length; i++) {
                        ia[i] = byteString.charCodeAt(i);
                    }
                    const blob = new Blob([ab], { type: 'image/jpeg' });
                    console.log(blob);

                    const data = new FormData();
                    data.append("country", verificationData?.country || '');
                    data.append("document_type", verificationData?.document_type || '');
                    data.append("id_number", verificationData?.id_number || '');
                    data.append("id", verificationData?.id || '');

                    if (verificationData?.imageSrc) {
                        data.append("selfie", blob); // Append image file
                    }
                    if (verificationData?.image2) {
                        data.append("ghana_card_front", verificationData?.image2); // Append image file
                    }
                    if (verificationData?.image3) {
                        data.append("ghana_card_back", verificationData?.image3); // Append image file
                    }


                    // Make API call
                    const url = `https://verifications.agregartech.com/api/v1/id-cards/complete-verification/candidate/`;
                    const response = await axios.post(url, data, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    });
                    console.log(response.data);
                    setshowWaitingLoader(false);


                    if (response.data.status === true) {
                        Swal.fire({
                            title: 'Link Sent',
                            text: response.data.message,
                            icon: 'success',
                            customClass: 'sweet-alerts',
                        }).then((result) => {
                            if (result.isConfirmed) {
                                router.push("https://www.empverify.com/");
                            }
                        });
                    } else {
                        Swal.fire({
                            title: 'Error!',
                            text: response.data.message,
                            icon: 'error',
                            customClass: 'sweet-alerts'
                        });
                    }

                } catch (error) {
                    Swal.fire({
                        title: 'Error!',
                        text: 'An error occurred. Please try again.',
                        icon: 'error',
                        customClass: 'sweet-alerts'
                    });
                } finally {
                    closeModal();
                    setshowWaitingLoader(false);
                }
            }
        });
    }

    return (
        <> <VerificationLoader open={showWaitingLoader} />
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" open={isOpen} onClose={closeModal}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0" />
                    </Transition.Child>
                    <div id="standard_modal" className="fixed inset-0 bg-[black]/60 z-[999] overflow-y-auto">
                        <div className="flex items-start justify-center min-h-screen px-4">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="panel border-0 p-0 rounded-lg overflow-hidden w-full max-w-xl my-8 text-black dark:text-white-dark">
                                    {/* <div className="flex py-2 bg-[#fbfbfb] dark:bg-[#121c2c] items-center justify-center">
                                    <span className="flex items-center justify-center w-16 h-16 rounded-full bg-[#f1f2f3] dark:bg-white/10">
                                        <svg>...</svg>
                                    </span>
                                </div> */}
                                    <div className="p-5">
                                        <div className="py-5 text-white-dark text-center">
                                            <p className='font-bold text-xl'>
                                                Confirm Verification Details.
                                            </p>
                                            <div className="mt-5 px-2">
                                                <div className="border-b border-[#ebedf2] dark:border-[#1b2e4b] justify-between flex py-2">
                                                    <h6 className="text-[18px] font-bold text-[#515365] dark:text-white-dark">Country</h6>
                                                    <h6 className="text-md text-slate-500 dark:text-white-dark">{verificationData?.countryname}</h6>
                                                </div>
                                                <div className="border-b border-[#ebedf2] dark:border-[#1b2e4b] justify-between flex py-2">
                                                    <h6 className="text-[18px] font-bold text-[#515365] dark:text-white-dark">National ID type</h6>
                                                    <h6 className="text-md text-slate-500 dark:text-white-dark">{verificationData?.documentname}</h6>
                                                </div>
                                                <div className="border-b border-[#ebedf2] dark:border-[#1b2e4b] justify-between flex py-2">
                                                    <h6 className="text-[18px] font-bold text-[#515365] dark:text-white-dark">National ID number</h6>
                                                    <h6 className="text-md text-slate-500 dark:text-white-dark">{verificationData?.id_number}</h6>
                                                </div>
                                                <div className=' grid grid-cols-2 gap-6 mt-5'>
                                                    <div className="flex justify-center py-4">
                                                        {verificationData?.image3 ? (
                                                            <img
                                                                src={URL.createObjectURL(verificationData?.image3 as File)}
                                                                alt="Uploaded"
                                                                className="h-48 w-48 object-contain"
                                                            />
                                                        ) : (
                                                            <span className="text-md text-slate-500 dark:text-white-dark">No image uploaded</span>
                                                        )}
                                                    </div>

                                                    <div>
                                                        {verificationData?.image2 ? (
                                                            <img
                                                                src={URL.createObjectURL(verificationData?.image2 as File)}
                                                                alt="Uploaded"
                                                                className="h-48 w-48 object-contain rounded-lg"
                                                            />
                                                        ) : (
                                                            <span className="text-md text-slate-500 dark:text-white-dark">No image uploaded</span>
                                                        )}
                                                    </div>
                                                </div>

                                            </div>
                                            <button onClick={showVerificationConfirmAlert} type="button" className="btn btn-primary hover:bg-primary/80 text-white font-semibold w-full mt-5">
                                                Proceed
                                            </button>
                                        </div>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    );
}
