import React from 'react';

interface Props {
    open?: boolean;
    handleClick?: () => void,

}

const page: React.FC<Props> = ({ open = true, handleClick }) => {
    return (
        <div className=' bg-white rounded-[5px] shadow-sm border border-[#dddddd] flex items-center justify-between   py-3 px-4'>
            <div className=' flex items-center space-x-3'>
                {/* <input type="checkbox" className="w-2 h-2 scale-150" /> */}
                <h1 className=' text-lg'>SUBMIT DETAILS</h1>
            </div>
            <div>
                <div className=' bg-gray-200 px-1 py-1 cursor-pointer rounded-[2px]'>
                    {open ?
                        <div onClick={handleClick}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-5">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                            </svg>
                        </div>
                        :
                        <div onClick={handleClick}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-5">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14" />
                            </svg>
                        </div>

                        // <svg onClick={handleClick} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-5">
                        //     <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                        // </svg>
                    }

                </div>
            </div>
        </div>
    )
}

export default page