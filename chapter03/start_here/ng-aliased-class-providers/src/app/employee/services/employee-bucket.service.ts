import { Injectable } from '@angular/core';
import { BucketService } from 'src/app/services/bucket.service';

@Injectable({
  providedIn: 'root',
})
export class EmployeeBucketService extends BucketService {
  constructor() {
    super();
  }

  // Re-escribiendo el método
  removeItem() {
    alert('Employees can not delete items');
  }
}
