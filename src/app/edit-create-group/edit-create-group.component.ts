import { Component,OnInit,Inject} from '@angular/core';
import {MAT_DIALOG_DATA,MatDialogRef} from '@angular/material/dialog'
import {FormGroup,FormBuilder,Validators} from '@angular/forms'
import { Genre,GroupDialogReturn,Action } from 'src/Libraries/MainLibrary';
import { GenreService } from '../Services/genre.service';

@Component({
  selector: 'app-edit-create-group',
  templateUrl: './edit-create-group.component.html',
  styleUrls: ['./edit-create-group.component.css']
})
export class EditCreateGroupComponent implements OnInit{
public group :GroupDialogReturn = null;
public title : string;
public groupForm: FormGroup= null ;
public genreArray : Array<Genre> = [];
  constructor(private genreSrv: GenreService,@Inject(MAT_DIALOG_DATA) public data:any,private fb: FormBuilder,public dialogRef :MatDialogRef<EditCreateGroupComponent>) {
  }
  ngOnInit(): void {
    this.title= this.data.title;
    this.genreSrv.getApiGenres().subscribe((gen)=>{
        this.genreArray = gen ;
    })
    this.groupForm =this.fb.group(
      {
        id :[null],
        groupName : [null],
        description : [null],
        groupGenreID : [null]
      });
      if (this.data.id !=0)
      {
        this.group = new GroupDialogReturn();
        this.group.action= Action.UPDATE;
        this.group.id = this.data.id;
        this.group.description = this.data.description;
        this.group.groupGenreID = Number(this.data.genre);
        this.group.groupName = this.data.groupName;
        this.groupForm.patchValue({id : this.group.id, groupName : this.group.groupName , description : this.group.description, groupGenreID : this.group.groupGenreID });
      }
  }
  onNoClick(){
    this.dialogRef.close("cancel");
  }
  onSubmit(){
    this.group = new GroupDialogReturn();
    this.group.id = Number(this.groupForm.get('id').value);
    this.group.groupName = this.groupForm.get('groupName').value;
    this.group.description = this.groupForm.get('description').value;
    this.group.groupGenreID = Number(this.groupForm.get('groupGenreID').value);
    if (this.group.id != 0){
      this.group.action= Action.UPDATE;
    }
    else
      this.group.action =Action.CREATE;
    this.dialogRef.close(this.group);
  }

}
