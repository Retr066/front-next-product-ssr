'use client' // Error boundaries must be Client Components

export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    return (
        // global-error must include html and body tags
        <html>
            <body>
                <h2>Pasó algo inesperado</h2>
                <p>{error.message}</p>
                <button onClick={() => reset()}>
                    Intenta recargar la página
                </button>
            </body>
        </html>
    )
}
