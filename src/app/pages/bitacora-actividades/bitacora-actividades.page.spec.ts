import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BitacoraActividadesPage } from './bitacora-actividades.page';

describe('BitacoraActividadesPage', () => {
  let component: BitacoraActividadesPage;
  let fixture: ComponentFixture<BitacoraActividadesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(BitacoraActividadesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
