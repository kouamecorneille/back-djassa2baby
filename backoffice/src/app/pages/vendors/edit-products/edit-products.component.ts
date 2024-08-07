import { Component, ElementRef, ViewChild } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { BreadcrumbComponent } from '../../shared/breadcrumb/breadcrumb.component';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { EcommerceService } from '../../services/shop/ecommerce.service';
import { Category } from '../../services/shop/interfaces/Icategory';
import { CommonModule } from '@angular/common';
import { Product } from '../../services/shop/interfaces/Iproduct';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
import { Editor, NgxEditorModule, Toolbar } from 'ngx-editor';
import {NgSelectModule} from '@ng-select/ng-select';

@Component({
  selector: 'app-edit-products',
  standalone: true,
  imports: [BreadcrumbComponent,ReactiveFormsModule, CommonModule,NgxEditorModule,FormsModule,NgSelectModule],
  templateUrl: './edit-products.component.html',
  styleUrl: './edit-products.component.css'
})
export class EditProductsComponent {

  @ViewChild('canvasContainer', { static: true }) canvasContainer!: ElementRef;
  productForm!: FormGroup;
  listCategory:Category[] = [];
  product!:Product;
  productSlug!:string;
  loader=false
  editor!: Editor;
  html = '';

  toolbar: Toolbar = [
    ['bold', 'italic'],
    ['underline'],
    ['code', 'blockquote'],
    ['ordered_list', 'bullet_list'],
    [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
    ['link'],
    ['undo', 'redo'],
    ['text_color', 'background_color'],
    ['align_left', 'align_center', 'align_right', 'align_justify'],
  ];


  constructor(private fb: FormBuilder,private ecomService:EcommerceService, private activeRoute:ActivatedRoute) {

    this.productSlug = this.activeRoute.snapshot.paramMap.get('slug')!;
    this.productForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', Validators.required],
      price: ['', Validators.required],
      reduced_price: [''],
      image1: [null],
      image2: [null],
      image3: [null],
      image4: [null],
      image5: [null],
      quantity_in_stock: [0, [Validators.required, Validators.min(1)]],
      instock: [true],
      category: ['', Validators.required],
    });

   }


   ngOnInit(): void {
    this.ecomService.getCategory();
    this.ecomService.listCategory.subscribe((data) => {
      this.listCategory = data;
    });

    this.ecomService.getDetailsProduct(this.productSlug).subscribe(
      (response: Product) => {
        this.product = response;
        this.patchData(this.product);
      }
    );

    this.editor = new Editor({history: true,keyboardShortcuts: true,});
  }

   // make sure to destory the editor
   ngOnDestroy(): void {
    this.editor.destroy();
  }




  patchData(data: Product): void {
    this.productForm.patchValue({
      name: data.name,
      description: data.description,
      price: data.price.toString().split(".")[0],
      reduced_price: data.reduced_price.toString().split(".")[0],
      quantity_in_stock: data.quantity_in_stock,
      instock: data.instock,
      category: data.category.id,
      // Assurez-vous d'ajouter d'autres champs si nécessaire
    });
  }



  onFileChange(event: any, field: string): void {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.productForm.patchValue({
        [field]: file
      });

      console.log( this.productForm.value );
    }
  }

  onSubmit(): void {
    this.loader =  true
    if (this.productForm.valid) {
      const formData = this.generateFormData();
      this.ecomService.addProduct(formData).subscribe(
        (response:Product)=>{
          if(response){
            this.loader =  false;
            this.productForm.reset();
            Swal.fire({
              title: 'Modification de produit!',
              text: 'Votre produit a bien été modifier !',
              icon: 'success',
              timer: 4000,
              timerProgressBar:true
            })
          }
        },
        (error:any)=>{
          this.loader =  false;
          console.log(error);
          Swal.fire({
            title: 'Error!',
            text: 'Oops une erreur est surevenue !',
            icon: 'error',
            confirmButtonText: 'ok',
            timer: 4000,
            timerProgressBar:true
          })
        }
      )
      // Vous pouvez maintenant envoyer les données à votre service ou API
    } else {
      console.log('Formulaire non valide');
    }
  }

  generateFormData(): FormData {
    const formData = new FormData();

    // Ajouter les champs textuels et numériques
    formData.append('name', this.productForm.get('name')?.value);
    formData.append('description', this.productForm.get('description')?.value);
    formData.append('price', this.productForm.get('price')?.value);
    formData.append('reduced_price', this.productForm.get('reduced_price')?.value);
    formData.append('quantity_in_stock', this.productForm.get('quantity_in_stock')?.value.toString());
    formData.append('instock', this.productForm.get('instock')?.value.toString());
    formData.append('category', this.productForm.get('category')?.value);
    formData.append('shop', this.ecomService.connectedStore.id);

    // Ajouter les fichiers
    const image1 = this.productForm.get('image1')?.value;
    const image2 = this.productForm.get('image2')?.value;
    const image3 = this.productForm.get('image3')?.value;
    const image4 = this.productForm.get('image4')?.value;
    const image5 = this.productForm.get('image5')?.value;

    if (image1) {
      formData.append('image1', image1);
    }
    if (image2) {
      formData.append('image2', image2);
    }
    if (image3) {
      formData.append('image3', image3);
    }
    if (image4) {
      formData.append('image4', image4);
    }
    if (image5) {
      formData.append('image5', image5);
    }

    return formData;
  }







}
