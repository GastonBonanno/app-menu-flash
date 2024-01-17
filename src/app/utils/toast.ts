import {Injectable} from "@angular/core";
import {AlertController, ToastController} from "@ionic/angular";

@Injectable({
  providedIn: 'root'
})
export class Toast {

  constructor(private toastController: ToastController,private alertController: AlertController) {}

  async present(position: 'top' | 'middle' | 'bottom', message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2500,
      position
    });

    await toast.present();
  }
  async alertConfirmation(message: string): Promise<boolean> {
    const alert = await this.alertController.create({
      message,
      buttons: [
        {
          text: 'Ok',
          role: 'confirm',
          handler: () => true,
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => false,
        },
      ],
    });

    await alert.present();
    const { role } = await alert.onDidDismiss();
    return role === 'confirm';
  }

}
