export interface Response<T = unknown> {
    status: number;
    message: string;
    data?: T;
    errors?: ErrorValidation[];
}

interface ErrorValidation {
    field: string;
    messages: string[] | string;
}
