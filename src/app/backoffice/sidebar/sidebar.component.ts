import { Component } from '@angular/core';
import { SidebarStatusService } from '../../services/status/sidebar-status.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {

  isActiveMenuHeader: boolean = true;

  constructor(
    private sidebarStatusService: SidebarStatusService
  ) { }

  ngOnInit(): void {
    this.sidebarStatusService.status$.subscribe(status => {
      this.isActiveMenuHeader = status;
    })
  }

  
}
