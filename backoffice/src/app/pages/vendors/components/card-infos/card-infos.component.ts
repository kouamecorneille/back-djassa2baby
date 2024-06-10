import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card-infos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card-infos.component.html',
  styleUrl: './card-infos.component.css'
})
export class CardInfosComponent {

  @Input() libelle!: string;
  @Input() iconClass!: string;
  @Input() backgroundClass!: string;
  @Input() count!: number;

  
}
