import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, IonModal, NavController } from '@ionic/angular';
import {
  CreateUserRequest,
  CreateUserResponse,
  LoginUserRequest,
  LoginUserResponse,
} from '../../interfaces/user.interface';
import { UserService } from '../../services/user.service';
import { Toast } from '../../utils/toast';
import { TokenService } from '../../services/token.service';
import {tap} from "rxjs";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class LoginPage implements OnInit {
  itemSrc: string = '/assets/logoMenu-Flash.png';

  loginUser: LoginUserRequest = {
    email: '',
    password: '',
  };

  userToCreate: CreateUserRequest = {
    email: '',
    password: '',
    repeatedPassword: '',
  };
  emailError: string | null = null;
  passwordError: string | null = null;
  repeatedPasswordError: string | null = null;

  constructor(
    private userService: UserService,
    private navCtrl: NavController,
    private toast: Toast,
    private tokenService: TokenService
  ) {}

  login() {
    this.userService.login(this.loginUser).subscribe({
      next: (resp: LoginUserResponse) => {
        this.tokenService.saveToken(resp.token)
        this.navCtrl.navigateRoot('/home', {animated: true}).then()
       },
      error: (err) => {
        console.log('error: ', err);
        this.toast.present('bottom', 'Usuario o contraseña incorrectos').then();
      },
    });
  }

  async createUser(modal: IonModal) {
    if(this.validateErrors()) {
      this.userService.createUser(this.userToCreate).subscribe({
        next: (resp: CreateUserResponse) => {
          this.toast.present('bottom', 'Usuario creado correctamente');
          modal.dismiss();
          return resp;
        },
        error: (err) => {
          console.log('error createUser: ', err);
          this.toast.present('bottom', 'Error al crear usuario');
          modal.dismiss();
        },
      });
    }

  }
  validateEmail(): void {
    // Expresión regular para validar un email básico
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(this.userToCreate.email)) {
      this.emailError = 'Ingrese un mail valido';
    } else {
      this.emailError = null;
    }
  }

  validatePassword() {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;

    if (!regex.test(this.userToCreate.password)) {
      this.passwordError = 'contraseña incorrecta';
    } else {
      this.passwordError = null;
    }
  }

  validateRepeatedPasswordError() {
    if (this.userToCreate.password !== this.userToCreate.repeatedPassword) {
      this.repeatedPasswordError = 'La contraseña no coincide';
    } else {
      this.repeatedPasswordError = null;
    }
  }

  validateErrors(): boolean {
    return this.emailError === null && this.passwordError === null && this.repeatedPasswordError === null;
  }

  ngOnInit(): void {
    this.tokenService.clearToken();
  }
}
