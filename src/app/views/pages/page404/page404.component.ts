import { Component, HostListener ,Inject,AfterViewChecked} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NurseRegService } from '../service/nurse-reg.service';
import { Title, Meta } from '@angular/platform-browser';
import { Renderer2 } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { AbstractControl, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-page404',
  templateUrl: './page404.component.html',
  styleUrls: ['./page404.component.scss']
})
export class Page404Component {

  bookingForm: any;
  users: any;

  constructor(private fb: FormBuilder,private nurseService:NurseRegService, private router: Router,private titleService: Title,private metaService: Meta,  private renderer: Renderer2,
      @Inject(DOCUMENT) private document: Document) {}
  // @HostListener('window:scroll', ['$event'])

  hasInitialized = false;

  ngAfterViewChecked() {
    if (this.users?.length && !this.hasInitialized) {
      this.hasInitialized = true;
      this.initSliderAnimation();
    }
  }

  initSliderAnimation() {
    const slider = document.querySelector('.doctor-slider') as HTMLElement;
    if (slider) {
      slider.style.animation = 'scrollLoop 100s linear infinite';
    }
  }

  showReferralModal = false;
  

  // ngOnInit(): void {

  //   this.getAllApproved();
  //   if(!this.bookingForm){
  //   this.bookingForm = this.fb.group({
  //     name: ['', Validators.required],
  //     mobile: ['', [Validators.required, blockSpamNumber]],
  //     nurseType: ['', Validators.required],
  //     location: ['', Validators.required],
  //     services: ['', Validators.required],
  //     preferences: ['', Validators.required],
  //     agreement: [false, Validators.requiredTrue]
  //   });}
  //   var st = window.pageYOffset;
  //   // console.log(st);
  //   var navbar = document.getElementsByTagName('nav')[0];

  // //  console.log(navbar);
  // //  if(st > 95){
  // //   navbar.classList.add('header-pinned')
  // //  }else{
  // //   navbar.classList.remove('header-pinned');
  // //  }

  // // const modal = document.getElementById('successModalss');
  // // if (modal) modal.classList.add('active');
  // this.titleService.setTitle('Book My Nurse | Home Nursing Services | Book a Nurse Online | Nursing Care');

  //   this.metaService.addTags([
  //     { name: 'description', content: 'Book My Nurse provides Professional Home Nursing services. Easily book a skilled nurse online for personalized, quality care in the comfort of your home.' },
  //     { name: 'keywords', content: 'Book My Nurse, Home Nursing Services, Book a Nurse Online, Nursing Care at Home, Post-Operative Care, Home Care Treatments, Professional Home Nurses, Elderly Care, Tracheostomy, Stroke, Cancer, and Bedridden Patient Care' },
  //     { name: 'robots', content: 'index,follow' }
  //   ]);

  //   // ✅ Add canonical tag
  //  const link: HTMLLinkElement = this.renderer.createElement('link');
  //  link.setAttribute('rel', 'canonical');
  //  link.setAttribute('href', 'https://www.bookmynurse.com'); // 🔁 Update with the exact page URL
  //  this.renderer.appendChild(this.document.head, link);

  // }
showFaqPopup = false;
faqContent: string = '';

openFaq(category: string) {
  this.showFaqPopup = true;

  const faqMap: any = {
    registration: `
      <ol>
        <li><strong>How do I register as a nurse?</strong><br>You can register by completing the Nurse Registration Form available on our website or app. Once your credentials are verified, your profile will be activated and visible to patients.</li>
        <li><strong>How do I book a nurse?</strong><br>Simply browse through our list of available nurses, select your preferred professional, and complete the booking via our app or website. You’ll receive instant confirmation.</li>
        <li><strong>How long does it take to confirm a booking?</strong><br>Booking confirmations are typically instant. You’ll receive a confirmation message via SMS and email once your booking is successful.</li>
        <li><strong>Can I request a home visit nurse service?</strong><br>Yes, we specialize in home care. Select the “Home Care” option during booking and enter your address details for doorstep service.</li>
      </ol>
    `,
    services: `
      <ol>
        <li><strong>What types of nursing services do you offer?</strong><br>We offer pediatric care, post-operative support, elderly care, chronic illness management, physiotherapy assistance, and more.</li>
        <li><strong>Are nurses available 24/7?</strong><br>Yes, we provide round-the-clock nursing services. You can book day or night shifts depending on your needs.</li>
        <li><strong>Can I choose a nurse based on language or gender preference?</strong><br>Absolutely, our platform allows you to filter nurses based on language, gender, experience, and specialization.</li>
        <li><strong>Do you offer physiotherapy services at home?</strong><br>Yes, certified physiotherapists are available for home visits. You can book sessions tailored to your rehabilitation needs.</li>
        <li><strong>Are your nurses certified and background-verified?</strong><br>All our nurses are professionally certified and undergo thorough background checks before on-boarding.</li>
        <li><strong>Can I book a nurse for a few hours or only full-day shifts?</strong><br>We offer flexible durations — hourly, half-day, full-day, and overnight care options are available.</li>
      </ol>
    `,
    pricing: `
      <ol>
        <li><strong>How much does it cost to book a nurse?</strong><br>Pricing varies based on service type, duration, and nurse experience. You’ll see transparent pricing before confirming your booking.</li>
        <li><strong>What payment methods are accepted?</strong><br>We accept UPI, debit/credit cards, net banking, and wallet payments. All transactions are secure.</li>
        <li><strong>Is there a cancellation fee?</strong><br>Cancellations made within a specific window are free. Late cancellations may incur a nominal fee — details are available in our cancellation policy.</li>
        <li><strong>Can I get a refund if I cancel my booking?</strong><br>Yes, eligible cancellations are refunded as per our refund policy. Refunds are processed within 5–7 business days.</li>
      </ol>
    `,
    support: `
      <ol>
        <li><strong>What if I face an issue during the nurse’s visit?</strong><br>You can contact our 24/7 support team via the app or helpline. We’ll resolve your concern promptly.</li>
        <li><strong>Is my personal data safe with BookMyNurse?</strong><br>Yes, we follow strict data protection protocols. Your information is encrypted and never shared without consent.</li>
        <li><strong>Can I reschedule a nurse visit?</strong><br>Yes, you can reschedule through the app or website. Advance notice helps us accommodate your request smoothly.</li>
        <li><strong>Do you offer services outside Chennai?</strong><br>Yes, currently we serve in 8 locations, i.e., Chennai, Pondicherry, Trichy, Thanjavur, Madurai, Tirunelveli, Tiruppur, and Coimbatore. We’re actively expanding to more cities to bring quality home healthcare closer to you.</li>
        <li><strong>Can I speak to a nurse before booking?</strong><br>Yes, you can request a pre-booking consultation to discuss your needs and clarify any concerns.</li>
        <li><strong>Do you provide medical equipment along with nursing care?</strong><br>We can assist with sourcing basic medical equipment like wheelchairs, oxygen cylinders, and IV stands through our partner network.</li>
      </ol>
    `
  };

  this.faqContent = faqMap[category] || '<p>No data available for this section.</p>';
}


  ngOnInit(): void {
  this.getAllApproved();

  if (!this.bookingForm) {
    this.bookingForm = this.fb.group({
      name: ['', Validators.required],
      mobile: ['', [Validators.required, blockSpamNumber]],
      nurseType: ['', Validators.required],
      location: ['', Validators.required],
      services: ['', Validators.required],
      preferences: ['', Validators.required],
      agreement: [false, Validators.requiredTrue]
    });
  }

  // ✅ Meta Tags and Title
  this.titleService.setTitle('Book My Nurse | Home Nursing Services | Book a Nurse Online | Nursing Care');

  this.metaService.updateTag({
    name: 'description',
    content: 'Book My Nurse provides Professional Home Nursing services. Easily book a skilled nurse online for personalized, quality care in the comfort of your home.'
  });

  this.metaService.updateTag({
    name: 'keywords',
    content: 'Book My Nurse, Home Nursing Services, Book a Nurse Online, Nursing Care at Home, Post-Operative Care, Home Care Treatments, Professional Home Nurses, Elderly Care, Tracheostomy, Stroke, Cancer, and Bedridden Patient Care'
  });

  this.metaService.updateTag({
    name: 'robots',
    content: 'index, follow'
  });

  // ✅ Canonical Tag (Prevent Duplication)
  const existingLink = this.document.querySelector("link[rel='canonical']");
  if (existingLink) {
    this.renderer.removeChild(this.document.head, existingLink);
  }

  const link: HTMLLinkElement = this.renderer.createElement('link');
  link.setAttribute('rel', 'canonical');
  link.setAttribute('href', 'https://www.bookmynurse.com'); // Or dynamic URL
  this.renderer.appendChild(this.document.head, link);
}

  
  onSubmit(): void {
    if (this.bookingForm.valid) {
      // Create a copy of the form value, excluding the `agreement` field
      const formData = { ...this.bookingForm.value };
      delete formData.agreement;

      const enqData = this.getServiceAbbreviation(formData.services)
      const enquiryNumber = `${enqData}-${Date.now()}`;
      formData.enquiryno = enquiryNumber;
  
      console.log(formData);
      this.nurseService
        .nurseRegistration(formData) 
        .subscribe({
          next: (res) => {
            console.log('Success:', res.data.insertId);
            sessionStorage.setItem("clientID",res.data.insertId)
            const modal = document.getElementById('successModalss');
            if (modal) modal.classList.add('active');
            this.bookingForm.reset();
          },
          error: (err) => console.error('Error:', err),
        });
    }
  }

  redirectToNurse() {
    this.router.navigate(['/nurse-booking']); 
  
    }

    get f(){
      return this.bookingForm.controls;
    }

    getServiceAbbreviation(service: string) {
      const abbreviations: Record<string, string> = {
          "Elder Care": "ED",
          "Bedridden Patient Care": "BP",
          "Stroke Patient Care": "SP",
          "Tracheostomy Patient Care": "TP",
          "Post Operative Care": "PO",
          "ICU Setup at Home": "ICU",
          "Physiotherapy at Home": "PH",
          "Travel Nurse": "TN",
          "Doctor's Visit at Home": "DV"
      };
  
      return abbreviations[service] || "UN"; 
    }

    getAllApproved() {
      this.nurseService.nurseRegistered('Approved').subscribe((res:any)=>{
        // console.log(res)
        this.users = res.data.map((user: any) => ({
          ...user,
          photoUrl: `https://app.bookmynurse.com/api/${user.file_path}`, 
          // photoUrl: `http://localhost:3000/${user.file_path}`,
        }));
      })
    }

    ngAfterViewInit() {
  const chatNowBtn = document.getElementById("chatNowBtn");
  const floatingBtns = document.getElementById("floatingBtns");
  const referralBtn = document.getElementById("referralBtn");
  const modalRel = document.getElementById("modal-rel");
  const closeBtnRel = document.getElementById("closeBtn-rel");
  const referralForm = document.getElementById("referralForm") as HTMLFormElement;

  const thankYouPopup = document.getElementById("thankYouPopup");
  const closePopupBtn = document.getElementById("closePopupBtn");

  // Toggle floating chat buttons
  chatNowBtn?.addEventListener("click", () => {
    floatingBtns!.style.display = (floatingBtns!.style.display === "flex") ? "none" : "flex";
  });

  // Show referral modal
  referralBtn?.addEventListener("click", () => {
    modalRel!.style.display = "flex";
  });

  // Close modal on (×)
  closeBtnRel?.addEventListener("click", () => {
    modalRel!.style.display = "none";
  });

  // Close modal when clicking outside
  window.addEventListener("click", (event) => {
    if (event.target === modalRel) {
      modalRel!.style.display = "none";
    }
  });

  // Handle form submission with validation
  referralForm?.addEventListener("submit", (event) => {
    event.preventDefault();

    // If form is not valid, show browser's validation UI
    if (!referralForm.checkValidity()) {
      referralForm.reportValidity(); // This will highlight invalid fields
      return;
    }

    // Proceed with submission
    fetch(referralForm.action, {
      method: referralForm.method,
      body: new FormData(referralForm),
    })
      .then(response => response.text())
      .then(() => {
        referralForm.reset();
        modalRel!.style.display = "none";
        thankYouPopup!.style.display = "flex";
      })
      .catch(error => console.error("Error:", error));
  });

  // Close Thank You popup
  closePopupBtn?.addEventListener("click", () => {
    thankYouPopup!.style.display = "none";
  });
}
}



  function blockSpamNumber(control: AbstractControl): ValidationErrors | null {
  const value = control.value;
  if (!value) return null;

  if (!/^\d{10}$/.test(value)) return { spamNumber: true };
  if (/^(\d)\1{9}$/.test(value)) return { spamNumber: true };

  const blocked = ['1234567890', '9876543210', '0123456789', '9999999999'];
  if (blocked.includes(value)) return { spamNumber: true };

  if (!/^[6-9]/.test(value)) return { spamNumber: true };

  return null;
}
