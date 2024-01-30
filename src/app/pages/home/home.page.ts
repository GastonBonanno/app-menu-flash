import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {IonicModule, NavController} from '@ionic/angular';
import {Toast} from "../../utils/toast";

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class HomePage  {
  datetime: any;


  constructor(private navCtrl: NavController) {
  }

  readQr(){
    console.log('Open camera')
  }

  openProfile(){
    console.log('Open Profile')
    this.navCtrl.navigateRoot('/profile', {animated: true}).then()
  }

  openMyOrders(){
    console.log('Open My Orders')
    this.navCtrl.navigateRoot('/orders', {animated: true}).then()
  }


}
