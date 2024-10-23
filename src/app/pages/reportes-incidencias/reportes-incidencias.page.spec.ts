import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReportesIncidenciasPage } from './reportes-incidencias.page';

describe('ReportesIncidenciasPage', () => {
  let component: ReportesIncidenciasPage;
  let fixture: ComponentFixture<ReportesIncidenciasPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportesIncidenciasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
