import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IFruit } from '../interfaces/fruit.interface';
import { IBucketService } from '../interfaces/bucket-service';
import { ComponentStore } from '@ngrx/component-store';

export interface BucketState {
  bucket: IFruit[];
}
@Injectable({
  providedIn: 'root',
})
export class BucketService
  extends ComponentStore<BucketState>
  implements IBucketService
{
  // bucketSource = new BehaviorSubject([]);
  readonly bucket$: Observable<IFruit[]> = this.select((state) => state.bucket);
  //bucket$: Observable<IFruit[]> = this.bucketSource.asObservable();
  constructor() {
    super({
      bucket: [],
    });
  }

  loadItems() {
    const bucket = JSON.parse(window.localStorage.getItem('bucket') || '[]');
    // this.bucketSource.next(bucket);
    this.setState({
      bucket,
    });
  }

  /* addItem(fruit: IFruit) {
    const bucket = [fruit, ...this.bucketSource.value];
    this.bucketSource.next(bucket);
    window.localStorage.setItem('bucket', JSON.stringify(bucket));
  } */

  readonly addItem = this.updater((state, fruit: IFruit) => {
    const bucket = [fruit, ...state.bucket];
    window.localStorage.setItem('bucket', JSON.stringify(bucket));
    return {
      bucket,
    };
  });

  /* removeItem(fruit: IFruit) {
    const bucket = this.bucketSource.value.filter(
      (item) => item.id !== fruit.id
    );
    this.bucketSource.next([...bucket]);
    window.localStorage.setItem('bucket', JSON.stringify(bucket));
  } */

  readonly removeItem = this.updater((state, fruit: IFruit) => {
    const bucket = state.bucket.filter((item) => item.id !== fruit.id);
    window.localStorage.setItem('bucket', JSON.stringify(bucket));
    return {
      bucket,
    };
  });
}
