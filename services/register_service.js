export function UpdateUsuarioLocalStorage(username, password, id) {
  const usuariosExistentes = JSON.parse(localStorage.getItem("usuarios")) || [];
  const indiceDoUsuario = usuariosExistentes.findIndex(
    (item) => item.id === parseInt(id)
  );
  if (indiceDoUsuario !== -1) {
    usuariosExistentes[indiceDoUsuario].name = username;
    usuariosExistentes[indiceDoUsuario].password = password;
    localStorage.setItem("usuarios", JSON.stringify(usuariosExistentes));
  } else {
    console.error("Objeto não encontrado no array.");
  }
}
