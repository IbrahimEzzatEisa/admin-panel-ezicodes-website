import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient  , HttpHeaders } from '@angular/common/http';


import { END_POINTS } from './globals/global-config';
import { DataWithRanking } from 'app/shared/models/data-with-ranking.model';
import { ServicesItem } from 'app/shared/models';
const API_URL = END_POINTS.service;
const API_URLLang = END_POINTS.serviceByLang;

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  constructor(private http: HttpClient) { }

  create(model: ServicesItem): Observable<ServicesItem[]> {
    return this.http.post<ServicesItem[]>(API_URL, model);
  }
  getAll(): Observable<DataWithRanking<ServicesItem>> {
    return this.http.get<DataWithRanking<ServicesItem>>(API_URL, {params:{
      pages : '-1'
    }});
  }

  
  get(id: number): Observable<ServicesItem> {
    return this.http.get<ServicesItem>(API_URL + `/${id}`);
  }

  update( id: number ,model: ServicesItem): Observable<DataWithRanking<ServicesItem>> {
    return this.http.put<DataWithRanking<ServicesItem>>(API_URL +`/${id}`, model);
  }
  delete(id): Observable<ServicesItem>{
    return this.http.delete<ServicesItem>(API_URL + `/${id}`);
  }


  getAllByLang(language: string): Observable<DataWithRanking<ServicesItem>> {
    //  let headers = new HttpHeaders();
    //  headers.append('X-Accept-Language' , language)
     
    return this.http.get<DataWithRanking<ServicesItem>>(API_URLLang  ,{params:{
      pages : '-1'
    },headers:{
      'Accept-Language':language
    }});
  }



}
