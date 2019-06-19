import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {PEOPLE} from './People';

@Injectable()
export class ConfigService {
  constructor(private http: HttpClient) { }

  url = 'http://localhost:3000/'
  getData(body) {
    const Headers = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded');
    return this.http.post<PEOPLE>(this.url, {'name': body}, {headers: Headers, withCredentials: true});
  }
}
