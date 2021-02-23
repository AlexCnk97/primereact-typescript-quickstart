import React, { useState, useEffect, useRef, ChangeEvent, ReactNode } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { PageState, Paginator } from 'primereact/paginator';
import { InputText } from 'primereact/inputtext';
import './DataTableDemo.css';
import axios from 'axios';
import { ProductosVendidos } from '../../interfaces/productos.vendidos';


interface Props{
    params:{param1:string, param2:string};
}

const DataTableFilterDemo:React.FC<Props> = ({params}) => {
    const [data, setData] = useState<ProductosVendidos[]>([
        {
            fecha: (new Date),
            nombre: "",
            precio:0,
            precio_oferta:0,
            totalrows:10,
            unidades_vendidas:0,
            url:"",
            valor_venta:0
        }
    ])
    const [searchbox, setSearchbox] = useState("");
    const [first, setFirst] = useState(0);
    const [rows, setRows] = useState(10);
    const [totalrws, setTotalrws] = useState<number>(10);

    const fetchData = async (search: string | null, limit = 10, offset = 1) => {
        axios.get(`http://18.223.186.183:8000/api/dashboard/productos-vendidos?dateparam1=${params.param1}&dateparam2=${params.param2}&searchbox=${search}&limit=${limit}&offset=${offset}`).then(resp => {
            if (resp.data.data)
                setData(resp.data.data);
                setTotalrws(resp.data.data[0].totalrows)
        }).catch(e => {
            console.error(e);
        })
    }


    const buscar = (valor: ChangeEvent<HTMLInputElement>) => {
        fetchData(valor.target.value);
    }


    useEffect(() => {
        fetchData("");
    }, [params])


    const header = (
        <div className="table-header">
            Productos vendidos
            <InputText placeholder="Buscar producto" onChange={buscar} />
        </div>
    );



    const onPageChange = (event: PageState) => {
        setFirst(event.first);
        fetchData('', event.rows, (event.page + 1));
        setRows(event.rows);
    }


    const footer = <Paginator first={first} rows={rows} totalRecords={totalrws} rowsPerPageOptions={[10, 20, 30]} onPageChange={onPageChange}></Paginator>;
    return (
        <div className="p-grid">
            <div className="p-col-12">
                <div className="datatable-responsive-demo">
                    <div className="card">
                        <DataTable
                            value={data}
                            loading={!data}
                            header={header}
                            footer={footer}
                            resizableColumns
                            columnResizeMode="fit"
                            className="p-datatable-responsive-demo">
                            <Column field="nombre" body={(row: ProductosVendidos) => {
                                return (
                                    <React.Fragment>
                                        <p><a href={row.url} target="_blank">{row.nombre}</a></p>
                                    </React.Fragment>
                                )
                            }} header="Nombre de producto" style={{width:'60%'}} />
                            <Column field="precio" header="Precio de producto" style={{width:'10%'}} />
                            <Column field="precio_oferta" header="Precio oferta" style={{width:'10%'}} />
                            <Column field="unidades_vendidas" header="Unidades vendidas" style={{width:'10%'}} />
                            <Column field="valor_venta" header="Valor de venta" style={{width:'10%'}} />
                        </DataTable>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DataTableFilterDemo;