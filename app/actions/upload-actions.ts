"use server"

export async function uploadImage(file: File): Promise<{
    url: string;
    message: string;
}> {
    const formData = new FormData();
    formData.append("file", file);
    const res = await fetch(`${process.env.API_URL}/uploads/image`, {
        method: "POST",
        body: formData,
    });
    if (!res.ok) {
        throw new Error("Error al subir la imagen");
    }
    return res.json();
}
