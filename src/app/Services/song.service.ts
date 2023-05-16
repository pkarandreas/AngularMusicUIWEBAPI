import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import { Group,Song,Genre,Globals } from 'src/Libraries/MainLibrary';
import { HttpClient ,HttpHeaders} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class SongService {
  private songs : Array<Song>=[];
  private apiURL : string =Globals.apiURL+"Songs/";
  private responseHeader : HttpHeaders = new HttpHeaders({'content-Type':'application/json'});
  constructor(private http:HttpClient) {}
   //Get All Songs
   public getApiSongs():Observable<Song[]>{
    return this.http.get<Song[]>(this.apiURL,{responseType:'json'});
  }
  //Get Song by ID
  public getApiSongsByID(id :number):Observable<Song>{
    return this.http.get<Song>(`${this.apiURL}BySongID/${id}`,{responseType:'json'});
  }
  //Get Songs by Group ID
  public getApiSongsByGroupID(id :number):Observable<Song[]>{
    return this.http.get<Song[]>(`${this.apiURL}ByGroupID/${id}`,{responseType:'json'});
  }
  //Add new Song
  public createNewSong(song:Song):Observable<Song[]>{

  let obj ={
    "id": song.id,
    "songName": song.songName,
    "songURL": song.songURL,
    "groupId": song.groupId
  }
   return this.http.post<Song[]>(`${this.apiURL}`,JSON.stringify(obj),{headers:this.responseHeader});
  }
  //Update Song
  public updateSong(song:Song):Observable<Song[]>{
    let obj ={
      "id": song.id,
      "songName": song.songName,
      "songURL": song.songURL,
      "groupId": song.groupId
    }
    return this.http.put<Song[]>(`${this.apiURL}${song.id}`,JSON.stringify(obj),{headers:this.responseHeader});
  }
  //Delete Song
  public deleteSong(id:number):Observable<Song[]>{
    return this.http.delete<Song[]>(`${this.apiURL}${id}`,{headers:this.responseHeader});
  }
}
