import { CommonModule } from '@angular/common';
import { Component, Renderer2 } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule,CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  constructor(private router: Router,private renderer: Renderer2) {
    // this.router.events.subscribe(event => {
    //   if (event instanceof NavigationEnd) {
    //     this.closeMenu();
    //   }
    // });
  }
  
  isMenuOpen = false;

  

  toggleMobileMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    console.log(this.isMenuOpen)
  
    if (this.isMenuOpen) {
      this.renderer.addClass(document.documentElement, 'menu-opened');
    } else {
      this.renderer.removeClass(document.documentElement, 'menu-opened');
    }
  }

  closeMenu() {
    this.isMenuOpen = false;
    this.renderer.removeClass(document.documentElement, 'menu-opened');
  }

  
  
  closePopup() {
  const modal = document.getElementById('successModal');
  if (modal) modal.classList.remove('active');
}


  showPopup(){
    // console.log("Hello")
    const modal = document.getElementById('successModal');
    if (modal) modal.classList.add('active');
  }

  // navigateToSection(sectionId: string) {
  //   this.router.navigate(['/pages'], { fragment: sectionId });
  // }
  
  navigateToSection(sectionId: string): void {
  if (this.router.url !== '/index') {
    this.router.navigate(['/index']).then(() => {
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    });
  } else {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  // Remove any fragment from the URL
  history.replaceState(null, '', '/index');
}


  scrollToSection(id: string) {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
  
      // ✅ Keep the section ID in the DOM, but remove the # from the URL
      if (window.location.hash) {
        history.replaceState(null, '', window.location.pathname + window.location.search);
      }
    }
  }
  
}

