import React from "react";
import Navbar from "./navbar";
import BannerImage from "./bannerImage";
type Props = {};

export default function Header({}: Props) {
  return (
    <>
      <Navbar />
      <BannerImage />
    </>
  );
}
