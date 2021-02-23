import React, { ChangeEvent, useEffect, useState } from 'react';
import HeaderDash from '../components/dashboard/header';

import 'primereact/resources/primereact.min.css';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import '../App.css';
import DateParams from '../components/dashboard/DateParam';
import DataTableFilterDemo from '../components/dashboard/ProductosVendidosTable';
import { ApiService } from '../services/ApiService';
import { VentasDiarias } from '../interfaces/ventas.diarias';
import CustomBarChart from '../components/dashboard/CustomBarChart';
import { ProductosMasVendidos, ProductosMayorMargen } from '../interfaces/productos.mas.vendidos';
import { VentasDepto } from '../interfaces/ventas.depto';
import CustomTable from '../components/dashboard/CustomTable';
import { ProductosVendidos } from '../interfaces/productos.vendidos';
import { PageState } from 'primereact/paginator';
import { Column } from 'primereact/column';
import { Message } from 'primereact/message';
import { DataTable } from 'primereact/datatable';









const DashboardMain: React.FC = () => {
    const [rwsTb1, setRwsTb1] = useState(10);
    const [productosMasVendidos, setProductosMasVendidos] = useState<ProductosMasVendidos[]>();
    const [mayorMargen, setMayorMargen] = useState<ProductosMayorMargen[]>();
    const [ventasDepto, setVentasDepto] = useState<VentasDepto[]>();
    const [ventasDiarias, setVentasDiarias] = useState<VentasDiarias[]>();
    const [prodVendidosTbl, setProdVendidosTbl] = useState<ProductosVendidos[]>([
        {
            fecha: (new Date),
            nombre: "",
            precio: 0,
            precio_oferta: 0,
            totalrows: 10,
            unidades_vendidas: 0,
            url: "",
            valor_venta: 0
        }
    ]);
    const [params,setParams] = useState({param1:'null',param2: 'null'});



    const fetchData = async (param1 = 'null', param2 = 'null') => {
        const promises = [];
        let promise1 = ApiService.getDashboardChart("productos-mas-vendidos", param1, param2);
        let promise2 = ApiService.getDashboardChart("productos-mayor-margen", param1, param2);
        let promise3 = ApiService.getDashboardChart("ventas-depto", param1, param2);
        let promise4 = ApiService.getDashboardChart("ventas-diarias", param1, param2);
        let promise5 = ApiService.getDashboardTable("productos-vendidos", param1, param2);
        promises.push(promise1);
        promises.push(promise2);
        promises.push(promise3);
        promises.push(promise4);
        promises.push(promise5);
        Promise.all(promises).then(resp => {
            setProductosMasVendidos(resp[0] as ProductosMasVendidos[]);
            setMayorMargen(resp[1] as ProductosMayorMargen[]);
            setVentasDepto(resp[2] as VentasDepto[]);
            setVentasDiarias(resp[3] as VentasDiarias[]);
            setProdVendidosTbl(resp[4] as ProductosVendidos[]);
            if (resp[4][0]) {
                setRwsTb1(resp[4][0].totalrows);
            }
        });
    }

    const handleDateChange = (dates: Date[]) => {
        if (dates) {
            let param1 = dates[0].toISOString().split('T')[0];

            let param2 = dates[1] ? dates[1].toISOString().split('T')[0] : new Date().toISOString().split('T')[0];
            console.log(param1, param2);
            fetchData(param1, param2);
            setParams({param1: param1, param2: param2});
        }
    }

    const onPageTableChange = async (event: PageState) => {
        let results = await ApiService.getDashboardTable("productos-vendidos", 'null', 'null', "", event.rows.toString(), (event.page + 1).toString());
        setProdVendidosTbl(results as ProductosVendidos[]);
    }

    const onSearchTable = async (event: ChangeEvent<HTMLInputElement>) => {
        let results = await ApiService.getDashboardTable("productos-vendidos", 'null', 'null', event.currentTarget.value);
        setProdVendidosTbl(results as ProductosVendidos[]);
    }

    useEffect(() => {
        fetchData();
    }, [])

    return (
        <div className="main">
            <div className="container">
                <HeaderDash title="Ventas" />
                {ventasDiarias && ventasDiarias.length>0 ? (
                    <div>
                        <DateParams handleDateChange={handleDateChange} />
                        <div className="p-grid">
                            <div className="p-col-12">
                                <CustomBarChart
                                    labels={{ x: ventasDiarias?.flatMap(x => x.fecha), y: ventasDiarias?.flatMap(x => x.total_ventas) }}
                                    title="Total de ventas"
                                    type="line"
                                />
                            </div>
                        </div>
                        <div className="p-grid">
                            <div className="p-col-12">
                                <CustomBarChart
                                    labels={{ x: ventasDepto?.flatMap(x => x.departamento), y: ventasDepto?.flatMap(x => x.total_ventas) }}
                                    title="Ventas por departamento"
                                    type="bar"
                                />
                            </div>
                        </div>
                        <br /><br />
                        <div className="p-grid">
                            <div className="p-lg-6 p-md-12">
                                <CustomBarChart
                                    labels={{ x: productosMasVendidos?.flatMap(x => x.product_name), y: productosMasVendidos?.flatMap(x => x.total_unidades_vendidas) }}
                                    title="Productos mas vendidos"
                                    type="bar"
                                />
                            </div>
                            <div className="p-lg-6 p-md-12">
                                <CustomBarChart
                                    labels={{ x: mayorMargen?.flatMap(x => x.product_name), y: mayorMargen?.flatMap(x => x.total_ventas) }}
                                    title="Productos con mayor margen"
                                    type="bar"
                                />
                            </div>
                        </div>
                        <br /><br />
                        <DataTableFilterDemo params={params}/>
                        {/* <CustomTable
                            data={prodVendidosTbl}
                            title="Productos Vendidos"
                            searchPlaceholder="Buscar productos"
                            totalRecords={rwsTb1}
                            onPaginatorChange={(e) => onPageTableChange(e)}
                            onSearch={e => onSearchTable(e)} >
                            <Column field="nombre" body={(row: ProductosVendidos) => {
                                return (
                                    <React.Fragment>
                                        <p><a href={row.url} target="_blank">{row.nombre}</a></p>
                                    </React.Fragment>
                                )
                            }} header="Nombre de producto" style={{ width: '60%' }} />
                            <Column field="precio" header="Precio de producto" style={{ width: '10%' }} />
                            <Column field="precio_oferta" header="Precio oferta" style={{ width: '10%' }} />
                            <Column field="unidades_vendidas" header="Unidades vendidas" style={{ width: '10%' }} />
                            <Column field="valor_venta" header="Valor de venta" style={{ width: '10%' }} />
                        </CustomTable> */}
                    </div>
                ) : 
                (<div className="p-d-flex p-jc-center p-ai-center p-flex-column">
                    <br/><br/><br/>
                    <DateParams handleDateChange={handleDateChange} />
                    <br/>
                    <Message severity="info" text="No se encontro ningun dato para ser procesado en esta fecha. " />

                </div>)}

            </div>
        </div>
    )
}

export default DashboardMain;
