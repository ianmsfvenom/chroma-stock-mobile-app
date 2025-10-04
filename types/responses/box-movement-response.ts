export type BoxMovementListResponse = {
    id: number;
    movement_type: string;
    box_code: string;
    box_id: string;
    origin_deposit: string | null;
    origin_location: string | null;
    origin_location_id: number | null;
    destination_deposit: string | null;
    destination_location: string | null;
    destination_location_id: number | null;
    moved_at: string;
    author: string;
}

export type BoxMovementDetailsResponse = {
    id: number;
    movement_type: string;
    moved_at: string;
    author: string;
    box: {
        id: number;
        code: string;
        type_box: string;
        obs: string | null;
        status: string;
        actual_deposit: string;
        actual_location: string;
    };
    origin_deposit: string | null;
    origin_location: string | null;
    origin_location_id: number | null;

    destination_deposit: string | null;
    destination_location: string | null;
    destination_location_id: number | null;

    obs: string | null;
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