import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from '../core/services/user.service';
import { IUser } from '../core/interfaces/user.interface';
import { FormControl, FormGroup } from '@angular/forms';
import { debounceTime, takeWhile } from 'rxjs/operators';

import { AppState } from '../store/app.reducer';
import { Store } from '@ngrx/store';
import { getUsers } from '../store/app.actions';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  users$: Observable<IUser[]> = this.store.select(
    (state) => state['app'].users);
  constructor(
    //private userService: UserService,
    private store: Store<AppState>
  ) {}
  ngOnInit() {
    this.store.dispatch(getUsers());
    //this.users$ = this.userService.getUsers();
  }
  ngOnDestroy() {}
}
