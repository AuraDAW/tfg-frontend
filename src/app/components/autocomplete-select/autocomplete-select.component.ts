import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Observable, startWith, map } from 'rxjs';

@Component({
  selector: 'app-autocomplete-select',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatInputModule, MatFormFieldModule, MatSelectModule, MatAutocompleteModule,TranslateModule],
  templateUrl: './autocomplete-select.component.html',
  styles: ``
})
export class AutocompleteSelectComponent {
  @Input() control!: FormControl; // The FormControl for the selected value
  @Input() label!: string; // Label for the input
  @Input() options: any[] = []; // Options to display in the autocomplete dropdown
  @Input() optionValueKey: string = ''; // The key in options used to identify the value
  @Input() entityKey!: string; // Entity key (e.g., pokemonData, abilities)
  
  @Output() optionSelected = new EventEmitter<any>(); // Event emitter on option selection
  isInputFocused: boolean = false;

  filteredOptions!: Observable<any[]>;

  constructor(private translateService: TranslateService) {}

  ngOnInit(): void {
    this.filterOptions('');
  }

  // Handle input focus
  onFocus(): void {
    this.isInputFocused = true;
    this.filterOptions(''); // Show all options when focus is on the input
  }

  // Handle input blur (when the input is no longer focused)
  onBlur(): void {
    this.isInputFocused = false;
    // Optionally, you can filter the options based on the input value if desired
  }

  // Filter the options based on the user input, considering language-specific name fields
  filterOptions(value: string): void {
    value = value.toLowerCase(); // Ensure case-insensitive search

    // Get the current language from TranslateService
    const currentLang = this.translateService.currentLang;

    // Filter options based on both id and the name field specific to the current language
    this.filteredOptions = new Observable((observer) => {
      const filtered = this.options.filter(option => {
        // Get the correct name field based on the current language
        const translatedName = option[`name_${currentLang}`]?.toLowerCase() || '';

        // Check if the value matches either the translated name or the ID
        return option[this.optionValueKey].toString().includes(value) ||
               translatedName.includes(value);
      });

      observer.next(filtered);
    });
  }
  // New method to handle input event and pass the value
  onInput(event: Event): void {
    const inputElement = event.target as HTMLInputElement; // Type assertion here
    this.filterOptions(inputElement.value);  // Pass the input value to the filter
  }

  // Handle the selection of an option and emit the selected option
  onOptionSelected(event: any): void {
    const selected = event.option.value;
    this.optionSelected.emit(selected);
  }

  displayFn(option: any): string {
    console.log(option);
    console.log(this.optionValueKey);
    if (option && option[this.optionValueKey]) {
      console.log("hola");
      const text= this.translateService.instant(`${this.entityKey}.name.${option[this.optionValueKey]}`);
      console.log(text);
    }
    return '';
  }
}

