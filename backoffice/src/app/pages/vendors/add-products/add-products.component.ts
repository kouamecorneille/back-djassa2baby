import { Component, ElementRef, ViewChild } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { BreadcrumbComponent } from '../../shared/breadcrumb/breadcrumb.component';

@Component({
  selector: 'app-add-products',
  standalone: true,
  imports: [BreadcrumbComponent,],
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
