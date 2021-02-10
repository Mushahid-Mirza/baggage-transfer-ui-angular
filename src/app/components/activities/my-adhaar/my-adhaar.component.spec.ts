import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyAdhaarComponent } from './my-adhaar.component';

describe('MyAdhaarComponent', () => {
  let component: MyAdhaarComponent;
  let fixture: ComponentFixture<MyAdhaarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyAdhaarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyAdhaarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
