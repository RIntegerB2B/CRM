import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { B2cMarket } from './../shared/model/b2cmarket.model';

import { Customer } from './../shared/model/customer.model';
import { AppSetting } from './../config/appSetting';
import { HttpClient, HttpHeaders, HttpEvent } from '@angular/common/http';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { ResponseResult } from './../shared/model/response-result.model';

@Injectable({
  providedIn: 'root'
})
export class SmsService {
  serviceUrl: string = AppSetting.serviceUrl;
  headers: Headers = new Headers({
    'Content-Type': 'application/json; charset=utf-8'
  });
  requestOptions: RequestOptions = new RequestOptions({ headers: this.headers });

  handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.log(error); // log to console instead
      // TODO: better job of transforming error for user consumption
      // this.log(`${operation} failed: ${error.message}`);
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
  constructor(private http: Http, private httpClient: HttpClient) { }
  // all customer details
 /*  allCustomer(): Observable<any> {
    const addUrl = 'allcustomers';
    const url: string = this.serviceUrl + addUrl;
    return this.httpClient.get<Customer[]>(url);
  } */
  allB2cMarket(): Observable<any> {
    const addUrl = 'allb2ccustomer';
    const url: string = this.serviceUrl + addUrl;
    return this.httpClient.get<B2cMarket[]>(url);
  }
  mobileMessage(phone) {
    const addUrl = 'customers/phone/';
    const url: string = this.serviceUrl + addUrl;
    return this.httpClient.post<ResponseResult>(url, phone);
  }
}
