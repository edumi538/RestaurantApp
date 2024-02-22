import Image from "next/image";
import React from "react";
import { truncate } from "utils/utils";
import { CardModalProps } from "./cardModal";
import { ICardItemData } from "types/generic_interfaces";

interface CardListProps {
  setIsModalOpen: (isOpen: boolean) => void;
  setCardItemData: (item: CardModalProps["CardItemData"]) => void;
  name: string;
  description?: string;
  price: number;
  images?: ICardItemData["images"];
  modifiers: ICardItemData["modifiers"];
  basket?: ICardItemData["basket"];
}

function CardListMenu({
  setIsModalOpen,
  setCardItemData,
  name,
  description,
  price,
  images,
  modifiers,
  basket,
}: CardListProps) {
  return (
    <div
      onClick={async () => {
        await new Promise((resolve) => {
          resolve(
            setCardItemData({
              name: name,
              price: price,
              description: description ? description : "",
              images: images ? images : undefined,
              modifiers: modifiers ? modifiers : undefined,
              basket: basket ? basket : undefined,
            })
          );
        });
        setIsModalOpen(true);
      }}
      className="btn-card flex flex-row cursor-pointer p-5 group dark:hover:bg-defaultBrow"
      style={{ justifyContent: "space-between" }}
    >
      <div className="flex flex-col text-gray-500 group-hover:text-white">
        <span className="card-list-menu-title text-sm font-bold">{name}</span>
        <p className="card-list-menu-description text-sm pt-2 font-light">
          {description && truncate(description, 45)}
        </p>
        <span className="card-list-menu-price pt-2 text-sm font-bold">
          R${" "}
          {price &&
            price.toLocaleString("pt-BR", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
        </span>
      </div>
      {images &&
        images.map((item) => (
          <div className="card-image rounded-md overflow-hidden">
            {item.image && (
              <Image width={128} height={85} alt="teste" src={item.image} />
            )}
          </div>
        ))}
    </div>
  );
}

export default CardListMenu;
