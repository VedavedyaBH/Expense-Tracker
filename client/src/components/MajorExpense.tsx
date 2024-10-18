function MajorExpense() {
    return (
        <div className="text-center text-xs p-4 rounded-lg flex flex-col max-w-64 lg:max-w-72 bg-red-700 bg-opacity-25 justify-center">
            <h2 className="lg:text-xl text-gray-400 mb-4">
                Major expense
                <span className="mx-2 text-xs">(this month)</span>
            </h2>
            <div className="flex justify-center">
                <p className="mx-2 lg:text-4xl text-lg text-yellow-600">Rent</p>
                <p className="mx-2 lg:text-4xl text-lg text-yellow-600">
                    7,005
                </p>
            </div>
        </div>
    );
}

export default MajorExpense;
