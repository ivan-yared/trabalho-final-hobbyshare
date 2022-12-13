export interface Postagem {
    id?: number;
    name: string;
    photo: string;
    email: string;
    title: string;
    body: string;
    created: Date;
    user?: number;
    pathImage?: string;
}