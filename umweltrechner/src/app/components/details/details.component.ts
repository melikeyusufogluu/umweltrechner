import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AllServicesService } from 'src/app/services/all-services.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit, OnDestroy {
  public data: any = [];
  public eventSubscription!: Subscription;
  autoCardName!: string
  constructor(public allServices: AllServicesService) { }

  ngOnInit() {
    this.eventSubscription = this.allServices.getDetails().subscribe(item => {
      if(item?.journeys?.length >= 1) {
        item?.journeys.forEach((journey: any) => this.data?.push(journey.legs))
        this.data = Array.prototype.concat.apply([], this.data);  // concat all legs array
        this.data = this.data.filter((item: any) => item.transportation.product.name === 'Auto');
        this.data.filter((item: any) => this.autoCardName = item.transportation.product.name)
      }
    });
  }

  ngOnDestroy(): void {
    this.eventSubscription.unsubscribe();
  }
}
