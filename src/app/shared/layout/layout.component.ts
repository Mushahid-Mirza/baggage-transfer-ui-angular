import { Component, OnInit, Input, inject, Injector, Output, EventEmitter } from '@angular/core';
import { BaseComponent } from '../base.component';

@Component({
  selector: 'layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent extends BaseComponent implements OnInit {

  constructor(protected injector: Injector) {
    super(injector);
  }

  @Input() loadDelay : number = 0; 
  @Input()
  isLoading: boolean = false;

  @Output() 
  onLoadComplete: EventEmitter<any> = new EventEmitter<any>();
  
  show: boolean = false;


  ngOnInit() {

    setTimeout(() => { 
      this.show = true;
      this.onLoadComplete.emit();
    }, this.loadDelay);
    
  }

}