function SavingsInfo() {
    return (
        <div className="flex justify-between lg:block">
            <div className="text-xs rounded-lg max-w-48 lg:max-w-72 text-center">
                <h2 className="lg:text-xl text-gray-400 mb-4">
                    Expected savings
                    <span className="mx-2 text-xs">(per day)</span>
                </h2>
                <p className="lg:text-4xl text-lg text-yellow-600">7,005</p>
            </div>
            <div className="lg:mt-8 text-xs rounded-lg max-w-48 lg:max-w-72 text-center">
                <h2 className="lg:text-xl text-gray-400 mb-4">
                    Total savings
                    <span className="mx-2 text-xs">(year to date)</span>
                </h2>{" "}
                <p className="lg:text-4xl text-lg text-yellow-600">70,005</p>
            </div>
        </div>
    );
}

export default SavingsInfo;
