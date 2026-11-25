export type Product = {
    id: number,
    name: string,
    url: string,
    tag_id?: string,
    initial_price: number,
    current_price: number,
    lowest_price: number,
    image_url?: string,
    is_tracked: boolean,
    created_at?: string,
    prices?: Prices[]
};

export type Prices = {
    id: string,
    price: string,
    tag_text: string,
    created_at: string,
};

export type ChartInfo = {
    prices: number[],
    dates: string[],
};
