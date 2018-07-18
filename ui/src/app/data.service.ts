import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { User } from './models/user.model';
;
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  // private serviceUrl = 'https://jsonplaceholder.typicode.com/users';
  // private readonly API_URL = 'https://composer-rest-server-vehicle-manufacture-netw-1531824951915.mybluemix.net/api/Mortgage';


  constructor(private http: HttpClient) { }
  
  getUser(): Observable<User[]> {
    return this.http.get<User[]>("https://jsonplaceholder.typicode.com/users");
  }

  getCredits() {
    return this.http.get("http://composer-rest-server-vehicle-manufacture-netw-1531824951915.mybluemix.net/api/mortgage");
  }

  addCredit(mortgage){
    return this.http.post("http://composer-rest-server-vehicle-manufacture-netw-1531824951915.mybluemix.net/api/mortgage", mortgage).subscribe(
      res => {
        console.log(res);
      },
      (err: HttpErrorResponse) => {
        console.log(err.error);
        console.log(err.name);
        console.log(err.message);
        console.log(err.status);
      }
    );
  }

  createCDO(cdo){
    return this.http.post("https://composer-rest-server-vehicle-manufacture-netw-1531824951915.mybluemix.net/api/CDO", cdo).subscribe(
      res => {
        console.log(res);
      },
      (err: HttpErrorResponse) => {
        console.log(err.error);
        console.log(err.name);
        console.log(err.message);
        console.log(err.status);
      }
    );
  }

  getCdos() {
    return this.http.get('http://composer-rest-server-vehicle-manufacture-netw-1531824951915.mybluemix.net/api/CDO')
  }
}
