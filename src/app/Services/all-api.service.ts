import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class AllApiService {
  constructor(private http: HttpClient) {
    console.log('HttpClient injected:', http);
  }

  api() {
    return this.http.get('https://countriesnow.space/api/v0.1/countries/codes'); 
  }
}
