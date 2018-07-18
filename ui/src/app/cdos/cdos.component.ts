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

import { MatDialog } from '@angular/material';

const TABLE_DATA = [
  {
    cdo_id: 'WKN_1',
    current_owner: 'Sparkasse',
    name: 'Best Value 1',
    avg_interest: 2,
    created: '1.1.2018',
    expires:'2025',
    total_rating: 'AA',
    cdo_volume: 3000000,
    included_mortages:'db_1,db_2,db_3,db_4,db_5,db_6,db_7',
    last_combined_cdos:'',
  },  {
    cdo_id: 'WKN_2',
    current_owner: 'Sparkasse',
    name: 'Best Value 2',
    avg_interest: 2,
    created: '1.1.2018',
    expires:'2025',
    total_rating: 'AA',
    cdo_volume: 3000000,
    included_mortages:'db_1,db_2,db_3,db_4,db_5,db_6,db_7',
    last_combined_cdos:'',
  },  {
    cdo_id: 'WKN_3',
    current_owner: 'Sparkasse',
    name: 'Best Value 3',
    avg_interest: 2,
    created: '1.1.2018',
    expires:'2025',
    total_rating: 'AA',
    cdo_volume: 3000000,
    included_mortages:'db_1,db_2,db_3,db_4,db_5,db_6,db_7',
    last_combined_cdos:'',
  },  {
    cdo_id: 'WKN_4',
    current_owner: 'Sparkasse',
    name: 'Best Value 4',
    avg_interest: 2,
    created: '1.1.2018',
    expires:'2025',
    total_rating: 'AA',
    cdo_volume: 3000000,
    included_mortages:'db_1,db_2,db_3,db_4,db_5,db_6,db_7',
    last_combined_cdos:'',
  }, 
  {
    cdo_id: 'WKN_5',
    current_owner: 'Sparkasse',
    name: 'Best Value 5',
    avg_interest: 2,
    created: '1.1.2018',
    expires:'2025',
    total_rating: 'AA',
    cdo_volume: 3000000,
    included_mortages:'db_1,db_2,db_3,db_4,db_5,db_6,db_7',
    last_combined_cdos:'WKN_3, WKN_2, WKN_1',
  },
  {
    cdo_id: 'WKN_6',
    current_owner: 'Sparkasse',
    name: 'Best Value 6',
    avg_interest: 2,
    created: '1.1.2018',
    expires:'2025',
    total_rating: 'AA',
    cdo_volume: 3000000,
    included_mortages:'db_1,db_2,db_3,db_4,db_5,db_6,db_7',
    last_combined_cdos:'',
  },
  {
    cdo_id: 'WKN_7',
    current_owner: 'Sparkasse',
    name: 'Best Value 7',
    avg_interest: 2,
    created: '1.1.2018',
    expires:'2025',
    total_rating: 'AA',
    cdo_volume: 3000000,
    included_mortages:'db_1,db_2,db_3,db_4,db_5,db_6,db_7',
    last_combined_cdos:'WKN_5, WKN_6',
  },
  {
    cdo_id: 'WKN_8',
    current_owner: 'Sparkasse',
    name: 'Best Value 8',
    avg_interest: 2,
    created: '1.1.2018',
    expires:'2025',
    total_rating: 'AA',
    cdo_volume: 3000000,
    included_mortages:'db_1,db_2,db_3,db_4,db_5,db_6,db_7',
    last_combined_cdos:'WKN_4, WKN_7',
  }
];

@Component({
  selector: 'app-cdos',
  templateUrl: './cdos.component.html',
  styleUrls: ['./cdos.component.scss'],
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
export class CdosComponent implements OnInit {
  displayedColumns = [
    'cdo_id',
    'current_owner',
    'name',
    'avg_interest',
    'created',
    'expires',
    'total_rating',
    'cdo_volume',
    'last_combined_cdos'
  ];
  // dataSource = new UserDataSource(this.data);
  dataSource = new MatTableDataSource(this.dataSource);
  // public dataSource = new MatTableDataSource(TABLE_DATA);

  expandedElement;

  selection = new SelectionModel<any>(true, []);
  public selectedRows: Array<any> = [];

  constructor(public dialog: MatDialog, private data: DataService) {
    // this.getCredits();
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  
  cdos$: Object;

  public cdos = [];

  private refreshTable() {
    this.dataSource.filter = '';
 
  }

  ngOnInit() {
    this.data.getCredits().subscribe((res: any[]) => {
      this.cdos = res;
      this.dataSource = new MatTableDataSource(this.cdos);
    });
  }

  
}

