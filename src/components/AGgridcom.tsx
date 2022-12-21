'use strict';

import React, { useCallback, useMemo, useRef, useState } from 'react';
import { render } from 'react-dom';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-enterprise';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import {
  CellKeyDownEvent,
  CellKeyPressEvent,
  ColDef,
  ColGroupDef,
  Grid,
  GridOptions,
  GridReadyEvent,
  SideBarDef,
} from 'ag-grid-community';
import { IOlympicData } from './interfaces';

export const AGgridcom = () => {
  const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
  const gridStyle = useMemo(() => ({ height: '100vh', width: '100wh' }), []);
  const [rowData, setRowData] = useState<IOlympicData[]>();
  const [columnDefs, setColumnDefs] = useState<ColDef[]>([
    { field: 'athlete',width: 150 ,filter:true},
    { field: 'age',width: 130 },
    { field: 'country',width: 130 },
    { field: 'year',width: 130 },
    { field: 'date',width: 130 },
    { field: 'sport',width: 130 },
    { field: 'gold',width: 130 },
    { field: 'silver',width: 130 },
    { field: 'bronze',width: 130 },
    { field: 'total',width: 130 },
  ]);


  const onGridReady = useCallback((params: GridReadyEvent) => {
    fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
      .then((resp) => resp.json())
      .then((data: IOlympicData[]) => setRowData(data));
  }, []);

  return (
    <div style={containerStyle}>
      <div style={gridStyle} className="ag-theme-alpine">
        <AgGridReact<IOlympicData>
          rowData={rowData}
          columnDefs={columnDefs}
          sideBar={true}
          onGridReady={onGridReady}
        ></AgGridReact>
      </div>
    </div>
  );
};

