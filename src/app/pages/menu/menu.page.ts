import { Component, OnInit } from '@angular/core';
import {IonicModule, NavController} from "@ionic/angular";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {MenuService} from "../../services/menu.service";
import {MenuResponse} from "../../interfaces/menu.interface";
import {Toast} from "../../utils/toast";

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

  constructor(
    private menuService: MenuService,
    private navCtrl: NavController,
    private toast: Toast
  ) {}

  ngOnInit() {
    this.menuService.getMenuById("1").subscribe({
      next: (resp: MenuResponse) => {
        this.menuResponse = resp;
      },
      error: (err) => {
        console.log('No se encontro el menu: ', err);
        this.toast.present('bottom', 'Menu no encontrado')
        this.navCtrl.navigateRoot('/home', {animated: true}).then()
      }
    })
  }
}
