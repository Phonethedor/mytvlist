import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ContentPage } from './content.page';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { RouterTestingModule } from "@angular/router/testing";

describe('ContentPage', () => {
  let component: ContentPage;
  let fixture: ComponentFixture<ContentPage>;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      providers: [HttpClient, HttpHandler],
      imports: [RouterTestingModule]
    }).compileComponents();
    fixture = TestBed.createComponent(ContentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
