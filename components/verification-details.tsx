// import Image from "next/image"

import { useSSR } from "react-i18next";
import VerificationConfirm from "./verification-confirm";
import { useState } from "react";
import VerificationNextStep from "./verification-next";
import ConfirmVerificationModal from "./confirm-verification";

// interface PushRequestProps {
//     email: string;
//     phone: string;
//     fullname: string;
//     images: File; // Replace `any[]` with the appropriate type for images if known
// }

// interface VerificationDetailsProps {
//     pushRequest: PushRequestProps;
// }

// const VerificationDetails: React.FC<VerificationDetailsProps> = ({ pushRequest }) => {
//     const imageUrl = pushRequest.images ? URL.createObjectURL(pushRequest.images) : null;    

//     return (
        // <div>
        //     <div className="mb-5">
        //         <h5 className="mb-4 text-lg font-semibold">Billing Address</h5>
        //         <p>
        //             Changes to your <span className="text-primary">Billing</span> information will take effect starting with scheduled payment and will be refelected on your next
        //             invoice.
        //         </p>
        //     </div>
        //     <div className="mb-5">
        //         <div className="border-b border-[#ebedf2] dark:border-[#1b2e4b]">
        //             <div className="flex items-start justify-between py-3">
        //                 <h6 className="text-[15px] font-bold text-[#515365] dark:text-white-dark">
        //                     Email
        //                     <span className="mt-1 block text-xs font-normal text-white-dark dark:text-white-light">{pushRequest.email}</span>
        //                 </h6>
        //                 <div className="flex items-start justify-between ltr:ml-auto rtl:mr-auto">
        //                     <button className="btn bg-blue-100 text-blue-600">Edit</button>
        //                 </div>
        //             </div>
        //         </div>
        //         <div className="border-b border-[#ebedf2] dark:border-[#1b2e4b]">
        //             <div className="flex items-start justify-between py-3">
        //                 <h6 className="text-[15px] font-bold text-[#515365] dark:text-white-dark">
        //                     Phone
        //                     <span className="mt-1 block text-xs font-normal text-white-dark dark:text-white-light">{pushRequest.phone}</span>
        //                 </h6>
        //                 <div className="flex items-start justify-between ltr:ml-auto rtl:mr-auto">
        //                     <button className="btn bg-blue-100 text-blue-600">Edit</button>
        //                 </div>
        //             </div>
        //         </div>
        //         <div>
        //             <div className="flex items-start justify-between py-3">
        //                 <h6 className="text-[15px] font-bold text-[#515365] dark:text-white-dark">
        //                     Full Name
        //                     <span className="mt-1 block text-xs font-normal text-white-dark dark:text-white-light">{pushRequest.phone}</span>
        //                 </h6>
        //                 <div className="flex items-start justify-between ltr:ml-auto rtl:mr-auto">
        //                     <button className="btn bg-blue-100 text-blue-600">Edit</button>
        //                 </div>
        //             </div>
        //         </div>
        //         <div>
        //             <div className="flex items-start justify-between py-3">
        //                 <h6 className="text-[15px] font-bold text-[#515365] dark:text-white-dark">
        //                     User
        //                     {imageUrl && (
        //                         <Image
        //                         alt = "uploaded image for verification"
        //                         src={imageUrl}
        //                         width = {300}
        //                         height = {300}
        //                         className="mt-1 block text-xs font-normal text-white-dark dark:text-white-light"
        //                     />
        //                     )}
        //                 </h6>
        //                 <div className="flex items-start justify-between ltr:ml-auto rtl:mr-auto">
        //                     <button className="btn bg-blue-100 text-blue-600">Edit</button>
        //                 </div>
        //             </div>
        //         </div>
        //         <Image 
        //         src = ""
        //         width = {0}
        //         height = {0}
        //         alt = ""
                
        //         />
        //     </div>
        // </div>
//     )
// }

// export default VerificationDetails






// import { useState } from "react";
// import ConfirmVerificationModal from "./ConfirmVerificationModal";
// import VerificationConfirm from "./VerificationConfirm";

// const VerificationDetails = () => {
//     const [proceed, setProceed] = useState(false);

//     function handleProceed() {
//         setProceed(true);
//     }

//     return (
//         <>
//             <div className="mb-5">
//                 <div className="inline-block w-full">
//                     {proceed ? <ConfirmVerificationModal /> : <VerificationConfirm />}
//                 </div>
//             </div>

//             <div className="flex justify-between">
//                 <button 
//                     type="button" 
//                     className="btn btn-primary ltr:ml-auto rtl:mr-auto" 
//                     onClick={handleProceed}
//                 >
//                     Proceed
//                 </button>                        
//             </div>
//         </>
//     );
// };

// export default VerificationDetails;
