import { Component, OnInit, Input } from '@angular/core';
import { ItemsService } from '../items.service';
import { FormBuilder, FormGroup, FormArray, FormControl, ValidatorFn } from '@angular/forms';
import { of } from 'rxjs';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  form: FormGroup;
  data: any = []
  selectedItems:any = [];
  get itemsFormArray() {
    return this.form.controls.items as FormArray;
  }
  constructor(
    private itemsService: ItemsService,
    private formBuilder: FormBuilder
    ) {
      this.form = this.formBuilder.group({
        items: this.formBuilder.array([])
      });
      this.itemsService.itemsData.subscribe(items => {
        this.data = items;
        this.addCheckboxes(items);
      });
    }

  ngOnInit(): void { 
    //this.fetchItems();
    
  }
  

  private addCheckboxes(items:any) {
      this.data.forEach((element:any) => {
        this.itemsFormArray.push(new FormControl(false))
      });
  }

  submit() { 
    this.selectedItems.forEach( (element:any) => {
        console.log(element);
        this.itemsService.delete(element).subscribe((data:any) => {
          for(let i = 0;i < this.data.length;i++){
            if(this.data[i].id == element){
              console.log('denk geldi');
              this.data.splice(i,1);
            }
          }
          this.itemsService.items.next(this.data);
        })
        
    });
    this.selectedItems = [];
    
   }
  onCheckboxChange(e:any) {
    let value = e.source.value;
    if (e.checked) {
      this.selectedItems.push(value);
    } else {
      let i: number = 0;
      this.selectedItems.forEach((item: any) => {
        if (item == value) {
          console.log(value);
          this.selectedItems.splice(i,1);
          return;
        }
        i++;
      });
    }
  }
}
