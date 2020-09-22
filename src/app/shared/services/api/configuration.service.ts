import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient  } from '@angular/common/http';


import { END_POINTS } from './globals/global-config';
import { DataWithRanking } from 'app/shared/models/data-with-ranking.model';
import { Configuration } from 'app/shared/models/configuration.model';
const API_URL = END_POINTS.configuration
const API_URLLangs = END_POINTS.configurations


@Injectable({
  providedIn: 'root'
})
export class ConfigurationService {

  constructor(private http: HttpClient) { }

  create(model: Configuration): Observable<Configuration[]> {
    return this.http.post<Configuration[]>(API_URL, model);
  }
  getAll(): Observable<Configuration[]> {
    return this.http.get<Configuration[]>(API_URL, {params:{
      pages : '-1'
    }});
  }


 

  get(id: number): Observable<Configuration> {
    return this.http.get<Configuration>(API_URL + `/${id}`);
  }

  update( id: number ,model: Configuration): Observable<Configuration> {
    return this.http.put<Configuration>(API_URL +`/${id}`, model);
  }
  delete(id): Observable<Configuration>{
    return this.http.delete<Configuration>(API_URL + `/${id}`);
  }

  getAllByLang(language: string): Observable<Configuration> {     
    return this.http.get<Configuration>(API_URLLangs  ,{params:{
      pages : '-1'
    },headers:{
      'Accept-Language':language
    }});
  }
}
