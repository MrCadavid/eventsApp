import { ChangeDetectionStrategy, Component} from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { MenubarModule } from 'primeng/menubar';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, CommonModule, ButtonModule, MenubarModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  public items = [
    {
      label: 'Home',
      link: '/events/list',
      icon: 'pi pi-home',
    },
  ];

  logout() {
    if (typeof window !== 'undefined') {
      localStorage.clear();
    }
  }
}
