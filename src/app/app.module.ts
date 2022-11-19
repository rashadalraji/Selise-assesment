import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BookmarksComponent } from './components/bookmarks/bookmarks.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';

// import { ToastrModule } from 'ngx-toastr';


@NgModule({
  declarations: [
    AppComponent,
    BookmarksComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    ReactiveFormsModule,
   
   
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
