export interface Product{
    _id?:string;
    name: string;
    shortdescription: string;
    description: string;
    price: Number;
    discount: Number;
    images: string[];
    categoryId: string;
    brandId: string;
    isFeatured:boolean;
    isNewed:boolean;
}