import React from "react";
import base_service from "../../../services/base_service";

export async function Signup(data) {
  try {
    await base_service.post(process.env.NEXT_PUBLIC_API_ROUTE + "users", data, {
      headers: {
        apikey: process.env.NEXT_PUBLIC_API_KEY,
      },
    });
    return "sucesso";
  } catch (err) {
    return "falhou";
  }
}
export async function UpdateUser(data, id) {
  try {
    await base_service.put(
      process.env.NEXT_PUBLIC_API_ROUTE + `users?id=eq.${id}`,
      data,
      {
        headers: {
          apikey: process.env.NEXT_PUBLIC_API_KEY,
        },
      }
    );
    return "sucesso";
  } catch (err) {
    return "falhou";
  }
}

export async function GetAll() {
  try {
    const response = await base_service.get(
      process.env.NEXT_PUBLIC_API_ROUTE + "users",
      {
        headers: {
          apikey: process.env.NEXT_PUBLIC_API_KEY,
        },
      }
    );
    return response.data;
  } catch (err) {
    return "falhou";
  }
}

export async function GetUserById(id) {
  try {
    const response = await base_service.get(
      process.env.NEXT_PUBLIC_API_ROUTE + `users?id=eq.${id}`,
      {
        headers: {
          apikey: process.env.NEXT_PUBLIC_API_KEY,
        },
      }
    );
    return response.data;
  } catch (err) {
    return "falhou";
  }
}
export async function DeleteById(id) {
  try {
    await base_service.delete(
      process.env.NEXT_PUBLIC_API_ROUTE + `users?id=eq.${id}`,
      {
        headers: {
          apikey: process.env.NEXT_PUBLIC_API_KEY,
        },
      }
    );
    return "sucesso";
  } catch (err) {
    return "falhou";
  }
}
