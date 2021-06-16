import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatListModule} from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { ItemsComponent } from './items.component';
import { AddComponent } from './add/add.component';
import { ListComponent } from './list/list.component';
import {MatCheckboxModule} from '@angular/material/checkbox';

import { ItemsService } from './items.service';


@NgModule({
  declarations: [
    ItemsComponent,
    AddComponent,
    ListComponent
  ],
  imports: [
    CommonModule,
    MatListModule,
    MatIconModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    FormsModule
  ],
  exports: [
    ItemsComponent
  ],
  providers : [
    ItemsService
  ]
})
export class ItemsModule { }
