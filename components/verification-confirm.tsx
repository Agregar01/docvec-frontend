
export default function VerificationConfirm () {

  return (
    <div>
        <p>aaaaaa</p>
        <div className="div grid grid-cols-3">
            <div className="mx-[100px] col-span-2">
                <div className="mb-5">
                    <h5 className="mb-4 text-lg font-semibold">Billing Address</h5>
                    <p>
                        Changes to your <span className="text-primary">Billing</span> information will take effect starting with scheduled payment and will be refelected on your next
                        invoice.
                    </p>
                </div>
                <div className="mb-5">
                    <div className="border-b border-[#ebedf2] dark:border-[#1b2e4b]">
                        <div className="flex items-start justify-between py-3">
                            <h6 className="text-[18px] font-bold text-[#515365] dark:text-white-dark">
                                Email
                                <span className="mt-1 block text-md font-normal text-white-dark dark:text-white-light">email</span>
                            </h6>
                            <div className="flex items-start justify-between ltr:ml-auto rtl:mr-auto">
                                <button className="btn bg-blue-100 text-blue-600">Edit</button>
                            </div>
                        </div>
                    </div>
                    <div className="border-b border-[#ebedf2] dark:border-[#1b2e4b]">
                        <div className="flex items-start justify-between py-3">
                            <h6 className="text-[18px] font-bold text-[#515365] dark:text-white-dark">
                                Phone
                                <span className="mt-1 block text-md font-normal text-white-dark dark:text-white-light">phone</span>
                            </h6>
                            <div className="flex items-start justify-between ltr:ml-auto rtl:mr-auto">
                                <button className="btn bg-blue-100 text-blue-600">Edit</button>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="flex items-start justify-between py-3">
                            <h6 className="text-[18px] font-bold text-[#515365] dark:text-white-dark">
                                Full Name
                                <span className="mt-1 block text-md font-normal text-white-dark dark:text-white-light">full name</span>
                            </h6>
                            <div className="flex items-start justify-between ltr:ml-auto rtl:mr-auto">
                                <button className="btn bg-blue-100 text-blue-600">Edit</button>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-start justify-between py-3">
                        <h6 className="text-[15px] font-bold text-[#515365] dark:text-white-dark">User</h6>
                    </div>
                    
                </div>
            </div>
            <div className="div col-span-1">
                ------
            </div>
        </div>
    </div>
  )
}
