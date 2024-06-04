import { Component, Input, OnInit } from '@angular/core';
import { NavigationItem } from '../../models/navigation.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-member-navigation',
  templateUrl: './member-navigation.component.html',
  styleUrls: ['./member-navigation.component.css']
})
export class MemberNavigationComponent implements OnInit {

  @Input() activeRoute: string; // Input to specify active route

  constructor(private router: Router) {} // Inject Router

  isActive(route: string): boolean {
    return this.router.url.startsWith(`/member/${route}`);
  }
  ngOnInit() {
  }

}
