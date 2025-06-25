import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SupportedPagesPage } from './supported-pages.page';

describe('SupportedPagesPage', () => {
  let component: SupportedPagesPage;
  let fixture: ComponentFixture<SupportedPagesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SupportedPagesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
