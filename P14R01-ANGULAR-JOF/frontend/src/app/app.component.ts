import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductosRequestsService } from '../data/productos-requests.service';
import { CategoriesRequestsService } from '../data/categories-requests.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit, OnDestroy{
  title = 'frontend';


  constructor() {
  }
  ngOnInit(): void {

  }

  ngOnDestroy(): void {
    
  }
}
