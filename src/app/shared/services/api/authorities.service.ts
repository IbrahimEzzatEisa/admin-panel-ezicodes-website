// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { END_POINTS } from './globals/global-config';


// const API_URL = END_POINTS.authorities;

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthoritiesService {

//   constructor(private http: HttpClient) { }

//   getAuthorities(): Observable<Authorities[]> {
//     return this.http.get<Authorities[]>(API_URL);
//   }

  
//   getAll(filterParams?: FilterParams): Observable<ResultWithPagination<Authorities[]>> {
//     if (!filterParams) filterParams = new FilterParams();
//     return this.http.get<ResultWithPagination<Authorities[]>>(API_URL, {
//       params: {
//         pageNumber: filterParams.pageNumber.toString(),
//         pageSize: filterParams.pageSize.toString(),
//         searchValue: filterParams.searchValue,
//         sortField: filterParams.sortField || "ID",
//         sortDirection: filterParams.sortDirection
//       }
//     });
//   }
  

//   create(model: Authorities): Observable<Authorities[]> {
//     return this.http.post<Authorities[]>(API_URL, model);
//   }
//   update( id: number ,model: Authorities): Observable<ResultWithRanking<Authorities>> {
//     return this.http.put<ResultWithRanking<Authorities>>(API_URL +`/${id}`, model);
//   }
//   delete(id): Observable<Authorities>{
//     return this.http.delete<Authorities>(API_URL + `/${id}`);
//   }

// }
