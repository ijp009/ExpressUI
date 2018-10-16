import { Product } from "../models/Product.model";
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Response, Headers} from '@angular/http';
import { Injectable, ReflectiveInjector } from "@angular/core";
// import 'rxjs/add/operator/map';
import { map } from 'rxjs/operators';
import {Observable} from 'rxjs';

@Injectable()
export class EmployeeService {

    httpOptions: any;

    constructor(private http: HttpClient) {

    }

    init() {
        this.httpOptions = {
            headers: new HttpHeaders()
            .set('Content-Type', 'application/json') 
        }
    }

    getEmployee(): Observable<any> {
        return this.http.get('http://localhost:8000/products/').pipe(map((response: Response) => {
            return response;
        }));   
    }

    createEmployee(data: any): any {
        return this.http.post('http://localhost:8000/products/create/', data, {
            'headers': {
                'Content-Type': 'application/json'
            }
        }).pipe(map(response => {
            return response;
        }));
    }

}