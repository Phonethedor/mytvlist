import { ComponentFixture, TestBed} from '@angular/core/testing';
import { SeriePage } from './serie.page';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { RouterTestingModule } from "@angular/router/testing";

describe('SeriePage', () => {
  let component: SeriePage;
  let fixture: ComponentFixture<SeriePage>;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      providers: [HttpClient, HttpHandler],
      imports: [RouterTestingModule]
    }).compileComponents();

    fixture = TestBed.createComponent(SeriePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
