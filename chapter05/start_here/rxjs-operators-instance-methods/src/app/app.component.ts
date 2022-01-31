import { Component } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { map, merge } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  subscription: Subscription = null;
  inputStreamData = ['john wick', 'inception', 'interstellar'];
  cartoonsStreamData = ['thunder cats', 'Dragon Ball Z', 'Ninja Turtles'];
  outputStreamData = [];

  ngOnInit() {}

  startStream() {
    const cartoonStreamSource = interval(1000).pipe(
      map((output) => output % this.cartoonsStreamData.length),
      map((index) => this.cartoonsStreamData[index])
    );

    this.subscription = interval(1500)
      .pipe(
        map((output) => output % this.inputStreamData.length),
        map((index) => this.inputStreamData[index]),
        merge(cartoonStreamSource)
      )
      .subscribe((input) => {
        this.outputStreamData.push(input);
      });
  }

  stopStream() {
    this.subscription.unsubscribe();
    this.subscription = null;
  }
}
