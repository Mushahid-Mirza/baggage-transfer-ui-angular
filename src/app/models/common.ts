import { KeyValue } from '@angular/common';

export class MenuItems {
    orderNumber: number;
    text: string;
    url: string;
    icon: string;
    iconPosition?: string = "left";
    isActive: boolean;
    visible?: boolean = true;
    isDefault?: boolean = false;
}

export class SideNavigation {
    orderNumber: number;
    name: string;
    menuItems: MenuItems[];
    visible?: boolean = false;
}

export class ResponseObject {
    isSuccess?: boolean = false;
    result: Result;
    message: string;
    data?: any;
}

export enum Result {
    ValidationError = 0,
    Success = 1,
    Failure = 2,
    Error = 3
}
    
export function enumToKeyValueArray(enumme) {
    return Object.keys(enumme)
        .filter(StringIsNotNumber)
        .map(k => {
            return { name: k, id: enumme[k] }
        });
}

export const StringIsNotNumber = value => isNaN(Number(value)) === true;
