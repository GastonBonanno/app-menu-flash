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


  constructor() {
  }

  readQr(){
    console.log('Open camera')
  }

  openProfile(){
    console.log('Open Profile')
  }



}
