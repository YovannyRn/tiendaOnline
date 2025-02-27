import { Component } from '@angular/core';
import {NgIf} from '@angular/common';
import {TabNotificationComponent} from '../tabs/tab-notification/tab-notification.component';
import { TabPanelComponent } from "../tabs/tab-panel/tab-panel.component";
import { TabPerfilComponent } from "../tabs/tab-perfil/tab-perfil.component";
import { SidebarStatusService } from '../../services/status/sidebar-status.service';
import { TabSettingComponent } from '../tabs/tab-setting/tab-setting.component';

@Component({
  selector: 'app-header-backoffice',
  imports: [
    NgIf,
    TabNotificationComponent,
    TabPanelComponent,
    TabPerfilComponent,
    TabSettingComponent
],
  standalone: true,
  templateUrl: './header-backoffice.component.html',
  styleUrl: './header-backoffice.component.scss'
})
export class HeaderBackofficeComponent {

  isActive: boolean = true;

  isActiveItems: any = {
  isActiveNotification: false,
  isActivePanel: false,
  isActivePerfil: false,
  isActiveSettings: false
  }

  constructor(
    private sidebarStatusService: SidebarStatusService,
  ) {}


  toggleLogo() {
    this.isActive = !this.isActive;
    this.sidebarStatusService.changeStatus(this.isActive);
  }

  toggleItem(option :string){
    if(this.isActiveItems[option]){
      this.isActiveItems[option] = false;
    }
    else{
      Object.keys(this.isActiveItems).forEach(item => {
        this.isActiveItems[item] = false
      })
      this.isActiveItems[option] = true
    }
  }
}
