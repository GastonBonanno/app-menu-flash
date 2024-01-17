import { Component } from '@angular/core';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-qr-scanner',
  templateUrl: './qr-scanner.page.html',
  styleUrls: ['./qr-scanner.page.scss'],
})
export class QrScannerPage  {

  constructor() { }



  //
  // ngOnInit() {
  //   BarcodeScanner.isSupported().then((result) => {
  //     this.isSupported = result.supported;
  //   });
  // }
  //
  // async scan(): Promise<void> {
  //   const granted = await this.requestPermissions();
  //   if (!granted) {
  //     this.presentAlert();
  //     return;
  //   }
  //   const { barcodes } = await BarcodeScanner.scan();
  //   this.barcodes.push(...barcodes);
  // }
  //
  // async requestPermissions(): Promise<boolean> {
  //   const { camera } = await BarcodeScanner.requestPermissions();
  //   return camera === 'granted' || camera === 'limited';
  // }
  //
  // async presentAlert(): Promise<void> {
  //   const alert = await this.alertController.create({
  //     header: 'Permission denied',
  //     message: 'Please grant camera permission to use the barcode scanner.',
  //     buttons: ['OK'],
  //   });
  //   await alert.present();
  // }

}
