"use server"

import { redirect } from "next/navigation";
import { Response } from "../interfaces/response";
import { Product } from "../model/product.model";
import { uploadImage } from "./upload-actions";
import { revalidatePath } from "next/cache";

export async function getProducts(): Promise<Response<Product[]>> {
    const res = await fetch(`${process.env.API_URL}/products`, {
        cache: "no-store",
    });
    if (!res.ok) {
        throw new Error("Error al obtener los productos");
    }
    return res.json();
}


export async function getProductById(id: string): Promise<Response<Product>> {
    const res = await fetch(`${process.env.API_URL}/products/${id}`, {
        cache: "no-store",
    });
    if (!res.ok) {
        throw new Error("Error al obtener el producto");
    }
    return res.json();
}


export async function createProduct(formData: FormData): Promise<{
    message: string;
} | void> {
    const file = formData.get("urlImage") as File;
    const response = await uploadImage(file);

    const product = {
        name: formData.get("name"),
        description: formData.get("description"),
        urlImage: response.url,
    };


    const res = await fetch(`${process.env.API_URL}/products`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
        cache: "no-store",
    });
    if (!res.ok) {

        return {
            message: "Error al crear el producto",
        }
    }

    return redirect(`/`);
}

export async function updateProduct(formData: FormData): Promise<{
    message: string;
} | void> {
    const id = formData.get("id") as string;
    const file = formData.get("urlImage") as File;

    let response;
    if (file.size > 0) {
        response = await uploadImage(file);
    }

    const product = {
        name: formData.get("name"),
        description: formData.get("description"),
        urlImage: response?.url,
    };


    if (!product.name || !product.description) {
        return {
            message: "Los campos son obligatorios",
        }
    }

    const res = await fetch(`${process.env.API_URL}/products/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
        cache: "no-store",
    });
    if (!res.ok) {
        return {
            message: "Error al actualizar el producto",
        }
    }

    redirect("/");
}

export async function deleteProduct(formData: FormData): Promise<{
    message: string;
} | void> {
    const id = formData.get("id") as string;
    const res = await fetch(`${process.env.API_URL}/products/${id}`, {
        method: "DELETE",
        cache: "no-store",
    });
    if (!res.ok) {
        return {
            message: "Error al eliminar el producto",
        }
    }
    revalidatePath("/")
}
