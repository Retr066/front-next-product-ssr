import CreateForm from '@/app/_components/CreateForm'
import { getProductById } from '@/app/actions/products-actions';
import { redirect } from 'next/navigation';
import React from 'react'

export default async function page({
    params,
}: {
    params: { id: string }
}) {
    const { id } = await params;
    const product = await getProductById(id);
    if (!product) {
        redirect('/');
    }

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <CreateForm product={product.data} />
        </div>
    )
}
