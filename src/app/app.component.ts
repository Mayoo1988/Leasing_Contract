import { Component } from '@angular/core'
import { MenubarComponent } from './component/menubar/menubar.component'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [MenubarComponent]
})
export class AppComponent {
  title = 'angularmaterial'
}
