import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { AlertController } from 'ionic-angular';
import { HttpServiceProvider } from '../../providers/http-service/http-service';

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  fg : FormGroup;


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public api: HttpServiceProvider,
    public loadingController: LoadingController,
    private alertCtrl: AlertController
  ) {
    this.fg = new FormGroup({
      name: new FormControl (null, [Validators.required,Validators.pattern(/[A-Za-z]+/)]),
      lastname: new FormControl (null, [Validators.required,Validators.pattern(/[A-Za-z]+/)]),
      email: new FormControl (null, [Validators.required,Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)]),
      username: new FormControl (null, [Validators.required,Validators.pattern(/[A-Za-z]+/)]),
      password: new FormControl (null, [Validators.required]),
      confPass: new FormControl (null, [Validators.required]),
    }, this.passwordMatchValidator)
  }



  ionViewDidLoad() {
  }

  /**
   * Metodo para evaluar si las claves son las mismas
   * @param fg Recibe como parametro el FormGroup
   */
  passwordMatchValidator = function(fg: FormGroup) {
    return fg.get('password').value === fg.get('confPass').value ? null : { 'mismatch': true };
  }

  /**
   * Metodo para solicitar al servicio que realice la peticion para crear un usuario
   * @returns void
   */
  register(): void {
    if(this.fg.valid){
      this.api.postSignUp(this.fg.value)
      .subscribe(res => {
        console.log(res.status);
        if(res.status == 200){
          this.presentAlert();
          this.redirect();
        }
      }, err => {
        console.log(err);
      });
    }
    else{
      console.log("No es valido");
    }
  }

  /**
  * Metodo para mostrar alerta de confirmacion
  * @returns void
  */
  presentAlert() : void {
    let alert = this.alertCtrl.create({
      title: 'Successfully',
      subTitle: 'Account succesfully created',
      buttons: [{
        text : "Accept",
        role : "Accept",
        handler: () => {
          this.redirect();
        }
      }]
    });
    alert.present();
  }

  /**
   * Metodo para redireccionar a otra pagina
   * @returns Returns void
   */
  redirect(): void {
    this.navCtrl.setRoot(HomePage);
  }
}
