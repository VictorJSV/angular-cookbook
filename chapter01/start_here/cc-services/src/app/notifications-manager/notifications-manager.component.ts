import { Component, OnInit } from '@angular/core';
import { NotificationsService } from '../services/notifications.service';

import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';
@Component({
  selector: 'app-notifications-manager',
  templateUrl: './notifications-manager.component.html',
  styleUrls: ['./notifications-manager.component.scss'],
})
export class NotificationsManagerComponent implements OnInit {
  notificationsCount$: Observable<number>; // Convirtiendo a un Observable
  constructor(private notificationsService: NotificationsService) {}

  ngOnInit(): void {
    this.notificationsCount$ = this.notificationsService.count$;
  }

  getCountValue(callback) {
    // first() => Esto sirve para obtener su útimo valor
    this.notificationsCount$.pipe(first()).subscribe(callback);
  }

  addNotification() {
    this.getCountValue((countVal) => {
      this.notificationsService.setCount(++countVal);
    });
  }

  removeNotification() {
    /* if (this.notificationsCount == 0) {
      return;
    }
    this.notificationsCount--; */
    this.getCountValue((countVal) => {
      if (countVal === 0) {
        return;
      }
      this.notificationsService.setCount(--countVal);
    });
  }

  resetCount() {
    // this.notificationsCount = 0;
    this.notificationsService.setCount(0);
  }
}
