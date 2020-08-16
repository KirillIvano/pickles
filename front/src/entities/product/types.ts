export type ProductPreviewType = {
    id: number;
    image: string;
    name: string;
    price: number;
    weight: number;
    verboseName: string;
}

export type ProductDescriptionItemType = {
    name: string;
    value: string;
}

export type ProductType = {
    id: number;
    categoryId: number;

    name: string;
    verboseName: string;
    images: string[];
    info: ProductDescriptionItemType[];
    price: number;
    weight: number;
}
