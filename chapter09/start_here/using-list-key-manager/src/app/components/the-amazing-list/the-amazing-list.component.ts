import {
  AfterViewInit,
  Component,
  HostListener,
  Input,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { TheAmazingListItemComponent } from '../the-amazing-list-item/the-amazing-list-item.component';
import { AppUserCard } from 'src/interfaces/app-user-card.interface';
import { FocusKeyManager } from '@angular/cdk/a11y';
@Component({
  selector: 'app-the-amazing-list',
  templateUrl: './the-amazing-list.component.html',
  styleUrls: ['./the-amazing-list.component.scss'],
  host: { role: 'list' },
})
export class TheAmazingListComponent implements OnInit, AfterViewInit {
  @Input() listItems: Partial<AppUserCard>[] = [];

  @ViewChildren(TheAmazingListItemComponent)
  listItemsElements: QueryList<TheAmazingListItemComponent>;
  private listKeyManager: FocusKeyManager<TheAmazingListItemComponent>;

  @HostListener('window:keydown', ['$event'])
  onKeydown(event) {
    this.listKeyManager.onKeydown(event);
  }
  constructor() {}
  ngAfterViewInit() {
    this.listKeyManager = new FocusKeyManager(this.listItemsElements);
  }
  ngOnInit(): void {}
}
