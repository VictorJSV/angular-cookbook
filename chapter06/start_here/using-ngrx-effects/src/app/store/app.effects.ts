import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { UserService } from '../core/services/user.service';
import { APP_ACTIONS, getUsersFailure, getUsersSuccess } from './app.actions';

/* Ahora vamos a crear un efecto para que podamos escuchar la acción GET_USERS, realizar la llamada a la API y
enviar la acción de éxito en caso de que los datos se obtengan con éxito.
 */
@Injectable()
export class AppEffects {
  constructor(
    private actions$: Actions,
    private userService: UserService
  ) {}
  getUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(APP_ACTIONS.GET_USERS),
      mergeMap(() =>
        this.userService.getUsers().pipe(
          map((users) =>
            getUsersSuccess({ users })
          ),
          catchError(error => of(
            getUsersFailure({ error })
          ))
        )
      )
    )
  );
}
