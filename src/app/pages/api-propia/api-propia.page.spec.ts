import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ApiPropiaPage } from './api-propia.page';

describe('ApiPropiaPage', () => {
  let component: ApiPropiaPage;
  let fixture: ComponentFixture<ApiPropiaPage>;

  beforeEach(async() => {
    fixture = TestBed.createComponent(ApiPropiaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
