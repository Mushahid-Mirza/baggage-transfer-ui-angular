import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { DrawerService } from '../services/drawer.service';
import { TitleService } from '../services/title.service';
import { RouterExtService } from '../extensions/router-ext.service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { defaults } from '../defaults';

@Component({
  selector: 'sidenav-common',
  templateUrl: './sidenav-common.component.html',
  styleUrls: ['./sidenav-common.component.css']
})
export class SidenavCommonComponent implements OnInit {

  @Input() hasNav: boolean = defaults.hasSideNav;

  @Input() isBack: boolean = false;

  @Input() searchValue: string = "";

  @Input() title: string = defaults.title;

  @Input() isSearch: boolean = false;

  @Input() isSearchOpen: boolean = false;

  suggestionOpen: boolean = false;

  @Output() onSearch: EventEmitter<string> = new EventEmitter<string>();
  @Output() onSearchSelected: EventEmitter<string> = new EventEmitter<string>();


  @Input() searchText: string = "Search..";

  @Input() suggestionList: any[] = [
    { Text: "item 1", Value: 1, Visible: true },
    { Text: "item 2", Value: 2, Visible: true },
    { Text: "abc 3", Value: 3, Visible: true },
    { Text: "abc 4", Value: 4, Visible: true },
    { Text: "item 5", Value: 5, Visible: true },
    { Text: "def 6", Value: 16, Visible: true },
    { Text: "def 6", Value: 16, Visible: true },
    { Text: "ghjk 6", Value: 16, Visible: true },
    { Text: "ghjk 6", Value: 16, Visible: true }
  ];

  constructor(private drawerService: DrawerService,
    private _location: Location,
    private router: Router,
    private routerExtService: RouterExtService) {


  }

  filterSuggestion(text) {
    this.onSearch.emit(text);
    // this.suggestionList.forEach(i => {
    //   i.Visible = i.Text.indexOf(text) > -1
    // });
  }

  textSelected(item) {
    setTimeout(() => {
      this.isSearchOpen = false;
      this.suggestionOpen = false;
      this.searchValue = item.Text;
      this.onSearchSelected.emit(item);
    }, 100);
  }


  navigateBack() {

    var referrer = this.routerExtService.getPreviousUrl();

    if (referrer != null && referrer != undefined && (referrer.indexOf("/") >= 0)) {

      this._location.back();
    }
    else {
      this.router.navigateByUrl("/", { replaceUrl: true });
    }
  }

  ngOnInit() {

  }

  openDrawer() {
    this.drawerService.open();
  }
}
