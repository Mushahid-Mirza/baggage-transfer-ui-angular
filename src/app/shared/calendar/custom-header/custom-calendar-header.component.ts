import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject,
  OnDestroy,
  Input,
  Output,
  EventEmitter,
  OnInit
} from '@angular/core';
// import { MatCalendar } from '@angular/material/datepicker';
// import { DateAdapter, MAT_DATE_FORMATS, MatDateFormats } from '@angular/material/core';
// import { Subject } from 'rxjs';
// import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'custom-calendar-header',
  templateUrl: './custom-calendar-header.component.html',
  styleUrls: ['./custom-calendar-header.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomCalendarHeaderComponent implements OnInit {


  // private _destroyed = new Subject<void>();
  // implements OnDestroy

  @Input()
  @Output()
  date: Date = new Date();


  @Input()
  minDate: Date = new Date(2000, 12);

  @Input()
  maxDate: Date = new Date(2100, 15);

  @Output() valueChanged = new EventEmitter<Date>();

  constructor() {
  }

  ngOnInit(): void {

  }

  previousClicked(mode: 'month' | 'year') {

    let month = mode == 'month' ? (this.date.getMonth() > 0 ? this.date.getMonth() - 1 : 11) : this.date.getMonth();

    let year = this.date.getMonth() > 0 ? this.date.getFullYear() : this.date.getFullYear() - 1;

    year = mode == 'year' && year > this.minDate.getFullYear() ? year - 1 : year;

    this.date = new Date(year, month);

    this.date = this.date < this.minDate ? this.minDate : this.date;

    this.valueChanged.emit(this.date);
  }

  nextClicked(mode: 'month' | 'year') {

    let month = mode == 'month' ? (this.date.getMonth() < 11 ? this.date.getMonth() + 1 : 0) : this.date.getMonth();

    let year = this.date.getMonth() < 11 ? this.date.getFullYear() : this.date.getFullYear() + 1;

    year = mode == 'year' && year < this.maxDate.getFullYear() ? year + 1 : year;

    this.date = new Date(year, month);

    this.date = this.date > this.maxDate ? this.maxDate : this.date;

    this.valueChanged.emit(this.date);
  }

}
