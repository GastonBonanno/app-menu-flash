import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {BarcodeScanner, IScanResultWithContent, IScanResultWithoutContent} from '@capacitor-community/barcode-scanner';
import {AlertController, NavController} from '@ionic/angular';
import {IonicModule} from '@ionic/angular';
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {ActivatedRoute, NavigationExtras, Router} from "@angular/router";
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {Toast} from "../../utils/toast";
import Swiper from "swiper";
import {register} from "swiper/element/bundle";
import {ItemMenuResponse, MenuResponse} from "../../interfaces/menu.interface";
import {OrderItem} from "../../interfaces/order.interface";
import {MenuService} from "../../services/menu.service";
register()

@Component({
  selector: 'app-qr-scanner',
  templateUrl: './qr-scanner.page.html',
  styleUrls: ['./qr-scanner.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],

})
export class QrScannerPage implements OnInit {
  @ViewChild('swiper')
  swiperRef: ElementRef | undefined;

  scanResult: IScanResultWithContent | IScanResultWithoutContent | undefined= undefined;
  isScanActive : boolean = false;

  menuResponse: MenuResponse = {
    id: 0,
    branch: '',
    title: '',
    description: '',
    header: '',
    footer: '',
    companyDataId: 0,
    active: true,
    createdAt: null,
    modifiedAt: null,
    deletedAt: null,
    listCategory: []
  };

  orderItem: OrderItem = {
    name: undefined,
    description: undefined,
    price: undefined,
    quantity: undefined,
    additionalComments: undefined,
  }
  isModalItemOpen: boolean = false
  orderItemList: OrderItem[] = []
  menuId: string | undefined = undefined


  constructor(
    private alertController: AlertController,
    private navCtrl: NavController,
    private router: Router,
    private toast: Toast,
    private menuService: MenuService,
    private activatedRoute: ActivatedRoute
  ) { }

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
      // this.scanResult = await BarcodeScanner.startScan();
      // this.toast.present('bottom', `Result: ${this.scanResult.content}`)
      // if (this.scanResult.hasContent) {
        this.menuId = '1'
        document.querySelector('body')?.classList.remove('scanner-active');
      // }
      this.isScanActive = false;
    } catch (e) {
      console.log('Error: ', e)
      this.stopScan()
    }
    this.goToMenu()
    this.findMenu()
  }

  formatResultMenuId(qrResult: string): string {
    return qrResult.split(',')[0]
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


  addOneOrderQuantity() {
    if(this.orderItem.quantity! < 25)
      this.orderItem.quantity = this.orderItem.quantity! + 1
  }
  removeOneOrderQuantity() {
    if(this.orderItem.quantity! > 1)
      this.orderItem.quantity = this.orderItem.quantity! - 1
  }

  goToNextSlide() {
    let swiper: Swiper = this.swiperRef?.nativeElement.swiper
    swiper.slideNext()
  }

  goToMenu() {
    let swiper: Swiper = this.swiperRef?.nativeElement.swiper
    swiper.slideTo(1)
  }

  goToReview() {
    if(this.totalItems() > 0) {
      let swiper: Swiper = this.swiperRef?.nativeElement.swiper
      swiper.slideTo(2)
    } else {
      this.toast.present('bottom', 'No hay items en el carrito')
    }
  }


  setOpenModalItem(isOpen: boolean, item: ItemMenuResponse | undefined) {
    if(isOpen && item !== undefined) {
      this.isModalItemOpen = true
      this.orderItem = {
        name: item.name,
        description: item.description,
        price: item.price,
        quantity: 1,
        additionalComments: undefined,
      }
    } else {
      this.isModalItemOpen = false
    }
  }

  addItemToOrderList() {
    this.orderItemList.push(this.orderItem)
  }

  clearItem() {
    this.orderItem = {
      name: undefined,
      description: undefined,
      price: undefined,
      quantity: undefined,
      additionalComments: undefined,
    }
  }

  findMenu() {
    this.menuService.getMenuById(this.menuId).subscribe({
      next: (resp: MenuResponse) => {
        if(resp !== null)
          this.menuResponse = resp;
        else {
          console.log('No se encontró el menu');
          this.toast.present('bottom', 'Menu no encontrado')
          this.navCtrl.navigateRoot('/home', {animated: true}).then()
        }
      },
      error: (err) => {
        console.log('No se encontró el menu: ', err);
        this.toast.present('bottom', 'Menu no encontrado')
        this.navCtrl.navigateRoot('/home', {animated: true}).then()
      }
    })
  }

  totalToPay(): number {
    let total = 0
    this.orderItemList.forEach(i => {
      if(i.price && i.quantity)
        total += i.price * i.quantity
    })
    return total
  }

  totalItems(): number {
    let totalItems = 0
    this.orderItemList.forEach(i => {
      if(i.quantity != undefined)
        totalItems += i.quantity
    })
    return totalItems
  }

  protected readonly stop = stop;
}
