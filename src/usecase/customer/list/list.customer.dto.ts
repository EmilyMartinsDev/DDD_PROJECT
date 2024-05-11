export interface IInputListCustomerDTO{

}

type Customer = {
    id: string,
    name: string,
    address: {
        street: string ;
        number: number ;
        zip: string ;
        city: string 
    }
}

export interface IOutputListCustomer{
    customers: Customer[];
}