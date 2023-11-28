import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar.tsx";
import UsersTable from "./components/users_table";
import { getSession, signOut, useSession } from "next-auth/react";
import { DeleteById, GetAll } from "../api/auth/register";
import { useRouter } from "next/router";

export default function PainelDeControleScreen() {
  const router = useRouter();
  const { data: session } = useSession();
  const [StateUsuariosExistentes, SetStateUsuariosExistentes] = useState([]);
  const [DisableTrash, setDisableTrash] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const usuarios = await GetAll();
      localStorage.setItem("usuarios", JSON.stringify(usuarios));
      SetStateUsuariosExistentes(usuarios);
    }
    fetchData();
  }, []);

  async function handleDelete(id) {
    const res = await DeleteById(id);
    if (res == "sucesso") {
      DeleteUsuarioLocalStorage(id);
    }
  }

  function DeleteUsuarioLocalStorage(id) {
    const usuariosExistentes =
      JSON.parse(localStorage.getItem("usuarios")) || [];
    const indiceDoUsuario = usuariosExistentes.findIndex(
      (item) => item.id === parseInt(id)
    );
    if (indiceDoUsuario !== -1) {
      usuariosExistentes.splice(indiceDoUsuario, 1);
      localStorage.setItem("usuarios", JSON.stringify(usuariosExistentes));
      SetStateUsuariosExistentes(usuariosExistentes);
    } else {
      console.error("Objeto não encontrado no array.");
    }
  }

  return (
    <>
      <Navbar page={"Painel de Controle"} titulo={"Dashboard"} />
      <UsersTable
        usuariosExistentes={StateUsuariosExistentes}
        handleDelete={handleDelete}
        session={session}
      />
    </>
  );
}

export async function getServerSideProps(context) {
  const { req } = context;
  const session = await getSession({ req });
  if (!session) {
    return {
      redirect: { destination: "/unauthorized_page" },
    };
  }
  return {
    props: {},
  };
}
