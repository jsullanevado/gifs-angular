import { Component, Input, OnInit } from '@angular/core';
import { Gif } from '../../interfaces/gifs.interfaces';

@Component({
  selector: 'gifs-cardgifs',
  templateUrl: './card-gifs.component.html',
})
export class CardgifsComponent implements OnInit{





  @Input()
  public gif!: Gif;

  ngOnInit(): void {
    if( !this.gif ) throw new Error('Gif property is required');
  }

}
