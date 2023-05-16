import { Component,OnInit , OnDestroy,ViewChild, AfterViewInit} from '@angular/core';
import { GroupService } from '../Services/group.service';
import { Subject} from 'rxjs'
import { Group,Song,Genre,GroupDialogReturn, Action } from 'src/Libraries/MainLibrary';
import { GenreService } from '../Services/genre.service';
import { SongService } from './../Services/song.service';
import { MatDialog,MatDialogConfig } from '@angular/material/dialog';
import { EditCreateSongComponent } from '../edit-create-song/edit-create-song.component';
import { EditCreateGroupComponent } from '../edit-create-group/edit-create-group.component';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { SongListDialogComponent } from '../song-list-dialog/song-list-dialog.component';
import { DataTableDirective } from 'angular-datatables';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})
export class GroupsComponent implements OnInit,OnDestroy,AfterViewInit {
public groupArray : Array<Group> = [];
public group  :Group = null;
public groupDetails : Group = null;
public genresArray : Array<Genre>=[];
public newSong : Song = null;
public dialogCfg :MatDialogConfig;
 //declarations for datatables plugin
 @ViewChild(DataTableDirective, {static: false}) dtElement: DataTableDirective;
 public dataTableOptions : DataTables.Settings={};
 //public dataTableOptions : any ={}
 public dtTrigger : Subject<any> = new Subject<any>();

 constructor(private srv:GroupService,private genreSrv:GenreService,private SongSrv:SongService,public dialog:MatDialog,private toast : ToastrService) {}
 ngAfterViewInit(): void {
  this.dtTrigger.next(null);
  }
ngOnDestroy(): void {
  this.dtTrigger.unsubscribe();
}
  ngOnInit(): void {
    this.getGenresAPI();
    this.getGroupsAPI();
    this.dataTableOptions={
      pagingType: 'full_numbers',
      pageLength: 10,
      lengthMenu: [ 10, 25, 50, 100 ],
      columnDefs: [
        { orderable: false, targets: 0 },
        { orderable: false, targets: 4 },
      ]
    };
  }

  public getGenreString(id:number):string{
    return this.genresArray.find(x=> x.id ===id).genreName;
  }

  private getGenresAPI(){
    this.genreSrv.getApiGenres().subscribe((data)=>{
      this.genresArray.splice(0);
      this.genresArray = data;
    });
  }

  private getGroupsAPI(){
    this.srv.getApiGroups().subscribe((data)=>{
      this.groupArray.splice(0);
      this.groupArray = data;
      setTimeout(()=>{this.dtTrigger.next(this.groupArray);},100);
    });
  }

  public onSongsHandler(_group:Group){
    this.buildDialogCfg();
    this.dialogCfg.data = {Title : "List Songs For :", id : _group.id };
    const dialogRef = this.dialog.open(SongListDialogComponent,this.dialogCfg);
  }
  public onClearHandler(){
    this.groupDetails = null;
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

  public onAddSong(_group:Group)
  {
    let tmpSong : Song = new Song();
    this.buildDialogCfg();
    this.dialogCfg.data = { id: 0 , groupName : _group.groupName , groupID : _group.id};
    const dialogRef = this.dialog.open(EditCreateSongComponent,this.dialogCfg);
    dialogRef.afterClosed().subscribe((dialogReturnData)=>{
      console.log("Return data :")
      console.log(dialogReturnData);
      tmpSong.groupId = Number(dialogReturnData.groupId);
      tmpSong.songName = dialogReturnData.songName;
      tmpSong.songURL = dialogReturnData.songURL;
      this.SongSrv.createNewSong(tmpSong).subscribe((returnData)=>{
        this.toast.success("You have successfully Added song",'Create  Song Info',{timeOut: 5000,positionClass : 'toast-bottom-right',});
      });
    });
  }

  onAddEditGroup(_group:Group)
  {
    this.buildDialogCfg();
    if (_group === null)
    {
      this.dialogCfg.data = { title : "Add new Group ", id: 0 , groupName : '' , groupID : 0};
    }
    else
    {
      this.dialogCfg.data = { title : "Edit Group ",id: _group.id , groupName : _group.groupName , description : _group.description , genre : _group.groupGenreID};
    }
    const dialogRef = this.dialog.open(EditCreateGroupComponent,this.dialogCfg);
    dialogRef.afterClosed().subscribe((item)=>{
      this.group = new Group();
      this.group.id =  item.id;
      this.group.description = item.description;
      this.group.groupName = item.groupName;
      this.group.groupGenreID = item.groupGenreID;
      if (item.action === Action.UPDATE)
      {
        this.srv.updateGroup(this.group).subscribe((returnData)=>{
              this.group =null;
              this.getGenresAPI();
              this.groupArray.splice(0);
              this.groupArray = returnData;
              this.renderDataTable();
              this.toast.success("You have successfully Updated a group",'Update Group Info',{timeOut: 5000,positionClass : 'toast-bottom-right',});
        });
      }
      else if (item.action === Action.CREATE)
      {
        this.srv.createNewGroup(this.group).subscribe((returnData)=>{
           this.getGenresAPI();
           this.groupArray.splice(0);
           this.groupArray = returnData;
           this.renderDataTable();
           this.toast.success("You have successfully Added a group",'Create Group Info',{timeOut: 5000,positionClass : 'toast-bottom-right',});
        });
      }
    });
  }
  onDeleteGroup(_group : Group){
    this.buildDialogCfg();
    this.dialogCfg.data = {Title : "Delete Group with :", id : _group.id , groupName : _group.groupName ,action : "group" }
    const dialogRef = this.dialog.open(DeleteDialogComponent,this.dialogCfg);
    dialogRef.afterClosed().subscribe((response)=>{
      if (response ==='yes')
     {
      this.srv.deleteGroup(_group.id).subscribe((returnData)=>{
        this.getGenresAPI();
        this.groupArray.splice(0);
        this.groupArray = returnData;
        this.renderDataTable();
        this.toast.warning("You have successfully Deleted a group",'Delete Group Warning',{timeOut: 5000,positionClass : 'toast-bottom-right',});
     });
    }
    });
  }
  public renderDataTable(){
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      this.dtTrigger.next(this.groupArray);
    });
  }
}
