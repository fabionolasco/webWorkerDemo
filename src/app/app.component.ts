import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  public worker;
  public humanAge = 0;
  public dogAge = 0;

  constructor() {
    if (window['Worker']) {
      this.worker = new Worker('/assets/sw.js');
      this.worker.onmessage = resp => {
        console.log('resp', resp);
        this.dogAge = resp.data['dogAge'];
      };
    }
  }

  getDogAge() {
    this.worker.postMessage({ 'age': this.humanAge });
  }

}
