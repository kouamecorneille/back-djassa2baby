import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-add-products',
  standalone: true,
  templateUrl: './add-products.component.html',
  styleUrl: './add-products.component.css'
})
export class AddProductsComponent {

  @ViewChild('canvasContainer', { static: true }) canvasContainer!: ElementRef;



  constructor() { }

  ngOnInit(): void {


  }


  getCategories() {



  }


}
