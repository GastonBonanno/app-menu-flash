import {AfterViewInit, Component, OnDestroy} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {IonicModule, NavController} from '@ionic/angular';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';


import {Toast} from "../../utils/toast";

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class HomePage implements OnDestroy{
  datetime: any;
  isScanActive : boolean = false;

  constructor(private navCtrl: NavController) {
  }


  async stopScanner(){
     await BarcodeScanner.stopScan();
     this.isScanActive = false;
  }
  async readQr(){

    this.isScanActive = true;
    await BarcodeScanner.checkPermission({ force: true });
    const result = await BarcodeScanner.startScan();
    console.log('Open camera');


    if (result.hasContent) {
      // Aquí puedes hacer lo que desees con la información del código QR
      // por ejemplo, enviarlo a una API, navegar a una página específica, etc.
      alert('Código QR escaneado: ' + result.content);

    }
    this.isScanActive = false;
  }

  openProfile(){
    console.log('Open Profile')
    this.navCtrl.navigateRoot('/profile', {animated: true}).then()
  }

  openMyOrders(){
    console.log('Open My Orders')
    this.navCtrl.navigateRoot('/orders', {animated: true}).then()
  }

  ngOnDestroy(): void {
    BarcodeScanner.stopScan();
  }



}
