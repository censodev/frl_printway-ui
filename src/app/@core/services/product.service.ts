import { ProductTemplate, ProductImage, ProductVariant } from './../models/business/product';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { Product } from '../models/business/product';
import { Pageable } from '../models/pageable';

const BASE_URL = `${environment.apiUrl}/product`;

@Injectable({
  providedIn: 'root',
})
export class ProductService {

  constructor(private http: HttpClient) { }

  listProducts(createdBy: number = 0,
              limit: number = 10,
              page: number = 0,
              orderBy: string = 'id',
              order: string = 'desc'): Observable<Pageable<Product>> {
    const params = new HttpParams()
      .set('createdBy', createdBy.toString())
      .set('limit', limit.toString())
      .set('page', page.toString())
      .set('orderBy', orderBy)
      .set('order', order);
    return this.http.get<Pageable<Product>>(`${BASE_URL}`, { params: params });
  }

  findOne(id: number): Observable<Product> {
    return this.http.get<Product>(`${BASE_URL}/${id}`);
  }

  addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(`${BASE_URL}`, product);
  }

  updateProduct(product: Product): Observable<Product> {
    return this.http.put<Product>(`${BASE_URL}/${product.id}`, product);
  }

  listTemplates(limit: number = 10,
              page: number = 0,
              orderBy: string = 'id',
              order: string = 'desc'): Observable<Pageable<ProductTemplate>> {
    const params = new HttpParams()
      .set('limit', limit.toString())
      .set('page', page.toString())
      .set('orderBy', orderBy)
      .set('order', order);
    return this.http.get<Pageable<ProductTemplate>>(`${BASE_URL}/template`, { params: params });
  }

  findTemplate(id: number): Observable<ProductTemplate> {
    return this.http.get<ProductTemplate>(`${BASE_URL}/template/${id}`);
  }

  addTemplate(template: ProductTemplate): Observable<ProductTemplate> {
    return this.http.post<ProductTemplate>(`${BASE_URL}/template`, template);
  }

  updateTemplate(template: ProductTemplate): Observable<ProductTemplate> {
    return this.http.put<ProductTemplate>(`${BASE_URL}/template/${template.id}`, template);
  }

  saveImage(src: string, shopifyProductId: number, storeId: number): Observable<ProductImage> {
    return this.http.post<ProductImage>(`${BASE_URL}/image`, {
      src: src,
      shopifyProductId: shopifyProductId,
      storeId: storeId,
    });
  }

  saveImageAsBase64(src: string, shopifyProductId: number, storeId: number): Observable<ProductImage> {
    return this.http.post<ProductImage>(`${BASE_URL}/image-base64`, {
      src: src,
      shopifyProductId: shopifyProductId,
      storeId: storeId,
    });
  }

  deleteImage(id: number, shopifyProductId: number, storeId: number): Observable<any> {
    const params = new HttpParams()
      .set('id', id.toString())
      .set('shopifyProductId', shopifyProductId.toString())
      .set('storeId', storeId.toString());
    return this.http.delete(`${BASE_URL}/image`, { params: params });
  }

  createVariant(variant: ProductVariant): Observable<ProductVariant> {
    return this.http.post<ProductVariant>(`${BASE_URL}/variant`, variant);
  }

  updateVariant(variant: ProductVariant): Observable<ProductVariant> {
    return this.http.put<ProductVariant>(`${BASE_URL}/variant/${variant.id}`, variant);
  }

  findVariant(id: number): Observable<ProductVariant> {
    return this.http.get<ProductVariant>(`${BASE_URL}/variant/${id}`);
  }
}
