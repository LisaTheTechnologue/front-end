import { Component, OnInit } from '@angular/core';
import { PublicService } from '../_shared/services/public.service';
import { MatTableDataSource } from '@angular/material/table';
interface LeaderDTO {
  id: number;
  username: string;
  imageByte?: string; // Optional for avatar image URL
  noOfTrips: number;
  rating: number;
}
@Component({
  selector: 'app-top-user-board',
  templateUrl: './top-user-board.component.html',
  styleUrls: ['./top-user-board.component.css']
})
export class TopUserBoardComponent implements OnInit {
  public leaders= new MatTableDataSource<LeaderDTO>([]);
  isLoading = false;
  error: any = null;
  displayedColumns: string[] = ['avatar', 'username', 'noOfTrips', 'rating','actions'];

  constructor(private leaderService: PublicService) {}

  async ngOnInit() {
    this.isLoading = true;
    try {
      this.leaders = await this.leaderService.getTopUsersBoard().toPromise();
    } catch (error) {
      this.error = error;
    } finally {
      this.isLoading = false;
    }
  }
}
