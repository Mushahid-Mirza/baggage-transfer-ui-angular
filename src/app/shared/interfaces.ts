
export interface Product {
    id: number,
    productName: string,
    price: number
}

export interface ToAddOrder extends Product {
    ignore: boolean; 
    startDate : Date;
    endDate : Date;
}
 
export class MonthsInfo {

    id: number;
    year: number;
    month: number; 
  
    public static GetMonthName(mi : MonthsInfo): string {
      switch (mi.month) {
        case 1: return "January, " + mi.year
        case 2: return "February, " + mi.year
        case 3: return "March, " + mi.year
        case 4: return "April, " + mi.year
        case 5: return "May, " + mi.year
        case 6: return "June, " + mi.year
        case 7: return "July, " + mi.year
        case 8: return "August, " + mi.year
        case 9: return "September, " + mi.year
        case 10: return "October, " + mi.year
        case 11: return "November, " + mi.year
        case 12: return "December, " + mi.year
      }
    }
  
  }

export interface CustomerPayment {
    id: string; 
    date: Date;
    amount : number;
    orderId: number;
    paidAmount: number; 
    balance: number;
    liters: number;
}

export interface CustomerInfo {
    id: string,
    fullName: string;
    phoneNumber: string;
    address: string;
}


export interface CurrentOrder {
    orderId: number,
    productId: number,
    productName: string,
    quantity: number,
    monthId : number
}