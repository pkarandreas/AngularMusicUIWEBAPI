import { Component ,OnInit,OnDestroy, AfterViewInit} from '@angular/core';
import { SongService } from '../Services/song.service';
import { GroupService } from './../Services/group.service';
import { ToastrService } from 'ngx-toastr';
import { Song , BasicGroup} from 'src/Libraries/MainLibrary';
import { Subject } from 'rxjs';
@Component({
  selector: 'app-songs',
  templateUrl: './songs.component.html',
  styleUrls: ['./songs.component.css']
})
export class SongsComponent implements OnInit,OnDestroy,AfterViewInit {
 public title :string ='';
 public songArray : Array<Song>=[];
 public groupArray : Array<BasicGroup> =[];
 public songSubscriber  :any ;
 public groupSubscriber : any;
 //declarations for datatables plugin
 public dataTableOptions : DataTables.Settings={};
 public dtTrigger : Subject<any> = new Subject<any>();
 constructor(private songSrv:SongService,private groupSrv : GroupService,private toast : ToastrService) {
    this.title="List of Songs";
    this.dataTableOptions={
      pagingType: 'full_numbers',
      pageLength: 5,
      lengthMenu: [ 5, 10, 15, 20 ],
      columnDefs: [
        { orderable: false, targets: 0 },
        { orderable: false, targets: 2 },
      ]
    };
  }
  protected getGroups()
  {
    this.groupSubscriber=this.groupSrv.getApiGroups().subscribe((data)=>{
          this.groupArray = data;
    });
  }
  public getGroupString(id:number):string{
      return this.groupArray.find(x=> x.id ===id).groupName;
  }
  ngAfterViewInit(): void {
  }
  ngOnInit(): void {
   this.getGroups();
   this.songSubscriber= this.songSrv.getApiSongs().subscribe((data)=>{
      this.songArray.splice(0);
      this.songArray = data;
      setTimeout(()=>{this.dtTrigger.next(this.songArray);},100);
   });
  }
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
    this.songSubscriber.unsubscribe();
    this.groupSubscriber.unsubscribe();
  }
}
