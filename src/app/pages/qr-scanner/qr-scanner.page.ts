import {Component, OnDestroy} from '@angular/core';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { AlertController } from '@ionic/angular';
import {IonicModule} from '@ionic/angular';
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-qr-scanner',
  templateUrl: './qr-scanner.page.html',
  styleUrls: ['./qr-scanner.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class QrScannerPage implements OnDestroy {
  result = '';
  isScanActive : boolean = false;

  constructor(private alertController: AlertController) { }

  async stopScanner(){
    await BarcodeScanner.stopScan();
    this.isScanActive = false;
  }

  async startScanner(){
    // const allowed = await this.checkPermission();
    const status = await BarcodeScanner.checkPermission({force: true})
    // if(status.granted){
      this.isScanActive = true;
      const result = await BarcodeScanner.startScan();
      if(result.hasContent){
        this.result = result.content;
      }
      this.isScanActive = false;
    // }
  }

  async checkPermission(){
    return new Promise(async (resolve, reject) => {
      const status = await BarcodeScanner.checkPermission({force: true});
      if(status.granted){
        resolve(true);
      }else if (status.denied){
        const alert = await this.alertController.create({
          header: 'No Permission',
          message: 'Please allow camera access in your settings',
          buttons: [{
            text: 'No',
            role: 'cancel'
          },
            {
              text: 'Open Settings',
              handler: () => {
                resolve(false);
                BarcodeScanner.openAppSettings();
              }
            }
          ]
        });
      }else{
        resolve(false);
      }
    });
  }

  ngOnDestroy(): void {
    BarcodeScanner.stopScan();
  }

}
