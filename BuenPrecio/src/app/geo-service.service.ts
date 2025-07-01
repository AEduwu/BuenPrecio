import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GeoService {
  private apiKey = '2cd9403d6ae94540abd98950e1b14369';
  private baseUrl = 'https://api.opencagedata.com/geocode/v1/json';

  constructor(private http: HttpClient) {}

  reverseGeocode(lat: number, lng: number): Observable<string> {
    const url = `${this.baseUrl}?q=${lat}+${lng}&key=${this.apiKey}&language=es&pretty=1`;

    return this.http.get<any>(url).pipe(
      map(response => {
        const result = response.results[0];
        return result?.formatted ?? `${lat}, ${lng}`;
      })
    );
  }


  
}
