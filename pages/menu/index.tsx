import ListMenu from "./components/listMenu";
import Basket from "./components/basket";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { SelectData, getMenuData } from "features/data/menuSlice";
import { useEffect, useState } from "react";
import SearchBarList from "./components/searchbarList";
type Props = {};

export default function Menu({}: Props) {
  const dispatch = useAppDispatch();
  const { data } = useAppSelector(SelectData);
  const [isOpenBasket, setIsOpenBasket] = useState(false);
  const [SearchItem, setSearchItem] = useState("");

  useEffect(() => {
    dispatch(getMenuData());
  }, []);

  return (
    <>
      <div className="body bg-body md:h-[1396px] flex justify-center">
        <div className="flex flex-col bg-container md:h-[1337px] md:w-[1024px] mb-4 md:mt-4">
          <SearchBarList
            placeholder="Search menu items"
            onSearch={setSearchItem}
            SearchItem={SearchItem}
          />
          <div className="flex container mx-auto bg-container pb-24 md:pb-0 md:flex-row">
            <ListMenu
              SearchItem={SearchItem}
              setIsOpenBasket={setIsOpenBasket}
              data={data}
            />
            <Basket
              isOpenBasket={isOpenBasket}
              setIsOpenBasket={setIsOpenBasket}
            />
          </div>
        </div>
      </div>
    </>
  );
}
