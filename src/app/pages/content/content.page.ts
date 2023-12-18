import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-content',
  templateUrl: './content.page.html',
  styleUrls: ['./content.page.scss'],
})
export class ContentPage {

  id_usuario=0;
  nombre_usuario="";
  email="";
  password="";

  constructor(private router:Router, private activedRouter:ActivatedRoute) { 
    this.activedRouter.queryParams.subscribe(param => {
      if(this.router.getCurrentNavigation()?.extras.state) {
        this.id_usuario = this.router.getCurrentNavigation()?.extras?.state?.['id_usuario'];
        this.nombre_usuario = this.router.getCurrentNavigation()?.extras?.state?.['nombre_usuario'];
        this.email = this.router.getCurrentNavigation()?.extras?.state?.['correo'];
        this.password = this.router.getCurrentNavigation()?.extras?.state?.['pass'];
      }
    })
  }

  lista() {
    let navigationExtras:NavigationExtras = {
      state: {
        id_usuario: this.id_usuario,
        nombre: this.nombre_usuario,
        correo: this.email,
        pass: this.password
      }
    }
    this.router.navigate(['/lista'], navigationExtras);
  }

  logOut() {
    this.router.navigate(['/home']);
  }

}
