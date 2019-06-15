import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { FormsModule} from "@angular/forms";
import { FarbleComponent } from './farble/farble.component';

@NgModule({
  declarations: [
    AppComponent,
    FarbleComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
