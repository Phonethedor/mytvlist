import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-content',
  templateUrl: './content.page.html',
  styleUrls: ['./content.page.scss'],
})
export class ContentPage implements OnInit {

  email="";
  password="";

  constructor(private router:Router, private activedRouter:ActivatedRoute) { 
    this.activedRouter.queryParams.subscribe(param => {
      if(this.router.getCurrentNavigation()?.extras.state) {
        this.email = this.router.getCurrentNavigation()?.extras?.state?.['correo'];
        this.password = this.router.getCurrentNavigation()?.extras?.state?.['pass'];
      }
    })
  }

  lista() {
    let navigationExtras:NavigationExtras = {
      state: {
        correo: this.email,
        pass: this.password
      }
    }
    this.router.navigate(['/lista'], navigationExtras);
  }

  logOut() {
    this.router.navigate(['/home']);
  }

  ngOnInit() {
  }

}
