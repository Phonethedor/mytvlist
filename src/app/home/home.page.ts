import { Component } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  email: string = "";
  password: string = "";

  constructor(private alertController: AlertController,
    private router:Router) { }

  logear(){
    let navigationExtras:NavigationExtras = {
      state: {
        correo: this.email,
        pass: this.password
      }
    }
    if (this.email.trim().length != 0) {
      if (this.password.trim().length != 0) {
        this.router.navigate(['/content'], navigationExtras);
      }
    } else {
      this.presentAlert();
    }
  }

  registrar(){
    this.router.navigate(['/registrar']);
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Alerta',
      subHeader: 'Fallo en inicio de sesion',
      message: 'Ingrese correctamente los datos',
      buttons: ['OK'],
    });

    await alert.present();
  }
}
