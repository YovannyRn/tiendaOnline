import { Component } from '@angular/core';
import {NgIf} from '@angular/common';
import {TabNotificationComponent} from '../tabs/tab-notification/tab-notification.component';
import { TabPanelComponent } from "../tabs/tab-panel/tab-panel.component";
import { TabPerfilComponent } from "../tabs/tab-perfil/tab-perfil.component";
import { SidebarStatusService } from '../../services/status/sidebar-status.service';
import { TabSettingComponent } from '../tabs/tab-setting/tab-setting.component';



/*
  cambio para definir las opciones en isActiveItems
*/
enum TabOption {
  Notification = 'isActiveNotification',
  Panel = 'isActivePanel',
  Perfil = 'isActivePerfil',
  Settings = 'isActiveSettings'
}


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

  TabOption = TabOption;
  isActive = true;

  isActiveItems: Record<TabOption, boolean> = {
    [TabOption.Notification]: false,
    [TabOption.Panel]: false,
    [TabOption.Perfil]: false,
    [TabOption.Settings]: false
  };

  constructor(
    private sidebarStatusService: SidebarStatusService,
  ) {}


  toggleLogo() {
    this.isActive = !this.isActive;
    this.sidebarStatusService.changeStatus(this.isActive);
  }

  toggleItem(option: TabOption) {
    if (this.isActiveItems[option]) {
      this.isActiveItems[option] = false;
    } else {
      Object.keys(this.isActiveItems).forEach(item => {
        this.isActiveItems[item as TabOption] = false;
      });
      this.isActiveItems[option] = true;
    }
  }
  
}
//prueba