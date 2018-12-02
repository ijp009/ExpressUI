import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../services/data.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
@Component({
  selector: 'app-withdraw-money',
  templateUrl: './withdrawmoney.component.html',
  styleUrls: ['./withdrawmoney.component.css']
})
export class AppWithdrawMoney implements OnInit, OnDestroy {

  sub: any;
  cardDetails: any;
  amountToWithdraw: any;
  emptyAmount: boolean = false;
  message: any = '';
  constructor(private dataService: DataService, private router: Router) {
  }
  ngOnInit() {
    this.sub = this.dataService.getMessage().subscribe(message => {
      this.cardDetails = message; 
      console.log('inside withdraw money', this.cardDetails);
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  WithdrawAmount() {
    this.emptyAmount = !this.amountToWithdraw ? true : false;
    if (this.emptyAmount) {
      return;
    }
    const balance = this.cardDetails.balance;
    if (this.amountToWithdraw < 0) {
      this.message = 'Enter positive amount to dispense';
    } else if (this.amountToWithdraw % 100 !== 0) {
      this.message = 'Amount should be in multiple of 100';
    } else if (this.amountToWithdraw > balance) {
      this.message = 'Not enough balance';
    } else {
      this.dataService.sendMessage({
        amount: this.amountToWithdraw,
        cardDetails: this.cardDetails
      })
      this.router.navigate(['transactionDetails']);
    }
  }

}
