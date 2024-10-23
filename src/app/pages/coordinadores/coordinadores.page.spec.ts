import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CoordinadoresPage } from './coordinadores.page';

describe('CoordinadoresPage', () => {
  let component: CoordinadoresPage;
  let fixture: ComponentFixture<CoordinadoresPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CoordinadoresPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
