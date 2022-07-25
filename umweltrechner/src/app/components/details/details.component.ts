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
        item?.journeys?.filter((data: any) => this.data = data?.legs.filter((leg: any) => leg.transportation.product.name === 'Auto'));
      }
    });
  }

  ngOnDestroy(): void {
    this.eventSubscription.unsubscribe();
  }
}
