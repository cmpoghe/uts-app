import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  //private apiUrl = 'http://localhost:8081/api/location/check';
  private apiUrl = 'http://localhost:8081/api/location/check-proximity';

  constructor(private http: HttpClient) { }

  checkProximity(lat: number, lon: number): Observable<string> {
    let params = new HttpParams().set('lat', lat.toString()).set('lon', lon.toString());
    return this.http.get<string>(this.apiUrl, { params });
  }

}
