import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule, Nav } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import {  ReactiveFormsModule } from '@angular/forms';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { RegisterPage } from '../pages/register/register';
import { HttpServiceProvider } from '../providers/http-service/http-service';
import { HttpClientModule } from '@angular/common/http'; 
import { DashboardPage } from '../pages/dashboard/dashboard';
import { AccordionComponent } from '../components/accordion/accordion';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CreatePage } from '../pages/create/create';
import { UserProvider } from '../providers/user/user';
import { EditPage } from '../pages/edit/edit';
import { HeaderMenuComponent } from '../components/header-menu/header-menu';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    RegisterPage,
    DashboardPage,
    CreatePage,
    EditPage,
    HeaderMenuComponent,
    AccordionComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    RegisterPage,
    CreatePage,
    EditPage,
    DashboardPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    HttpServiceProvider,
    UserProvider,
    EditPage,
    DashboardPage
  ]
})
export class AppModule {}
