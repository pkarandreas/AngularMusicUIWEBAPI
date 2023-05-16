import { Component,OnInit , OnDestroy,ViewChild, AfterViewInit} from '@angular/core';
import {MAT_DIALOG_DATA,MatDialog,MatDialogConfig,MatDialogRef} from '@angular/material/dialog'
import { Genre,Action,GenreDialogReturn, Group, GenreInlineEdit } from 'src/Libraries/MainLibrary';
import { GenreService } from '../Services/genre.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { GroupService } from '../Services/group.service';
import { ToastrService } from 'ngx-toastr';
import { GenreAddDialogComponent } from '../genre-add-dialog/genre-add-dialog.component';

@Component({
  selector: 'app-genres',
  templateUrl: './genres.component.html',
  styleUrls: ['./genres.component.css']
})
export class GenresComponent  implements OnInit,AfterViewInit {
  public genreArray : Array<GenreInlineEdit>=[];
  public groupArray : Array<Group>=[];
  public displayedColumns: string[] = ['columnIndex','id', 'genreName','actions'];
  public dataSource : MatTableDataSource<Genre>=null;
  @ViewChild('paginator') paginator: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;

  public dialogCfg :MatDialogConfig;

  constructor(private groupSrv: GroupService,private genreSrv:GenreService,public dialog:MatDialog,private toast:ToastrService ) {}

  /**
   * Set the paginator and sort after the view init since this component will
   * be able to query its view for the initialized paginator and sort.
   */
  ngAfterViewInit(): void {
    this.genreSrv.getApiGenres().subscribe((data)=>{
      this.genreArray.splice(0);
    data.forEach(element => {
        let obj :GenreInlineEdit = new GenreInlineEdit();
        obj.id = element.id;
        obj.genreName= element.genreName;
        obj.isEdit=false;
        this.genreArray.push(obj);
      });
      this.dataSource = new MatTableDataSource(this.genreArray);
      setTimeout(() => {this.dataSource.paginator = this.paginator;this.dataSource.sort = this.sort;});
  });
  }
  ngOnInit(): void {
  }
  public buildDialogCfg()
  {
    this.dialogCfg = new MatDialogConfig();
    this.dialogCfg.disableClose = true;
    this.dialogCfg.autoFocus = true;
    this.dialogCfg.hasBackdrop = true;
    this.dialogCfg.enterAnimationDuration='1000ms';
    this.dialogCfg.exitAnimationDuration = '1000ms';
    this.dialogCfg.width = '40%';
  }
  onEditGenre(_genre :GenreInlineEdit){
    _genre.isEdit= true;
  }
  onAddGenre(_genre : Genre){
    this.buildDialogCfg();
    this.dialogCfg.data = {Title : "Add New Genre "};
    const dialogRef = this.dialog.open(GenreAddDialogComponent,this.dialogCfg);
    dialogRef.afterClosed().subscribe((returnData)=>{
      if (returnData.action === 'save'){
         let tmp =  new Genre();
         tmp.genreName = returnData.genreName;
         this.genreSrv.createNewGenre(tmp).subscribe((createReturn)=>{
          this.genreArray.splice(0);
          createReturn.forEach(element=>{
            let obj : GenreInlineEdit =new GenreInlineEdit();
            obj.id = element.id;
            obj.genreName =element.genreName;
            this.genreArray.push(obj);
          });
          this.dataSource.data = this.genreArray;
          this.toast.success("You have successfully Added a record",'Success Message',{timeOut: 5000,positionClass : 'toast-bottom-right',});
          setTimeout(()=>{document.location.reload();},500) ;
         });
      }
    });
  }
  onUpdate(_genre : GenreInlineEdit){
    let tmp : Genre = new Genre();
    tmp.id = _genre.id;
    tmp.genreName = _genre.genreName;
    this.genreSrv.updateGenre(tmp).subscribe((returnUpdate)=>{
      this.genreArray.splice(0);
      returnUpdate.forEach(element=>{
        let obj : GenreInlineEdit =new GenreInlineEdit();
        obj.id = element.id;
        obj.genreName =element.genreName;
        this.genreArray.push(obj);
      });
      this.dataSource.data = this.genreArray;
      this.toast.success("You have successfully edited the record",'Success Message',{timeOut: 5000,positionClass : 'toast-bottom-right',});
      setTimeout(()=>{document.location.reload();},2000) ;
    });
  }
  onCancel(_genre : GenreInlineEdit){
    _genre.isEdit =false;
  }
  onDeleteGenre(_genre:Genre){
  this.buildDialogCfg();
  this.dialogCfg.data = {Title : "Delete Group with :", id : _genre.id , genreName : _genre.genreName ,action : "genre" };
  const dialogRef = this.dialog.open(DeleteDialogComponent,this.dialogCfg);
  dialogRef.afterClosed().subscribe((response)=>{
  if (response ==='yes')
  {
    this.groupSrv.getApiGroupsByGenreID(_genre.id).subscribe((groupsReturn)=>{
        this.groupArray.splice(0);
        this.groupArray = groupsReturn;
        if (this.groupArray.length ===0)
        {
          this.genreSrv.deleteGenre(_genre.id).subscribe((deleteReturn)=>{
              this.genreArray.splice(0);
              deleteReturn.forEach(element=>{
                let obj : GenreInlineEdit =new GenreInlineEdit();
                obj.id = element.id;
                obj.genreName =element.genreName;
                this.genreArray.push(obj);
              });
              this.dataSource.data = this.genreArray;
              this.toast.warning("You have successfully Deleted a record",'Warning Message',{timeOut: 5000,positionClass : 'toast-bottom-right',});
              setTimeout(()=>{document.location.reload();},2000) ;
          });
        }
        else
          this.toast.error("Groups have this genre and cannot be deleted",'Error Message',{timeOut: 5000,});
    });

  }
  });
  }
  filterChanged(event : Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter=filterValue;
  }
}
