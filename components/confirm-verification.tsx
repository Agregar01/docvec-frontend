import { Dialog, Transition } from '@headlessui/react';
import { useState, Fragment } from 'react';


export default function ConfirmVerificationModal() {
    const [modal17, setModal17] = useState(false);

    return (

        <div className="mb-5">
            <Transition appear show={modal17} as={Fragment}>
                <Dialog as="div" open={modal17} onClose={() => setModal17(false)}>
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
                                <Dialog.Panel className="panel border-0 p-0 rounded-lg overflow-hidden w-full max-w-lg my-8 text-black dark:text-white-dark">
                                    <div className="flex py-2 bg-[#fbfbfb] dark:bg-[#121c2c] items-center justify-center">
                                        <span className="flex items-center justify-center w-16 h-16 rounded-full bg-[#f1f2f3] dark:bg-white/10">
                                            <svg>...</svg>
                                        </span>
                                    </div>
                                    <div className="p-5">
                                        <div className="py-5 text-white-dark text-center">
                                            <p>
                                                Vivamus vitae hendrerit neque. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Morbi
                                                consequat auctor turpis, vitae dictum augue efficitur vitae. Vestibulum a risus ipsum. Quisque nec lacus dolor. Quisque ornare
                                                tempor orci id rutrum.
                                            </p>
                                        </div>
                                        <div className="flex justify-end items-center mt-8">
                                            <button type="button" onClick={() => setModal17(false)} className="btn btn-outline-danger">
                                                Discard
                                            </button>
                                            <button type="button" onClick={() => setModal17(false)} className="btn btn-primary ltr:ml-4 rtl:mr-4">
                                                Save
                                            </button>
                                        </div>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        {/* </div> */}
        </div>
    )

}