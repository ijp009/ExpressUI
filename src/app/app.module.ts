import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import { AppCardValidator } from './cardvalidator/cardvalidator.component';
import { AppWithdrawMoney } from './withdrawmoney/withdrawmoney.component';
import { AppTransactionDetails } from './transactiondetails/transactiondetails.component';
import { ATMService } from './services/atm.service';
import { RouterModule, Routes } from '@angular/router';
import { DataService } from './services/data.service';
import {RouteGuardService as RouteGuard} from './auth/route-guard.service';
const appRoutes: Routes = [
  { path: '', component: AppCardValidator },
  { path: 'withdrawMoney', component: AppWithdrawMoney, canActivate: [RouteGuard] },
  { path: 'transactionDetails', component: AppTransactionDetails, canActivate: [RouteGuard] },
];

@NgModule({
  declarations: [
    AppComponent,
    AppCardValidator,
    AppWithdrawMoney, 
    AppTransactionDetails
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  exports:[RouterModule],
  providers: [
    ATMService,
    DataService,
    RouteGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
