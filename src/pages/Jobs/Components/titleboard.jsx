import React from "react"
import  '../../../styles/jobs.css'
import saveicon from "../../../assets/save.svg"
import amazonlogo from "../../../assets/amazon-logo.svg"
import money from "../../../assets/money.svg"
import calender from "../../../assets/calender.svg"
import link from "../../../assets/link.svg"
import phone from "../../../assets/phone.svg"
import workbag from "../../../assets/workbag.svg"
import location from "../../../assets/location.svg"
function Titleboard({ jobInfo }) {
  return (
    <div className="grid grid-cols-3 gap-1 p-2 border-2 rounded-md sm:p-4 border-blue-primary">
      <div className="col-span-2">
        <div className="text-4xl font-bold">{jobInfo.position}</div>
        <div className="text-2xl font-medium w-max" style={{ color: '#0001FC' }}>
          <a href="" ><span className="flex flex-row flex-1 gap-2">{jobInfo.link}<img src={link} alt="linksym"/></span></a>
        </div>
      </div>
      <div className="col-span-1 pl-1 ml-auto h-15">
        <img className="h-full" src={amazonlogo} alt="company-logo" />
      </div>

      <div className="col-span-3">
        <div className="flex gap-2 text-lg font-light"><img src={workbag} alt=''/>{jobInfo.experience}</div>
      </div>
      <div className="col-span-3">
        <div className="flex gap-2 text-lg font-light"><img src={money} alt=''/>{jobInfo.annualIncome}</div>
      </div>
      <div className="col-span-3">
        <div className="flex gap-2 text-lg font-light"><img src={location} alt=''/>{jobInfo.location}</div>
      </div>

      <div className="col-span-3 sm:col-span-1">
        <div className="flex gap-2 text-lg font-light"><img src={calender} alt=''/>{jobInfo.posted}</div>
      </div>
      <div className="col-span-3 sm:col-span-1">
        <div className="flex gap-2 text-lg font-light"><img src={phone} alt=''/>{jobInfo.phoneno}</div>
      </div>

      <div className="col-span-3 sm:col-span-1">
        <div className="flex flex-row gap-8 ml-auto sm:justify-end">
          <button className="boxlight-shadow flex items-center justify-center flex-1 p-1.5 rounded-md md:p-2 bg-slate-200 sm:max-w-24">
            <img src={saveicon} alt="save" className="h-4 mr-2" />
            <span className="text-sm text-black">Save</span>
          </button>
          <button className="boxlight-shadow flex items-center justify-center flex-1 p-1.5 rounded-md md:p-2 sm:max-w-32 bg-blue-primary">
            <span className="text-sm text-white">Apply Now</span>
          </button>
        </div>
      </div>
      
    </div>
  )
}

export default Titleboard
