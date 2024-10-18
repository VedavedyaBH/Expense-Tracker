function Button({ label, onClick, type }: any) {
    return (
        <button
            onClick={onClick}
            type={type}
            className={`p-2 lg:p-4 text-gray-500 bg-white border border-gray-500 rounded-md h-10 lg:h-12 w-full hover:border-gray-50 
            hover:bg-gray-300  transition duration-300 ease-in-out text-xs lg:text-md max-w-xs`}
        >
            {label}
        </button>
    );
}

export default Button;
