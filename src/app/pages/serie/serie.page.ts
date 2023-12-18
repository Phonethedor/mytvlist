import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { DbserviceService } from 'src/app/services/dbservice.service';

@Component({
  selector: 'app-serie',
  templateUrl: './serie.page.html',
  styleUrls: ['./serie.page.scss'],
})
export class SeriePage implements OnInit {

  id_usuario=0;
  nombre_usuario="";
  correo="";
  arrayseries: any=[
    {
      id_serie: '',
      nombre_serie: '',
      temporadas: '',
      capitulos: '',
      imagen: '',
      descripcion: ''      
    }
  ];

  constructor(private router:Router, private activedRouter:ActivatedRoute, private servicioDB: DbserviceService) { 
    this.activedRouter.queryParams.subscribe(param => {
      if(this.router.getCurrentNavigation()?.extras.state) {
        this.id_usuario = this.router.getCurrentNavigation()?.extras?.state?.['id_usuario'];
        this.nombre_usuario = this.router.getCurrentNavigation()?.extras?.state?.['nombre_usuario'];
        this.correo = this.router.getCurrentNavigation()?.extras?.state?.['correo'];
      }
    })
  }

  eliminar(){
    this.servicioDB.eliminarSerie(1).then((res)=>{
      this.servicioDB.fetchSeries().subscribe((response) => {
        this.arrayseries = response;
        this.volver();
      });
    });
  }

  volver(){
    let navigationExtras:NavigationExtras = {
      state: {
        id_usuario: this.id_usuario,
        nombre_usuario: this.nombre_usuario,
        correo: this.correo
      }
    }
    this.router.navigate(['/lista'], navigationExtras);
  }

  ngOnInit() {
    this.servicioDB.buscarSerie(1).then((res)=>{
      if(this.servicioDB.fetchSeries().subscribe() != null){
        this.servicioDB.fetchSeries().subscribe((response) => {
          this.arrayseries = response;
        });
      }
    });
  }

}
