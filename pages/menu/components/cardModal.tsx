import React, { ReactNode, useEffect, useState } from "react";
import CardOrderButton from "./cardOrderButton";
import CardModalRadio from "./cardModalRadio";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { SET_NUMBER_TO_ORDER, SelectData } from "features/data/menuSlice";
import { ICardItemData } from "types/generic_interfaces";

export interface CardModalProps {
  setIsModalOpen: (isOpen: boolean) => void;
  CardItemData: ICardItemData;

  isModalOpen: boolean;
}

function CardModal({
  setIsModalOpen,
  isModalOpen,
  CardItemData,
}: CardModalProps) {
  const { numberToOrder } = useAppSelector(SelectData);
  const dispatch = useAppDispatch();

  const setModalClose = () => {
    setIsModalOpen(false);
  };

  const [IndexItemSelected, setIndexItemSelected] = useState<number | null>(
    null
  );

  const [ItemSelected, setItemSelected] = useState<ICardItemData["basket"]>([
    {
      name: "",
      total: 0,
      numberToOrder: 0,
    },
  ]);

  useEffect(() => {
    const item:
      | { name: string; price: number; maxChoices: number }[]
      | undefined =
      CardItemData &&
      CardItemData.modifiers?.[0].items.filter((item, index) => {
        return index == IndexItemSelected;
      });
    if (item && item?.length > 0) {
      setItemSelected([
        {
          name: CardItemData.name,
          total: CardItemData.price,
          numberToOrder: numberToOrder,
          modifiers:
            CardItemData && CardItemData.modifiers
              ? {
                  name: item && item[0].name,
                  price: item && item[0].price,
                }
              : undefined,
        },
      ]);
    } else {
      setItemSelected([
        {
          name: CardItemData.name,
          total: CardItemData.price,
          numberToOrder: numberToOrder,
        },
      ]);
    }
  }, [IndexItemSelected, numberToOrder, CardItemData.name]);

  useEffect(() => {
    dispatch(SET_NUMBER_TO_ORDER(1));
  }, [CardItemData.name]);

  return (
    <>
      {isModalOpen && (
        <div
          className={`fixed ${
            !CardItemData.images?.[0].image ? "inset-0 flex-col-reverse" : ""
          } md:inset-0 inset-x-0 top-0 z-10 bg-black bg-opacity-70 flex md:items-center md:justify-center`}
        >
          <div
            className={`card mx-auto md:w-[30rem] text-gray-500 flex flex-col justify-between ${
              CardItemData.images?.[0].image && "h-screen"
            }  md:mb-14 md:pt-16 relative`}
          >
            <div
              className={`card-header ${
                !CardItemData.images?.[0].image ? "bg-[#FFF]" : ""
              }`}
            >
              <div
                className={`btn-close-content ${
                  CardItemData.images?.[0].image
                    ? "absolute mt-10"
                    : "relative md:top-0 flex items-center justify-end pr-5 w-screen md:w-full h-[64px]"
                } top-0 md:top-16 right-0  mr-5  drop-shadow-md  z-20	`}
              >
                <button
                  onClick={setModalClose}
                  className="btn-close flex justify-center items-center h-7 w-7 bg-[#FFF] rounded-full"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18 18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              {CardItemData.images?.[0].image && (
                <img
                  className="img-card rounded-t-lg relative w-full"
                  src={CardItemData.images?.[0].image}
                  alt={"card-image"}
                />
              )}
            </div>
            <div className="bg-[#FFF] flex h-full">
              <div className="flex-col flex md:h-max md:justify-center w-screen md:h-[20.6rem] md:pb-40 pt-16 md:overflow-y-auto">
                <div
                  className={`card-title mb-1 p-4 ${
                    !CardItemData.images?.[0].image && "md:mb-[150px]"
                  }`}
                >
                  <h2 className="title-modal text-2xl font-bold">
                    {CardItemData.name}
                  </h2>
                  <p className="description-modal mt-2 text-sm">
                    {CardItemData.description && CardItemData.description}
                  </p>
                </div>
                <div className="flex flex-col h-full ">
                  <div
                    className={`card-modifiers-title ${
                      CardItemData.modifiers ? "block" : "invisible"
                    } ${
                      CardItemData.images?.[0].image ? "block " : "hidden"
                    } relative md:mb-8 md:pb-3 min-h-[68px] w-full flex flex-col justify-center pl-6 bg-container`}
                  >
                    <h4 className="title-body font-bold">
                      {CardItemData.modifiers && CardItemData.modifiers[0].name}
                    </h4>
                    <p className="subtitle-body ">
                      {CardItemData.modifiers &&
                        `Select ${CardItemData.modifiers[0].maxChoices} option`}{" "}
                    </p>
                  </div>
                  <div className="card-body h-full ">
                    <div
                      className={`card-modifiers ${
                        CardItemData.modifiers ? "shadow-md md:shadow-none" : ""
                      }  h-full flex flex-col justify-around  md:py-2`}
                    >
                      {CardItemData &&
                        CardItemData.modifiers?.[0].items.map((item, index) => (
                          <div
                            key={index}
                            className="card-list flex bg-[#FFF] h-max justify-between ml-6 mr-6 md:py-2 flex-row items-center relative z-10"
                          >
                            <div className="card-list-content">
                              <h4 className="card-list-title font-bold">
                                {item.name}
                              </h4>
                              <p className="card-list-price">
                                R${" "}
                                {item.price.toLocaleString("pt-BR", {
                                  minimumFractionDigits: 2,
                                  maximumFractionDigits: 2,
                                })}
                              </p>
                            </div>
                            <CardModalRadio
                              setIndexItemSelected={setIndexItemSelected}
                              IndexItemSelected={IndexItemSelected}
                              index={index}
                            />
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="md:absolute relative md:bottom-0 md:left-0 md:right-0 md:z-20 md:backdrop-filter md:backdrop-blur-[4px] ">
              <div className="flex card-order md:h-[7.2rem] h-[150px] w-screen md:w-full pt-4 md:pt-0 justify-center items-center bg-container md:bg-transparent">
                <CardOrderButton
                  ItemSelected={ItemSelected}
                  numberToOrder={numberToOrder}
                  setModalClose={setModalClose}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
export default CardModal;
