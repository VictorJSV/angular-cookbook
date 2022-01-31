import { FocusKeyManager } from '@angular/cdk/a11y';
import { AfterViewInit, ChangeDetectorRef, Component, HostListener, Input, OnInit, QueryList, ViewChildren } from '@angular/core';
import { AppUserCard } from 'src/interfaces/app-user-card.interface';
import { TheAmazingListItemComponent } from '../the-amazing-list-item/the-amazing-list-item.component';
import { CdkOverlayOrigin } from '@angular/cdk/overlay';

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

  popoverMenuTrigger: CdkOverlayOrigin;
  menuShown = false;
  menuPositions = [
    { offsetY: 4, originX: 'end', originY: 'bottom',
      overlayX: 'end', overlayY: 'top' },
    { offsetY: -4, originX: 'end', originY: 'top',
      overlayX: 'end', overlayY: 'bottom' },
  ];
  constructor(private cdRef: ChangeDetectorRef) {}

  // Para la directiva de posicion Popover
  menuPopoverOrigin = { originY: null };
  private listKeyManager: FocusKeyManager<TheAmazingListItemComponent>;

  @HostListener('window:keydown', ['$event'])
  onKeydown(event) { this.listKeyManager.onKeydown(event); }

  // Para la directiva de posicion Popover
  popoverPositionChanged($event, popover) {
    if (popover.originY !== $event.connectionPair.originY) {
      popover.originY = $event.connectionPair.originY;
    }
    this.cdRef.detectChanges();
  }
  openMenu($event, itemTrigger) {
    if ($event) {
      $event.stopImmediatePropagation();
    }
    this.popoverMenuTrigger = itemTrigger;
    this.menuShown = true;
  }
  ngAfterViewInit() {
    this.listKeyManager = new FocusKeyManager(this.listItemsElements);
  }
  ngOnInit(): void {}
}
