import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DataSource } from '@angular/cdk/collections';
import { jqxChartComponent } from 'jqwidgets-scripts/jqwidgets-ts/angular_jqxchart';

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
    expires: '2025',
    total_rating: 'AA',
    cdo_volume: 3000000,
    included_mortages: 'db_1,db_2,db_3,db_4,db_5,db_6,db_7',
    last_combined_cdos: '',
  }, {
    cdo_id: 'WKN_2',
    current_owner: 'Sparkasse',
    name: 'Best Value 2',
    avg_interest: 2,
    created: '1.1.2018',
    expires: '2025',
    total_rating: 'AA',
    cdo_volume: 3000000,
    included_mortages: 'db_1,db_2,db_3,db_4,db_5,db_6,db_7',
    last_combined_cdos: '',
  }, {
    cdo_id: 'WKN_3',
    current_owner: 'Sparkasse',
    name: 'Best Value 3',
    avg_interest: 2,
    created: '1.1.2018',
    expires: '2025',
    total_rating: 'AA',
    cdo_volume: 3000000,
    included_mortages: 'db_1,db_2,db_3,db_4,db_5,db_6,db_7',
    last_combined_cdos: '',
  }, {
    cdo_id: 'WKN_4',
    current_owner: 'Sparkasse',
    name: 'Best Value 4',
    avg_interest: 2,
    created: '1.1.2018',
    expires: '2025',
    total_rating: 'AA',
    cdo_volume: 3000000,
    included_mortages: 'db_1,db_2,db_3,db_4,db_5,db_6,db_7',
    last_combined_cdos: '',
  },
  {
    cdo_id: 'WKN_5',
    current_owner: 'Sparkasse',
    name: 'Best Value 5',
    avg_interest: 2,
    created: '1.1.2018',
    expires: '2025',
    total_rating: 'AA',
    cdo_volume: 3000000,
    included_mortages: 'db_1,db_2,db_3,db_4,db_5,db_6,db_7',
    last_combined_cdos: 'WKN_3, WKN_2, WKN_1',
  },
  {
    cdo_id: 'WKN_6',
    current_owner: 'Sparkasse',
    name: 'Best Value 6',
    avg_interest: 2,
    created: '1.1.2018',
    expires: '2025',
    total_rating: 'AA',
    cdo_volume: 3000000,
    included_mortages: 'db_1,db_2,db_3,db_4,db_5,db_6,db_7',
    last_combined_cdos: '',
  },
  {
    cdo_id: 'WKN_7',
    current_owner: 'Sparkasse',
    name: 'Best Value 7',
    avg_interest: 2,
    created: '1.1.2018',
    expires: '2025',
    total_rating: 'AA',
    cdo_volume: 3000000,
    included_mortages: 'db_1,db_2,db_3,db_4,db_5,db_6,db_7',
    last_combined_cdos: 'WKN_5, WKN_6',
  },
  {
    cdo_id: 'WKN_8',
    current_owner: 'Sparkasse',
    name: 'Best Value 8',
    avg_interest: 2,
    created: '1.1.2018',
    expires: '2025',
    total_rating: 'AA',
    cdo_volume: 3000000,
    included_mortages: 'db_1,db_2,db_3,db_4,db_5,db_6,db_7',
    last_combined_cdos: 'WKN_4, WKN_7',
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
  sampleData: any =
  [
      { Country: 'China', Volume: 13470, Percent: 19.18 },
      { Country: 'India', Volume: 121018, Percent: 17.22 },
      { Country: 'USA', Volume: 313910, Percent: 4.47 },
      { Country: 'Indonesia', Volume: 237626, Percent: 3.38 },
      { Country: 'Brazil', Volume: 192396, Percent: 2.74 }
  ];

  sampleData2: any =
  [
      { Country: 'China', Volume: 7, Percent: 19.18 },
      { Country: 'India', Volume: 9, Percent: 17.22 },
      { Country: 'USA', Volume: 4, Percent: 4.47 },
      { Country: 'Indonesia', Volume: 24, Percent: 3.38 },
      { Country: 'Brazil', Volume: 44, Percent: 2.74 }
  ];

 
 
    seriesGroups: any[] =
    [
        {
            type: 'pie',
            showLabels: true,
            series: [
                { dataField: 'Volume',
                 displayText: 'Volume in $',
                 labelRadius: 120,
                 initialAngle: 15,
                 radius: 100,
                 centerOffset: 0, 
                 formatFunction: (value: any) => {
                  if (isNaN(value))
                      return value;
                  return parseFloat(value) + '%';
              },
                }]
        }
    ];
  displayedColumns = [
    'cdoID',
    'cdoName',
    'owner',
    'rating',
    'start',
    'runtime',
    'mortgages'
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
    this.data.getCdos().subscribe((res: any[]) => {

      this.cdos = res;

      this.cdos.forEach(cdo => {
        var mortgageString = "";
        cdo.mortgages.forEach(element => {
          if (mortgageString === "") {
            mortgageString = element.mortgageID;
          } else {
            mortgageString = mortgageString + ", " + element.mortgageID
          }
        });
        cdo.mortgagesIDs = mortgageString;
      });
      
      this.dataSource = new MatTableDataSource(this.cdos);
    });
  }


}

