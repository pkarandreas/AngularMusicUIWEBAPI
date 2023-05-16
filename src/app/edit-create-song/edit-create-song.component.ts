import { Component,OnInit,Inject } from '@angular/core';
import { Action, Song ,SongDialogReturn} from 'src/Libraries/MainLibrary';
import {MAT_DIALOG_DATA,MatDialogRef} from '@angular/material/dialog'
import { SongService } from '../Services/song.service';
import {FormGroup,FormBuilder,Validators} from '@angular/forms'
@Component({
  selector: 'app-edit-create-song',
  templateUrl: './edit-create-song.component.html',
  styleUrls: ['./edit-create-song.component.css']
})
export class EditCreateSongComponent implements OnInit{
public song :Song = null;
public title : string;
public songFormGroup: FormGroup= null ;
constructor(private songSrv:SongService,@Inject(MAT_DIALOG_DATA) public data:any,private fb: FormBuilder,public dialogRef :MatDialogRef<EditCreateSongComponent>) {
}
  ngOnInit(): void {
    this.songFormGroup =this.fb.group(
      {
        id :[null],
        songName : [null],
        songURL : [null],
        groupName : [this.data.groupName]
      });
    if (this.data.id > 0){
      this.songSrv.getApiSongsByID(this.data.id).subscribe((result:Song)=>{
      this.song = result;
      this.title = `Edit  with code : ${this.song.id}`;
      this.songFormGroup.patchValue({ id:this.song.id, songName : this.song.songName, songURL : this.song.songURL , groupName : this.data.groupName});
    });
  }
  else {
    this.title = "Add new Song";
  }

  }
  onNoClick(){
    this.dialogRef.close("closed using function");
  }
  onSubmit(){
    let tmp : SongDialogReturn = new SongDialogReturn();
  if (Number(this.data.id) === 0)
    {

     tmp.groupId = this.data.groupID;
     tmp.songName=this.songFormGroup.get('songName').value;
     tmp.songURL= this.songFormGroup.get("songURL").value;
     tmp.action = Action.CREATE;
    }
    else
    {
      tmp.action=Action.UPDATE;
      tmp.id = this.data.id;
      tmp.groupId = this.data.groupID;
      tmp.songName = this.songFormGroup.get('songName').value;
      tmp.songURL = this.songFormGroup.get("songURL").value;
    }
    this.dialogRef.close(tmp);
  }
}
