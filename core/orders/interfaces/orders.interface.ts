export interface Order {
    id:           string;
    subTotal:     number;
    tax:          number;
    total:        number;
    itemsInOrder: number;
    isPaid:       boolean;
    paidAt:       Date;
    createAt:     Date;
    user:         User;
    orderItem:    OrderItem[];
    orderAddress: OrderAddress[];
}

export interface OrderAddress {
    id:        string;
    firstName: string;
    lastName:  string;
    address:   string;
    address2:  string;
    phone:     string;
    city:      string;
}

export interface OrderItem {
    quantity: number;
    product:  Product;
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
    images:      Image[];
}

export interface Image {
    id:  number;
    url: string;
}

export interface User {
    id: string;
}
