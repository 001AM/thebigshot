import React, { useState } from "react";
import Titleboard from "./Components/titleboard";

function JobExpand() {
  // Initial state for job information
  const [jobInfo, setJobInfo] = useState({
    position: "Frontend Developer",
    link: "Amazon.inc",
    experience: "2-7 Yrs",
    annualIncome: "Not Disclosed",
    location: "Mumbai",
    posted: "29/10/9/2023",
    phoneno: "+91 90121212123",
    jobDescription: "", // Add a placeholder for job description
    aboutCompany: "", // Add a placeholder for about the company
    address: "", // Add a placeholder for the address
  });

  return (
    <div className="grid grid-cols-1 gap-6 px-2 sm:grid-cols-6 md:grid-cols-12">
      {/* Your JSX content goes here */}
      <div className="col-span-1 sm:col-span-6 md:col-span-12">
        {/* Display job information */}
        <Titleboard jobInfo={jobInfo}/>
      </div>
      <div className="flex flex-col flex-1 col-span-1 gap-2 sm:col-span-6 md:col-span-9">
        <div className="">
          {/* Display job information */}
          <div className="p-2 border-2 rounded-md sm:p-4 border-blue-primary min-h-52 max-h-max">
            <div className="text-3xl font-bold">Job Description</div>
            sohamamsm
          </div>
        </div>
        <div className="">
          {/* Display job information */}
          <div className="p-2 border-2 rounded-md sm:p-4 border-blue-primary min-h-52 max-h-max">
            <div className="text-3xl font-bold">About Company</div>
            sohamamsm
          </div>
        </div>
      </div>
      <div className="hidden col-span-3 border-2 rounded-md md:block sm:p-4 border-blue-primary">
        Connection 
      </div>
    </div>
  );
}

export default JobExpand;
