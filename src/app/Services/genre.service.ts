import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import { Group,Song,Genre,Globals } from 'src/Libraries/MainLibrary';
import { HttpClient ,HttpHeaders} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class GenreService {
  private genres : Array<Genre>=[];
  private apiURL : string =Globals.apiURL+"genres/";
  private responseHeader : HttpHeaders = new HttpHeaders({'content-Type':'application/json'});
  constructor(private http:HttpClient) {}
//Get All Genres
public getApiGenres():Observable<Genre[]>{
    return this.http.get<Genre[]>(this.apiURL,{responseType:'json'});
}
//Get Genre by id
public getApiGenresByID(id :number):Observable<Genre>{
    return this.http.get<Genre>(`${this.apiURL}${id}`,{responseType:'json'});
}
//Add new Genre
public createNewGenre(genre:Genre):Observable<Genre[]>{
let obj ={
    "id": genre.id,
    "genreName": genre.genreName
}
   return this.http.post<Genre[]>(`${this.apiURL}`,JSON.stringify(obj),{headers:this.responseHeader});
}
//Update Genre
public updateGenre(genre:Genre):Observable<Genre[]>{
let obj ={
    "id": genre.id,
    "genreName": genre.genreName
}
 return this.http.put<Genre[]>(`${this.apiURL}${genre.id}`,JSON.stringify(obj),{headers:this.responseHeader});
}
//Delete Genre
public deleteGenre(id:number):Observable<Genre[]>{
  return this.http.delete<Genre[]>(`${this.apiURL}${id}`,{headers:this.responseHeader});
}
}
