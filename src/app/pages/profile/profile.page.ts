import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import {LoginUserRequest, LoginUserResponse, ProfileData} from "../../interfaces/user.interface";
import {UserService} from "../../services/user.service";
import {Toast} from "../../utils/toast";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class ProfilePage implements OnInit {

  nameError: string | null = null;
  cuitError: string | null = null;
  addressError: string | null = null;
  phoneNumberError: string | null = null;

  profileData: ProfileData = {
    name: undefined,
    cuit: undefined,
    address: undefined,
    phoneNumber: undefined,
  };

  constructor(private userService: UserService, private toast: Toast) { }

  saveData() {
    if(this.validateErrors()) {
      this.userService.updateCompanyData(this.profileData).subscribe({
        next: () => {
          this.toast.present('bottom', 'Datos actualizados correctamente').then();
        },
        error: (err) => {
          console.log('error: ', err);
          this.toast.present('bottom', 'Error actualizando datos').then();
        },
      });
    }

  }

  ngOnInit() {
    this.userService.getCompanyData().subscribe({
      next: (resp: ProfileData) => {
        this.profileData.name = resp.name
        this.profileData.cuit = resp.cuit
        this.profileData.address = resp.address
        this.profileData.phoneNumber = resp.phoneNumber
      },
      error: (err) => {
        console.log('error: ', err);
        this.toast.present('bottom', 'Error al obtener datos del perfil').then();
      },
    });
  }

  validateErrors(): boolean {
    return this.nameError === null && this.cuitError === null && this.addressError === null && this.phoneNumberError === null
  }

  validateName() {
    if(this.profileData.name != undefined) {
      if (this.profileData.name?.length >= 100) {
        this.nameError = 'Debe ser menor a 100 caracteres';
      } else {
        this.nameError = null;
      }
    }
  }

  validateCuit() {
    if (this.profileData.cuit != undefined && this.profileData.cuit.toString().length !== 11) {
      this.cuitError = 'Debe contener 11 caracteres';
    } else {
      this.cuitError = null;
    }
  }

  validateAddress() {
    if (this.profileData.address != undefined && this.profileData.address.toString().length >= 100) {
      this.addressError = 'Debe ser menor a 100 caracteres';
    } else {
      this.addressError = null;
    }
  }

  validatePhoneNumber() {
    if (this.profileData.phoneNumber != undefined && this.profileData.phoneNumber.toString().length >= 15) {
      this.phoneNumberError = 'Debe ser menor a 15 caracteres';
    } else {
      this.phoneNumberError = null;
    }
  }



}
