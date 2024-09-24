import CustomButton from "../ui/button";

export default function StartView({startFunction}:{startFunction:VoidFunction}) {
    return (
      <div className="flex justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md max-h-52 mt-10">
          <h1 className="text-gray-500 text-3xl font-bold text-center mb-6">Welcome to the exam!</h1>
          <p className="text-gray-700 text-center mb-4">
            Click below to start!
          </p>
          <div className="flex justify-center">
            <CustomButton label="Start Test" styleType="black" onClick={startFunction}/>
          </div>
        </div>
      </div>
    );
  }