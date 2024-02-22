import Image from "next/image";
import React, { ReactNode } from "react";

interface CarrouselProps {
  data: {
    sections?: [
      {
        name: string;
        images?: [
          {
            image: string;
          }
        ];
      }
    ];
  };
}

function CarrouselList({ data }: CarrouselProps) {
  return (
    <div className="w-full flex items-center justify-center md:justify-start">
      <ul className="flex p-4">
        {data.sections &&
          data.sections.map(
            (item): ReactNode => (
              <button className="flex flex-col space-y-6 items-center justify-center px-4 py-4">
                <div className="image-carroseul w-[74px] h-[74px]  ">
                  <img className="h-full w-full object-cover rounded-full" src={item.images?.[0].image}/>
                </div>
                <li className="">
                  <a
                    href="#"
                    className="inline-block p-2 w-20 text-xs text-center border-b-2 border-transparent rounded-t-lg text-black hover:border-defaultBrow"
                  >
                    {item.name}
                  </a>
                </li>
              </button>
            )
          )}
      </ul>
    </div>
  );
}

export default CarrouselList;
