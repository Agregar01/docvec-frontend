import React from 'react';
import "../components/verification-loader.css";


interface props {
    open?: boolean;
}

const VerificationLoader: React.FC<props> = ({ open }) => {

    if (!open) return null;
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div>
                <div className="bg-white rounded-lg shadow-lg relative w-full p-5">
                    <div className=' grid place-items-center mb-8'>
                        <span className="loader"></span>
                    </div>
                    <h1 className=' text-center text-lg text-[#4361EE]'>Submitting, just a moment....</h1>
                </div>

            </div>
        </div>
    )
}

export default VerificationLoader