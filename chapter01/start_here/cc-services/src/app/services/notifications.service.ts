import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

// BehaviorSubject es un tipo especial de Observable que requiere un valor inicial y puede ser utilizado por muchos suscriptores
@Injectable({
  providedIn: 'root',
})
export class NotificationsService {
  private count: BehaviorSubject<number> = new BehaviorSubject<number>(10);
  count$: Observable<number> = this.count.asObservable(); // Creando un Observable con .asObservable()
  constructor() {}

  setCount(countVal) {
    // Con el método .next() se actualiza la variable observable y lo actualiza en ambos componentes
    this.count.next(countVal);
  }
}
