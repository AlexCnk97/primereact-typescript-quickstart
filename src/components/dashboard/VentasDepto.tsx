import React, { useEffect, useState } from 'react';
import {Chart} from 'primereact/chart';
import { getLightTheme } from '../../helpers/chart.theme';
import { VentasDepto } from '../../interfaces/ventas.depto';
import axios from 'axios';


const VentasDeptoComponent = ()=>{
    const [data, setData] = useState<VentasDepto[]>([{
        departamento: "",
        total_ventas: 0,
    }])
    const [months,setMonths] = useState<string[]>();
    const [ventas,setVentas] = useState<number[]>();

    const fetchData = async(dateparam1 = 'null', dateparam2 = 'null')=>{
        axios.get(`http://localhost:8000/api/dashboard/ventas-depto?dateparam1=${dateparam1}&dateparam2=${dateparam2}`).then(resp=>{
            if(resp.data.data){
                console.log(resp.data.data)
                setData(resp.data.data);
                setMonths(resp.data.data.flatMap((d:any)=>d.departamento));
                setVentas(resp.data.data.flatMap((d:any)=>d.total_ventas));
            }
        }).catch(e=>{
            console.log(e);
        })
    }

    useEffect(()=>{
        fetchData();
    },[])

    const basicData = {
        labels: months,
        datasets: [
            {
                label: 'Ventas por departamentos',
                data: ventas,
                fill: false,
                backgroundColor: '#7A16BD'
            },
        ]
    };

    const {basicOptions} = getLightTheme();
    return(
        <div className="p-grid">
            <div className="p-col-12">
                <Chart type="bar" data={basicData} options={basicOptions}/>
            </div>
        </div>
    )
}

export default VentasDeptoComponent;