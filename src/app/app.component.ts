import { Component } from '@angular/core';
import { ConfigService } from './app.service';
import {PEOPLE} from './People';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {
  People: PEOPLE;

  constructor(private configService: ConfigService) {}
  title = 'People In Space';
  message = null;
  apiResponse = null;
  onClick(value: string) {
    this.message = value;
    this.apiCall(value);
  }
  apiCall(value) {
    this.configService.getData(value)
      .subscribe((data = this.People) => {
          console.log(data);
          this.apiResponse = data.people;
          // this.message = data['string'];
          console.log('API received response successfully');
        },
        error => {
          this.apiResponse = null;
          console.log('API call encountered an error');
        });
  }

}
