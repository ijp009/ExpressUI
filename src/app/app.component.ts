import { Component, OnInit } from '@angular/core';
import { EmployeeService } from './services/app.service';
import { Product } from './models/Product.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  allData: Product[];

  constructor(private employeeService: EmployeeService) {

  }

  ngOnInit() {
    this.employeeService.getEmployee().subscribe(data => {
      this.allData = data;
      console.log(this.allData);
    });
  }
  

}
