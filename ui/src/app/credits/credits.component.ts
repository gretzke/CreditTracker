import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DataSource } from '@angular/cdk/collections';
import {
  animate,
  state,
  style,
  transition,
  trigger
} from '@angular/animations';

import { MatTableDataSource } from '@angular/material';

import { SelectionModel } from '@angular/cdk/collections';

// import { Observable } from 'rxjs';
import { User } from '../models/user.model';

import { AddCreditDialogComponent } from '../dialog/add-credit-dialog/add-credit-dialog.component';
import { MatDialog } from '@angular/material';
import { CreateCdoDialogComponent } from '../dialog/create-cdo-dialog/create-cdo-dialog.component';

const TABLE_DATA = [
  {
    owner: 'Sparkasse',
    mortgageID: 'db_1',
    name: 'Arthur Liebhardt',
    birthday: '2.5.92',
    city: 'City',
    zip: '66666',
    street: 'street 1',
    job: 'Hacker',
    salary: 10000,
    interest: 2,
    period: 2,
    start: '1.1.2018',
    volume: 300000,
    employer: 'Employer',
    asset: 'House',
    rating: 'aa',
    bankingInfo: 'DE08372340872308947'
  }
];

@Component({
  selector: 'app-credits',
  templateUrl: './credits.component.html',
  styleUrls: ['./credits.component.scss'],
  animations: [
    trigger('detailExpand', [
      state(
        'collapsed',
        style({ height: '0px', minHeight: '0', display: 'none' })
      ),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      )
    ])
  ]
})
export class CreditsComponent implements OnInit {
  displayedColumns = [
    'select',
    'mortgageID',
    'name',
    'birthday',
    'job',
    'interest',
    'period',
    'start',
    'volume',
    'asset',
    'rating'
  ];
  // dataSource = new UserDataSource(this.data);
  dataSource = new MatTableDataSource(this.dataSource);
  // public dataSource = new MatTableDataSource(TABLE_DATA);

  expandedElement;
  User;
  selection = new SelectionModel<any>(true, []);
  public selectedRows: Array<any> = [];

  constructor(public dialog: MatDialog, private data: DataService) {
    // this.getCredits();
  }

  // createCreditIdsArray() {
  //   this.selectedRows.forEach(element => {
  //     console.log(element.mortgageID);
  //   });
  // }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.data.forEach(row => this.selection.select(row));
  }

  onclick(row) {
    const selectvalue = this.selection.isSelected(row);
    if (selectvalue === false) {
      this.selectedRows.push(row);
    } else if (selectvalue === true) {
      for (var i = 0; i < this.selectedRows.length; i++) {
        if (this.selectedRows[i]['id'] === row.id) {
          this.selectedRows.splice(i, 1);
        }
      }
    }
  }
  onAllClick() {
    const selectAll = this.isAllSelected();
    if (selectAll === false) {
      this.selectedRows = this.credits;
    } else {
      this.selectedRows = [];
    }
  }

  credits$: Object;

  public credits = [];

  addCredit(data: any) {
    const dialogRef = this.dialog.open(AddCreditDialogComponent, {
      data: {  }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        // After dialog is closed we're doing frontend updates
        // For add we're just pushing a new row inside DataService
        // this.exampleDatabase.dataChange.value.push(this.dataService.getDialogData());
        // this.snackBar.open("Mortgage added.", "Ok", {
        //   duration: 500,
        // });
        this.refreshTable();
      }
    });
  }

  createCDO() {
    const dialogRef = this.dialog.open(CreateCdoDialogComponent, {
      data: {
        mortgages: this.selectedRows
      }
    });
    this.refreshTable();
    // this.dataService.createDTO(data);

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        // After dialog is closed we're doing frontend updates
        // For add we're just pushing a new row inside DataService
        // this.exampleDatabase.dataChange.value.push(this.dataService.getDialogData());
        // this.refreshTable();
      }
    });
  }

  private refreshTable() {
    this.dataSource.filter = '';
    this.data.getCredits().subscribe((res: any[]) => {
      this.credits = res;
      this.dataSource = new MatTableDataSource(this.credits);
    });
    // this.dataSource.filter = this.filter.nativeElement.value;
  }

  ngOnInit() {
    // this.data.getCredits().subscribe(
    //   data => this.credits$ = data
    // );
    this.data.getCredits().subscribe((res: any[]) => {
      this.credits = res;
      this.dataSource = new MatTableDataSource(this.credits);
    });
  }

  // getCredits()
  // {
  //   this.data.getCredits().subscribe(data=>{

  //     this.dataSource=data;
  //     // this.contacts=data.result;
  //     // this.contacts.forEach(element => {
  //     //   console.log(element)
  //     // });
  //   })
  // }
}

export class UserDataSource extends DataSource<any> {
  constructor(private userService: DataService) {
    super();
  }
  connect(): Observable<User[]> {
    return this.userService.getUser();
  }
  disconnect() {}
}
