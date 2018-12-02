import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
 
@Injectable({ providedIn: 'root' })
export class DataService {
    private data = new BehaviorSubject<any>({});
    private dataToRouteGuard = new BehaviorSubject<any>({});
    sendMessage(message: any) {
        this.data.next(message);
        this.sendMessageToRouteGuard(message);
    }
 
    sendMessageToRouteGuard(message: any) {
        this.dataToRouteGuard.next(message);
    }

    getMessage(): Observable<any> {
        return this.data.asObservable();
    }

    getMessageForRouteGuard(): Observable<any> {
        return this.dataToRouteGuard.asObservable();
    }
}