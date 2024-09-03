import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios'; // Import axios if you're using it

interface VerificationModalProps {
    isOpen: boolean;
    closeModal: () => void;
    formData: FormData | null;
}

export default function VerificationModal({ isOpen, closeModal, formData }: VerificationModalProps) {
    const [verificationData, setVerificationData] = useState<any>(null);

    useEffect(() => {
        if (isOpen && formData) {
            const data = {
                email: formData.get("email"),
                phone: formData.get("phone"),
                fullname: formData.get("fullname"),
                submitted_image: formData.get("submitted_image"),
                attendant: "michael amoo",
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
                try {
                    // Create FormData for API call
                    const data = new FormData();
                    data.append("email", verificationData?.email || '');
                    data.append("phone", verificationData?.phone || '');
                    data.append("fullname", verificationData?.fullname || '');
                    data.append("attendant", verificationData?.attendant || '');
                    
                    if (verificationData?.submitted_image) {
                        data.append("submitted_image", verificationData?.submitted_image); // Append image file
                    }

                    // Make API call
                    const url = `${process.env.NEXT_PUBLIC_BASE_VIDEOKYC_BACKEND_URL}/video-kyc/verify/client/`;
                    const response = await axios.post(url, data, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    });
                    console.log(response.data);
                    

                    if (response.data.status === true) {
                        Swal.fire({
                            title: 'Link Sent',
                            text: response.data.message,
                            icon: 'success',
                            customClass: 'sweet-alerts'
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
                }
            }
        });
    }

    return (
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
                                <div className="flex py-2 bg-[#fbfbfb] dark:bg-[#121c2c] items-center justify-center">
                                    <span className="flex items-center justify-center w-16 h-16 rounded-full bg-[#f1f2f3] dark:bg-white/10">
                                        <svg>...</svg>
                                    </span>
                                </div>
                                <div className="p-5">
                                    <div className="py-5 text-white-dark text-center">
                                        <p className='font-bold text-xl'>
                                            Confirm Verification Details.
                                        </p>
                                        <div className="mt-5 px-2">
                                            <div className="border-b border-[#ebedf2] dark:border-[#1b2e4b] justify-between flex py-2">
                                                <h6 className="text-[18px] font-bold text-[#515365] dark:text-white-dark">Email</h6>
                                                <h6 className="text-md text-slate-500 dark:text-white-dark">{verificationData?.email}</h6>
                                            </div>
                                            <div className="border-b border-[#ebedf2] dark:border-[#1b2e4b] justify-between flex py-2">
                                                <h6 className="text-[18px] font-bold text-[#515365] dark:text-white-dark">Phone</h6>
                                                <h6 className="text-md text-slate-500 dark:text-white-dark">{verificationData?.phone}</h6>
                                            </div>
                                            <div className="border-b border-[#ebedf2] dark:border-[#1b2e4b] justify-between flex py-2">
                                                <h6 className="text-[18px] font-bold text-[#515365] dark:text-white-dark">Full Name</h6>
                                                <h6 className="text-md text-slate-500 dark:text-white-dark">{verificationData?.fullname}</h6>
                                            </div>
                                            <div className="flex justify-center py-4">
                                                {verificationData?.submitted_image ? (
                                                    <img
                                                        src={URL.createObjectURL(verificationData?.submitted_image as File)}
                                                        alt="Uploaded"
                                                        className="h-48 w-48 object-contain rounded-lg"
                                                    />
                                                ) : (
                                                    <span className="text-md text-slate-500 dark:text-white-dark">No image uploaded</span>
                                                )}
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
    );
}
