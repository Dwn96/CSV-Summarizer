interface Transaction<T> {
    lender:string
    receiver:string
    amount:T
}

export default Transaction