import React from "react";

const Overview: React.FC = () => {
    return (
        <div className="p-4 rounded-xl lg:p-8 border border-gray-700 grid grid-cols-3">
            <div className="col-span-1">
                <div className=" text-xs p-4 rounded-lg text-center">
                    <h2 className="lg:text-xl text-gray-400 mb-8">
                        Today's Expense
                    </h2>
                    <p className="lg:text-4xl text-lg text-yellow-600">475</p>
                </div>
            </div>
            <div className="col-span-1">
                <div className="text-xs p-4 rounded-lg text-center">
                    <h2 className="lg:text-xl text-gray-400 mb-8">
                        Monthly Expense
                    </h2>
                    <p className="lg:text-4xl text-lg text-yellow-600">7,005</p>
                </div>
            </div>
            <div className="col-span-1">
                <div className=" text-xs p-4 rounded-lg text-center">
                    <h2 className="lg:text-xl text-gray-400 mb-8">
                        Quarterly Expense
                    </h2>
                    <p className="lg:text-4xl text-lg text-yellow-600">
                        48,500
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Overview;
