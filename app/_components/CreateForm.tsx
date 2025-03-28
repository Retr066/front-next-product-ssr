import { Button, FileInput, HelperText, Label, TextInput } from 'flowbite-react'
import React from 'react'
import { createProduct, updateProduct } from '../actions/products-actions';
import { Product } from '../model/product.model';
import ImageCustom from './Image';

export default function CreateForm({
    product,
}: {
    product?: Product
}) {
    const functionAction = product?._id ? updateProduct : createProduct;
    return (
        <div className="flex max-w-md flex-col gap-4">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-200">{product?._id ? 'Editar Producto' : 'Crear Producto'}</h1>
            <form action={functionAction}  >
                <Label htmlFor="name">Nombre</Label>
                <input type="hidden" name="id" value={product?._id} />
                <TextInput type="text" id="name" name='name' placeholder="Ingresa el nombre del producto" defaultValue={product?.name} />
                <Label htmlFor="description">Descripcion</Label>
                <TextInput type="text" id="description" name='description' placeholder="Ingresa la descripcion del producto" defaultValue={product?.description} />
                {product?.urlImage && (
                    <div>
                        <Label>Imagen Actual</Label>
                        <ImageCustom
                            product={product}
                        />
                    </div>
                )}
                <Label className="mb-2 block" htmlFor="file-upload-helper-text">
                    Subir Imagen
                </Label>
                <FileInput id="file-upload-helper-text" name="urlImage" required={true} accept='image/*'
                />
                <HelperText className="mt-1">SVG, PNG, JPG </HelperText>
                <Button className='mt-4' type="submit" color='blue'>Guardar</Button>
            </form>
        </div>
    )
}
