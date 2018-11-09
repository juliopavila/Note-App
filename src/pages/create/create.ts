import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DashboardPage } from '../dashboard/dashboard';
import { AlertController } from 'ionic-angular';
import { HttpServiceProvider } from '../../providers/http-service/http-service';
import { UserProvider } from '../../providers/user/user';


@IonicPage()
@Component({
  selector: 'page-create',
  templateUrl: 'create.html',
})
export class CreatePage {

  fg : FormGroup

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private alertCtrl: AlertController,
    public api: HttpServiceProvider,
    public user : UserProvider
    )
  {
    this.fg = new FormGroup({
      user_id : new FormControl (this.user.id[0]),
      note_title: new FormControl (null, [Validators.required]),
      note_content: new FormControl (null, [Validators.required])
    })
  }

  ionViewDidLoad() {
  }

  /**
   * Metodo para solicitar al servicio que realice la peticion para crear una nota
   * @returns void
   */
  create() : void {
    if(this.fg.valid){
      this.api.createNote(this.fg.value)
      .subscribe(res => {
        if(res.status == 200){
          this.presentAlert();
        }
      }, err => {
        console.log(err);
      });
    }
  }

  /**
  * Metodo para mostrar alerta de confirmacion
  * @returns void
  */
  presentAlert() {
    let alert = this.alertCtrl.create({
      title: 'Successfully',
      subTitle: 'Note succesfully created',
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
