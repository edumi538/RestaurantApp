import { ReactNode, useState } from "react";

const Navbar = () => {
  const [openMobileMenu, setopenMobileMenu] = useState(false);
  const [PageToNavbar, setPageToNavbar] = useState("Menu");

  const arrayItensMenuMobile: Array<{ nome: string }> = [
    { nome: "Menu" },
    { nome: "Entrar" },
    { nome: "Contato" },
  ];

  function DesktopView(): ReactNode {
    return (
      <div className="md:flex md:justify-center hidden md:w-full">
        {arrayItensMenuMobile.map((item: {nome:string}): ReactNode => {
          return (
            <li className="flex md:me-6 justify-center ">
              <a
                href="#"
                className="inline-block p-2 w-36 text-center border-b-4 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
              >
                {item.nome.toLocaleUpperCase()}
              </a>
            </li>
          );
        })}
      </div>
    );
  }

  function MobileView(): ReactNode {
    return (
      <h1 className="inline-block p-2 w-36 text-center text-lg font-medium border-b-4 border-transparent rounded-t-lg">
        {PageToNavbar}
      </h1>
    );
  }

  function MobileMenu(): ReactNode {
    return (
      <div className="mobile-menu md:hidden bg-defaultBrow w-1/3 rounded-bl-2xl  border-l border-b">
        {arrayItensMenuMobile.map((item): ReactNode => {
          return (
            <div className="group ">
              <button
                onClick={() => setPageToNavbar(item.nome)}
                className="list-itens-menu w-full py-2 w-full text-lg font-medium hover:bg-container group-hover:text-defaultBrow text-center"
              >
                {item.nome}
              </button>
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div className="bg-defaultBrow h-16 md:h-12">
      <div className="flex w-screen justify-end h-full items-center">
        <ul className="w-screen absolute md:relative md:flex md:flex-row">
          {DesktopView()}
        </ul>
        <div className="md:hidden absolute flex w-screen justify-center">
          {MobileView()}
        </div>
        <button
          onClick={() => setopenMobileMenu(!openMobileMenu)}
          type="button"
          className="flex inline-flex items-center z-10 p-2 mr-5 w-10 h-10 justify-center text-sm text-white rounded-lg md:hidden dark:text-white"
        >
          <svg
            className="w-6 h-6"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
      </div>
      {openMobileMenu && (
        <div className="mobile-menu-container w-screen absolute z-20 flex justify-end">
          {MobileMenu()}
        </div>
      )}
    </div>
  );
};

export default Navbar;
