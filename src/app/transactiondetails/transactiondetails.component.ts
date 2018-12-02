import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../services/data.service';
import { Subscription } from 'rxjs';
import { ATMService } from '../services/atm.service';
import {Router} from '@angular/router';
@Component({
    selector: 'app-transaction-details',
    templateUrl: './transactiondetails.component.html',
    styleUrls: ['./transactiondetails.component.css']
})
export class AppTransactionDetails implements OnInit, OnDestroy {

    sub: Subscription;
    data: any;
    remainingAmount: any;
    dispensedCash: any = [];
    amount: any = 0;
    cardDetails: any = {};
    atm_id: number = 1;
    message: any = '';
    constructor(private dataService: DataService, private atmService: ATMService, private route: Router) {
    }
    ngOnInit() {
        this.message = 'Dispensing cash now. Please wait...';
        this.sub = this.dataService.getMessage().subscribe(data => {
            this.amount = parseInt(data.amount);
            this.cardDetails = data.cardDetails;
            this.atmService.getATMDenomination(this.atm_id).subscribe(data => {
                this.dispenseCash(data);
            });
        })
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    dispenseCash(denominations: any) {
        let totalCash = 0;
        denominations.map(denomination => totalCash += denomination.currency_denomination*denomination.count);
        if (this.amount > totalCash) {  
            this.message = 'Not enough cash.';
            this.remainingAmount = this.cardDetails.balance;
            return;
        }
        this.remainingAmount = this.cardDetails.balance - this.amount;
        // Remove those currencies which are less greater than amount as they are not required.
        // Also, denominations are sorted in descending order from the API to make sure we dispense minimum amount of notes.
        let requiredNotes = denominations.filter(denomination => denomination.currency_denomination <= this.amount);
        for (let i = 0; i < requiredNotes.length; i++) {
            if (this.amount > 0) {
                const currentNote = requiredNotes[i];
                let notes = Math.floor(this.amount / currentNote.currency_denomination);
                if (currentNote.count < notes) {
                    notes = currentNote.count;
                }
                if (notes > 0 && currentNote.count >= notes) {
                    currentNote.count -= notes;
                    currentNote.isUpdated = true;
                    this.dispensedCash.push({
                        denomination: currentNote.currency_denomination,
                        count: notes
                    });
                    this.amount = this.amount - (currentNote.currency_denomination*notes);
                }
            }
        }
        
        this.message = '';
        requiredNotes = requiredNotes.filter(notes => notes.isUpdated);
        this.atmService.updateDenominations(requiredNotes).subscribe(data => console.log(data));
        this.atmService.updateBalance(this.cardDetails._id, this.remainingAmount).subscribe(data => console.log(data));
        const obj = {
            atm_id: this.atm_id,
            card_id: this.cardDetails._id,
            dispensed_amount: this.cardDetails.balance - this.remainingAmount,
            dispensed_cash: this.dispensedCash
        };
        this.atmService.updateTransaction(obj).subscribe(data => console.log(data));
    }

    GoToLogin() {
        this.route.navigate(['/']);
    }

}
