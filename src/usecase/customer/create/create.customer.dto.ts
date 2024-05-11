export interface IInputCreateCustomerDTO{
    name:string
    address:{
        street: string
        city: string
        number:number
        zip: string
    }
}
export interface IOutputCreateCustomerDTO{
    id:string
    name:string
    address:{
        street: string
        city: string
        number:number
        zip: string
    }
}