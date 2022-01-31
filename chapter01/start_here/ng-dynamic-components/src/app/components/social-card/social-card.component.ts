import {
  Component,
  OnInit,
  Input,
  ComponentFactoryResolver,
  ViewChild,
  ViewContainerRef,
  SimpleChanges
} from '@angular/core';
import { SocialCardType } from 'src/app/constants/social-card-type';

import { FbCardComponent } from '../fb-card/fb-card.component';
import { TwitterCardComponent } from '../twitter-card/twitter-card.component';

@Component({
  selector: 'app-social-card',
  templateUrl: './social-card.component.html',
  styleUrls: ['./social-card.component.scss'],
})
export class SocialCardComponent implements OnInit {
  @Input() type: SocialCardType;
  @ViewChild('vrf', { read: ViewContainerRef }) vrf: ViewContainerRef;
  cardTypes = SocialCardType;
  constructor(private componentFactoryResolver: ComponentFactoryResolver) {}

  ngOnInit(): void {}

  // necesitamos escuchar los cambios en la entrada de tipo.
  // Así, cada vez que cambia, cargamos el componente apropiado de forma dinámica.
  ngOnChanges(changes: SimpleChanges) {
    if (changes.type.currentValue !== undefined) {
      console.log(`card type changed to: ${changes.type.currentValue}`);
      this.loadDynamicComponent(changes.type.currentValue);
    }
  }

  loadDynamicComponent(type: SocialCardType) {
    let component;
    switch (type) {
      case SocialCardType.Facebook:
        component = FbCardComponent;
        break;
      case SocialCardType.Twitter:
        component = TwitterCardComponent;
        break;
    }

    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(component);
    // Si no lo pongo se van a poner uno debjo de otro (No se eliminan)
    this.vrf.clear();
    this.vrf.createComponent(componentFactory);
  }
}
