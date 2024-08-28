import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { Category } from './interfaces/Icategory';
import { Product } from './interfaces/Iproduct';
import { AuthService } from '../auth/auth.service';
import { User, UserApiResponse } from '../../interfaces/Iuser';
import { Store } from '../../interfaces/Istore';
import { Coupon } from '../../interfaces/Icoupon';

@Injectable({
  providedIn: 'root'
})
export class EcommerceService {

  listCategory =  new BehaviorSubject<Category[]>([])
  _listCategory =  new BehaviorSubject<any[]>([])
  _listOfSubscribers =  new BehaviorSubject<any[]>([])
  listOfProducts = new BehaviorSubject<Product[]>([]);
  _listOfOrders = new BehaviorSubject<any[]>([]);
  _listOfCoupons = new BehaviorSubject<Coupon[]>([]);
  numberOfOrders = new BehaviorSubject<number>(0);
  _numberOfCategorie = new BehaviorSubject<number>(0);

  _connectedStore!:Store
  userSession!:UserApiResponse
  constructor(private apiService:ApiService, private authService:AuthService) {

    this.userSession = this.authService.getUser()!

  }


  addProduct(data:FormData){
    return this.apiService.postItem(data, '/products/');
  }

  updateProduct(data:FormData, slug:string){
    return this.apiService.putItem(data, '/products/',slug);
  }


  get connectedStore(): Store {
    if (!this._connectedStore) {
      this._connectedStore = this.userSession.shop!;
    }
    return this._connectedStore;
  }

  addCoupon(data:any){
    return this.apiService.postItem(data, '/coupons/');
  }

  deleteCoupon(id:string){
    return this.apiService.deleteItem('/coupons/', id);
  }

  updateCoupon(data:any, id:string){
    return this.apiService.putItem(data, '/coupons/', id);
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

  getVendorCoupons() {
    this.apiService.getItems(`/coupons/`).subscribe(
      (response: Coupon[]) => {
        const filteredCoupons = response.reverse().filter((item) => {
          return item.shop === this.connectedStore.id;
        });
        this._listOfCoupons.next(filteredCoupons);
      },
      (error: any) => {
        console.log(error.message);
      }
    );
  }



  getVendorOrders() {

    this.apiService.getItems(`/orders/shop-orders/${this.userSession.shop?.id}`).subscribe(
      (response:any) => {

        this._listOfOrders.next(response.reverse());
        this.numberOfOrders.next(response.length)
      },
      (error:any) => {
        console.log(error.message)
      }
    )

  }


  getDetailsProduct(slug:string):Observable<Product>{
    return this.apiService.getItem(`/products`,slug);
  }

  getCategory() {
    // Appel de l'API pour récupérer les catégories d'éléments
    this.apiService.getItems('/categories').subscribe(
      (response: Category[]) => {  // Utilisation de subscribe pour s'abonner à la réponse
        console.log(response);  // Affichage de la réponse dans la console
        // Mettre à jour la première partie de la liste de données avec les 7 premiers éléments
        this.listCategory.next(response);
        // Affichage de la valeur actuelle de listOfData dans la console
      }
    );
  }

  getFavoritesCategorie() {
    // Appel de l'API pour récupérer les catégories d'éléments
    this.apiService.getItems(`/shop-categories/list-categorie/${this.userSession.shop?.id}`).subscribe(
      (response:any) => {  // Utilisation de subscribe pour s'abonner à la réponse
        console.log(response);  // Affichage de la réponse dans la console
        // Mettre à jour la première partie de la liste de données avec les 7 premiers éléments
        this._numberOfCategorie.next(response.length);
        this._listCategory.next(response);
        // Affichage de la valeur actuelle de listOfData dans la console
      }
    );
  }

  deleteProduct(id:string){

    return this.apiService.deleteItem('products', id)
  }

  getProductReviews(slug:string){

    return this.apiService.getItems(`products/${slug}/reviews/`);
  }

  getProductDetails(slug:string){

    return this.apiService.getItem(`products`,slug);
  }


}
