import { Component, OnDestroy, OnInit } from '@angular/core';
import { CategoriesRequestsService } from '../../data/categories-requests.service';
@Component({

  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrl: './categoria.component.css',
})
export class CategoriaComponent implements OnInit, OnDestroy {

  public productos: any[];
  public categories: any[];
  public isOpenModal: boolean = false;
  public productName: string = "";
  public price: number = 0;
  public stock: number = 0;
  public editingProduct: any;
  public searchText: string;
  public selectedCategory: string = "";
  public timeoutId: any;
  constructor(private categoriasRequests: CategoriesRequestsService) {
    this.categories = [];
    this.productos = [];
    this.searchText = "";
  }

  loadCategories() {
    this.categoriasRequests.getCategories().subscribe({
      next: (data) => {
        this.categories = data;
        console.log(this.categories);
      },
      error: (err) => {
        console.error('Error loading categorias', err);
      }
    });
  }

  onClear() {


  }

  onSearch(evt: any) {

  }

  onOpenModal(item: any) {

  }

  onCloseModal() {

  }

  onSaveModal() {

  }

  onDelete(item: any) {

  }

  onSaveProduct() {

  }


  ngOnInit(): void {
    this.loadCategories();
  }

  ngOnDestroy(): void {

  }

}
