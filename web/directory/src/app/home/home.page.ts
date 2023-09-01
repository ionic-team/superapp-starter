import { Component, inject } from '@angular/core';
import { RefresherCustomEvent } from '@ionic/angular';

import { DataService } from '../services/data.service';
import { Employee } from '../models/employee';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  private data = inject(DataService);
  constructor() {}

  refresh(ev: any) {
    setTimeout(() => {
      (ev as RefresherCustomEvent).detail.complete();
    }, 3000);
  }

  public getEmployees(): Employee[] {
    return this.data.getEmployees();
  }
}
