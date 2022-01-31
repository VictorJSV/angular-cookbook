import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CounterService } from 'src/app/core/services/counter.service';

import { CounterComponent } from './counter.component';

describe('CounterComponent', () => {
  let component: CounterComponent;
  let fixture: ComponentFixture<CounterComponent>;
  let counterService: CounterService; //-----

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CounterComponent],
      providers: [CounterService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CounterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    counterService = TestBed.inject(CounterService); //-----
  });

  it('should retrieve the last saved value from localStorage on component init', () => {
    spyOn(counterService, 'getFromStorage').and.returnValue(12); //----- spyOn Metodo del Servicio
    component.ngOnInit(); // Ejecutas la funcion getFromStorage
    expect(component.counter).toBe(12);
  });

  it('should save the new counterValue to localStorage on increment, decrement and reset', () => {
    spyOn(counterService, 'saveToStorage'); //----- spyOn Metodo del Servicio
    component.counter = 0;
    component.increment();
    expect(counterService.saveToStorage).toHaveBeenCalledWith(1); // expect
    component.counter = 20;
    component.decrement();
    expect(counterService.saveToStorage).toHaveBeenCalledWith(19); // expect
    component.reset();
    expect(counterService.saveToStorage).toHaveBeenCalledWith(0); // expect
  });
});
