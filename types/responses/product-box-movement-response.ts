export type ProductBoxMovementListResponse = {
    id: number;
    product_name: string;
    product_id: number;
    quantity: string;
    movement_type: string;
    origin_box_code: string | null;
    origin_box_id: number | null;
    destination_box_code: string | null;
    destination_box_id: number | null;
    author: string;
    moved_at: string;
}

export type ProductBoxMovementDetailsResponse = {
    id: number;
    movement_type: string;
    quantity: number ;
    moved_at: string;
    author: string;
    product: {
        id: number;
        name: string;
        price: number;
        sku: string;
        barcode: string;
        category: string;
        subcategory: string | null;
        obs: string | null;
    };
    origin_box: {
        id: number;
        code: string;
        type_box: string;
        status: string;
        obs: string | null;
        actual_deposit: string;
        actual_location: string;
    } | null;
    destination_box: {
        id: number;
        code: string;
        type_box: string;
        status: string;
        obs: string | null;
        actual_deposit: string;
        actual_location: string;
    } | null;
}

export type CreateProductBoxMovementResponse = {
    id: number;
    product_id: number;
    product_name: string;
    product_sku: string;
    product_price: number;
    product_barcode: string;
    product_image_url: string | null;
    origin_box_code: string | null;
    origin_box_id: number | null;
    destination_box_code: string | null;
    destination_box_id: number | null;
    movement_type: string;
    quantity: number ;
    author: string;
    obs: string;
    moved_at: string;
    updated_at: string;
}