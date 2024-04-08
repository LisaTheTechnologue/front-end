import { Component } from '@angular/core';
import { MemberService } from '../../services/member.service';
import { Router } from '@angular/router';
import { Trip } from 'src/app/_shared/models/trip.model';
import { AppService } from 'src/app/_shared/services/app.service';

@Component({
  selector: 'app-member-report',
  templateUrl: './member-report.component.html',
  styleUrls: ['./member-report.component.css'],
})
export class MemberReportComponent {
  reports: any[]=[];
  // searchTripForm!:FormGroup;
  searchText: string = '';
  constructor(
    private memberService: MemberService,
    private appService: AppService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getAllReports();
  }

  getAllReports() {
    this.memberService.getAllReportsByUserId().subscribe((res) => {
      this.reports = res;
      console.log(this.reports);
    });
  }

  deleteReport(reportId: number){
    this.memberService.deleteReport(reportId).subscribe((res) => {
      this.reports = res;
      console.log(this.reports);
    });
  }
}
