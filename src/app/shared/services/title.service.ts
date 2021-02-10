import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators'; 

@Injectable({
  providedIn: 'root'
})
export class TitleService {


  private toolBarUpdatedSource = new Subject<any>();
  private toolBarResetSource = new Subject<any>();
  private titleUpdatedSource = new Subject<string>();
  private titleResetSource = new Subject();

  toolBarUpdated$ = this.toolBarUpdatedSource.asObservable();
  toolBarReset$ = this.toolBarResetSource.asObservable(); 
  titleUpdated$ = this.titleUpdatedSource.asObservable();
  titleReset$ = this.titleResetSource.asObservable();

  updateToolbar(_hasAppIcon: boolean, _hasSearch: boolean, _hasNav: boolean, _hasIcons: boolean) {

    var toolBarSetting = {
      _hasAppIcon: _hasAppIcon,
      hasSearch: _hasSearch,
      hasDrawer: _hasNav,
      hasCart: _hasIcons
    }
    this.toolBarUpdatedSource.next(toolBarSetting);
  }

  resetToolBar() {
    this.toolBarResetSource.next();
  }

  // updateTitle(_title : string){
  //   this.titleUpdatedSource.next(_title);
  // }

  // resetTitle(){
  //   this.titleResetSource.next();
  // }

  constructor() { }
}
