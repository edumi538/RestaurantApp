import { useAppDispatch, useAppSelector } from "app/hooks";
import {
  SET_ITEMS_SELECTED,
  SET_NUMBER_TO_ORDER,
  SelectData,
} from "features/data/menuSlice";
import React, { ReactNode, useState } from "react";

interface CardOrderProps {
  setModalClose: () => void;
  numberToOrder: number;
  ItemSelected?: [
    {
      name: string;
      total: number;
      numberToOrder: number;
      modifiers?: {
        name?: string;
        price?: number;
      };
    }
  ];
}

function CardOrderButton({
  setModalClose,
  ItemSelected,
  numberToOrder,
}: CardOrderProps) {
  const dispatch = useAppDispatch();

  function onTogglePlus() {
    dispatch(SET_NUMBER_TO_ORDER(numberToOrder + 1));
  }
  function onToggleMinus() {
    if (numberToOrder > 1) {
      dispatch(SET_NUMBER_TO_ORDER(numberToOrder - 1));
    }
  }

  console.log(ItemSelected?.[0]);

  return (
    <div className="card-order-content flex flex-col items-center md:mt-4">
      <div className=" flex flex-row items-center mb-3">
        <button
          onClick={onToggleMinus}
          className="btn-minus flex justify-center items-center  h-8 w-8 bg-[#DADADA] rounded-full"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={3.5}
            stroke="currentColor"
            className="w-6 h-8"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
          </svg>
        </button>
        <div className="number text-defaultBrow text-2xl font-bold ml-8 mr-8">
          {numberToOrder}
        </div>
        <button
          onClick={onTogglePlus}
          className="btn-plus flex justify-center items-center  h-8 w-8 bg-defaultBrow rounded-full"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={3.5}
            stroke="currentColor"
            className="w-6 h-6 text-white"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
        </button>
      </div>
      <button
        onClick={async () => {
          await new Promise((resolve) => {
            dispatch(
              SET_ITEMS_SELECTED({
                name: ItemSelected?.[0].name ? ItemSelected[0].name : "",
                total: ItemSelected?.[0].total ? ItemSelected[0].total : 0,
                numberToOrder: numberToOrder,
                modifiers: {
                  name:
                    ItemSelected &&
                    ItemSelected[0].modifiers &&
                    ItemSelected[0].modifiers.name,
                  price:
                    ItemSelected &&
                    ItemSelected[0].modifiers &&
                    ItemSelected[0].modifiers.price,
                },
              })
            );
            resolve(true);
          });
          setModalClose();
        }}
        className="btn-add-order bg-defaultBrow dark:hover:bg-yellow-950 md:w-[432px] w-[345px] text-white font-[500] h-12 mb-6 rounded-full"
      >
        Add to Order . R$
        {ItemSelected?.[0].modifiers && ItemSelected?.[0].modifiers.price
          ? (numberToOrder * ItemSelected?.[0].modifiers.price).toLocaleString(
              "pt-BR",
              {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              }
            )
          : (
              numberToOrder *
              (ItemSelected?.[0].total ? ItemSelected?.[0].total : 0)
            ).toLocaleString("pt-BR", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
      </button>
    </div>
  );
}

export default CardOrderButton;
