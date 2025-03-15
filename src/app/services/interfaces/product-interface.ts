export interface ProductInterface {
    
    id: number;
    name: string;
    description: string;
    image: string;
    tax: number;
    price: number;
    currency: string;
    sellerUsername: string;

}

export type Products = Pick<ProductInterface, "name" | "description" | "image" | "tax" | "price" | "currency" | "sellerUsername">
export type Product2 = Pick<ProductInterface, "name" | "description" | "image" | "tax" | "price" | "currency" | "sellerUsername" | "id">
