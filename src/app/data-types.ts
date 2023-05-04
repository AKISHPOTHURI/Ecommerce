export interface signUp{
    name:string,
    email:string,
    password:string,
    confirmPassword:string
    
}

export interface login {
    email:String,
    password:string
}

export interface product{
    productName:string,
    productPrice:string,
    productColor:string,
    productCategory:string,
    productDescription:string,
    productImageUrl:string,
    id:number,
    productId:number,
    quantity: undefined | number
}

export interface cart {
    productName:string,
    productPrice:string,
    productColor:string,
    productCategory:string,
    productDescription:string,
    productImageUrl:string,
    id:number | undefined,
    quantity: undefined | number,
    userId:number,
    productId:number

}

export interface priceSummary{
    price:number,
    discount:number,
    tax:number,
    delivery:number,
    total:number
}

export interface order{
    email:string,
    address:string,
    contact:string,
    totalPrice:number,
    userId:number
}

export interface email {
    email:string
}