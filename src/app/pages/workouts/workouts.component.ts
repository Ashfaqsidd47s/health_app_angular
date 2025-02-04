import { Component } from '@angular/core';
import { WorkouttableComponent } from '../../components/workouttable/workouttable.component';

@Component({
  selector: 'app-workouts',
  standalone: true,
  imports: [WorkouttableComponent],
  templateUrl: './workouts.component.html'
})
export class WorkoutsComponent {

}
