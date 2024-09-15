import React from 'react'

const page = () => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div>
                <div className="bg-white rounded-lg shadow-lg relative w-full lg:w-[7%]">
                    <span className="w-12 h-12 rounded-full inline-block border-t-3 border-r-3 border-white border-r-transparent box-border animate-spin"></span>
                </div>
                <h1 className=' text-center text-lg text-[#4361EE]'>Loading peasle wait....</h1>
            </div>
        </div>
    )
}

export default page