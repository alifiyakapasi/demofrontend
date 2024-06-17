import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';  
import { LazyComponent } from '@components/lazy/lazy.component';

const route: Routes = [  
  { path: '', component: LazyComponent }  
 ]; 

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(route)
  ],
  exports:[RouterModule]
})
export class LazyLoadingRoutingModule { }
