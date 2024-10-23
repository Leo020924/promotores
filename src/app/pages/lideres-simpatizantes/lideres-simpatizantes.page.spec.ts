import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LideresSimpatizantesPage } from './lideres-simpatizantes.page';

describe('LideresSimpatizantesPage', () => {
  let component: LideresSimpatizantesPage;
  let fixture: ComponentFixture<LideresSimpatizantesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(LideresSimpatizantesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
