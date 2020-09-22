import { Injectable } from '@angular/core';
import { Slider } from 'app/shared/models';
import { Observable } from 'rxjs';
import { HttpClient  } from '@angular/common/http';


import { END_POINTS } from './globals/global-config';
import { DataWithRanking } from 'app/shared/models/data-with-ranking.model';
const API_URL = END_POINTS.slide;

@Injectable({
  providedIn: 'root'
})
export class SlideservicesService {

  constructor(private http: HttpClient) { }

  create(model: Slider): Observable<Slider[]> {
    return this.http.post<Slider[]>(API_URL, model);
  }
  getAll(): Observable<DataWithRanking<Slider>> {
    return this.http.get<DataWithRanking<Slider>>(API_URL, {params:{
      pages : '-1'
    }});
  }

  update( id: number ,model: Slider): Observable<DataWithRanking<Slider>> {
    return this.http.put<DataWithRanking<Slider>>(API_URL +`/${id}`, model);
  }
  delete(id): Observable<Slider>{
    return this.http.delete<Slider>(API_URL + `/${id}`);
  }

  get(id: number): Observable<Slider> {
    return this.http.get<Slider>(API_URL + `/${id}`);
  }
}
