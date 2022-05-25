import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchGifsResponse } from '../interfaces/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  //https://api.giphy.com/v1/gifs/search	
  private apiKey: string = 'SnV8qyy133XuQ3z7iOMqsX55x79trHw8';
  private urlService: string = 'http://api.giphy.com/v1/gifs'
  private _history: string[] = [];

  constructor(private http: HttpClient){
    /*if(localStorage.getItem('history')){
      this._history = JSON.parse(localStorage.getItem('history')!);
    }*/

    this._history = JSON.parse(localStorage.getItem('history')!) || [];
    this.results = JSON.parse(localStorage.getItem('results')!) || [];

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

    const params = new HttpParams()
          .set('api_key', this.apiKey)
          .set('limit', '10')
          .set('q', query);

    this.http.get<SearchGifsResponse>(`${this.urlService}/search`,{params})
          .subscribe( (resp) => {
            this.results = resp.data;
            localStorage.setItem('results', JSON.stringify(this.results));
          } );
  }

}
