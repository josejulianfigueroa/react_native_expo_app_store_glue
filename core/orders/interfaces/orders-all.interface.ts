export interface OrderItem {
    id:       string;
    quantity: number;
    price:    number;
    size:     string;
    order:    OrdersAll;
    product:  Product;
}

export interface OrdersAll {
    id:            string;
    subTotal:      number;
    tax:           number;
    total:         number;
    itemsInOrder:  number;
    isPaid:        boolean;
    paidAt:        Date;
    createAt:      Date;
    transactionId?: string;
    user?:         User;
    orderItem?:    OrderItem[];
    orderAddress?: OrderAddress[];
}

export interface Product {
    id:          string;
    title:       string;
    price:       number;
    description: string;
    slug:        string;
    stock:       number;
    sizes:       string[];
    gender:      string;
    tags:        string[];
}

export interface OrderAddress {
    id:        string;
    firstName: string;
    lastName:  string;
    address:   string;
    address2:  string;
    phone:     string;
    city:      string;
    country:   Country;
}

export interface Country {
    id:   string;
    name: string;
}

export interface User {
    id:            string;
    email:         string;
    image:         string;
    fullName:      string;
    isActive:      boolean;
    emailVerified: boolean;
    role:          string;
}
