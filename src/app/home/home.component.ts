import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  popularCities: any[] = [
    { city: 'City 1', image: 'path/to/image1.jpg' },
    { city: 'City 2', image: 'path/to/image2.jpg' },
    { city: 'City 3', image: 'path/to/image3.jpg' },
    { city: 'City 4', image: 'path/to/image4.jpg' },
    { city: 'City 5', image: 'path/to/image5.jpg' }
  ];

  popularTours: any[] = [
    { title: 'Tour 1', description: 'Brief description', image: 'path/to/image6.jpg' },
    { title: 'Tour 2', description: 'Brief description', image: 'path/to/image7.jpg' },
    { title: 'Tour 3', description: 'Brief description', image: 'path/to/image8.jpg' },
    { title: 'Tour 4', description: 'Brief description', image: 'path/to/image9.jpg' },
    { title: 'Tour 5', description: 'Brief description', image: 'path/to/image10.jpg' }
  ];

  ngOnInit() {
    // Fetch data from API or mock data (if applicable)
  }
}
