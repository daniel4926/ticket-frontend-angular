import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SiderMenuComponent } from './sider-menu.component';

describe('SiderMenuComponent', () => {
  let component: SiderMenuComponent;
  let fixture: ComponentFixture<SiderMenuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SiderMenuComponent]
    });
    fixture = TestBed.createComponent(SiderMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
