import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { AlertController, Platform } from '@ionic/angular';
import { BehaviorSubject, Observable } from 'rxjs';
import { Usuario } from './usuario';
import { Series } from './series';
import { Lista } from './lista';
import { ListaSeries } from './lista-series';

@Injectable({
  providedIn: 'root'
})
export class DbserviceService {

  // conn a DB
  public db!: SQLiteObject;

  //Creacion de tablas
  tablaUsuario = 'CREATE TABLE IF NOT EXISTS usuario (id_usuario INTEGER PRIMARY KEY AUTOINCREMENT, nombre_usuario varchar(40), correo varchar(100), password varchar(100))';
  tablaSerie = 'CREATE TABLE IF NOT EXISTS serie (id_serie INTEGER PRIMARY KEY AUTOINCREMENT, nombre_serie varchar(40), temporadas varchar(100), capitulos varchar(100), imagen varchar(100), descripcion varchar(1000))';
  tablaLista = 'CREATE TABLE IF NOT EXISTS lista (id_lista INTEGER PRIMARY KEY AUTOINCREMENT, nombre_lista varchar(40), id_usuario INTEGER, FOREIGN KEY(id_usuario) REFERENCES usuario(id))';
  tablaListaSerie = 'CREATE TABLE IF NOT EXISTS listaSerie (id_listaSerie INTEGER, id_lista, id_serie INTEGER, PRIMARY KEY (id_listaSerie),FOREIGN KEY (id_lista) REFERENCES Lista(id_lista),FOREIGN KEY (id_serie) REFERENCES Serie(id_serie))';

  //Insertar datos
  registroSeries = 'INSERT OR IGNORE INTO serie (id_serie, nombre_serie, temporadas, capitulos, imagen, descripcion) VALUES (1, "The Twilight Zone", 1, 156, "./assets/images/serie1.jpg", "The Twilight Zone (en inglés: «La zona crepuscular»)1​ —conocida en español como La dimensión desconocida, Dimensión desconocida, En los límites de la realidad o La quinta dimensión— es una serie de televisión de antología estadounidense dedicada a la ciencia ficción, la fantasía y el terror.2​ Cada episodio muestra un relato que plantea dilemas morales, cuestiona al espectador y lo confronta con su propia existencia, a menudo rematado por un final sorprendente.")';
  registroUsuario = 'INSERT OR IGNORE INTO usuario (id_usuario, nombre_usuario, correo, password) VALUES (1, "Alvaro", "al.castillom@duocuc.cl", "admin")';
  registroLista = 'INSERT OR IGNORE INTO lista (id_lista, nombre_lista, id_usuario) VALUES (1, "Lista 1", 1)';
  registroListaSerie = 'INSERT OR IGNORE INTO listaSerie (id_listaSerie, id_lista, id_serie) VALUES (1, 1, 1)';

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

  buscarUsuarios(correo:string, password:string){
    return this.db.executeSql('SELECT * FROM usuario WHERE correo = ? AND password = ?', [correo, password]).then((res)=>{
      let items: Usuario[] = [];
      if(res.rows.length > 0){
        for(let i = 0; i < res.rows.length; i++){
          items.push({
            id_usuario: res.rows.item(i).id_usuario,
            nombre_usuario: res.rows.item(i).nombre_usuario,
            correo: res.rows.item(i).correo,
            password: res.rows.item(i).password
          });
        };      
      }
      this.listaUsuarios.next(items as any);
    }).catch((e)=>{
      this.presentAlert('Error al buscar usuario: ' + JSON.stringify(e));
    });
  }

  buscarListas(id_usuario:number){
    return this.db.executeSql('SELECT * FROM lista WHERE id_usuario = ?', [id_usuario]).then((res)=>{
      let items: Lista[] = [];
      if(res.rows.length > 0){
        for(let i = 0; i < res.rows.length; i++){
          items.push({
            id_lista: res.rows.item(i).id_lista,
            nombre_lista: res.rows.item(i).nombre,
            id_usuario: res.rows.item(i).id_usuario
          });
        };      
      }
      this.listaListas.next(items as any);
    }).catch((e)=>{
      this.presentAlert('Error al buscar listas: ' + JSON.stringify(e));
    });
  }

  buscarListaSeries(){
    return this.db.executeSql('SELECT * FROM ListaSerie').then((res)=>{
      let items: ListaSeries[] = [];
      if(res.rows.length > 0){
        for(let i = 0; i < res.rows.length; i++){
          items.push({
            id_lista: res.rows.item(i).id_lista,
            id_serie: res.rows.item(i).id_serie
          });
        };      
      }
      this.listaListaSeries.next(items as any);
    }).catch((e)=>{
      this.presentAlert('Error al buscar listas: ' + JSON.stringify(e));
    });
  }

  dbState() {
    return this.isDbReady.asObservable();
  }

  buscarSeries(){
    return this.db.executeSql('SELECT s.* FROM serie s JOIN listaSerie ls ON s.id_serie = ls.id_serie JOIN lista l ON ls.id_lista = l.id_lista WHERE l.id_usuario = 1;').then((res)=>{
      let items: Series[] = [];
      if(res.rows.length > 0){
        for(let i = 0; i != res.rows.length; i++){
          items.push({
            id_serie: res.rows.item(i).id_serie,
            nombre_serie: res.rows.item(i).nombre_serie,
            temporadas: res.rows.item(i).temporadas,
            capitulos: res.rows.item(i).capitulos,
            imagen: res.rows.item(i).imagen,
            descripcion: res.rows.item(i).descripcion
          });
        };      
      }
      this.listaSeries.next(items as any);
    }).catch((e)=>{
      this.presentAlert('Error al buscar serie: ' + JSON.stringify(e));
    });
  }

  buscarSerie(id_serie:number){
    return this.db.executeSql('SELECT * FROM serie WHERE id_serie = ?', [id_serie]).then((res)=>{
      let items: Series[] = [];
      if(res.rows.length > 0){
        for(let i = 0; i < res.rows.length; i++){
          items.push({
            id_serie: res.rows.item(i).id_serie,
            nombre_serie: res.rows.item(i).nombre_serie,
            temporadas: res.rows.item(i).temporadas,
            capitulos: res.rows.item(i).capitulos,
            imagen: res.rows.item(i).imagen,
            descripcion: res.rows.item(i).descripcion
          });
        };      
      }
      this.listaSeries.next(items as any);
    }).catch((e)=>{
      this.presentAlert('Error al buscar series: ' +', La serie no existe');
    });
  }

  eliminarSerie(id_serie:number){
    return this.db.executeSql('DELETE FROM serie WHERE id_serie = ?', [id_serie]).then((res)=>{
      this.presentAlert('Serie eliminada');
    }).catch((e)=>{
      this.presentAlert('Error al eliminar serie: ' + JSON.stringify(e));
    });
  }

  insertarUsuario(nombre:string, correo:string, password:string){
    return this.db.executeSql('INSERT INTO usuario (nombre, correo, password) VALUES (?, ?, ?)', [nombre, correo, password]).then((res)=>{
      this.presentAlert('Usuario creado');
    }).catch((e)=>{
      this.presentAlert('Error al crear usuario: ' + JSON.stringify(e));
    });
  }

  async createTables(){
    await this.db.executeSql(this.tablaUsuario, []).then((res)=>{
      
    }).catch((e)=>{
      this.presentAlert('Error al crear la tabla usuario: ' + JSON.stringify(e));
    });

    
    await this.db.executeSql(this.tablaSerie, []).then((res)=>{
      
    }).catch((e)=>{
      this.presentAlert('Error al crear la tabla serie: ' + JSON.stringify(e));
    });
    
    
    await this.db.executeSql(this.tablaLista, []).then((res)=>{
      
    }).catch((e)=>{
      this.presentAlert('Error al crear la tabla lista: ' + JSON.stringify(e));
    });
    
    
    await this.db.executeSql(this.tablaListaSerie, []).then((res)=>{
      
    }).catch((e)=>{
      this.presentAlert('Error al crear la tabla lista serie: ' + JSON.stringify(e));
    });
    
    this.isDbReady.next(true);
  }

  async populateTables(){
    await this.db.executeSql(this.registroUsuario, []).then((res)=>{
      
    }).catch((e)=>{
      this.presentAlert('Error al crear el registro de usuario: ' + JSON.stringify(e));
    });

    await this.db.executeSql(this.registroSeries, []).then((res)=>{
      
    }).catch((e)=>{
      this.presentAlert('Error al crear el registro de serie: ' + JSON.stringify(e));
    })

    await this.db.executeSql(this.registroLista, []).then((res)=>{
      
    }).catch((e)=>{
      this.presentAlert('Error al crear el registro de lista: ' + JSON.stringify(e));
    });

    await this.db.executeSql(this.registroListaSerie, []).then((res)=>{
      
    }).catch((e)=>{
      this.presentAlert('Error al crear el registro de lista serie: ' + JSON.stringify(e));
    });

    this.isDbReady.next(true);
  }
  createDatabase(){
    this.platform.ready().then(()=>{
      this.sqlite.create({
        name: 'dbmytvlist.db',
        location: 'default'
      }).then((db:SQLiteObject)=>{
        this.db = db;
        this.createTables();
        this.populateTables();
      }).catch((e: any)=>{
        this.presentAlert('Error al crear la base de datos: ' + JSON.stringify(e));
      })
    })
  }
}
