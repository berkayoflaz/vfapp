import { Component, OnInit } from '@angular/core';
import { ItemsService } from './items.service';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent implements OnInit {
  data:any = [];
  constructor(
    private itemService: ItemsService
  ) {
    this.itemService.getItems();
   }

  ngOnInit(): void {
    this.itemService.itemsData.subscribe((data) => {
      this.data = data;
    })
  }
} 
