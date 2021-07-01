export interface IData {
    feed: string;
    product_id: string;
    bids: Array<Array<number>>;
    asks: Array<Array<number>>;
}

export interface ITableRow {
    col1: string;
    col2: string;
    col3: string;
}

export type ITableState = Array<ITableRow>;