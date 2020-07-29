export type ProductPreviewType = {
    id: number;
    photo: string;
    name: string;
    price: number;
    volume: number;
}

export type ProductDescriptionItemType = {
    name: string;
    value: string;
}

export type ProductType = {
    id: number;
    photos: string[];
    description: ProductDescriptionItemType[];
    price: number;
    volume: number;
}
