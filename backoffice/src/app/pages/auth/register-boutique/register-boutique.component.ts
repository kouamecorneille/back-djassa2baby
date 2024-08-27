import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { EcommerceService } from '../../services/shop/ecommerce.service';
import { Category } from '../../services/shop/interfaces/Icategory';

@Component({
  selector: 'app-register-boutique',
  standalone: true,
  imports: [RouterModule,ReactiveFormsModule,CommonModule],
  templateUrl: './register-boutique.component.html',
  styleUrl: './register-boutique.component.css'
})
export class RegisterBoutiqueComponent {

  // Déclaration du formulaire réactif

  shopForm: FormGroup;
  logo:any
  loading=false
  logoPreview: string | ArrayBuffer | null = null;
  public ecomService = inject(EcommerceService)
  listCategory:Category[] = [];
  selectedCategories:string[] = [];
  selectedLogo:any

  constructor(private formBuilder: FormBuilder, private apiService:ApiService, private router: Router) {
    this.shopForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone_number_1: ['',[Validators.required, Validators.minLength(10)]],
      description: ['',Validators.required],
      location: ['',Validators.required],
      password: ['', [Validators.required,  Validators.minLength(6)]],
      confirm_password: ['', [Validators.required,  Validators.minLength(6)]],
      whatsapp_link: ['', Validators.pattern('https://wa.me/.*')],
      facebook_link: ['', Validators.pattern('https://facebook.com/.*')],
      is_active: [true],
      can_evaluate: [false],
    });
  }

  currentStep = 0;
  steps: string[] = ['Étape 1', 'Étape 2', 'Étape 3','Étape 4'];

  keyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  nextStep() {
    if (this.currentStep < this.steps.length - 1) {
      this.currentStep++;
    }
  }

  selectedCategory(id:string){

    const index = this.selectedCategories.indexOf(id);
    if (index === -1) {
      // If not selected, add to array
      this.selectedCategories.push(id);
    } else {
      // If already selected, remove from array
      this.selectedCategories.splice(index, 1);
    }
  }

  previousStep() {
    if (this.currentStep > 0) {
      this.currentStep--;
    }
  }

  goToStep(step: number) {
    this.currentStep = step;
  }

  ngOnInit(): void {

    this.ecomService.getCategory()
    this.ecomService.listCategory.subscribe(
      (data) => {
        this.listCategory = data;
      }
    )

  }

  onLogoSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.logoPreview = e.target?.result!;
      };
      reader.readAsDataURL(input.files[0]);
    }
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];

      // Check file type
      const validFileTypes = ['image/jpeg', 'image/png', 'image/jpg'];
      if (!validFileTypes.includes(file.type)) {
        Swal.fire({
          title: 'Type de fichier invalide',
          text: 'Veuillez sélectionner un fichier JPG, JPEG ou PNG.',
          icon: 'error',
          confirmButtonText: 'Ok',
          timer: 4000,
          timerProgressBar: true
        });
        return;
      }

      this.selectedLogo = file


    }
  }

  onSubmit(){

    if(this.shopForm.value.password === this.shopForm.value.confirm_password){
      this.loading = true;

      const form = new FormData()

      form.append('logo',this.selectedLogo)
      form.append('name',this.shopForm.value.name)
      form.append('email',this.shopForm.value.email)
      form.append('phone_number_1',this.shopForm.value.phone_number_1)
      form.append('phone_number_2',this.shopForm.value.phone_number_1)
      form.append('password',this.shopForm.value.password)
      form.append('description',this.shopForm.value.description)
      form.append('location',this.shopForm.value.location)
      form.append('facebook_link',this.shopForm.value.facebook_link)
      form.append('whatsapp_link',this.shopForm.value.whatsapp_link)
      form.append('categories', JSON.stringify(this.selectedCategories));

      this.apiService.postItem(form, '/create-shop-with-owner/').subscribe(

        (response:any) => {
          if(response){
            this.loading = false;
            Swal.fire({
              title: 'Création de boutique !',
              text: 'Votre boutique a été créer  avec succès !',
              icon: 'success',
              timer: 5000,
              timerProgressBar:true
            })

            this.router.navigate(['/auth/login']);
          }
        },
        (error:any) => {
          this.loading = false;
          console.log(error)
          Swal.fire({
            title: 'Création de boutique !',
            text: 'Nous avons rencontrer une erreur !',
            icon: 'error',
            confirmButtonText: 'ok',
            timer: 4000,
            timerProgressBar:true
          })
        }
      )

    }else{

      this.loading = false;
      Swal.fire({
        title: 'Création de boutique !',
        text: 'Les deux mot de passe ne correspondent pas!',
        icon: 'error',
        confirmButtonText: 'ok',
        timer: 4000,
        timerProgressBar:true
      })
    }


  }



  OnSelectLogo(event:any){

    if(event){

      const logo = event.target.files[0]

      this.logo = logo
    }

  }





}
