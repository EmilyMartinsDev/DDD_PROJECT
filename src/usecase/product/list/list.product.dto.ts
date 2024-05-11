export interface IListInputProductDTO{

}

type Product = {
    name:string
    id:string
    price: number
}

export interface IListOutputProductDTO{
    products: Product[]
}