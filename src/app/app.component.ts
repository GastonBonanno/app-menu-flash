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

        this.toast.present('bottom', `Listener: ${event.url}`)
        this.navCtrl.navigateRoot('/home', {animated: true}).then()
        // const domain = 'devdactic.com';
        //
        // const pathArray = event.url.split(domain);
        // // The pathArray is now like ['https://devdactic.com', '/details/42']
        //
        // // Get the last element with pop()
        // const appPath = pathArray.pop();
        // if (appPath) {
        //   this.router.navigateByUrl(appPath);
        // }
      });
    });
  }



}
