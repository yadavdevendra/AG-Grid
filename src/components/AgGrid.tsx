import React, { useMemo } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { ColDef } from 'ag-grid-community';

interface ICar {
    id: number,
    make: string;
    model: string;
    price: number;
    location: string
}



export const AgGrid = () => {
    var data: ICar[] = [
        { id: 1, make: 'Toyota', model: 'Celica', price: 35000, location: "PUN" },
        { id: 2, make: 'Ford', model: 'Mondeo', price: 32000, location: "USA" },
        { id: 3, make: 'Porsche', model: 'Boxster', price: 72000, location: "PNP" },
        { id: 4, make: 'BMW', model: 'M50', price: 60000, location: "IND" },
        { id: 5, make: 'Aston Martin', model: 'DBX', price: 190000, location: "SMS" },
    ];

    const columnDefs = [
        { field: 'id', filter: true, },
        { field: 'make', filter: true, },
        { field: 'model', filter: true, },
        { field: 'price', filter: true, },
        { field: 'location', filter: true, },
    ];

    const defaultColDef = useMemo<ColDef>(() => {
        return {
            editable: true,
            sortable: true,
            filter: true,
            resizable: true,
        };
    }, []);

    return (

        <div className="ag-theme-alpine" style={{ width: 1350, height: 500}}>
            <AgGridReact<ICar>
                rowData={data}
                columnDefs={columnDefs}
                defaultColDef={defaultColDef}

            ></AgGridReact>
        </div>


    );
};