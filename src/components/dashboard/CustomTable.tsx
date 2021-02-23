import React, { ChangeEvent, FormEvent, useState } from 'react';
import {DataTable} from 'primereact/datatable';
import { InputText } from 'primereact/inputtext';
import { PageState, Paginator } from 'primereact/paginator';
import './DataTableDemo.css';

interface Props{
    title:string;
    searchPlaceholder:string;
    onSearch(e:ChangeEvent<HTMLInputElement>): void;
    totalRecords:number;
    data:any;
    onPaginatorChange(event:PageState):void;
}

const CustomTable:React.FC<Props> = ({children,data,onSearch,searchPlaceholder,title,totalRecords,onPaginatorChange})=>{
    const [first, setFirst] = useState(1);
    const [rows, setRows] = useState(10);

    const onPageChange = (event: PageState) => {
        setFirst(event.first);
        setRows(event.rows);
        onPaginatorChange(event);
    }

    const buscar = (valor: ChangeEvent<HTMLInputElement>) => {
        onSearch(valor);
    }

    const header = (
        <div className="table-header">
            {title}
            <InputText placeholder={searchPlaceholder} onChange={buscar} />
        </div>
    );
    const footer = <Paginator first={first} rows={rows} totalRecords={totalRecords} rowsPerPageOptions={[10, 20, 30]} onPageChange={onPageChange}></Paginator>;
    return(
        <div className="p-grid">
            <div className="p-col-12 datatable-responsive-demo">
            <DataTable
                            value={data}
                            loading={!data}
                            header={header}
                            footer={footer}
                            resizableColumns
                            columnResizeMode="fit"
                            className="p-datatable-responsive-demo">
                            {children}
                        </DataTable>
            </div>
        </div>
    )
}

export default CustomTable;