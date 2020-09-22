export class DataWithRanking <T>{
    data: T[];
    paginator : IPaginator
}
export interface IPaginator{
    total: number;
    currentPage: number;
    perpage: number;
    lastPage: number;
}