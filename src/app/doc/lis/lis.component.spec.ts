import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LisComponent } from './lis.component';

describe('LisComponent', () => {
  let component: LisComponent;
  let fixture: ComponentFixture<LisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LisComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
