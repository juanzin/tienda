import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductosRequestsService {

  private apiUrl: string = "https://localhost:7067/api/productos"; 
  constructor(private http: HttpClient) {

  }

  getProductos(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  updateProducto(id: number, producto: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}?id=${id}`, producto);
  }

  saveProducto(producto: any): Observable<any> {
    return this.http.post(this.apiUrl, producto);
  }

  deleteProducto(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}?id=${id}`);
  }
}
