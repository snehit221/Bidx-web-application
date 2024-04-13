import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appExpirationDateFormat]'
})
export class ExpirationDateFormatDirective {

  constructor(private el: ElementRef) { }

  @HostListener('input', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    const input = this.el.nativeElement.value;
    const trimmed = input.replace(/\s+/g, '');
    const formatted = trimmed
      .replace(/[^0-9]/g, '') // Remove non-numeric characters
      .replace(/(\d{2})(\d{1,2})/, '$1/$2') // Add slash after first two digits
      .substring(0, 5); // Limit length to "mm/yy"
    this.el.nativeElement.value = formatted;
  }
}