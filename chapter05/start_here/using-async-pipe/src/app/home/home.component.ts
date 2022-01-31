import { Component, OnInit, OnDestroy } from '@angular/core';
import { merge, Observable } from 'rxjs';
import { interval } from 'rxjs/internal/observable/interval';
import { Subscription } from 'rxjs/internal/Subscription';
import { map, takeWhile } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  isComponentAlive: boolean;
  //subscription: Subscription = null;
  inputStreamData = ['john wick', 'inception', 'interstellar'];
  streamsOutput$: Observable<number[]>;
  outputStreamData = [];

  constructor() {}

  ngOnInit() {
    this.startStream();
  }

  ngOnDestroy() {
    //this.stopStream();
  }

  startStream() {
    this.isComponentAlive = true;
    const streamSource = interval(1500);
    const secondStreamSource = interval(3000);
    const fastestStreamSource = interval(500);
    this.streamsOutput$ = merge(
      streamSource,
      secondStreamSource,
      fastestStreamSource
    ).pipe(
      // takeWhile(() => !!this.isComponentAlive),
      map((output) => {
        console.log(output)
        this.outputStreamData = [...this.outputStreamData, output];
        return this.outputStreamData;
      })
    );
    /* streamSource
      .pipe(takeWhile(() => !!this.isComponentAlive))
      .subscribe((input) => {
        this.outputStreamData.push(input);
        console.log('1500 stream output', input);
      });
    secondStreamSource
      .pipe(takeWhile(() => !!this.isComponentAlive))
      .subscribe((input) => {
        this.outputStreamData.push(input);
        console.log('3000 second stream output', input);
      });
    fastestStreamSource
      .pipe(takeWhile(() => !!this.isComponentAlive))
      .subscribe((input) => {
        this.outputStreamData.push(input);
        console.log('500                                                                                      fastest stream output', input);
      }); */
  }

  stopStream() {
    this.isComponentAlive = false;
  }
}
