import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { DbserviceService } from '../services/dbservice.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  id_usuario: number = 0;
  nombre_usuario: string = "";
  email: string = "";
  password: string = "";

  arrayUsuarios: any = [
    {
      id_usuario: 0,
      nombre_usuario: "",
      email: "",
      password: ""
    }
  ];

  constructor(private alertController: AlertController,
    private router:Router, private servicioDB: DbserviceService) { }

  logear(){
    let navigationExtras:NavigationExtras = {
      state: {
        id_usuario: this.id_usuario,
        nombre_usuario: this.nombre_usuario,
        correo: this.email,
        pass: this.password
      }
    }
    if (this.email.trim().length != 0) {
      if (this.password.trim().length != 0) {
        this.servicioDB.buscarUsuarios(this.email, this.password).then((res)=>{
          if(this.servicioDB.fetchUsuarios().subscribe() != null){
            this.servicioDB.fetchUsuarios().subscribe((response) => {
              navigationExtras.state = {};
              navigationExtras.state['id_usuario'] = response[0].id_usuario;
              navigationExtras.state['nombre_usuario'] = response[0].nombre_usuario;
              navigationExtras.state['correo'] = response[0].correo;
              navigationExtras.state['pass'] = response[0].password;
              this.router.navigate(['/content'], navigationExtras);
            });
          }else{
            this.presentAlert();
          }
        });
      }else{
        this.presentAlert();
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

  ngOnInit() {
    this.servicioDB.fetchUsuarios().subscribe((response) => {
      this.arrayUsuarios = response;
    });
  }
}
