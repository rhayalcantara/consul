import { Component, Input, OnInit } from '@angular/core';
import Utils from 'src/app/helpers/help';
import { CartTitle } from 'src/app/Interfaces/interfaces';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  @Input() ct:CartTitle =  {Title: '',data1: 0,data2:0}
  

  constructor() { 

  }

  ngOnInit(): void {
  }

}
