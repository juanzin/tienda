import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductosRequestsService } from '../../data/productos-requests.service';
import { CategoriesRequestsService } from '../../data/categories-requests.service';
import { error } from 'console';
import { Producto } from '../../models/producto.model';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrl: './producto.component.css'
})

export class ProductoComponent implements OnInit, OnDestroy {

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

  constructor(private productosRequests: ProductosRequestsService, private categoriesRequests: CategoriesRequestsService) {
    this.productos = [];
    this.categories = [];
    this.searchText = "";
  }

  onClear() {
    console.log("clear");
    this.productName = "";
    this.price = 0;
    this.stock = 0;

  }

  onSearch(evt: any) {
    clearTimeout(this.timeoutId);
    this.timeoutId = setTimeout(() => {
      console.log("Executed after 2 seconds", this.searchText);
      /// PENDIENTE
    }, 2000);
  }

  onOpenModal(item: any) {
    this.isOpenModal = true;
    this.editingProduct = item;
  }

  onCloseModal() {
    this.isOpenModal = false;
    this.editingProduct = null;
  }

  onSaveModal() {
    let productId = this.editingProduct.id;
    let categoryId: number = 0;
    for(let i = 0; i < this.categories.length; i++) {
      if(this.categories[i].nombre ===  this.editingProduct.categoria) {
        categoryId = this.categories[i].id;
        break;
      }
    }

    var producto: Producto = {
      id: this.editingProduct.id,
      categoriasId: categoryId,
      nombre: this.editingProduct.nombre,
      precio: this.editingProduct.precio,
      stock: this.editingProduct.stock
    };

    this.productosRequests.updateProducto(this.editingProduct.id, producto).subscribe({
      next: () => {
        console.log("updated");
      },
      error: () => {
        console.error("error while updating");
      }
    })
    this.isOpenModal = false;
    this.editingProduct = null;
  }

  onDelete(item: any) {
    this.productosRequests.deleteProducto(item.id).subscribe({
      next: ()=> {
        console.log("deleted item");
        for(let i = 0; i < this.productos.length; i++) {
          if(this.productos[i].id === item.id) {
            this.productos.splice(i, 1);
            break;
          }
        }
      },
      error: ()=> {
        console.error("error in the server while deleting");
      }

    })    
  }

  onSaveProduct() {
    console.log("saving");
    let categoryId: number = 0;

    for(let i = 0; i < this.categories.length; i++) {
      if(this.categories[i].nombre ===  this.selectedCategory) {
        categoryId = this.categories[i].id;
        break;
      }
    }

    var producto: Producto = {
      categoriasId: categoryId,
      // id: 1,
      nombre: this.productName,
      precio: this.price,
      stock: this.stock
    };
    this.productosRequests.saveProducto(producto).subscribe({
      next: () => {
        console.log("stored successfully");
        this.loadProductos();
      },
      error: (error) => {
        console.error("Error while saving....");
      }
    })
  }

  loadProductos() {
    this.productosRequests.getProductos().subscribe({
      next: (data) => {
        this.productos = data;
        console.log("peticion terminada");
        console.log(this.productos);
        this.loadcategories();
      },
      error: (err) => {
        console.error('Error loading productos', err);
      }
    });

    console.log("despues de la peticion")
  }

  loadcategories() {
    this.categoriesRequests.getCategories().subscribe({
      next: (data) => {
        this.categories = data;
        if (this.categories.length > 0) {
          this.selectedCategory = this.categories[0].nombre;

          for(let i = 0; i < this.productos.length; i++) {
            let categoryId = this.productos[i].categoriasId;
            for(let j = 0; j < this.categories.length; j++) {
              if(this.categories[j].id === categoryId) {
                this.productos[i].categoria = this.categories[j].nombre;
                
              }
            }
          }
        }
        console.log(this.categories);
      },
      error: (error) => {
        console.error("error while retrieving data");
      }
    });
  }

  ngOnInit(): void {
    this.loadProductos();
  }

  ngOnDestroy(): void {

  }
}
