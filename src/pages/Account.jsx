import React from "react";
import SavedShow from "../components/SavedShow";

const Account = () => {
  return (
    <>
      <div className="w-full text-white">
        <img
          src="https://assets.nflxext.com/ffe/siteui/vlv3/f85718e8-fc6d-4954-bca0-f5eaf78e0842/4e852bc5-5395-4268-9813-a1a7073fa08a/VN-vi-20230918-popsignuptwoweeks-perspective_alpha_website_large.jpg"
          alt=""
          className="w-full h-[400px] object-cover"
        />
        <div className="bg-black/60 fixed top-0 left-0 w-full h-[550px]"></div>
        <div className="absolute top-[20%] p-4 md:p-8">
          <h1 className="text-3xl md:text-5xl font-bold">My Shows</h1>
        </div>
      </div>
      <SavedShow />
    </>
  );
};

export default Account;
