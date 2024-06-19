import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { Category } from './interfaces/Icategory';
import { Product } from './interfaces/Iproduct';
import { AuthService } from '../auth/auth.service';
import { User, UserApiResponse } from '../../interfaces/Iuser';
import { Store } from '../../interfaces/Istore';

@Injectable({
  providedIn: 'root'
})
export class EcommerceService {

  listCategory =  new BehaviorSubject<Category[]>([])
  listOfProducts = new BehaviorSubject<Product[]>([]);
  _connectedStore!:Store
  userSession!:UserApiResponse
  constructor(private apiService:ApiService, private authService:AuthService) {

    this.userSession = this.authService.getUser()!
  }


  addProduct(data:FormData){
    return this.apiService.postItem(data, 'products/');
  }

  get connectedStore(): Store {
    if (!this._connectedStore) {
      this._connectedStore = this.userSession.shop!;
    }
    return this._connectedStore;
  }

  getVendorProducts() {

    this.apiService.getItems(`/shops/${this.userSession.shop?.slug}/products`).subscribe(
      (response:Product[]) => {

        this.listOfProducts.next(response.reverse());
      },
      (error:any) => {
        console.log(error.message)
      }
    )

  }


  getDetailsProduct(slug:string):Observable<Product>{
    return this.apiService.getItem(`products`,slug);
  }

  getCategory() {
    // Appel de l'API pour récupérer les catégories d'éléments
    this.apiService.getItems('categories').subscribe(
      (response: Category[]) => {  // Utilisation de subscribe pour s'abonner à la réponse
        console.log(response);  // Affichage de la réponse dans la console
        // Mettre à jour la première partie de la liste de données avec les 7 premiers éléments
        this.listCategory.next(response);
        // Affichage de la valeur actuelle de listOfData dans la console
      }
    );
  }




}
