import CreateForm from '@/app/_components/CreateForm'
import { getProductById } from '@/app/actions/products-actions';
import { redirect } from 'next/navigation';
import React from 'react'

type Params = Promise<{ id: string }>;

export default async function page({
    params,
}: {
    params: Params
}) {
    const { id } = await params;
    const product = await getProductById(id as string);
    if (!product) {
        redirect('/');
    }

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <CreateForm product={product.data} />
        </div>
    )
}
