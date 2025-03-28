import React from 'react'
import { deleteProduct } from '../actions/products-actions'
import { Button } from 'flowbite-react'

export default function ButtonDelete({ id }: { id: string }) {
    return (
        <form action={deleteProduct}>
            <input type="hidden" name="id" value={id} />
            <Button type="submit" color='red' >Eliminar</Button>
        </form>
    )
}
