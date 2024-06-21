import { Component, Input, ViewEncapsulation } from '@angular/core';
import { NewVersionCheckerService } from '../../services/newcersionchecker.service';

@Component({
  selector: 'app-newcersionchecker',
  standalone: true,
  imports: [],
  templateUrl: './newcersionchecker.component.html',
  styleUrl: './newcersionchecker.component.css',
  encapsulation: ViewEncapsulation.None
})
export class NewcersioncheckerComponent {

  @Input() containerClasses!: string;

    constructor(
        public newVersionCheckerService: NewVersionCheckerService
    ) { }

    applyUpdate(): void {
        this.newVersionCheckerService.applyUpdate();
    }


}
