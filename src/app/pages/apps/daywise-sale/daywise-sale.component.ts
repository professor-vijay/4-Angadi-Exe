import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth.service'
import * as moment from 'moment'


@Component({
  selector: 'app-daywise-sale',
  templateUrl: './daywise-sale.component.html',
  styleUrls: ['./daywise-sale.component.scss']
})
export class DaywiseSaleComponent implements OnInit {

  constructor(private Auth: AuthService,) { }

  daysales: any
  strdate: string
  enddate: string
  CompanyId: any
  StoreId: any
  dateRange = []
  loginfo
  date: { year: number; month: number }

  ngOnInit(): void {
    this.Auth.getdbdata(['loginfo']).subscribe(data => {
      this.loginfo = data['loginfo'][0]
      this.CompanyId = this.loginfo.companyId
      this.StoreId = this.loginfo.storeId
      console.log(this.loginfo)
    })

    this.strdate = moment().format('YYYY-MM-DD')
    this.enddate = moment().format('YYYY-MM-DD')
    this.daywisesale()  
  }

  daywisesale() {
    this.Auth.daywise(this.strdate, this.enddate, this.loginfo.storeId).subscribe(data => {
      this.daysales = data["order"]
      console.log(this.daysales)
    })
  }
  onChange(result: Date): void {
    console.log('onChange: ', result)
    this.strdate = moment(result[0]).format('YYYY-MM-DD')
    this.enddate = moment(result[1]).format('YYYY-MM-DD')
    this.daywisesale()

  }

}
