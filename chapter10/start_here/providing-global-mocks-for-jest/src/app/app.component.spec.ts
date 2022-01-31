import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { CounterComponent } from './components/counter/counter.component';

const pageTitle = 'Providing global mocks for Jest';

describe('AppComponent', () => {
  //1. Configuras el componente
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [AppComponent, CounterComponent], // Los componentes que se van a renderizar
    }).compileComponents();
  }));

  it('should create the app', () => {
    //2. Creas el componente
    const fixture = TestBed.createComponent(AppComponent);
    //3. Obtienes la instancia
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title '${pageTitle}'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual(pageTitle);
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    //3. Puedesdetectar cambios
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    // Buscar un tag y comparas con toContain
    expect(compiled.querySelector('.toolbar span').textContent).toContain(
      pageTitle
    );
  });
});
