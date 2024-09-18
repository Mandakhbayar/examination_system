import React from "react";
import Spinner from "./ui/spinner";

export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
      <div className="flex flex-col gap-2 items-center justify-center ">
        <Spinner/>
        <h2 className="text-white text-2xl font-semibold">Loading...</h2>
      </div>
    </div>
  );
}
