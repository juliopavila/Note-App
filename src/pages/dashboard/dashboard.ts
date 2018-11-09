import { HomePage } from './../home/home';
import { Component, ViewChild, Input } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { CreatePage } from '../create/create';
import { HttpServiceProvider } from '../../providers/http-service/http-service';
import { IfObservable } from 'rxjs/observable/IfObservable';
import { UserProvider } from '../../providers/user/user';
import { EditPage } from '../edit/edit';

@IonicPage()
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
  providers : [
    EditPage,
    DashboardPage
  ]
})
export class DashboardPage {

  notes: any[] = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public api: HttpServiceProvider,
    public id : UserProvider,
    private alertCtrl: AlertController,
    public editview : EditPage
  )
  {}

  ionViewDidLoad() {
  }

  /**
   * Metodo para al momento de cargar la vista realice
   * la peticion para traer las notas del usuatio
   */
  ngOnInit(){
    this.getNotes();
  }

  /**
   * Metodo para solicitar al servicio que realice la peticion para obtener las notas
   * y las almacene en un arreglo
   * @returns void
   */
  getNotes() : void {
    this.notes = [];
    this.api.getNote()
    .subscribe(res => {
      console.log(res);
      this.notes = res;
    }, err => {
      console.log(err);
    });
  }

  /**
   * Metodo que hace uso de NavCtrl para enviar la data
   * de la nota a la vista de edicion
   * @param data
   */
  edit(data){
    this.navCtrl.push(EditPage, {
      'note_id' : data.note_id,
      'note_title' : data.note_title,
      'note_content' : data.note_content,
    });
  }

  /**
   * Metodo para solicitar al servicio que realice la peticion para eliminar una nota
   * y las almacene en un arreglo
   * @param data Recibe como parametro la data de la nota
   * @returns void
   */
  deleteNotes(data) : void {
    this.api.deleteNote(data)
    .subscribe(res => {
      this.redirect(3);
    }, err => {
      console.log(err);
    });
  }

  /**
  * Metodo para mostrar alerta de confirmacion
  * @param data Recibe como parametro la data de la nota
  * @returns void
  */
  presentConfirm(data) : void {
    let alert = this.alertCtrl.create({
      title: 'Confirm Delete Note',
      message: 'Do you want to delete this note?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Accept',
          handler: () => {
            this.deleteNotes(data);
          }
        }
      ]
    });
    alert.present();
  }

  /**
   * Metodo para redireccionar a otra pagina
   * @param {any} op Recibe el caso evaluar a donde se va redireccionar
   * @returns Returns void
   */
  redirect(op){
    switch(op){
      case 1 : {
        this.navCtrl.setRoot(CreatePage);
        break;
      }
      case 2 : {
        this.navCtrl.setRoot(HomePage);
        break;
      }
      case 3 : {
        this.navCtrl.setRoot(DashboardPage);
        break;
      }
      case 4 : {
        this.navCtrl.setRoot(EditPage);
        break;
      }
    }
  }

}
