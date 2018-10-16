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
  name: string;
  price: number;

  constructor(private employeeService: EmployeeService) {

  }

  loadAllEmployees() {
    this.employeeService.getEmployee().subscribe(data => {
      this.allData = data;
      console.log(this.allData);
    });
  }
  ngOnInit() {
    this.loadAllEmployees();
  }
  
  createProduct() {
    console.log(this.name);
    console.log(this.price);
    const obj: any = {
      name: this.name,
      price: this.price
    };
    this.employeeService.createEmployee(obj).subscribe(data => {
      this.name = '';
      this.price = undefined;
      this.loadAllEmployees();
    })
  }

}
