export enum Action {CREATE,Delete,UPDATE};

export class Globals{
  public static apiURL:string = "http://dotnetcorner.eu/";
}
export class BasicGroup {
  public id : number;
  public groupName : string;
  public description : string;
  public groupGenreID :number;
}
export class Group extends BasicGroup{
  public songs : Array<Song> = [];
}
export class Song{
  public id : number;
  public songName : string;
  public songURL : string;
  public groupId : number;
}
export class Genre{
  public id : number;
  public genreName : string;
}
export class GenreInlineEdit extends Genre
{
  public isEdit : boolean = false;
}

export class GroupDialogReturn extends BasicGroup{
  public action : Action;
}

export class SongDialogReturn extends Song{
  public action : Action;
}

export class GenreDialogReturn extends Genre{
  public action : Action;
}
