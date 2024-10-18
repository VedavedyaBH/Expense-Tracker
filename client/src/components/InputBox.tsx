function InputBox({ placeholder, onChange, type, id, name }: any) {
    return (
        <div>
            <input
                name={name}
                type={type}
                onChange={onChange}
                id={id}
                className="p-4 border-stone-700 border rounded-md h-10 lg:h-12 w-full max-w-xs focus:outline-none focus:ring-2 focus:ring-gray-400 transition duration-300 ease-in-out"
                placeholder={placeholder}
            />
        </div>
    );
}

export default InputBox;
