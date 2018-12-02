import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import {DataService} from '../services/data.service';
import * as _ from 'lodash';
@Injectable()
export class RouteGuardService implements CanActivate {

    authenticated: boolean = false;
  constructor(public dataService: DataService, public router: Router) {}

  canActivate(): boolean {
      this.authenticate();
      return this.authenticated;
  }

  authenticate(): any {
      // Get data from route guard.
    this.dataService.getMessageForRouteGuard().subscribe(dataFromService => {
        // Return true if data exists
        if (!dataFromService || _.isEmpty(dataFromService)) {
            this.router.navigate(['/']);
            this.authenticated = false;
          }
          this.authenticated = true;
      });
  }

}