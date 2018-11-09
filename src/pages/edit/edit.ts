import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { DashboardPage } from '../dashboard/dashboard';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpServiceProvider } from '../../providers/http-service/http-service';
import { UserProvider } from '../../providers/user/user';


@IonicPage()
@Component({
  selector: 'page-edit',
  templateUrl: 'edit.html',
})
export class EditPage {
  fg : FormGroup;
  dates: any[] = [];
  note_id;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private alertCtrl: AlertController,
    public api: HttpServiceProvider,
    public user : UserProvider
    )
  {
    this.fg = new FormGroup({
      note_id : new FormControl (null, [Validators.required]),
      note_title: new FormControl (null, [Validators.required]),
      note_content: new FormControl (null, [Validators.required])
    })
  }

  /**
   * Metodo para al momento de cargar la vista guarde
   * en un arreglo la data de la nota
   */
  ngOnInit(){
    let a = {
      'note_id' : this.navParams.get('note_id'),
      'note_title' : this.navParams.get('note_title'),
      'note_content' : this.navParams.get('note_content')
    }
    this.dates.push(a);
  }

  ionViewDidLoad() {
  }

  /**
   * Metodo para solicitar al servicio que realice la peticion para actualizar las notas
   * @returns void
   */
  edit() : void {
    if(this.fg.valid){
      this.api.updateNote(this.fg.value)
      .subscribe(res => {
        if(res.status == 200){
          this.presentAlert();
        }
      }, err => {
        console.log(err);
      });
    }
    console.log(this.fg.value);
  }

  /**
  * Metodo para mostrar alerta de confirmacion
  * @returns void
  */
  presentConfirm() : void {
    let alert = this.alertCtrl.create({
      title: 'Confirm Update Note',
      message: 'Do you want to update this note?',
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
            this.dates = [];
            this.edit();
          }
        }
      ]
    });
    alert.present();
  }

  /**
  * Metodo para mostrar alerta de confirmacion
  * @returns void
  */
  presentAlert() {
    let alert = this.alertCtrl.create({
      title: 'Successfully',
      subTitle: 'Note succesfully updated',
      buttons: [{
        text : "Accept",
        role : "Accept",
        handler: () => {
          this.move(1);
        }
      }]
    });
    alert.present();
  }

  /**
   * Metodo para redireccionar a otra pagina
   * @param {any} op Recibe el caso evaluar a donde se va redireccionar
   * @returns Returns void
   */
  move(op){
    switch(op){
      case 1 : {
        this.navCtrl.setRoot(DashboardPage);
        break;
      }
    }
  }
}
