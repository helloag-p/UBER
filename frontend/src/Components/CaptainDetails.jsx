import React, { useContext } from "react";
import { CaptainDataContext } from "../context/CaptainContext.jsx";

const CaptainDetails = () => {
  const { captain } = useContext(CaptainDataContext);

  if (!captain) {
    return <div>Loading...</div>;
  }


  return (
    <div>
      <div className="flex justify-between">
        <div className="flex">
          <img
            className="w-10 h-10"
            src="https://cdn-icons-png.flaticon.com/512/8583/8583437.png"
            alt=""
          />
          <div className="ml-2">
            <h4 className="font-semibold text-lg capitalize">
              {captain.fullname.firstname} {captain.fullname.lastname}
            </h4>
            <p className="text-sm text-gray-600">
              <i className="p-1 ri-star-fill"></i>4.9
            </p>
          </div>
        </div>

        <div className="text-end">
          <h4 className="font-semibold text-lg">₹800.00</h4>
          <p className="text-sm text-gray-600 font-base">Earned</p>
        </div>
      </div>

      <div className="bg-gray-100 rounded-xl flex justify-center gap-5 p-3 mt-7">
        <div className="text-center">
          <i className="text-3xl ri-time-line"></i>
          <h3 className="text-lg font-medium">10.2</h3>
          <p className="text-sm text-gray-600">HOURS ONLINE</p>
        </div>

        <div className="text-center">
          <i className="text-3xl ri-speed-up-fill"></i>
          <h3 className="text-lg font-medium">30</h3>
          <p className="text-sm text-gray-600">TOTAL DISTANCE</p>
        </div>

        <div className="text-center">
          <i className="text-3xl ri-article-line"></i>
          <h3 className="text-lg font-medium">20</h3>
          <p className="text-sm text-gray-600">TOTAL JOBS</p>
        </div>
      </div>
    </div>
  );
};

export default CaptainDetails;
