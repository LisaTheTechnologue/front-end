import { Component } from '@angular/core';

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.css']
})
export class MemberComponent {
  menuItems: any[] = [
    { link: '/dashboard', label: 'Dashboard', icon: 'dashboard' },
    { link: '/profile', label: 'Profile', icon: 'person' },
    { link: '/settings', label: 'Settings', icon: 'settings' },
    { link: '/help', label: 'Help', icon: 'help' },
  ];
}
