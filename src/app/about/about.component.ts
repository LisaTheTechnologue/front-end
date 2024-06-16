import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PublicService } from '../_shared/services/public.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PageNotFoundException } from '../_shared/exceptions/page-not-found.exception';
import { Router } from '@angular/router';
import { Contact } from '../_shared/models/contact.model';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
})
export class AboutComponent {
  // contactForm!: FormGroup;
  aboutUsText = `
  Xin chào đến người bạn đồng hành lên kế hoạch du lịch lý tưởng của bạn! 
  Đội ngũ những người đam mê du lịch của chúng tôi sẵn sàng giúp bạn tạo nên những chuyến đi khó quên. 
  Chúng tôi cung cấp một nền tảng thân thiện để lên kế hoạch cho các chuyến đi, khám phá các điểm đến và tìm ra những viên ngọc ẩn giấu.
`;
phoneText= '0909-123-1234';
emailText = 'ttos.support.team@gmail.com';
// error: any;
  // isLoading = false;
  // constructor(
  //   private snackBar: MatSnackBar,
  //   private router: Router,
  //   private fb: FormBuilder,
  //   private publicService: PublicService
  // ) { }
  // ngOnInit(): void {
  //   this.contactForm = this.fb.group({
  //     name: [null, [Validators.required]],
  //     email: [null, [Validators.required, Validators.email]],
  //     subject: [null, [Validators.required]],
  //     message: [null, [Validators.required]],
  //   });
  // }
  // onSubmit() {
  //   this.isLoading = true;
  //   // Handle form submission logic (optional)
  //   // You can display a success message or send an email here
  //   if (this.contactForm.valid) {
  //     this.publicService.submitContact(this.contactForm.value as Contact).subscribe(
  //       (res) => {
  //         this.onSuccess('Sent successfully')
  //       },
  //       // (error) => {
  //       //   this.onFailed(error);
  //       // }
  //   );
  //   }
  // }
  // private onSuccess(message: string) {
  //   this.isLoading = false;
  //   this.snackBar.open(message, 'OK', { duration: 5000 });
  //   this.router.navigateByUrl('/');
  // }
  // private onFailed(message: string) {
  //   this.snackBar.open(message, 'X', {
  //     duration: 10000,
  //     panelClass: 'error-snackbar',
  //   });
  // }
}
