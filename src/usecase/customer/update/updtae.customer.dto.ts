export interface IInputUpdateCustomerDTO{
    id:string
    name:string
    address:{
        street: string
        city: string
        number:number
        zip: string
    }
}
export interface IOutputUpdateCustomerDTO{
    id:string
    name:string
    address:{
        street: string
        city: string
        number:number
        zip: string
    } 
}