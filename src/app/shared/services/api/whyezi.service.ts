import { Injectable } from '@angular/core';
import {  Whyezi } from 'app/shared/models';
import { Observable } from 'rxjs';
import { HttpClient  } from '@angular/common/http';


import { END_POINTS } from './globals/global-config';
import { DataWithRanking } from 'app/shared/models/data-with-ranking.model';
const API_URL = END_POINTS.why;

@Injectable({
  providedIn: 'root'
})
export class WhyeziService {

  constructor(private http: HttpClient) { }

  create(model: Whyezi): Observable<Whyezi[]> {
    return this.http.post<Whyezi[]>(API_URL, model);
  }
  getAll(): Observable<DataWithRanking<Whyezi>> {
    return this.http.get<DataWithRanking<Whyezi>>(API_URL, {params:{
      pages : '-1'
    }});
  }

  update( id: number ,model: Whyezi): Observable<DataWithRanking<Whyezi>> {
    return this.http.put<DataWithRanking<Whyezi>>(API_URL +`/${id}`, model);
  }
  delete(id): Observable<Whyezi>{
    return this.http.delete<Whyezi>(API_URL + `/${id}`);
  }

  get(id: number): Observable<Whyezi> {
    return this.http.get<Whyezi>(API_URL + `/${id}`);
  }
}
