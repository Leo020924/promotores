import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SimpatizantesPage } from './simpatizantes.page';

describe('SimpatizantesPage', () => {
  let component: SimpatizantesPage;
  let fixture: ComponentFixture<SimpatizantesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SimpatizantesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
