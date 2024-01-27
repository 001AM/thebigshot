import React from "react";
import ProfileCard from "../../components/ProfileCard";
import list from '../../assets/list.svg'
import square from '../../assets/square.svg'
function Dashboard() {
  return (
    <>
      <div className="grid justify-center col-span-3 grid-row-auto">
        <ProfileCard />
      </div>
      <div class="col-span-6">
        <div className='grid h-10 grid-cols-12 grid-rows-1 border-2 border-black rounded-lg'>
          <div class="col-span-6 border border-r-black flex items-center justify-center">
            <span>
              New Post
            </span>
          </div>
          <div class="col-span-6 border border-l-black flex items-center justify-center">
            <span>
              New Post
            </span>
          </div>
        </div>
        <div className="">
          <div className="flex flex-row items-center gap-2 text-lg">
            <div>Jobs Feeds</div>
            <div className="ml-auto">Filter</div>
            <div className="grid grid-cols-2 grid-rows-2 h-min">
              <img src={square} alt='box1'/><img src={square} alt='box2'/><img src={square} alt='box3'/><img src={square} alt='box4'/>
            </div>
            <div className=""><img src={list} alt='column'/></div>
          </div>
          
        </div>
      </div>


      <div className="col-span-3">
        <ProfileCard />
      </div>
    </>
  )
}

export default Dashboard;
