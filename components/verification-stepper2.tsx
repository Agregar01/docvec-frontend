// import React from 'react';
// import { Metadata } from 'next';
// import VerificationCountdown from '@/components/components/countdown/components-countdown-circle';
// import { RequestData } from './utils';
// import VerificationDetails from './verification-details';

// interface VerificationStepTwoProps {
//     requestData: {
//         email: string;
//         phone: string;
//         fullname: string;
//         images: any[]; // Replace `any[]` with the appropriate type for images if known
//     } | null;
// }


// interface VerificationRequestProps {
//     pushRequest: VerificationStepTwoProps;
// }
// const VerificationStepTwo = React.FC<VerificationRequestProps> = ( requestData ) => {
//     return (
//         <div>

//             <div className="mb-5 flex justify-center items-center gap-2">
//                 <VerificationDetails pushRequest = { requestData }/>
//             </div>
//             <div className="mb-5 flex justify-center items-center gap-2">
//                 <VerificationCountdown />
//             </div>
//         </div>
//     );
// };

// export default VerificationStepTwo;
