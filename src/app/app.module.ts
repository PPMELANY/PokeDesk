import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { environment } from '../environments/environment';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, 
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()), HttpClientModule, provideFirebaseApp(() => initializeApp({"projectId":"pokemon-880e6","appId":"1:404667518093:web:3ba832a1d87f369ef766c4","storageBucket":"pokemon-880e6.appspot.com","apiKey":"AIzaSyD-itFSuRgdhkjqcV1CAKQ_L2V855JsJxE","authDomain":"pokemon-880e6.firebaseapp.com","messagingSenderId":"404667518093"}))],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
