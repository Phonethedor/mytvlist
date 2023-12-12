import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.page.html',
  styleUrls: ['./lista.page.scss'],
})
export class ListaPage implements OnInit {

  email="";
  password="";

  constructor(private router:Router, private activedRouter:ActivatedRoute) { 
    this.activedRouter.queryParams.subscribe(param => {
      if(this.router.getCurrentNavigation()?.extras.state) {
        this.email = this.router.getCurrentNavigation()?.extras?.state?.['correo'];
        this.password = this.router.getCurrentNavigation()?.extras?.state?.['pass'];
      }
    })
  }

  verSerie() {
    let navigationExtras:NavigationExtras = {
      state: {
        correo: this.email,
        pass: this.password
      }
    }
    this.router.navigate(['/serie'], navigationExtras);
  }

  volver(){
    let navigationExtras:NavigationExtras = {
      state: {
        correo: this.email,
        pass: this.password
      }
    }
    this.router.navigate(['/content'], navigationExtras);
  }

  ngOnInit() {
  }

}

export class Lista {
  constructor(
    public nombre: string,
    public descripcion: string
  ){}
}
