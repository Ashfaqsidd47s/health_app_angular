import { Component } from '@angular/core';
import { AddworkoutComponent } from '../../components/addworkout/addworkout.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [AddworkoutComponent],
  templateUrl: './home.component.html'
})
export class HomeComponent {

}
