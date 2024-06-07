import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Contact } from 'src/app/_shared/models/contact.model';
import { AdminContactService } from 'src/app/_shared/services/admin-contact.service';

@Component({
  selector: 'app-contact-view',
  templateUrl: './contact-view.component.html',
  styleUrls: ['./contact-view.component.css']
})
export class ContactViewComponent {
  contactId: number = this.activatedRoute.snapshot.params['contactId'];
  status: string;
  contact!: Contact;
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    private adminContactService: AdminContactService,
  ) {
    this.adminContactService.get(this.contactId).subscribe(
      (res) => {
        if (res.id != null) {
          this.contact = res;
        }
      });
  }

  solved() {
    this.adminContactService.isSolved(this.contactId).subscribe((res) => {
      if (res.id != null) {
        this.snackBar.open('Updated Contact Status Successful!', 'Close', {
          duration: 5000,
        });
        this.router.navigateByUrl('/admin');
      } else {
        this.snackBar.open(res.message, 'X', {
          duration: 5000,
          panelClass: 'error-snackbar',
        });
      }
    });
  }
}
