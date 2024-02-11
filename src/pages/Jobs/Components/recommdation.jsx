import React from "react";

function ProfileAvatar({AvatarInfo}) {
  
  return (
    <div>
      <div class="py-3 sm:py-4">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <img
              class="w-8 h-8 rounded-full"
              src="/docs/images/people/profile-picture-1.jpg"
              alt="Neil image"
            />
          </div>
          <div class="flex-1 min-w-0 ms-4">
            <p class="text-xl font-medium text-gray-900 truncate dark:text-dark">
              {AvatarInfo.name}
            </p>
            <p class="text-sm font-medium text-gray-900 truncate dark:text-dark">
              {AvatarInfo.specailization}
            </p>
            <p class="text-sm text-gray-500 truncate dark:text-gray-400">
            {AvatarInfo.email}
            </p>
          </div>
          <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white ">
            <button className="px-2 py-1 text-white bg-blue-500 rounded ">
              Connect
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileAvatar;
