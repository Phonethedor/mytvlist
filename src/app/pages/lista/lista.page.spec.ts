import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { ListaPage, Lista } from './lista.page';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { RouterTestingModule } from "@angular/router/testing";

describe('ListaPage', () => {
  let component: ListaPage;
  let fixture: ComponentFixture<ListaPage>;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      providers: [HttpClient, HttpHandler],
      imports: [RouterTestingModule]
    }).compileComponents();
    fixture = TestBed.createComponent(ListaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
});
