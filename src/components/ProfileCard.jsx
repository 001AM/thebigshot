import React from "react";
// import { BaseURL } from '../hooks/socket'
import backgroundimage from "../assets/backgroundimage.jpeg";
function ProfileCard(user) {
  return (
    <div className="border-2 border-black rounded-md h-fit" style={{boxShadow: 'rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px',}}>
      <div className="flex flex-col items-center content-center ">
        <div className="background-image">
          <img src={backgroundimage} alt="background" />
        </div>
        <div className="relative rounded bottom-6">
          <img
            className="w-16 h-16 rounded-full"
            src={backgroundimage}
            alt="User Profile"
          />
        </div>
        <div className="flex flex-col items-center font-mono">
          <div className="text-lg">SOHAM PANCHAL</div>
          <div className="text-sm">Mumbai University</div>
          <div className="text-sm">Mumbai University</div>
        </div>
      </div>
    </div>
  );
}

export default ProfileCard;
