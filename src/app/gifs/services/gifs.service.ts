import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchGifsResponse } from '../interfaces/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  //https://api.giphy.com/v1/gifs/search	
  private apiKey: string = 'SnV8qyy133XuQ3z7iOMqsX55x79trHw8';
  private _history:string[] = [];

  constructor(private http: HttpClient){
    if(localStorage.getItem('history')){
      this._history = JSON.parse(localStorage.getItem('history')!);
    }
  }

  public results: Gif[] = [];

  get history(){
    return [...this._history];
  }

  //Siempre tiene un valor = ''
  searchGifs(query:string = ''){

    query = query.trim().toLowerCase();

    if(!this._history.includes(query)){
      this._history.unshift(query);
      this._history =this._history.splice(0,9);

      localStorage.setItem('history', JSON.stringify(this._history));
    }

    this.http.get<SearchGifsResponse>(`http://api.giphy.com/v1/gifs/search?api_key=SnV8qyy133XuQ3z7iOMqsX55x79trHw8&q=${query}&limit=10`)
          .subscribe( (resp) => {
            console.log(resp.data);
            this.results = resp.data;
          } );
  }

}
