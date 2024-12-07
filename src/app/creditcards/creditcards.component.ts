import { Component, ViewChild } from '@angular/core';
import { CreditCard } from '../models/credit-card';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
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
  template: `
    <!-- The AG Grid component -->
    <ag-grid-angular [rowData]="rowData" [columnDefs]="colDefs" />
  `,
})
export class CreditcardsComponent {
  creditcards: CreditCard[] = [];

  creditCardMaximumAmount: number = 0;
  creditCardMaximumInterest: number = 0;
  rowData = [
    { make: 'Tesla', model: 'Model Y', price: 64950, electric: true },
    { make: 'Ford', model: 'F-Series', price: 33850, electric: false },
    { make: 'Toyota', model: 'Corolla', price: 29600, electric: false },
  ];

  // Column Definitions: Defines the columns to be displayed.
  colDefs: ColDef[] = [
    { field: 'make' },
    { field: 'model' },
    { field: 'price' },
    { field: 'electric' },
  ];

  constructor(private creditCardsService: CreditcardsService) {
    this.creditCardsService.getCreditCards().subscribe((data: CreditCard[]) => {
      this.creditcards = data;

      this.dataSource = new MatTableDataSource(this.creditcards);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

      this.calculateMetrics();
    });
  }
  ngOnInit() {
    console.log('init');
  }
  dataSource = new MatTableDataSource(this.creditcards);

  displayColumns = [
    'select',
    'id',
    'name',
    'description',
    'bankName',
    'maxCredit',
    'interestRate',
    'active',
    'recommendedScore',
    'actions',
  ];

  selection = new SelectionModel(true, []);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  selectHandler(row: CreditCard) {
    this.selection.toggle(row as never);
  }
  calculateMetrics() {
    this.creditCardMaximumAmount = this.creditcards.filter(
      (card) => card.maxCredit > 3000
    ).length;
    this.creditCardMaximumInterest = this.creditcards.filter(
      (card) => card.interestRate > 7
    ).length;
  }
}
