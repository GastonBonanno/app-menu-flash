import {Component, NgZone} from '@angular/core';
import { register } from 'swiper/element/bundle';
import {Router} from "@angular/router";
import {App, URLOpenListenerEvent} from "@capacitor/app";
import {Toast} from "./utils/toast";
import {NavController} from "@ionic/angular";

register();

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {



  constructor(private router: Router, private zone: NgZone, private toast: Toast, private navCtrl: NavController) {
    this.initializeApp();
  }

  initializeApp() {
    App.addListener('appUrlOpen', (event: URLOpenListenerEvent) => {
      this.zone.run(() => {
        const domain = 'https://master--menuflash.netlify.app?orderId='
        const pathArray = event.url.split(domain);
        const orderId = pathArray[1].split('&')[0]
        const status = pathArray[1].split('&')[1].split('status=')[1]

        this.navCtrl.navigateRoot(['/after-payment', orderId, status], {animated: true})
      });
    });
  }



}
