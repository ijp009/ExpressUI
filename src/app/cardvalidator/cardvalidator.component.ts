import { Component, OnInit } from '@angular/core';
import { ATMService } from '../services/atm.service';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

import * as crypto from 'crypto-js';
@Component({
  selector: 'app-card-validator',
  templateUrl: './cardvalidator.component.html',
  styleUrls: ['./cardvalidator.component.css']
})
export class AppCardValidator implements OnInit{

    cardnumber: string;
    pin: number;
    showMessage: boolean = false;
    invalidCard: boolean = false;
    invalidPin: boolean = false;
    message: any = 'Invalid Card';
    cardNumberMessage: any = ' is required';
    pinMessage: any = ' is required';
    constructor(private atmService: ATMService,
        private router: Router, private dataService: DataService) {

    }
ngOnInit() {

}

validateCard() {  
    this.message = ''; 
    this.invalidCard = !this.cardnumber ? true : false;
    this.invalidPin = !this.pin ? true : false;
    if (this.cardnumber.length !== 16) {
        this.invalidCard = true;
    }
    if (!(this.pin > 999 && this.pin < 9999)) {
        this.invalidPin = true;
    }
    // Do not make the api call of validating card if any of the fields are invalid
    if (this.invalidCard || this.invalidPin) {
        this.cardNumberMessage = !this.cardnumber ? ' is required' : ' Should have 16 digits';
        this.pinMessage = !this.pin ? ' is required' : ' Should have 4 digits';
        return;
    }
    this.message = 'Validating your card. Please wait......';
    this.showMessage = true;
    var encryptedCard = crypto.AES.encrypt(this.cardnumber, 'card');
    var decryptedCard = crypto.AES.decrypt(encryptedCard.toString(), 'card');
    console.log(decryptedCard.toString());
    this.atmService.validateCard(this.cardnumber, this.pin).subscribe((data: any) => {
        if (data.length > 0) {
            // Send data to withdraw money component
            this.dataService.sendMessage(data[0]);
            this.showMessage = false;
            this.message = '';
            this.router.navigate(['withdrawMoney']);
        } else {
            console.log('invalid card');
            this.showMessage = true;
            this.message = 'Invalid Card';
        }
    })
}

}