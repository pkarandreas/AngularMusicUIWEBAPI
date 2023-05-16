import { Component, OnInit,Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog'
import { GenreService } from '../Services/genre.service';
import {FormGroup,FormBuilder,Validators} from '@angular/forms'
@Component({
  selector: 'app-genre-add-dialog',
  templateUrl: './genre-add-dialog.component.html',
  styleUrls: ['./genre-add-dialog.component.css']
})
export class GenreAddDialogComponent implements OnInit{
  public title : string ;
  public body: string  = "";
  constructor(private gen:GenreService,@Inject(MAT_DIALOG_DATA) public data:any,private fb: FormBuilder,public dialogRef :MatDialogRef<GenreAddDialogComponent>){}
  public genreForm: FormGroup= null ;
  ngOnInit(): void {
    this.genreForm =this.fb.group(
      {
        genreName : [null],
      });
      this.title = this.data.title;
  }
  onSubmitForm(){
    this.dialogRef.close({ action: "save", genreName : this.genreForm.get('genreName').value});
  }
}
