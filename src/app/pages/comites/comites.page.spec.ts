import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ComitesPage } from './comites.page';

describe('ComitesPage', () => {
  let component: ComitesPage;
  let fixture: ComponentFixture<ComitesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ComitesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
