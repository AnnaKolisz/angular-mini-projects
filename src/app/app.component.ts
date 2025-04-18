import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    animations: [
        trigger('hamburguerX', [
            state('hamburguer', style({})),
            state('topX', style({
                transform: 'rotate(45deg)',
                transformOrigin: 'left',
                width: '48px'
            })),
            state('hide', style({
                opacity: 0
            })),
            state('bottomX', style({
                transform: 'rotate(-45deg)',
                transformOrigin: 'left',
                width: '48px'
            })),
            transition('* => *', [
                animate('0.2s')
            ]),
        ]),
    ],
    standalone: false
})
export class AppComponent {
  title = 'Love Angular';

  ifMenuIsOpen = false;
  isHamburguer = false;


  manageMenu() {
    this.isHamburguer = !this.isHamburguer;
    this.ifMenuIsOpen = this.isHamburguer;
  }
}
