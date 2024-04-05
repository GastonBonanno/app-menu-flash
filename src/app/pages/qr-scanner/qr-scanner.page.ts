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
import {ClientOrderResponse, CreateClientOrder, OrderItem} from "../../interfaces/order.interface";
import {MenuService} from "../../services/menu.service";
import {OrderService} from "../../services/order.service";
import {MercadopagoService} from "../../services/mercadopago.service";
import {Preference} from "../../interfaces/mercadopago.interface";
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
    itemName: undefined,
    description: undefined,
    price: undefined,
    quantity: undefined,
    additionalComments: undefined,
    itemMenuId: undefined,
  }
  isModalItemOpen: boolean = false
  orderItemList: OrderItem[] = []
  menuId: string | undefined = undefined

  clientOrderResponse: ClientOrderResponse | undefined = undefined

  qrString: string | undefined = undefined
  mercadopago: any
  mercadopagoController: any = undefined

  constructor(
    private alertController: AlertController,
    private navCtrl: NavController,
    private router: Router,
    private toast: Toast,
    private menuService: MenuService,
    private orderService: OrderService,
    private mercadopagoService: MercadopagoService,
  ) { }

  async ngOnInit() {
    // @ts-ignore
    this.mercadopago = new MercadoPago('TEST-300bd4a1-8683-426b-9a36-c00fe4a31829', {
      locale: 'es-AR'
    });
    await this.startScan()
  }

  async startScan() {
    try {
      // const allowed = await this.checkPermission();
      // if (!allowed) {
      //   return
      // }
      await BarcodeScanner.showBackground()
      document.querySelector('body')?.classList.add('scanner-active');
      this.isScanActive = true;
      // this.scanResult = await BarcodeScanner.startScan();
      // this.toast.present('bottom', `Result: ${this.scanResult.content}`)
      // if (this.scanResult.hasContent) {
      //   this.qrString = this.scanResult?.content
        this.qrString = '1,mesa4'
        this.menuId = this.formatResultMenuId()
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

  formatResultMenuId(): string | undefined{
    return this.qrString?.split(',')[0]
  }

  formatResultTableName(): string | undefined {
    return this.qrString?.split(',')[1]
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

  goToMenu() {
    let swiper: Swiper = this.swiperRef?.nativeElement.swiper
    swiper.allowTouchMove = false
    swiper.on("slideChange", () => this.scrollToTop())
    swiper.slideTo(1)
  }

  goToPreview() {
    if(this.totalItems() > 0) {
      let swiper: Swiper = this.swiperRef?.nativeElement.swiper
      swiper.allowTouchMove = false
      swiper.on('slideChange', () => this.scrollToTop())
      swiper.slideTo(2)
    } else {
      this.toast.present('bottom', 'No hay items en el carrito')
    }
  }

  createMercadopagoButton() {
    this.mercadopagoService.createPreference().subscribe({
      next: async (resp: Preference) => {
        if (resp !== null) {
          console.log('resp::', resp)

          if(this.mercadopagoController)
            this.mercadopagoController.unmount()

          this.mercadopagoController = await this.mercadopago.bricks().create("wallet", "wallet_container", {
            initialization: {
              preferenceId: resp.id,
            },
            customization: {
              texts: {
                valueProp: 'smart_option',
              },
            },
          });

        } else {
          console.log('Error en el pago');
          this.toast.present('bottom', 'Error en el pago')
          this.navCtrl.navigateRoot('/home', {animated: true}).then()
        }
      },
      error: (err) => {
        console.log('Error al crear orden', err);
        this.toast.present('bottom', 'Error al crear orden')
        this.navCtrl.navigateRoot('/home', {animated: true}).then()
      }
    })
  }

  createOrder() {
    let idString: string | undefined = this.formatResultMenuId();
    let id: number = (idString != undefined ) ? +idString : 0;
    let createClientOrder: CreateClientOrder = {
      tableName: this.formatResultTableName(),
      companyMenuId: id,
      clientOrderItemDto: this.orderItemList
    }

    this.orderService.createOrder(createClientOrder).subscribe({
      next: (resp: ClientOrderResponse) => {
        if(resp !== null) {
          this.clientOrderResponse = resp
          this.goToAfterPayment()
        } else {
          console.log('Error al crear orden');
          this.toast.present('bottom', 'Error al crear orden')
          this.navCtrl.navigateRoot('/home', {animated: true}).then()
        }
      },
      error: (err) => {
        console.log('Error al crear orden', err);
        this.toast.present('bottom', 'Error al crear orden')
        this.navCtrl.navigateRoot('/home', {animated: true}).then()
      }
    })
  }

  goToAfterPayment() {
    let swiper: Swiper = this.swiperRef?.nativeElement.swiper
    swiper.allowTouchMove = false
    swiper.on('slideChange', () => this.scrollToTop())
    swiper.slideTo(4)
  }

  goToMercadopago() {
    this.createMercadopagoButton()
    let swiper: Swiper = this.swiperRef?.nativeElement.swiper
    swiper.allowTouchMove = false
    swiper.on('slideChange', () => this.scrollToTop())
    swiper.slideTo(3)
  }

  setOpenModalItem(isOpen: boolean, item: ItemMenuResponse | undefined) {
    if(isOpen && item !== undefined) {
      this.isModalItemOpen = true
      this.orderItem = {
        itemName: item.name,
        description: item.description,
        price: item.price,
        quantity: 1,
        additionalComments: undefined,
        itemMenuId: item.id
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
      itemName: undefined,
      description: undefined,
      price: undefined,
      quantity: undefined,
      additionalComments: undefined,
      itemMenuId: undefined,
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

  removeItem(item: OrderItem) {
    const index = this.orderItemList.indexOf(item, 0);
    if (index > -1) {
      this.orderItemList.splice(index, 1);
    }
    if(this.orderItemList.length <= 0) {
      this.goToMenu()
    }
  }

  goHome() {
    this.navCtrl.navigateRoot('/home', {animated: true}).then()
  }

  scrollToTop() {
    // window.scrollTo({ top: 0, behavior: 'smooth' });
    // window.scrollTo(0, 0);
  }

  protected readonly stop = stop;
  protected readonly undefined = undefined;
}
