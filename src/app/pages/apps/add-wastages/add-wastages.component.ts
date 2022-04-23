import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth.service';


@Component({
  selector: 'app-add-wastages',
  templateUrl: './add-wastages.component.html',
  styleUrls: ['./add-wastages.component.scss']
})
export class AddWastagesComponent implements OnInit {

  isVisible = false;
  isOkLoading = false;

  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    this.isOkLoading = true;
    setTimeout(() => {
      this.isVisible = false;
      this.isOkLoading = false;
    }, 3000);
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  loginfo
  CompanyId:any
  StoreId:any
  products:any

  constructor(private Auth: AuthService,) { }

  ngOnInit(): void {
    this.Auth.getdbdata(['loginfo', 'printersettings']).subscribe(data => {
      this.loginfo = data['loginfo'][0]
      this.CompanyId = this.loginfo.CompanyId
      this.StoreId = this.loginfo.StoreId
      this.getproducts()
    })
   
  }
  

  getproducts() {
    this.Auth.getproducts().subscribe(data => {
      this.products = data
      console.log(this.products)
    })
  } 

}
