import { useAppDispatch, useAppSelector } from "app/hooks";
import {
  SET_NUMBER_TO_ORDER_BASKET,
  SelectData,
} from "features/data/menuSlice";
import React, { ReactNode, useEffect } from "react";

interface BasketProps {
  isOpenBasket: boolean;
  setIsOpenBasket: (value: boolean) => void;
}

function Basket({ isOpenBasket, setIsOpenBasket }: BasketProps) {
  const dispatch = useAppDispatch();
  const { basket } = useAppSelector(SelectData);

  function multNumber(total: number, numberToOrder: number) {
    return total * numberToOrder;
  }

  function sumSubtotal(): number {
    let soma = 0;
    basket.forEach((item) => {
      soma += item.total * item.numberToOrder;
    });
    return soma;
  }

  function sumTotal(): number {
    let soma = 0;
    basket.forEach((item) => {
      if (item.total) {
        soma += item.total * item.numberToOrder;
      } else {
        soma +=
          (item.modifiers?.price ? item.modifiers?.price : 0) *
          item.numberToOrder;
      }
    });
    return soma;
  }

  function BasketMobileView(): ReactNode {
    return (
      <div className="absolute-container absolute z-20 top-0 h-screen w-screen md:hidden">
        <div className="main-container bg-[#FFF] h-full text-gray-500 flex flex-col justify-between fixed">
          <div className="header h-[94px]">
            <div className="flex w-screen justify-end h-full items-end shadow-sm">
              <div className="absolute p-2 flex w-screen justify-center">
                <h1 className="inline-block w-36 text-center text-lg font-medium border-b-4 border-transparent rounded-t-lg">
                  Basket
                </h1>
              </div>
              <button
                onClick={() => setIsOpenBasket(false)}
                type="button"
                className="flex  inline-flex items-center z-10 mr-5 w-12 h-12 justify-center text-sm rounded-lg md:hidden dark:text-white"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="28"
                  height="28"
                  viewBox="0 0 28 28"
                  fill="none"
                >
                  <rect width="28" height="28" fill="white" />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M20.6894 7.3212C20.2753 6.90709 19.6064 6.90709 19.1923 7.3212L14 12.5028L8.80774 7.31058C8.39363 6.89647 7.72469 6.89647 7.31058 7.31058C6.89647 7.72469 6.89647 8.39363 7.31058 8.80774L12.5028 14L7.31058 19.1923C6.89647 19.6064 6.89647 20.2753 7.31058 20.6894C7.72469 21.1035 8.39363 21.1035 8.80774 20.6894L14 15.4972L19.1923 20.6894C19.6064 21.1035 20.2753 21.1035 20.6894 20.6894C21.1035 20.2753 21.1035 19.6064 20.6894 19.1923L15.4972 14L20.6894 8.80774C21.0929 8.40425 21.0929 7.72469 20.6894 7.3212Z"
                    fill="#4F372F"
                  />
                </svg>
              </button>
            </div>
          </div>
          <div className="body item-basket h-full overflow-y-auto">
            {basket.map(
              (
                item: {
                  name: string;
                  total: number;
                  numberToOrder: number;
                  modifiers?: {
                    name?: string;
                    price?: number;
                  };
                },
                index
              ) => {
                return (
                  <div className="card-basket">
                    <div className=" flex flex-row w-screen items-center justify-between p-4">
                      <div className="item-title">
                        <h6>{item.name}</h6>
                      </div>
                      <div className="item-price">
                        <span>
                          {"R$"}
                          {multNumber(
                            item.total,
                            item.numberToOrder
                          ).toLocaleString("pt-BR", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                        </span>
                      </div>
                    </div>
                    {item.modifiers?.name !== undefined && (
                      <div className="item-subtitle pl-4">
                        <span>{`${item.modifiers && item.modifiers.name} (+R$${(
                          (item.modifiers.price ? item.modifiers.price : 0) *
                          item.numberToOrder
                        ).toLocaleString("pt-BR", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })})`}</span>
                      </div>
                    )}
                    <div className="item-more p-4 flex flex-row space-x-4 shadow-sm">
                      <button
                        onClick={() => {
                          dispatch(
                            SET_NUMBER_TO_ORDER_BASKET({
                              numberToOrder:
                                item.numberToOrder > 1
                                  ? item.numberToOrder - 1
                                  : 1,
                              index: index,
                            })
                          );
                        }}
                        className="btn-minus"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                        >
                          <path
                            d="M19 10C19 14.9706 14.9706 19 10 19C5.02944 19 1 14.9706 1 10C1 5.02944 5.02944 1 10 1C14.9706 1 19 5.02944 19 10Z"
                            fill="#4F372F"
                            stroke="#4F372F"
                            stroke-width="2"
                          />
                          <rect
                            x="4"
                            y="8.5"
                            width="12"
                            height="3"
                            rx="1.5"
                            fill="white"
                          />
                        </svg>
                      </button>
                      <span className="text-lg font-medium">
                        {item.numberToOrder}
                      </span>
                      <button
                        onClick={() => {
                          dispatch(
                            SET_NUMBER_TO_ORDER_BASKET({
                              numberToOrder: item.numberToOrder + 1,
                              index: index,
                            })
                          );
                        }}
                        className="btn-more text-white"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                        >
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M10 20C15.5228 20 20 15.5228 20 10C20 4.47715 15.5228 0 10 0C4.47715 0 0 4.47715 0 10C0 15.5228 4.47715 20 10 20Z"
                            fill="#4F372F"
                          />
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="3.5"
                            stroke="currentColor"
                            className="w-6 h-6"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M12 4.5v15m7.5-7.5h-15"
                            />
                          </svg>
                        </svg>
                      </button>
                    </div>
                  </div>
                );
              }
            )}

            <div className="body price-total flex flex-col p-4 w-screen">
              <div className="container-subtotal flex flex-row justify-between">
                <h6>Sub total</h6>
                <span>
                  R$
                  {sumSubtotal().toLocaleString("pt-BR", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </span>
              </div>
              <hr className="divider my-4 h-0.5 border-t-0 bg-neutral-300 opacity-100 dark:opacity-50" />
              <div className="container-total flex flex-row justify-between">
                <h2 className="text-2xl"> Total:</h2>
                <span className="text-2xl font-bold">
                  R$
                  {sumTotal().toLocaleString("pt-BR", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </span>
              </div>
            </div>
          </div>
          <div className="btn-checkout-footer flex h-[90px] w-screen pt-4 pb-2 justify-center items-center">
            <button className="btn-add-order bg-defaultBrow dark:hover:bg-yellow-950 w-[345px] text-white font-[500] h-12 mb-6 rounded-full">
              Checkout now
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {isOpenBasket && BasketMobileView()}
      <div className=" hidden md:flex flex-col w-[320px] h-max shadow-md basket-contain mx-6 bg-[#FFF] text-gray-500 mr-10 mt-4 justify-around">
        <div className="header h-[64px] bg-container pl-4 flex items-center">
          <h2 className="text-xl font-medium">Carrinho</h2>
        </div>
        {basket.length >0 ? (
        <div className="body item-basket overflow-y-auto">
        {basket.map(
          (
            item: {
              name: string;
              total: number;
              numberToOrder: number;
              modifiers?: {
                name?: string;
                price?: number;
              };
            },
            index
          ) => {
            return (
              <div className="card-basket">
                <div className=" flex flex-row items-center justify-between p-4">
                  <div className="item-title">
                    <h6>{item.name}</h6>
                  </div>
                  <div className="item-price">
                    <span>
                      {"R$"}
                      {multNumber(
                        item.total,
                        item.numberToOrder
                      ).toLocaleString("pt-BR", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </span>
                  </div>
                </div>
                {item.modifiers?.name !== undefined && (
                  <div className="item-subtitle pl-4">
                    <span>{`${item.modifiers && item.modifiers.name} (+R$${(
                      (item.modifiers.price ? item.modifiers.price : 0) *
                      item.numberToOrder
                    ).toLocaleString("pt-BR", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })})`}</span>
                  </div>
                )}
                <div className="item-more p-4 flex flex-row space-x-4 shadow-sm">
                  <button
                    onClick={() => {
                      dispatch(
                        SET_NUMBER_TO_ORDER_BASKET({
                          numberToOrder:
                            item.numberToOrder > 1
                              ? item.numberToOrder - 1
                              : 1,
                          index: index,
                        })
                      );
                    }}
                    className="btn-minus"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                    >
                      <path
                        d="M19 10C19 14.9706 14.9706 19 10 19C5.02944 19 1 14.9706 1 10C1 5.02944 5.02944 1 10 1C14.9706 1 19 5.02944 19 10Z"
                        fill="#4F372F"
                        stroke="#4F372F"
                        stroke-width="2"
                      />
                      <rect
                        x="4"
                        y="8.5"
                        width="12"
                        height="3"
                        rx="1.5"
                        fill="white"
                      />
                    </svg>
                  </button>
                  <span className="text-lg font-medium">
                    {item.numberToOrder}
                  </span>
                  <button
                    onClick={() => {
                      dispatch(
                        SET_NUMBER_TO_ORDER_BASKET({
                          numberToOrder: item.numberToOrder + 1,
                          index: index,
                        })
                      );
                    }}
                    className="btn-more text-white"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M10 20C15.5228 20 20 15.5228 20 10C20 4.47715 15.5228 0 10 0C4.47715 0 0 4.47715 0 10C0 15.5228 4.47715 20 10 20Z"
                        fill="#4F372F"
                      />
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="3.5"
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M12 4.5v15m7.5-7.5h-15"
                        />
                      </svg>
                    </svg>
                  </button>
                </div>
              </div>
            );
          }
        )}

        <div className="body price-total flex flex-col p-4 bg-container ">
          <div className="container-subtotal flex flex-row justify-between">
            <h6>Sub total</h6>
            <span>
              R$
              {sumSubtotal().toLocaleString("pt-BR", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </span>
          </div>
          <hr className="divider my-4 h-0.5 border-t-0 bg-neutral-300 opacity-100 dark:opacity-50" />
          <div className="container-total flex flex-row justify-between">
            <h2 className="text-2xl"> Total:</h2>
            <span className="text-2xl font-bold">
              R$
              {sumTotal().toLocaleString("pt-BR", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </span>
          </div>
        </div>
      </div>
        ):(
          <div className="p-6 pl-4">
          <span>Seu carrinho está vazio</span>
          </div>
        )}

      </div>
    </>
  );
}

export default Basket;
