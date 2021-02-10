import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidenavCommonComponent } from './sidenav-common.component';

describe('SidenavCommonComponent', () => {
  let component: SidenavCommonComponent;
  let fixture: ComponentFixture<SidenavCommonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SidenavCommonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidenavCommonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
