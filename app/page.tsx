
import React from "react";
import { DarkThemeToggle } from "flowbite-react";
import Image from "next/image";
import ImageCustom from "./_components/Image";
import Link from "next/link";
import { getProducts } from "./actions/products-actions";
import ButtonDelete from "./_components/ButtonDelete";


export default async function Home() {

  const res = await getProducts();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-white px-4 py-24 dark:bg-gray-900">


      <div className="absolute inset-0 size-full">
        <div className="relative h-full w-full select-none">
          <Image
            className="absolute right-0 min-w-dvh dark:hidden"
            alt="Pattern Light"
            src="/pattern-light.svg"
            width="803"
            height="774"
          />
          <Image
            className="absolute right-0 hidden min-w-dvh dark:block"
            alt="Pattern Dark"
            src="/pattern-dark.svg"
            width="803"
            height="775"
          />
        </div>
      </div>
      <div className="absolute top-4 right-4">
        <DarkThemeToggle />
      </div>

      <div className="relative flex w-full max-w-5xl flex-col items-center justify-center gap-12">
        <div className="relative flex flex-col items-center gap-6">
          <h1 className="relative text-center text-4xl leading-[125%] font-bold text-gray-900 dark:text-gray-200">
            Fronted
          </h1>
          <span className="inline-flex flex-wrap items-center justify-center gap-2.5 text-center">
            <span className="inline text-xl text-gray-600 dark:text-gray-400">
              Crud de productos
            </span>
          </span>
        </div>

        <div className="flex w-full justify-end">
          <Link
            href={"/new-product"}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Crear Producto
          </Link>
        </div>

        <div className="relative flex w-full flex-col items-start gap-6 self-stretch">
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Id Producto
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Nombre
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Descripción
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Imagen
                  </th>
                  <th scope="col" className="px-6 py-3">
                    <span className="sr-only">Edit</span>
                    <span className="sr-only">Delete</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {
                  res.data?.map((product) => (
                    <tr key={product._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                      <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {product._id}
                      </th>
                      <td className="px-6 py-4">
                        {product.name}
                      </td>
                      <td className="px-6 py-4">
                        {product.description}
                      </td>
                      <td className="px-6 py-4">
                        <ImageCustom product={product} />
                      </td>

                      <td className="px-6 py-4 text-right flex flex-col">
                        <Link
                          className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900"
                          href={`/product/${product._id}/edit`}>
                          Editar
                        </Link>
                        <ButtonDelete id={product._id} />
                      </td>
                    </tr>
                  ))
                }


                {
                  res.data?.length === 0 && (
                    <tr>
                      <td colSpan={5} className="text-center py-4">
                        No hay productos
                      </td>
                    </tr>
                  )
                }

              </tbody>
            </table>
          </div>

        </div>
      </div>
    </main>
  );
}

