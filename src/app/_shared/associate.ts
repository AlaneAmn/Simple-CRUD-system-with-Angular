import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { associateModel } from '../../model/associate';

@Injectable({
  providedIn: 'root'
})
export class Associate {
  apiBaseUrl = 'http://localhost:3000';
  constructor(private http: HttpClient) {

  }
  
  GetAll(){
    return this.http.get<associateModel[]>(this.apiBaseUrl + '/associate');
  }
  Get(id:number){
    return this.http.get<associateModel>(this.apiBaseUrl + '/associate'+id);
  }
  Delete(id: number){
    return this.http.delete(this.apiBaseUrl + '/associate'+id);
  }
  Update(data: associateModel){
    return this.http.put(this.apiBaseUrl + '/associate'+data.id, data);
  }
  Create(data: associateModel){
    return this.http.post(this.apiBaseUrl + '/associate', data);
  }
  
}
