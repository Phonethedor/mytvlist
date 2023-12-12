import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite';
import { AlertController, Platform } from '@ionic/angular';
import { BehaviorSubject, Observable } from 'rxjs';
import { Usuario } from './usuario';
import { Series } from './series';
import { Lista } from './lista';

@Injectable({
  providedIn: 'root'
})
export class DbserviceService {

  // con a DB
  public db!: SQLiteObject;

  //Creacion de tablas
  tablaUsuario = 'CREATE TABLE IF NOT EXISTS usuario (id INTEGER PRIMARY KEY AUTOINCREMENT, nombre varchar(40), correo varchar(100), password varchar(100))';
  tablaSerie = 'CREATE TABLE IF NOT EXISTS serie (id INTEGER PRIMARY KEY AUTOINCREMENT, nombre varchar(40), temporadas varchar(100), capitulos varchar(100), imagen blob, descripcion text)';
  tablaLista = 'CREATE TABLE IF NOT EXISTS lista (id INTEGER PRIMARY KEY AUTOINCREMENT, nombre varchar(40), id_usuario INTEGER, id_serie INTEGER, FOREIGN KEY(id_usuario) REFERENCES usuario(id), FOREIGN KEY(id_serie) REFERENCES serie(id))';
  tablaListaSerie = 'CREATE TABLE ListaSerie (id_lista INTEGER, id_serie INTEGER, PRIMARY KEY (id_lista, id_serie),FOREIGN KEY (id_lista) REFERENCES Lista(id_lista),FOREIGN KEY (id_serie) REFERENCES Serie(id_serie))';


  //Insertar datos
  registroSeries = 'INSERT INTO serie (nombre, temporadas, capitulos, imagen, descipcion) VALUES ("The Twilight Zone", 1, 156, "./assets/images/serie1.jpg", "The Twilight Zone (en inglés: «La zona crepuscular»)1​ —conocida en español como La dimensión desconocida, Dimensión desconocida, En los límites de la realidad o La quinta dimensión— es una serie de televisión de antología estadounidense dedicada a la ciencia ficción, la fantasía y el terror.2​ Cada episodio muestra un relato que plantea dilemas morales, cuestiona al espectador y lo confronta con su propia existencia, a menudo rematado por un final sorprendente.")';

  //observable manipulacion de datos
  listaUsuarios = new BehaviorSubject([]);
  listaSeries = new BehaviorSubject([]);
  listaListas = new BehaviorSubject([]);
  listaListaSeries = new BehaviorSubject([]);

  private isDbReady: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private alertController: AlertController, private sqlite: SQLite, private platform: Platform) {
    this.createDatabase();
  }

  async presentAlert(msj:string) {
    const alert = await this.alertController.create({
      header: 'Alert',
      message: msj,
      buttons: ['OK']
    });

    await alert.present();
  }

  fetchUsuarios(): Observable<Usuario[]>{
    return this.listaUsuarios.asObservable();
  }

  fetchSeries(): Observable<Series[]>{
    return this.listaSeries.asObservable();
  }

  fetchListas(): Observable<Lista[]>{
    return this.listaListas.asObservable();
  }

  fetchListaSeries(): Observable<Lista[]>{
    return this.listaListaSeries.asObservable();
  }

  createTables(){
    this.db.executeSql(this.tablaUsuario, []).then((res)=>{
      this.presentAlert('Tabla usuario creada');
    }).catch((e)=>{
      this.presentAlert('Error al crear la tabla usuario: ' + JSON.stringify(e));
    });

    this.db.executeSql(this.tablaSerie, []).then((res)=>{
      this.presentAlert('Tabla serie creada');
    }).catch((e)=>{
      this.presentAlert('Error al crear la tabla serie: ' + JSON.stringify(e));
    });

    this.db.executeSql(this.registroSeries, []).then((res)=>{
      this.presentAlert('Registro de serie creado');
    }).catch((e)=>{
      this.presentAlert('Error al crear el registro de serie: ' + JSON.stringify(e));
    })

    this.db.executeSql(this.tablaLista, []).then((res)=>{
      this.presentAlert('Tabla lista creada');
    }).catch((e)=>{
      this.presentAlert('Error al crear la tabla lista: ' + JSON.stringify(e));
    });

    this.db.executeSql(this.tablaListaSerie, []).then((res)=>{
      this.presentAlert('Tabla lista serie creada');
    }).catch((e)=>{
      this.presentAlert('Error al crear la tabla lista serie: ' + JSON.stringify(e));
    });
  }

  createDatabase(){
    this.platform.ready().then(()=>{
      this.sqlite.create({
        name: 'mytvlist.db',
        location: 'default'
      }).then((db:SQLiteObject)=>{
        this.db = db;
        this.createTables();
      }).catch((e)=>{
        this.presentAlert('Error al crear la base de datos: ' + JSON.stringify(e));
      })
    })
  }
}
