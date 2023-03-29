import React, { useState, useRef, useEffect, useMemo, useCallback} from 'react';
import { render } from 'react-dom';
import { AgGridReact } from 'ag-grid-react'; // the AG Grid React Component
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import Paper from "@material-ui/core/Paper";
import '../../layout/layout.css';


const PortfolioData = (props) => {
    const gridRef = useRef(); // Optional - for accessing Grid's API
    const [rowData, setRowData] = useState(); // Set rowData to Array of Objects, one Object per Row
    
    // Each Column Definition results in one Column.
    const [columnDefs, setColumnDefs] = useState([
      {field: 'Symbol', filter: true, headerName: 'Symbol'},
      {field: 'Name', filter: true, headerName: 'Name'},
      {field: 'Sector', filter: true, headerName: 'Sector'},
      {field: 'CurrentPrice', filter: true, headerName: 'Current Price'},  
      {field: 'ClosedPrice', filter: true, headerName: 'Close Price'},
      {field: 'Country', filter: true, headerName: 'Country'},
      {field: 'MarketCap', filter: true, headerName: 'Market Cap'},      
      {field: 'Weightage', filter: true, headerName: 'Weightage'},      
      {field: 'ptotalEsg', filter: true, headerName: 'Total Esg Score'},
    ]);

    // DefaultColDef sets props common to all Columns
    const defaultColDef = useMemo( ()=> ({
        sortable: true
      }));
   
      
    // load data from sever
    useEffect(() => {
      fetch('http://localhost:5000/get_portfolio')
      .then(result => result.json())      
      .then(rowData => setRowData(rowData) )
      //.then ( alert ("Fetch"))
    }, [props.ticker]);
   
   
    return (
      
      <Paper >        
        
        <div className="ag-theme-alpine">   
          {/* On div wrapping Grid a) specify theme CSS Class Class and b) sets Grid size */}
          <div className="ag-theme-alpine" style={{height: '76vh'}}>        
            <AgGridReact
                ref={gridRef} // Ref for accessing Grid's API
    
                rowData={rowData} // Row Data for Rows
    
                columnDefs={columnDefs} // Column Defs for Columns
                defaultColDef={defaultColDef} // Default Column Properties
    
                animateRows={true} // Optional - set to 'true' to have rows animate when sorted
                rowSelection='multiple' // Options - allows click selection of rows               
                />
          </div>
        </div>
        
      </Paper>
    );
   };
   
   export default PortfolioData;