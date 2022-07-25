import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { IDashboardResponse } from 'src/app/models/models.interface';
import { AllServicesService } from 'src/app/services/all-services.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  public data$!: Observable<IDashboardResponse>;
  public data!: IDashboardResponse;
  public eventSubscription!: Subscription;
  public selectedList: any = [];
  originId!: string;
  destinationId!: string;
  filteredArray!: any;
  selectedSearch: any;

  constructor(private allStations: AllServicesService, private router: Router) { }

  ngOnInit(): void {
    this.data$ = this.allStations.getAllStations();
    this.eventSubscription = this.data$.subscribe(item => {
      this.data = item;
      item.locations.sort((a: any, b: any) => a.matchQuality - b.matchQuality);
    });
  }

  applyFilter(event: string, input: any) {
    this.selectedSearch = input;
    if (event === '') {
      this.filteredArray = [];
      return;
    }
    this.filteredArray = this.data?.locations.filter((item: any) => item.disassembledName?.toLocaleLowerCase().startsWith(event));

  }

  clearSearch(selectedInput: string) {
    selectedInput === 'destination' ? this.destinationId = '' : this.originId = '';
  }

  selectedAddress(selectedItem: any) {
    this.selectedSearch === 'destination' ? this.destinationId = selectedItem?.disassembledName : this.originId = selectedItem?.disassembledName;
    this.selectedList.push(selectedItem.id);
    this.filteredArray = [];
  }

  goToDetails() {
    this.router.navigate(['/details']);
    this.allStations.setSelectedDestination(this.selectedList);
  }

  ngOnDestroy(): void {
    this.eventSubscription.unsubscribe();
  }
}
