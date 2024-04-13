import { Component, Output, EventEmitter } from '@angular/core';

/* @author - snehitroda */

@Component({
  selector: 'app-search-filter',
  standalone: true,
  imports: [],
  templateUrl: './search-filter.component.html',
  styleUrl: './search-filter.component.css'
})
export class SearchFilterComponent {
  @Output() filterChanged = new EventEmitter<{ key: string, value: string }>();
  @Output() clearAllFilters = new EventEmitter<void>();

  selectedCategory: string = ''; 
  selectedCondition: string = ''; 
  selectedPrice: string = ''; 



  onFilterChange(key: string, event: Event): any {
    console.log("Inside onFilterChange: " + event)
    console.log("key: "+ key)
    console.log("event value: " + (event.target as HTMLInputElement).value)
    const value = (event.target as HTMLInputElement).value 
    
    if(key === "price"){
      this.selectedPrice = value;
    }
    else if (key === "category"){
      this.selectedCategory = value;

    } 
    else {
      this.selectedCondition = value;
    }
    

    this.filterChanged.emit({ key, value });
  }
  
  clearAll() {
    console.log("clearing all filters from UI...")
    this.selectedCategory = '';
    this.selectedCondition = '';
    this.selectedPrice = '';
    this.clearAllFilters.emit();
  }


}
