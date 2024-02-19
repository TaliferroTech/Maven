import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatagorySelectionComponent } from './catagory-selection.component';

describe('CatagorySelectionComponent', () => {
  let component: CatagorySelectionComponent;
  let fixture: ComponentFixture<CatagorySelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CatagorySelectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CatagorySelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
