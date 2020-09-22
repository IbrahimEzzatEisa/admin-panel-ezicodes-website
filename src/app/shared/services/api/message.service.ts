import { Injectable } from '@angular/core';
import {  MessageContact } from 'app/shared/models';
import { Observable } from 'rxjs';
import { HttpClient  } from '@angular/common/http';


import { END_POINTS } from './globals/global-config';
import { DataWithRanking } from 'app/shared/models/data-with-ranking.model';
const API_URL = END_POINTS.message;
@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<DataWithRanking<MessageContact>> {
    return this.http.get<DataWithRanking<MessageContact>>(API_URL, {params:{
      pages : '-1'
    }});
  }
  

  delete(id): Observable<MessageContact>{
    return this.http.delete<MessageContact>(API_URL + `/${id}`);
  }



}
