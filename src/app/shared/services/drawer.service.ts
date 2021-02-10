import { Injectable, Output, EventEmitter } from '@angular/core';

export enum DrawerFor {
    Navigation = 1,
}

@Injectable({
    providedIn: 'root'
})
export class DrawerService {

    isOpen: boolean = false;

    @Output() updateDrawer: EventEmitter<any> = new EventEmitter();

    toggle(drawerFor: DrawerFor, open, data: any) {
        this.isOpen = open;
        // console.log("dawer for : " + drawerFor);  
        this.updateDrawer.emit({ isOpen: open, drawerFor: drawerFor, data: data });
    }

    update(drawerFor: DrawerFor, open) {
        this.updateDrawer.emit({ isOpen: open, drawerFor: drawerFor });
    }

    open() {
        this.updateDrawer.emit({ isOpen: true, drawerFor: DrawerFor.Navigation })
    }
}
