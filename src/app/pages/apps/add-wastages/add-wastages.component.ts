import { Component, OnInit } from '@angular/core';

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

  constructor() { }

  ngOnInit(): void {
  }

}
