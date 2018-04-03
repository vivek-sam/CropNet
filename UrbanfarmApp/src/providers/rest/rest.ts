//import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { HttpClient} from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/Rx';





/*
  Generated class for the RestProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RestProvider {

  map: any;
userId:any = '1234';
// hostNamePort: any = "http://localhost:8080";
hostNamePort: any = "http://104.211.242.99:8080";

  constructor(public http: HttpClient) {
    console.log('Hello RestProvider Provider');
  }
  private apiUrl = 'https://restcountries.eu/rest/v2/all';
  getCountries(): Observable<string[]> {
    return this.http.get(this.apiUrl)
      .map(this.extractData)
      .catch(this.handleError);
  }

  loginAuth(data): Observable<string[]> {
    const Headers = {'headers' : {
               'Content-Type': 'application/json'}
           };
    return this.http.post(this.hostNamePort+'/api/users', data ,Headers)
      .map(this.extractData)
      .catch(this.handleError);
  };
  Signup(data): Observable<string[]> {
    const Headers = {'headers' : {
               'Content-Type': 'application/json'}
           };
    return this.http.post(this.hostNamePort+'/api/users/signup', data ,Headers)
      .map(this.extractData)
      .catch(this.handleError);
  };

  basicInfo(data): Observable<string[]> {
    const Headers = {'headers' : {
               'Content-Type': 'application/json'}
           };
    return this.http.post(this.hostNamePort+'/api/users/basicInfo', data ,Headers)
      .map(this.extractData)
      .catch(this.handleError);
  };
  cropSelect(data): Observable<string[]> {
    const Headers = {'headers' : {
               'Content-Type': 'application/json'}
           };
    return this.http.post(this.hostNamePort+'/api/users/cropSelect', data ,Headers)
      .map(this.extractData)
      .catch(this.handleError);
  };

  connections(data): Observable<string[]> {
    const Headers = {'headers' : {
               'Content-Type': 'application/json'}
           };
    return this.http.post(this.hostNamePort+'/api/users/connections', data ,Headers)
      .map(this.extractData)
      .catch(this.handleError);
  };
  connectionStatus(data): Observable<string[]> {
    const Headers = {'headers' : {
               'Content-Type': 'application/json'}
           };
    return this.http.post(this.hostNamePort+'/api/users/connectionStatus', data ,Headers)
      .map(this.extractData)
      .catch(this.handleError);
  };
  allUserData(data): Observable<string[]> {
    const Headers = {'headers' : {
               'Content-Type': 'application/json'}
           };
    return this.http.post(this.hostNamePort+'/api/users/all', data ,Headers)
      .map(this.extractData)
      .catch(this.handleError);
  };
  locationUpdate(data): Observable<string[]> {
    const Headers = {'headers' : {
               'Content-Type': 'application/json'}
           };
    return this.http.post(this.hostNamePort+'/api/users/locationUpdate', data ,Headers)
      .map(this.extractData)
      .catch(this.handleError);
  };
  geoLocationFinder(data): Observable<string[]> {
    const Headers = {'headers' : {
               'Content-Type': 'application/json'}
           };
    return this.http.post(this.hostNamePort+'/api/geoLocationFinder', data ,Headers)
      .map(this.extractData)
      .catch(this.handleError);
  };

  private extractData(res: Response) {
    let body = res;
    return body || {};
  }

  private handleError(error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const err = error || '';
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}
