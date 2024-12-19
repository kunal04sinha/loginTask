import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatOptionModule } from '@angular/material/core';
import { CommonModule } from '@angular/common';
import { AllApiService } from '../../Services/all-api.service';
import { HttpClientModule } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [
    MdbFormsModule,
    MatAutocompleteModule,
    MatInputModule,
    MatOptionModule,
    FormsModule,
    CommonModule,
    HttpClientModule,
    RouterModule,
  ],
  providers: [AllApiService],
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent {
  selectedCountry: string = '';
  countryCode: string = '+00';
  countries: any[] = [];
  filteredCountries: any[] = [];
  phoneNumber!: string;
  gender: any;
  lastName: string = '';
  firstName: string = '';
  userData: any = {};

  constructor(private apiService: AllApiService, private router: Router) {
    apiService.api().subscribe((data: any) => {
      this.countries = data.data;
    });
  }
  onCountrySearch(event: any): void {
    console.log(event.target);
    const searchTerm = event.target.value.toLowerCase();
    this.filteredCountries = this.countries.filter((country) =>
      country.name.toLowerCase().includes(searchTerm)
    );
  }

  onCountrySelected(event: any): void {
    const selectedCountry = event.option.value;
    const country = this.countries.find((c) => c.name === selectedCountry);
    this.countryCode = country ? country.dial_code : '';
  }

  storeUserData(): void {
    this.userData = {
      firstName: this.firstName,
      lastName: this.lastName,
      gender: this.gender,
      country: this.selectedCountry,
      phoneNumber: this.phoneNumber,
    };

    localStorage.setItem('userData', JSON.stringify(this.userData));
    this.router.navigate(['/welcome']);
  }
}
