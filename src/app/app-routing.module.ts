import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GroupsComponent } from './groups/groups.component';
import { SongsComponent } from './songs/songs.component';
import { GenresComponent } from './genres/genres.component';

const routes: Routes = [
  {
    path : '',
    component : GroupsComponent
  },
  {
    path : 'songs',
    component : SongsComponent
  },
  {
    path : 'genres',
    component : GenresComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
