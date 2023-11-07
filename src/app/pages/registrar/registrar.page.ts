import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.page.html',
  styleUrls: ['./registrar.page.scss'],
})
export class RegistrarPage implements OnInit {

  email:string = "";
  nombre:string = "";
  password:string = "";

  constructor(private alertController: AlertController,
    private router:Router) { }

  registrar(){
    if (this.email.trim().length != 0){
      if (this.nombre.trim().length != 0){
        if(this.password.trim().length !=0){
          this.presentAlert();
          this.router.navigate(['/home']);
        }
      }
    }else {
      this.presentError();
    }
    
  }

  volver(){
    this.router.navigate(['/home']);
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Logrado',
      subHeader: 'Registro correcto',
      message: 'Registrado correctamente',
      buttons: ['OK'],
    });

    await alert.present();
  }

  async presentError() {
    const error = await this.alertController.create({
      header: 'Error',
      subHeader: 'Error en el registro',
      message: 'Ingrese los datos de manera correcta',
      buttons: ['OK'],
    });

    await error.present();
  }

  ngOnInit() {
  }

}
