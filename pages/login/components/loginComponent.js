"use client";
import { useRouter } from "next/router";
import React from "react";
import { useForm } from "react-hook-form";

const LoginComponent = ({ setAlert, signIn }) => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) =>
    signIn("credentials", {
      username: data.username,
      password: data.password,
      redirect: false,
    }).then(({ ok, error }) => {
      if (ok) {
        router.push("/dashboard");
      } else {
        setAlert(true);
      }
    });

  return (
    <div>
      <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Logue em sua conta
            </h1>
            <form
              onSubmit={handleSubmit(onSubmit)}
              class="space-y-4 md:space-y-6"
              action="#"
              method="POST"
            >
              <div>
                <label
                  htmlFor="email"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Username
                </label>
                <input
                  {...register("username", { required: true })}
                  class="bg-indigo-50 border border-indigo-300 text-gray-900 sm:text-sm rounded-lg focus:ring-indigo-600 focus:border-indigo-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="username"
                />
                {errors.username && (
                  <span class="block mt-2 text-sm font-medium text-orange-600 dark:text-orange-600">
                    Esse campo é obrigatório
                  </span>
                )}
              </div>
              <div>
                <label
                  for="password"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  {...register("password", { required: true })}
                  placeholder="••••••••"
                  class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
                {errors.password && (
                  <span class="block mt-2 text-sm font-medium text-orange-600 dark:text-orange-600">
                    Esse campo é obrigatório
                  </span>
                )}
              </div>
              <button
                type="submit"
                class="w-full text-white bg-primary-600 hover:bg-indigo-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800"
              >
                Sign in
              </button>
              <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                Não possui conta ainda?{" "}
                <a
                  href="/signup"
                  class="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Cadastre-se
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default LoginComponent;
