import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth.service'
import * as moment from 'moment'

@Component({
  selector: 'app-paymenttypes',
  templateUrl: './paymenttypes.component.html',
  styleUrls: ['./paymenttypes.component.scss']
})
export class PaymenttypesComponent implements OnInit {

  constructor(private Auth: AuthService,) { }
  trans: any
  strdate: string
  enddate: string
  CompanyId: any
  StoreId: any
  loginfo
  date: { year: number; month: number }
  dateRange = []
  storepayment: any = [];
  transaction: any = [];
  transpayment: any = [];
  paymenttype: any = [];

  ngOnInit(): void {
    this.Auth.getdbdata(['loginfo']).subscribe(data => {
      this.loginfo = data['loginfo'][0]
      this.CompanyId = this.loginfo.companyId
      this.StoreId = this.loginfo.storeId
      console.log(this.loginfo)   
      this.strdate = moment().format('YYYY-MM-DD')
      this.enddate = moment().format('YYYY-MM-DD')
      this.gettransrpt() 
    })
   

  }

  gettransrpt() {
    this.Auth.GetTrans(this.strdate, this.enddate, this.loginfo.storeId, this.loginfo.companyId).subscribe(data => {
      this.trans = data
      this.storepayment = data['pos_transactions'];
      this.transpayment = [];
      console.log(this.trans);
    })
  }

  gettranstype(sourceid, ptypeid, transaction) {
    this.transaction = transaction
    console.log(sourceid, ptypeid, transaction)
    this.Auth.GetTransType(this.strdate, this.enddate, this.loginfo.storeId, this.loginfo.companyId, ptypeid, sourceid).subscribe(data => {
      this.transpayment = data['transactions'];
      this.paymenttype = data["paymenttypes"]
      console.log(this.transaction);

      console.log(this.transpayment)

    })
  }

  onChange(result: Date): void {
    console.log('onChange: ', result)
    this.strdate = moment(result[0]).format('YYYY-MM-DD')
    this.enddate = moment(result[1]).format('YYYY-MM-DD')
    this.gettransrpt()

  }


}
