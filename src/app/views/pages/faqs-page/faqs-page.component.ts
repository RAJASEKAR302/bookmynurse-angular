import { Component, Inject } from '@angular/core';
import { FootersComponent } from "../footer/footer.component";
import { HeaderComponent } from "../header/header.component";
import { Title, Meta } from '@angular/platform-browser';
import { Renderer2 } from '@angular/core';
import { DOCUMENT,CommonModule } from '@angular/common';

@Component({
  selector: 'app-faqs-page',
  standalone: true,
  imports: [FootersComponent, HeaderComponent,CommonModule],
  templateUrl: './faqs-page.component.html',
  styleUrl: './faqs-page.component.scss'
})
export class FaqsPageComponent {
  
// constructor(private titleService: Title, private metaService: Meta,private renderer: Renderer2,
//     @Inject(DOCUMENT) private document: Document
// ) {}

}
