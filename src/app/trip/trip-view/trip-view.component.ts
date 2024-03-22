import { Component, OnInit } from '@angular/core';
import { TripService } from '../../_shared/services/trip.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TripItem } from '../_models/trip-item';
import { Trip } from '../_models/trip';
import { UploadFileService } from '../../_shared/services/upload-file.service';
import { TripImage } from '../_models/trip-image';

@Component({
  selector: 'app-trip-view',
  templateUrl: './trip-view.component.html',
  styleUrls: ['./trip-view.component.css'],
})
export class TripViewComponent implements OnInit {
  id!: number;
  trip: Trip = {
    id: 0,
    title: '',
    highlights: '',
    status: '',
    items: [],
  };
  items?: TripItem[] = [];

  retrievedImage: any;
  base64Data: any;
  retrieveResonse: any;

  // imagesConfig = {
  //   1: [{ grow: 1, shrink: 0, basis: 'calc(25% - 0.5rem)' }],
  // };
  images: any[] = [];
  // images = [{ src: '', grow: '', shrink: '', basis: 'calc(25% - 0.5rem)' }];
  // images = [
  //   {src: 'https://res.cloudinary.com/thebellhop/image/upload/c_fill,fl_progressive,q_auto,f_auto,dpr_auto,h_300,w_800/v1495185249/hotels/264/facadelobby.jpg', grow: 1, shrink: 0, basis: 'calc(25% - 0.5rem)'},
  //   {src: 'https://res.cloudinary.com/thebellhop/image/upload/c_fill,fl_progressive,q_auto,f_auto,dpr_auto,h_300,w_800/v1495185251/hotels/264/sample-img-main-1.jpg', grow: 1, shrink: 0, basis: 'calc(50% - 0.5rem)'},
  //   {src: 'https://res.cloudinary.com/thebellhop/image/upload/c_fill,fl_progressive,q_auto,f_auto,dpr_auto,h_300,w_800/v1495185599/hotels/264/53.jpg', grow: 1, shrink: 0, basis: 'calc(25% - 0.5rem)'},
  //   {src: 'https://res.cloudinary.com/thebellhop/image/upload/c_fill,fl_progressive,q_auto,f_auto,dpr_auto,h_300,w_800/v1495185601/hotels/264/D7L_2879-A.jpg', grow: 1, shrink: 0, basis: 'calc(50% - 0.5rem)'},
  //   {src: 'https://res.cloudinary.com/thebellhop/image/upload/c_fill,fl_progressive,q_auto,f_auto,dpr_auto,h_300,w_800/v1495185603/hotels/264/D7L_2957-A.jpg', grow: 1, shrink: 0, basis: 'calc(25% - 0.5rem)'},
  //   {src: 'https://res.cloudinary.com/thebellhop/image/upload/c_fill,fl_progressive,q_auto,f_auto,dpr_auto,h_300,w_800/v1495185604/hotels/264/D7L_3065-A.jpg', grow: 1, shrink: 0, basis: 'calc(25% - 0.5rem)'},
  // ];

  /*------------------------------------------
  --------------------------------------------
  Created constructor
  --------------------------------------------
  --------------------------------------------*/
  constructor(
    private tripService: TripService,
    private fileService: UploadFileService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  /**
   * Write code on Method
   *
   * @return response()
   */
  ngOnInit(): void {
    this.id = this.route.snapshot.params['tripId'];

    this.tripService.getById(this.id).subscribe({
      next: (data) => {
        this.trip = data;
        this.items = data.items;
        console.log(data);
      },
      error: (e) => console.error(e),
    });

    this.fileService.getFiles(this.id).subscribe({
      next: (data) => {
        this.images = data;
      },
      error: (e) => console.error(e),
    });

    // for (var i = 0; i < this.tripImages.length; i++) {
    //   this.tripImages[i].url =
    //     'data:image/jpeg;base64,' + this.tripImages[i].picByte; // Add "total": 2 to all objects in array
    // }


  }
  getImageSrc(image: any) {
    return `data:image/jpeg;base64,${image}`; // Adjust content type based on image format
  }
}
