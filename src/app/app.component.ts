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
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/assets/sw.js').then((worker: any) => {
        this.worker = worker;
      });
    }
  }

  getDogAge() {
    this.sendReceiveMsg({ 'age': this.humanAge })
      .then(resp => {
        console.log('resp', resp);
        this.dogAge = resp['dogAge'];
      });
  }

  sendReceiveMsg(msg) {
    return new Promise((resolve, reject) => {
      const msg_chan = new MessageChannel();
      msg_chan.port1.onmessage = (event) => {
        if (event.data.error) {
          reject(event.data.error);
        } else {
          resolve(event.data);
        }
      };
      this.worker.active.postMessage(msg, [msg_chan.port2]);
    });
  }

}
