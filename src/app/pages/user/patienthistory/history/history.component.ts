import { Component, Input } from '@angular/core';
import { Healthrecord } from 'src/app/modules/healthrecord/interfaces/healthrecord.interface';

@Component({
  selector: 'app-history',
  standalone: false,
  
  templateUrl: './history.component.html',
  styleUrl: './history.component.scss'
})
export class HistoryComponent {
@Input() record: Healthrecord;
}
