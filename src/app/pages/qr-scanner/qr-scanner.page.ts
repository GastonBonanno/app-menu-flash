import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {BarcodeScanner, IScanResultWithContent, IScanResultWithoutContent} from '@capacitor-community/barcode-scanner';
import {AlertController, NavController} from '@ionic/angular';
import {IonicModule} from '@ionic/angular';
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {Router} from "@angular/router";
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {Toast} from "../../utils/toast";
import Swiper from "swiper";

@Component({
  selector: 'app-qr-scanner',
  templateUrl: './qr-scanner.page.html',
  styleUrls: ['./qr-scanner.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],

})
export class QrScannerPage implements OnDestroy, OnInit {

  @ViewChild('swiper')
  swiperRef: ElementRef | undefined;
  swiper?: Swiper

  result: IScanResultWithContent | IScanResultWithoutContent | undefined= undefined;
  isScanActive : boolean = false;

  constructor(private alertController: AlertController,private navCtrl: NavController, private router: Router, private toast: Toast) { }

  async ngOnInit() {
    await this.startScan()
  }

  async startScan() {
    try {
      const allowed = await this.checkPermission();
      if (!allowed) {
        return
      }
      await BarcodeScanner.showBackground()
      document.querySelector('body')?.classList.add('scanner-active');
      this.isScanActive = true;
      // document.body.style.opacity = '0';
      // document.body.style.background = 'transparent';
      this.result = await BarcodeScanner.startScan();
      this.toast.present('bottom', `Result: ${this.result.content}`)
      if (this.result.hasContent) {
        document.querySelector('body')?.classList.remove('scanner-active');
        this.swiper?.slideNext()
      }
      this.isScanActive = false;
    } catch (e) {
      this.stopScan()
    }

  }

  async checkPermission(){
    return await new Promise(async (resolve, reject) => {
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
        await alert.present()
      }else{
        resolve(false);
      }
    });
  }

  stopScan() {
    BarcodeScanner.showBackground()
    BarcodeScanner.stopScan()
    this.isScanActive = false;
    document.querySelector('body')?.classList.remove('scanner-active');
    this.navCtrl.navigateRoot('/home', {animated: true}).then()
  }

  ngOnDestroy(): void {
    this.stopScan()
  }

  protected readonly stop = stop;
}
