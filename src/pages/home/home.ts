import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { RegisterPage } from '../register/register';
import { DashboardPage } from '../dashboard/dashboard';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpServiceProvider } from '../../providers/http-service/http-service';
import { UserProvider } from '../../providers/user/user';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  fg : FormGroup;

  constructor(public navCtrl: NavController, public api: HttpServiceProvider, public id : UserProvider, private alertCtrl: AlertController) {
    this.fg = new FormGroup({
      username: new FormControl (null, [Validators.required,Validators.pattern(/[A-Za-z]+/)]),
      password: new FormControl (null, [Validators.required]),
    })
  }

  /**
   * Metodo que toma los valores del form y los envia al servicio
   * para que realize la peticion al servidor y compruebe el usuario
   * @returns Void
   */
  login() : void {
    if(this.fg.valid){
      this.api.login(this.fg.value)
        .subscribe(res => {
          if(res.status == 200){
            //Llamada al servicio para que almacene el id del usuario
            this.id.add(res.user_id);
            this.redirect(1);
          } else {
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
 presentAlert() : void {
  let alert = this.alertCtrl.create({
    title: 'Error',
    subTitle: 'Invalid user or password',
    buttons: [{
      text : "Accept",
      role : "Accept",
      handler: () => {
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
  redirect(op): void {
    switch(op){
      case 1 : {
        this.navCtrl.setRoot(DashboardPage);
        break;
      }
      case 2 : {
        this.navCtrl.setRoot(RegisterPage);
        break;
      }
    }
  }

}
