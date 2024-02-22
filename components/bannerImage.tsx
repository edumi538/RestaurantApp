import React from "react";

export default function BannerImage() {
  return (
    <div
      className="banner h-40 md:bg-banner-image-desktop bg-[length:950px_520px] bg-banner-image-mobile bg-center bg-[center_top_-13rem]"
    >
      <div className="flex w-full justify-center pt-4">
        <div
          className="inset-0 flex items-center bg-banner-image-content bg-contain h-[7.83rem] w-[11.75rem]"
        ></div>
      </div>
    </div>
  );
}
