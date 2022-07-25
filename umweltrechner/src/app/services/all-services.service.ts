import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IDashboardResponse } from '../models/models.interface';

@Injectable({
  providedIn: 'root'
})
export class AllServicesService {
  setData: any;

  constructor(private http: HttpClient, private datePipe: DatePipe) {}

  getAllStations(): Observable<IDashboardResponse> {
    let allStations = `https://efastatic.vvs.de/umweltrechner/XML_STOPFINDER_REQUEST?outputFormat=rapidJSON&SpEncId=0&coordOutputFormat=EPSG:4326&serverInfo=1&suggestApp=vvs&type_sf=any&version=10.2.10.139&name_sf=$searchInput`;
    return this.http.get<IDashboardResponse>(allStations);
  }

  getDetails(): Observable<any> {
    let date = new Date();
    let itdDate = this.datePipe.transform(date, 'yyyyMMdd');

    let allDetails = `https://efastatic.vvs.de/umweltrechner/XML_TRIP_REQUEST2?language=de&locationServerActive=1&command=&usage=&anyObjFilter=&searchLimitMinutes=360&ptOptionsActive=1&illumTransfer=on&itOptionsActive=1&delMinDistTrips=1&coordListOutputFormat=STRING&convertStopsPTKernel2LocationServer=1&convertPOIsITKernel2LocationServer=1&outputOptionsActive=1&calcNumberOfTrips=1&itdTime=1600&computeMonomodalTripCar=1&speedFactorCar=100%25&costFactorCar=0%25&distanceFactorCar=10%25&traveltimeFactorCar=90%25&lineRestriction=403&calculateCO2=1&calculateDistance=1&anyType_origin=&type_origin=any&anyObjFilter_origin=0&place_origin=&anyType_destination=&type_destination=any&anyObjFilter_destination=0&place_destination=&outputFormat=rapidJSON&includeFares=true&useUT=true&name_origin=${this.setData[0]}&name_destination=${this.setData[1]}&itdDate=${itdDate}`;
    return this.http.get(allDetails);
  }

  setSelectedDestination(data: any) {
    this.setData = data;
  }
}
