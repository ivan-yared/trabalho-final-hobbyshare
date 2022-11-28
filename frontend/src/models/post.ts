export interface Postagem {
    id?: number;
    title: string;
    body: string;
    created: Date;
    user?: number;
}