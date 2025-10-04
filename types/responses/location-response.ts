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