import { Component, OnInit, Input } from '@angular/core';
import { FormGroup,FormControl } from '@angular/forms';
import { ItemsService } from '../items.service';


@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
  @Input() data:any = [];
  itemForm = new FormGroup({
    name: new FormControl(''),
  });
  constructor(
    private itemsService: ItemsService
  ) { }

  ngOnInit(): void {
  }
  sendForm(){
    this.itemsService.create(this.itemForm.value).subscribe((data: {}) => {
      this.data.push(data);
      this.itemsService.items.next(this.data);
    }) 
  }

}
