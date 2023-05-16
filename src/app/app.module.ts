import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DataTablesModule } from 'angular-datatables';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { NavComponent } from './nav/nav.component';
import { GroupsComponent } from './groups/groups.component';
import { SongsComponent } from './songs/songs.component';
import { GenresComponent } from './genres/genres.component';
import { HttpClientModule} from '@angular/common/http';
import {ReactiveFormsModule} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MaterialModule } from './MyModules/material/material.module';
import { EditCreateSongComponent } from './edit-create-song/edit-create-song.component';
import { EditCreateGroupComponent } from './edit-create-group/edit-create-group.component';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import { SongListDialogComponent } from './song-list-dialog/song-list-dialog.component';
import { FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { GenreAddDialogComponent } from './genre-add-dialog/genre-add-dialog.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common'; // <==================== sos

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    NavComponent,
    GroupsComponent,
    SongsComponent,
    GenresComponent,
    EditCreateSongComponent,
    EditCreateGroupComponent,
    DeleteDialogComponent,
    SongListDialogComponent,
    GenreAddDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DataTablesModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    MaterialModule,
    FormsModule
  ],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}], // <===============  sos fot refresh
  bootstrap: [AppComponent]
})
export class AppModule { }
