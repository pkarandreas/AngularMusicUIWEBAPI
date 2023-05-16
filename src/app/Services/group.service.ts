import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import { Group,Song,Genre,Globals } from 'src/Libraries/MainLibrary';
import { HttpClient ,HttpHeaders} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class GroupService {
private groups : Array<Group>=[];
private apiURL : string =Globals.apiURL+"groups/";
private responseHeader : HttpHeaders = new HttpHeaders({'content-Type':'application/json'});
constructor(private http:HttpClient) {}
//Get All Groups
public getApiGroups():Observable<Group[]>{
  return this.http.get<Group[]>(this.apiURL,{responseType:'json'});
}
//Get Group by id
public getApiGroupsByID(id :number):Observable<Group>{
  let includeSongs : boolean = true;
  return this.http.get<Group>(`${this.apiURL}${id}/${includeSongs}`,{responseType:'json'});
}
//Get Group by Genre ID
public getApiGroupsByGenreID(id :number):Observable<Group[]>{
  return this.http.get<Group[]>(`${this.apiURL}byGenreId/${id}`,{responseType:'json'});
}
//Add new Group
public createNewGroup(group:Group):Observable<Group[]>{
   return this.http.post<Group[]>(`${this.apiURL}`,group,{headers:this.responseHeader});
 }
 //Update Group
 public updateGroup(group:Group):Observable<Group[]>{
  let obj ={
    "id": group.id,
    "groupName": group.groupName,
    "description": group.description,
    "groupGenreID": group.groupGenreID
  }
  return this.http.put<Group[]>(`${this.apiURL}${group.id}`,JSON.stringify(obj),{headers:this.responseHeader});
}
//Delete Group
 public deleteGroup(id:number):Observable<Group[]>{
    return  this.http.delete<Group[]>(`${this.apiURL}${id}`,{headers:this.responseHeader});
}

}
