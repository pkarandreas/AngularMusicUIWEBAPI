import { Component,OnInit,Inject } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog'
import {Group,Song,Genre}  from '../../Libraries/MainLibrary'
import { GroupService } from '../Services/group.service';
import { SongService } from '../Services/song.service';
import { GenreService } from '../Services/genre.service';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.css']
})
export class DeleteDialogComponent implements OnInit{
  public title : string ;
  public body: string  = "";
  constructor(private gSrv:GroupService,private sSrv:SongService,gen:GenreService,@Inject(MAT_DIALOG_DATA) public data:any){}

  ngOnInit(): void {

    this.title = `${this.data.Title} : ${this.data.id}` ;
    if (this.data.action === "group")
        this.body = `You are going to delete the group : ${this.data.groupName}`;
    else if (this.data.action === "song")
        this.body = `You are going to delete the song : ${this.data.songName}`;
    else if (this.data.action === "genre")
        this.body = `You are going to delete the genre : ${this.data.genreName}`;
  }

}
