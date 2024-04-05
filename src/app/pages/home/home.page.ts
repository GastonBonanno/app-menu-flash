import {Component} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {IonicModule, NavController} from '@ionic/angular';

import {Toast} from "../../utils/toast";
import {TokenService} from "../../services/token.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class HomePage {
  datetime: any;

  constructor(private navCtrl: NavController, private tokenService: TokenService) {
  }

  openProfile(){
    this.navCtrl.navigateRoot('/profile', {animated: true}).then()
  }

  openQrScan(){
    this.navCtrl.navigateRoot('/scanQr', {animated: true}).then()
  }

  openMyOrders(){
    this.navCtrl.navigateRoot('/orders', {animated: true}).then()
  }

  logout() {
    this.navCtrl.navigateRoot('/login', {animated: true}).then()
  }

}
