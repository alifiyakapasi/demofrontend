import { DateTime } from "luxon";

export class Product {
    id?: string;
    productName: string = '';
    productDescription: string = '';
    productPrice?: number = 0;
    productQuantity?: number = 0;
    categoryId: string = '';
    productStatus?: string = '';
    selectedCategory: string[] = [];
    fileUpload?: string = '';
    fromDate?: Date;
    toDate?: Date;
    time?: DateTime;
}
