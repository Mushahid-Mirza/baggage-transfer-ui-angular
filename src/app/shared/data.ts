import { CustomerPayment, Product, CustomerInfo, ToAddOrder } from "./interfaces";

// Amount : number;
// OrderId: number;
// PaidAmount: number; 
// Balance: number;
// Liters: number;

export const CUSTOMER_PAYMENTS: CustomerPayment[] = [
    // { Id: "00001", Date: new Date(2019, 0), Amount: 5000, OrderId: 1, PaidAmount: 400, Balance: 200, Liters: 5, },
    // { Id: "00002", Date: new Date(2019, 1), Amount: 4000, OrderId: 1, PaidAmount: 400, Balance: 200, Liters: 5 },
    // { Id: "00003", Date: new Date(2019, 2), Amount: 5000, OrderId: 1, PaidAmount: 400, Balance: 200, Liters: 5 },
    // { Id: "00004", Date: new Date(2019, 3), Amount: 5000, OrderId: 1, PaidAmount: 400, Balance: 200, Liters: 5 },
    // { Id: "00005", Date: new Date(2019, 4), Amount: 5000, OrderId: 1, PaidAmount: 400, Balance: 200, Liters: 5 },
    // { Id: "00006", Date: new Date(2019, 5), Amount: 5000, OrderId: 1, PaidAmount: 400, Balance: 200, Liters: 5 },
    // { Id: "00007", Date: new Date(2019, 6), Amount: 5000, OrderId: 1, PaidAmount: 400, Balance: 200, Liters: 5 },
    // { Id: "00009", Date: new Date(2019, 8), Amount: 5000, OrderId: 1, PaidAmount: 400, Balance: 200, Liters: 5 },
    // { Id: "00010", Date: new Date(2019, 9), Amount: 5000, OrderId: 1, PaidAmount: 400, Balance: 200, Liters: 5 },
    // { Id: "00011", Date: new Date(2019, 10), Amount: 5000, OrderId: 1, PaidAmount: 400, Balance: 200, Liters: 5 },
];

export const PRODUCT_LIST: Product[] = [
    { id: 1, productName: "Goat Milk", price: 60 },
    { id: 2, productName: "Cow Milk", price: 50 },
    { id: 3, productName: "Buffalo Milk", price: 55 },
    { id: 4, productName: "Curd", price: 45 }
]


export const PRODUCT_LIST_TOADD: ToAddOrder[] = [
    { id: 1, productName: "Goat Milk", price: 60, ignore: false, startDate: null, endDate: null },
    { id: 2, productName: "Cow Milk", price: 50, ignore: false, startDate: null, endDate: null },
    { id: 3, productName: "Buffalo Milk", price: 55, ignore: false, startDate: null, endDate: null },
    { id: 4, productName: "Curd", price: 45, ignore: false, startDate: null, endDate: null },]


export const CUSTOMER_SCAN_ROUTE_STACK: CustomerInfo[] = [];

