import React, { useCallback, useMemo, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { ColDef, GridReadyEvent, } from 'ag-grid-community';
import { IOlympicData } from './interfaces';


function dateComparator(date1: string, date2: string) {
    const date1Number = monthToComparableNumber(date1);
    const date2Number = monthToComparableNumber(date2);
    if (date1Number === null && date2Number === null) {
        return 0;
    }
    if (date1Number === null) {
        return -1;
    }
    if (date2Number === null) {
        return 1;
    }
    return date1Number - date2Number;
}

// eg 29/08/2004 gets converted to 20040829
function monthToComparableNumber(date: string) {
    if (date === undefined || date === null || date.length !== 10) {
        return null;
    }
    const yearNumber = Number.parseInt(date.substring(6, 10));
    const monthNumber = Number.parseInt(date.substring(3, 5));
    const dayNumber = Number.parseInt(date.substring(0, 2));
    return yearNumber * 10000 + monthNumber * 100 + dayNumber;
}

export const AGgrid3 = () => {
    const [rowData, setRowData] = useState<IOlympicData[]>();
    const [columnDefs, setColumnDefs] = useState<ColDef[]>([
        { field: 'athlete',width: 150, sort: 'desc', checkboxSelection: true },
        { field: 'age', width: 100 },
        { field: 'country',width: 130, },
        { field: 'year', width: 130, unSortIcon: true },
        { field: 'date',width: 130, comparator: dateComparator },
        { field: 'sport',width: 130, },
        { field: 'gold',width: 130, },
        { field: 'silver',width: 130, },
        { field: 'bronze',width: 130, },
        { field: 'total',width: 130, },
    ]);
    const defaultColDef = useMemo<ColDef>(() => {
        return {
          editable: true,
          sortable: true,
          filter: true,
          resizable: true,
        };
      }, []);
      const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
      const gridStyle = useMemo(() => ({ height: "100vh", width: "100vw" }), []);

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
            defaultColDef={defaultColDef}
            sideBar={true}
            onGridReady={onGridReady}
          ></AgGridReact>
        </div>
      </div>

    );
};