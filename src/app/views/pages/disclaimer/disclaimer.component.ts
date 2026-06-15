import { Component,Inject } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { FootersComponent } from "../footer/footer.component";
import { Title, Meta } from '@angular/platform-browser';
import { Renderer2 } from '@angular/core';
import { DOCUMENT,CommonModule } from '@angular/common';

@Component({
  selector: 'app-disclaimer',
  standalone: true,
  imports: [FootersComponent, HeaderComponent,CommonModule],
  templateUrl: './disclaimer.component.html',
  styleUrl: './disclaimer.component.scss'
})
export class DisclaimerComponent {
   constructor(private titleService: Title, private metaService: Meta,private renderer: Renderer2,
    @Inject(DOCUMENT) private document: Document
) {}

isTamil: boolean = false;

  toggleLanguage(event: any) {
    const selectedLanguage = event.target.value;
    this.isTamil = !this.isTamil;
  }

}
