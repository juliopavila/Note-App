import { HomePage } from './../../pages/home/home';
import { Component } from '@angular/core';
import { HttpServiceProvider } from '../../providers/http-service/http-service';
import { NavController, MenuController, App } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
@Component({
  selector: 'header-menu',
  templateUrl: 'header-menu.html',
})
export class HeaderMenuComponent {

  constructor(
    public api: HttpServiceProvider,
    public menuCtrl: MenuController,
    public app: App,
    public id : UserProvider
  ) {
  }

  /**
   * Metodo del Side Menu para realizar logout
   * @returns Void
   */
  exitapp() : void {
    this.menuCtrl.close();
    this.api.logout()
    .subscribe(res => {
      if(res.status == 200){
        this.id.clean();
        let nav = this.app.getRootNav();
        nav.setRoot(HomePage);
      }
    })
  }
}
