import { Component,ViewChild } from '@angular/core';
import { BreadcrumbComponent } from '../../shared/breadcrumb/breadcrumb.component';



@Component({
  selector: 'app-statistics',
  standalone: true,
  imports: [    BreadcrumbComponent,],
  templateUrl: './statistics.component.html',
  styleUrl: './statistics.component.css'
})
export class StatisticsComponent {

  constructor() {

  }


}
