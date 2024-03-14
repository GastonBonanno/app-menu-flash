import { Component, OnInit } from '@angular/core';
import {IonicModule, NavController} from "@ionic/angular";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {MenuService} from "../../services/menu.service";
import {ItemMenuResponse, MenuResponse} from "../../interfaces/menu.interface";
import {Toast} from "../../utils/toast";
import {OrderItem} from "../../interfaces/order.interface";
import {ActivatedRoute, NavigationExtras, Router} from "@angular/router";
import {refresh} from "ionicons/icons";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class MenuPage implements OnInit {

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
  menuId: number | undefined = undefined

  constructor(
    private menuService: MenuService,
    private navCtrl: NavController,
    private router: Router,
    private toast: Toast,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      console.log('params1: ', params);
      if (params) {
        console.log('params2: ', params);
        // menuId
      }
    })
    this.menuService.getMenuById("1").subscribe({
      next: (resp: MenuResponse) => {
        if(resp !== null)
          this.menuResponse = resp;
      },
      error: (err) => {
        console.log('No se encontro el menu: ', err);
        this.toast.present('bottom', 'Menu no encontrado')
        this.navCtrl.navigateRoot('/home', {animated: true}).then()
      }
    })
  }

  addOneOrderQuantity() {
    if(this.orderItem.quantity! < 25)
      this.orderItem.quantity = this.orderItem.quantity! + 1
  }
  removeOneOrderQuantity() {
    if(this.orderItem.quantity! > 1)
      this.orderItem.quantity = this.orderItem.quantity! - 1
  }

  goToOrderPreview() {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        orderItemList: JSON.stringify(this.orderItemList)
      }
    };
    // this.navCtrl.navigateForward(['/orderPreview'], true, navigationExtras).then()
    this.router.navigate(['orderPreview'], navigationExtras)
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
    console.log('orderItemList: ', this.orderItemList)
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

}
