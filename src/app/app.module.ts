import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routing } from './app.route';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { RouterModule } from '@angular/router';
import { NavHeaderService } from './shared/nav-header/nav-header.service';


import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule, MatIconModule, MatToolbarModule, MatButtonModule, MatFormFieldModule, MatInputModule } from '@angular/material';
import { MatTableModule } from '@angular/material/table';
import { NavHeaderComponent } from './shared/nav-header/nav-header.component';
import { HttpModule } from '@angular/http';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';




@NgModule({
  declarations: [
    AppComponent,
    NavHeaderComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    Routing,
    HttpModule,
    HttpClientModule,
    HttpClientJsonpModule,
    MatCardModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatFormFieldModule,
    MatTableModule,
    RouterModule,
    MatInputModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [NavHeaderService],
  bootstrap: [AppComponent]
})
export class AppModule { }
