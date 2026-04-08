import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriesRequestsService {

  private apiUrl: string = "https://localhost:7067/api/categorias"; 
  constructor(private http: HttpClient) {

   }

  getCategories(): Observable<any[]> {
      return this.http.get<any[]>(this.apiUrl);
  }
}
