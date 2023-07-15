import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Gif, SearchResponse } from '../interfaces/gifs.interfaces';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  public gifList: Gif[ ]=[];
  private _tagHistory:string[]=[];
  private apikey:string='04NCfHq3iPnQhAhVVtQVNZK8JBW5CDXC';
  private serviceUrl: string =  'https://api.giphy.com/v1/gifs';

  constructor(private http: HttpClient) {
    this.loadLocalStorage();
    console.log('Gifs services Ready');
   }

  get tagHistory() {
    return [...this._tagHistory];
  }
  private organizeHistory(tag: string) {
    console.log(this._tagHistory);
    tag = tag.toLowerCase();
    if (this._tagHistory.includes(tag)) {
      this._tagHistory = this._tagHistory.filter((oldtag) => oldtag !== tag)
    }
    this._tagHistory.unshift(tag);
    this._tagHistory = this._tagHistory.splice(0, 10);
    this.saveLocalStorage();

  }
  // public async searchTag(tag: string): Promise<void> {
  //   debugger
  //   if (tag.length === 0) return;
  //   this.organizeHistory(tag);

  //   fetch('http://api.giphy.com/v1/gifs/search?api_key=04NCfHq3iPnQhAhVVtQVNZK8JBW5CDXC&q=goku&limit=10')
  //     .then( resp => resp.json())
  //     .then( data => console.log(data));
  // }
  private saveLocalStorage():void{
    localStorage.setItem('history', JSON.stringify(this._tagHistory));
  }

  private loadLocalStorage():void{

    if(!localStorage.getItem('history')) return ;
    this._tagHistory = JSON.parse(localStorage.getItem('history')! );
    ///const temporal = JSON.parse(localStorage.getItem('history')!);

    if( this._tagHistory.length === 0) return ;
    this.searchTag(this._tagHistory[0]);
  }
  /**
   * esta funcion esta buena
   * !esta funcion esta deprecada
   * ?esta funcion que realiza?
   * TODO: esta funcion debe procesar string tambien
   * @param tag
   * @returns
   */

  public  searchTag(tag: string): void {
    //debugger
    if (tag.length === 0) return;
    this.organizeHistory(tag);

    const params= new HttpParams()
    .set('api_key', this.apikey)
    .set('limit', '10')
    .set('q', tag)

    this.http.get<SearchResponse>(`${ this.serviceUrl}/search`,{params})


    .subscribe(resp =>{

      this.gifList= resp.data;
      console.log(this.gifList);
    })
  }
}
