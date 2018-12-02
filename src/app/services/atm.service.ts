import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Response} from '@angular/http';
import { Injectable } from "@angular/core";
import { map } from 'rxjs/operators';

@Injectable()
export class ATMService {

    httpOptions: any;

    constructor(private http: HttpClient) {

    }

    init() {
        this.httpOptions = {
            headers: new HttpHeaders()
            .set('Content-Type', 'application/json') 
        }
    }

    validateCard(card_number: any, pin: any){
        const uri = `http://localhost:8000/atm/validateCard?card_number=${card_number}&pin=${pin}`;
        return this.http.get(uri).pipe(map((response: Response) => {
            return response;
        }));   
    }

    getATMDenomination(atm_id: any) {
        const uri = `http://localhost:8000/atm/getDenomination?atm_id=${atm_id}`;
        return this.http.get(uri).pipe(map((response: Response) => {
            return response;
        }));   
    }

    updateBalance(_id: any, balance: any) {
        const data = {
            _id: _id,
            balance: balance
        };
        const uri = `http://localhost:8000/atm/updateBalance`;
        return this.http.put(uri, data).pipe(map((response: Response) => {
            return response;
        }));
    }
    updateDenominations(data: any) {
        const uri = `http://localhost:8000/atm/updateDenomination`;
        return this.http.put(uri, data).pipe(map((response: Response) => {
            return response;
        }));
    }
    updateTransaction(data) {
        const uri = `http://localhost:8000/atm/updateTransaction`;
        return this.http.post(uri, data).pipe(map((response: Response) => {
            return response;
        }));
    }
}