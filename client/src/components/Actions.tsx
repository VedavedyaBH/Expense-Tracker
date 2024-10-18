import React from "react";

const Actions: React.FC = () => {
    return (
        <div className="flex justify-around mb-8">
            <ActionItem title="Add an expense" />
            <ActionItem title="Add an income" />
            <ActionItem title="Your net worth" />
        </div>
    );
};

interface ActionItemProps {
    title: string;
}

const ActionItem: React.FC<ActionItemProps> = ({ title }) => {
    return (
        <div className="bg-gray-800 p-4 rounded-lg shadow-lg text-center cursor-pointer">
            <p className="text-xl">{title}</p>
        </div>
    );
};

export default Actions;
