export interface ProductInterface {

    id: number;
    name: string;
    description: string;
    price: number;
}

export type Products = Pick<ProductInterface, "id" | "name">
