import React from "react";

const Suggestions: React.FC = () => {
    return (
        <div className="flex flex-col">
            <h2 className="text-sm lg:text-lg text-gray-400">
                Here's where you can cut down
            </h2>
            <div className="justify-center">
                <SuggestionItem title="Food" current={214} suggested={170} />
                <SuggestionItem title="Party" current={422} suggested={150} />
                <SuggestionItem title="Shop" current={100} suggested={50} />
                <SuggestionItem title="Shop" current={100} suggested={50} />
            </div>
        </div>
    );
};

interface SuggestionItemProps {
    title: string;
    current: number;
    suggested: number;
}

const SuggestionItem: React.FC<SuggestionItemProps> = ({
    title,
    current,
    suggested,
}) => {
    return (
        <div className="bg-yellow-700 flex items-center bg-opacity-25 my-4 p-4 rounded-lg shadow-lg  text-xs">
            <div className="lg:text-lg text-gray-400">{title}</div>
            <span className="text-lg mx-4"> | </span>
            <div className="text-yellow-600 flex items-center">
                <p>
                    <span className="text-lg ml-2">{current}</span>/day
                </p>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 25 25"
                    className="mx-2 w-5 h-5 fill-current"
                >
                    <path
                        d="m17.5 5.999-.707.707 5.293 5.293H1v1h21.086l-5.294 5.295.707.707L24 12.499l-6.5-6.5z"
                        data-name="Right"
                    />
                </svg>
                <p>
                    <span className="text-lg">{suggested}</span> /day
                </p>
            </div>
        </div>
    );
};

export default Suggestions;
