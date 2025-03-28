"use client"
import React from 'react'
import { CldImage } from 'next-cloudinary';
export default function ImageCustom({product}: { product: { urlImage: string,name:string } }) {
  return (
    <>
    <CldImage src={product.urlImage} className="w-16 md:w-32 max-w-full max-h-full" alt={product.name} width={100} height={100}  />
    </>
  )
}
