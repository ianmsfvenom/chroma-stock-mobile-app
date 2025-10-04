export type ProductListResponse = {
    id: number;
    name: string;
    category_id: number;
    subcategory_id: number;
    sku: string;
    price: number;
    barcode: string;
    min_stock: number;
    image_url: string | null;
    obs: string | null;
    created_at: string;
    updated_at: string;
}

export type ProductDetailsResponse = {
    id: number;
    name: string;
    category: string;
    subcategory: string | null;
    sku: string;
    price: number;
    barcode: string;
    min_stock: number;
    image_url: string | null;
    status_stock: string;
    total_quantity: number;
    obs: string | null;
    boxes: {
        id: number;
        code: string;
        type_box: string;
        status: string;
        obs: string | null;
        actual_deposit: string;
        actual_location: string;
        moved_at: string;
        moved_by: string;
    }[]
}