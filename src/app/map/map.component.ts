import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LocationService } from '../location.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  // locations: { name: string, latitude: number, longitude: number }[];
  // proximityMessage: string | null = null;

  // constructor() {
  //   this.locations = [
  //     { name: 'Ackruti Star (Andheri East)', latitude: 19.118469599258226, longitude: 72.87034380917989 },
  //     { name: 'Airport', latitude: 19.08861111111111, longitude: 72.86805555555554 },
  //     { name: 'Sample Location', latitude: 19.0000, longitude: 73.0000 } // Add another sample location
  //   ];
  // }
  // ngOnInit(): void {
  //   throw new Error('Method not implemented.');
  // }

  // updateLatitude(event: Event, index: number): void {
  //   const inputElement = event.target as HTMLInputElement;
  //   if (inputElement && inputElement.value !== null) {
  //     this.locations[index].latitude = parseFloat(inputElement.value);
  //   }
  // }

  // updateLongitude(event: Event, index: number): void {
  //   const inputElement = event.target as HTMLInputElement;
  //   if (inputElement && inputElement.value !== null) {
  //     this.locations[index].longitude = parseFloat(inputElement.value);
  //   }
  // }

  // checkProximity(): void {
  //   if (this.locations.length < 2) {
  //     this.proximityMessage = 'Not enough locations to check proximity.';
  //     return;
  //   }

  //   const [location1, location2] = this.locations;

  //   const distance = this.calculateDistance(
  //     location1.latitude,
  //     location1.longitude,
  //     location2.latitude,
  //     location2.longitude
  //   );

  //   this.proximityMessage = `The distance between ${location1.name} and ${location2.name} is ${distance.toFixed(2)} km.`;
  // }

  // calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  //   const R = 6371; // Radius of the Earth in km
  //   const dLat = this.deg2rad(lat2 - lat1);
  //   const dLon = this.deg2rad(lon1 - lon2);
  //   const a =
  //     Math.sin(dLat / 2) * Math.sin(dLat / 2) +
  //     Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
  //     Math.sin(dLon / 2) * Math.sin(dLon / 2);
  //   const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  //   return R * c; // Distance in km
  // }

  // deg2rad(deg: number): number {
  //   return deg * (Math.PI / 180);
  // }

  userLocation: { latitude: number, longitude: number } | null = null;
  proximityMessage: string | null = null;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchUserLocation();
  }

  fetchUserLocation() {
    this.http.get<any>('https://ipapi.co/json/') // Example API to get user's location
      .subscribe(
        response => {
          this.userLocation = {
            latitude: response.latitude,
            longitude: response.longitude
          };
          this.checkProximity();
        },
        error => {
          this.proximityMessage = 'Unable to fetch user location';
          console.error('Error fetching user location:', error);
          this.alertAdmin('Unable to fetch user location');
        }
      );
  }

  checkProximity() {
    if (this.userLocation) {
      const url = `http://localhost:8081/api/location/check-proximity?lat=${this.userLocation.latitude}&lon=${this.userLocation.longitude}`;
      this.http.get<{ message: string }>(url)
        .subscribe(
          response => {
            this.proximityMessage = response.message;
          },
          error => {
            this.proximityMessage = 'Error checking proximity';
            console.error('Error checking proximity:', error);
            this.alertAdmin('Error checking proximity: ' + error.message);
          }
        );
    }
  }

  alertAdmin(message: string) {
    // Implement alerting logic, such as sending an email or SMS
    console.log('Alert to admin:', message);
  }
}
