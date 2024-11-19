import { Component, ViewChild } from '@angular/core';
import { CreditCard } from '../models/credit-card';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator} from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { CreditcardsService } from '../services/creditcards.service';
import { map } from 'rxjs';
import { createAction, props } from '@ngrx/store';
import { AgGridAngular } from 'ag-grid-angular'; // Angular Data Grid Component
import { ColDef } from 'ag-grid-community';


@Component({
  selector: 'app-root',
  templateUrl: './creditcards.component.html',
  styleUrls: ['./creditcards.component.scss'],
  //standalone: true,
  //imports: [AgGridAngular],
  template:
`
 <!-- The AG Grid component -->
 <ag-grid-angular
   [rowData]="rowData"
   [columnDefs]="colDefs" />
`
})

export class CreditcardsComponent {

  creditcards: CreditCard[] = [];

  creditCardMaximumAmount: number = 0;
  creditCardMaximumInterest: number = 0;
  rowData = [
    { make: "Tesla", model: "Model Y", price: 64950, electric: true },
    { make: "Ford", model: "F-Series", price: 33850, electric: false },
    { make: "Toyota", model: "Corolla", price: 29600, electric: false },
  ];
 
  // Column Definitions: Defines the columns to be displayed.
  colDefs: ColDef[] = [
    { field: "make" },
    { field: "model" },
    { field: "price" },
    { field: "electric" }
  ];

  constructor(private creditCardsService: CreditcardsService) {
    debugger;
    // Example usage:
    const numbers = [1, 1, 2, 2, 3];
    const newLength = this.removeduplicates(numbers);
    console.log(`Array after removing duplicates: ${numbers.slice(0, newLength)}`);
    console.log("I am here");
    const nums = [-2, 1, -3, 4, -1, 2, 1, -5, 4];
    const result = this.maxSubarraySum(nums);
    console.log(result); // Output: { sum: 6,
    this.creditCardsService.getCreditCards().subscribe((data:CreditCard[]) => {
      this.creditcards = data;

      this.dataSource = new MatTableDataSource(this.creditcards);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

      this.calculateMetrics();
    
 
    })
  }
  ngOnInit(){
    console.log('init');
  }
  dataSource = new MatTableDataSource(this.creditcards);

  displayColumns = ["select", "id", "name", "description", "bankName", "maxCredit", "interestRate", "active", "recommendedScore", "actions"];

  selection = new SelectionModel(true, []);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  selectHandler(row: CreditCard){
    this.selection.toggle(row as never);
  }
  twoSum(nums: number[], target: number): number[] | null {
    const seen: Map<number, number> = new Map();
    for (let i = 0; i < nums.length; i++) {
      const complement = target - nums[i];
      if (seen.has(complement)) {
        return [seen.get(complement)!, i]; // ! for nullish type safety
      }
      seen.set(nums[i], i);
    }
    return null;
  }
  
  // Example usage in your Angular component (assuming you have an array 'numbers' and target value)
  // const indices = twoSum(numbers, target);
  // if (indices) {
  //   console.log(`Numbers found at indices: ${indices[0]} and ${indices[1]}`);
  // } else {
  //   console.log(`No two numbers sum up to the target in the array.`);
  // }
  // maxSubarraySum(nums: number[]): { sum: number; startIndex: number; endIndex: number } {
  //   let currentSum = 0;
  //   let maxSum = Number.NEGATIVE_INFINITY;
  //   let startIndex = 0;
  //   let endIndex = 0;
  maxSubarraySum(nums:number[]): {sum : number; startIndex : number; endIndex: number}
  {
    let startIndex = 0;
    let endIndex =0;
    let maxSum = Number.NEGATIVE_INFINITY;
    let currentSum =0;

    for(let i= 0; i< nums.length; i++)
    {
      currentSum = Math.max(currentSum + nums[i],0)
      if(currentSum > maxSum)
      {
        maxSum = currentSum;
        endIndex =i;
      }
      if (currentSum === 0)
      {
        startIndex = i+1;
      }
    }
    return {sum :maxSum ,startIndex, endIndex};
  }
  twoSumProblem(nums:number[],target:number):number[] | null {
    const seen: Map<number, number>= new Map();
    for (let i =0; i <nums.length; i++)
    {
      const complement = target - nums[i];
      if (seen.has(complement))
      {
        return [seen.get(complement)!,i];

      }
      seen.set(nums[i],i);

    }
return null;

  }
  removeduplicates(nums:Number[]):number{
    debugger;
    if(nums.length ===0) return 0;
    let writeindex =1;
    for (let i =1; i< nums.length; i++)
    {
      if(nums[i] !== nums[writeindex - 1])
      { nums[writeindex]= nums[i]
       writeindex ++;
      }
     
    }
    return writeindex;
  }
  
// twoSumSurprise( nums: Number[],target:number):number[]| null{
//   const seen: Map <number,number>= new Map();
// for (let i =0;i<nums.length;i++)
// {
  
// }

// }
  calculateMetrics(){
    debugger;
  
   
    
    this.creditCardMaximumAmount = this.creditcards.filter(card => card.maxCredit > 3000).length;
    this.creditCardMaximumInterest = this.creditcards.filter(card => card.interestRate > 7).length;
    
  }
}
