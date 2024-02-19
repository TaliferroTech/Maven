import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardSearchBarComponent } from './dashboard-search-bar.component';

describe('DashboardSearchBarComponent', () => {
  let component: DashboardSearchBarComponent;
  let fixture: ComponentFixture<DashboardSearchBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardSearchBarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardSearchBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
