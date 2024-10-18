import React from "react";

const Articles: React.FC = () => {
    return (
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">
                Articles handpicked for you!
            </h2>
            <div className="flex justify-around">
                <div className="bg-gray-700 p-4 rounded-lg cursor-pointer">
                    Saving ideas for singles
                </div>
                <div className="bg-gray-700 p-4 rounded-lg cursor-pointer">
                    Saving ideas for family
                </div>
            </div>
        </div>
    );
};

export default Articles;
