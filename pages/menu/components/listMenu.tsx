import React, { ReactNode, useState } from "react";
import AccordionListMenu from "./accordionListMenu";
import CardListMenu from "./cardListMenu";
import CardModal, { CardModalProps } from "./cardModal";
import { SelectData } from "features/data/menuSlice";
import { useAppSelector } from "app/hooks";
import CarrouselList from "./carroseulList";
import { ICardItemData } from "types/generic_interfaces";

interface listMenuProps {
  setIsOpenBasket: (value: boolean) => void;
  SearchItem: string;
  data: {
    sections?: [
      {
        name: string;
        items: [ICardItemData];
      }
    ];
  };
}

const ListMenu = ({ data, setIsOpenBasket, SearchItem }: listMenuProps) => {
  const [isModalOpen, setisModalOpen] = useState(false);
  const { basket } = useAppSelector(SelectData);

  const [CardItemData, setCardItemData] = useState<ICardItemData>({
    name: "",
    price: 0,
    description: "",
    images: [
      {
        image: "",
      },
    ],
    modifiers: [
      {
        name: "",
        items: [
          {
            name: "",
            price: 0,
            maxChoices: 0,
          },
        ],
        maxChoices: 0,
      },
    ],
    basket: [
      {
        name: "",
        total: 0,
        numberToOrder: 0,
        modifiers: {
          name: "",
          price: 0,
        },
      },
    ],
  });

  return (
    <>
      <CardModal
        CardItemData={CardItemData}
        isModalOpen={isModalOpen}
        setIsModalOpen={setisModalOpen}
      />
      <div
        className="listmenu-contain md:h-[1071px] md:overflow-y-auto bg-[#FFF] md:ml-10 md:my-5 w-screen md:w-[37rem]"
        style={{
          boxShadow: "0px 2px 14px 0px rgba(0, 0, 0, 0.14)",
        }}
      >
        <div className="food-type"></div>
        <div className="nav-food-type w-full h-2/4">
          <CarrouselList data={data} />
          {data.sections &&
            data.sections.map((firstCollection): ReactNode => {
              return (
                <AccordionListMenu title={firstCollection.name}>
                  {firstCollection &&
                    firstCollection.items
                      .filter((item) => {
                        const regex = new RegExp(`^${SearchItem}`, "i");
                        return regex.test(item.name);
                      })
                      .map((item) => {
                        return (
                          <CardListMenu
                            setCardItemData={setCardItemData}
                            setIsModalOpen={setisModalOpen}
                            name={item.name}
                            description={item.description}
                            price={item.price}
                            images={item.images}
                            modifiers={item.modifiers}
                          />
                        );
                      })}
                </AccordionListMenu>
              );
            })}
          <div className="btn-basket-submit md:hidden fixed bottom-0 left-0 right-0 z-19 backdrop-filter backdrop-blur-sm ">
            <div className="flex card-order h-[90px] w-screen md:w-full pt-4 pb-2 justify-center items-center ">
              <button
                onClick={() => setIsOpenBasket(true)}
                className="btn-add-order bg-defaultBrow dark:hover:bg-yellow-950 w-[345px] text-white font-[500] h-12 mb-6 rounded-full"
              >
                Your basket . {basket.length} item
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ListMenu;
