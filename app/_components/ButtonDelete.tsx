"use client"
import { useActionState } from 'react'
import { deleteProduct } from '../actions/products-actions'
import { Button } from 'flowbite-react'

export default function ButtonDelete({ id }: { id: string }) {

    const [, formAction, isPending] = useActionState(
        (_: unknown, payload: FormData) => deleteProduct(payload),
        null
    );

    return (
        <form action={formAction}>
            <input type="hidden" name="id" value={id} />
            <Button type="submit" color='red'
                disabled={isPending}
            >Eliminar</Button>
        </form>
    )
}
