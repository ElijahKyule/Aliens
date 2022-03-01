import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { map } from 'rxjs'; 

const httpOptions = {
  headers: new HttpHeaders({
    'Accept': 'application/json',
    'Content-Type':  'application/json',
    Authorization: 'Bearer d57e2370e33763eb1295777f614abc959fed22ec3b0d64d850ed4c67a180ba5b'
  })
};


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'https://gorest.co.in/public/v2/users';

  constructor(private http: HttpClient) {}
  postAlien(data: any){
    return this.http.post<any>(this.apiUrl, data, httpOptions)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  getAlien(){
    return this.http.get<any>(this.apiUrl, httpOptions)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  updateAlien(data: any, id : number){
    return this.http.put<any>(this.apiUrl+'/'+id, data, httpOptions)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  deleteAlien(id: number){
    return this.http.delete<any>(this.apiUrl+'/'+id, httpOptions)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

}
