import { Component ,AfterViewInit, AfterContentInit} from '@angular/core';
declare var $:any;
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements AfterContentInit {
  public author : string ="Petros Karandreas";
  public year :string = new Date().getFullYear().toString();

  ngAfterContentInit(): void {
    $(document).ready(function(){
       setInterval(function(){
         var currentTime : Date =  new Date();
         var hour = currentTime.getHours().toString();
         var minutes = currentTime.getMinutes().toString();
         var seconds = currentTime.getSeconds().toString();
         hour = (Number(hour) < 10 ? '0':'')+hour;
         minutes = (Number(minutes) < 10?'0':'')+minutes;
         seconds = (Number(seconds) < 10 ?'0':'')+seconds;
         var clockString = hour+":"+minutes+":"+seconds;
         $("#clock").html(clockString);
       },1000);
    });
   }
}
