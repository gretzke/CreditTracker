import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private mortageUrl =
    'http://composer-rest-server-vehicle-manufacture-netw-1531913291543.mybluemix.net/api/Mortgage';
  private cdoUrl =
    'http://composer-rest-server-vehicle-manufacture-netw-1531913291543.mybluemix.net/api/CDO';
  // private readonly API_URL = 'https://composer-rest-server-vehicle-manufacture-netw-1531824951915.mybluemix.net/api/Mortgage';

  constructor(private http: HttpClient, public snackBar: MatSnackBar) {}

  getUser(): Observable<User[]> {
    return this.http.get<User[]>('https://jsonplaceholder.typicode.com/users');
  }

  getCredits() {
    return this.http.get(this.mortageUrl);
  }

  addCredit(mortgage) {
    return this.http.post(this.mortageUrl, mortgage).subscribe(
      res => {
        console.log(res);
        this.snackBar.open('Mortgage added.', 'Ok', {
          duration: 500
        });
        setTimeout(() => {
          location.reload();
        }, 1000);
      },
      (err: HttpErrorResponse) => {
        console.log(err.error);
        console.log(err.name);
        console.log(err.message);
        console.log(err.status);
        this.snackBar.open('Sorry, something went wrong :-(', 'Ok', {
          duration: 500
        });
      }
    );
  }

  createCDO(cdo) {
    return this.http.post(this.cdoUrl, cdo).subscribe(
      res => {
        console.log(res);
        this.snackBar.open('CDO created', 'Ok', {
          duration: 500
        });
        setTimeout(() => {
          location.reload();
        }, 1000);
      },
      (err: HttpErrorResponse) => {
        console.log(err.error);
        console.log(err.name);
        console.log(err.message);
        console.log(err.status);
        this.snackBar.open('Sorry, something went wrong :-(', 'Ok', {
          duration: 500
        });
      }
    );
  }

  getCdos() {
    return this.http.get(this.cdoUrl);
  }
}
