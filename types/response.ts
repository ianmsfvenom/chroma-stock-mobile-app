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

export type CategoryResponse = {
    id: number;
    name: string;
}

export type SubcategoryResponse = {
    id: number;
    name: string;
    category_id: number;
    category_name: string;
}

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
    origin_deposit: string | null;
    origin_location: string | null;
    destination_deposit: string | null;
    destination_location: string | null;
    moved_at: string;
    author: string;
    obs: string | null;
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

export type CreateBoxMovementResponse = {
    id: number;
    movement_type: string;
    author: string;
    destination_deposit: string;
    destination_location: string;
    origin_deposit: string;
    origin_location: string;
    obs: string;
    moved_at: string;
}

export type DepositResponse = {
    id: number;
    name: string;
    obs: string | null;
    created_at: string;
    updated_at: string;
}

export type LocationResponse = {
    id: number;
    shelf: string;
    rack: string;
    aisle: string;
    status: string;
    deposit_id: number;
    obs: string | null;
    created_at: string;
    updated_at: string;
}