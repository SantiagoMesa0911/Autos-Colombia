import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehiculosActivosComponent } from './vehiculos-activos.component';

describe('VehiculosActivosComponent', () => {
  let component: VehiculosActivosComponent;
  let fixture: ComponentFixture<VehiculosActivosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VehiculosActivosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VehiculosActivosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
