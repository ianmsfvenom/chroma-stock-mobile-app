export type BoxListResponse = {
    id: number;
    code: string;
    type_box: string;
    status: string;
    actual_deposit: string;
    actual_location: string;
}

export type BoxDetailsResponse = {
    id: number;
    code: string;
    type_box: string;
    status: string;
    obs: string | null;
    actual_deposit: string;
    actual_location: string;
    actual_location_id: number | null;
    moved_at: string;
    moved_by: string;
    products_in_box: ProductInBoxDetailsResponse[];
    product_box_movements: ProductMovementsBoxDetailsResponse[];
    box_movements: BoxMovementBoxDetailsResponse[];
}

export type ProductInBoxDetailsResponse = {
    id: number;
    image_url: string | null;
    product_name: string;
    sku: string;
    quantity: number;
    barcode: string;
    price: number;
}

export type ProductMovementsBoxDetailsResponse = {
    id: number;
    movement_type: string;
    product_name: string;
    image_url: string | null;
    origin_box_code: string | null;
    destination_box_code: string | null;
    moved_at: string;
    author: string;
    obs: string | null;
}

export type BoxMovementBoxDetailsResponse = {
    id: number;
    movement_type: string;
    author: string;
    origin_deposit: string | null;
    origin_location: string | null;
    destination_deposit: string | null;
    destination_location: string | null;
    moved_at: string;
    obs: string | null;
}
