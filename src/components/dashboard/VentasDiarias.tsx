import React, { useEffect, useState } from 'react';
import {Chart} from 'primereact/chart';
import { VentasDiarias } from '../../interfaces/ventas.diarias';
import axios from 'axios';
import { getLightTheme } from '../../helpers/chart.theme';



const VentasDiariasComponent = ()=>{
    const [data,setData] = useState<VentasDiarias[]>();
    const [dates,setDates] = useState<Date[]>();
    const [ventas,setVentas] = useState<number[]>();

    const fetchData = async(dateparam1 = 'null', dateparam2 = 'null')=>{
        axios.get(`http://localhost:8000/api/dashboard/ventas-diarias?dateparam1=${dateparam1}&dateparam2=${dateparam2}`).then(resp=>{
            if(resp.data.data){
                setData(resp.data.data);
                setDates(resp.data.data.flatMap((d:any)=>d.fecha));
                setVentas(resp.data.data.flatMap((d:any)=>(d.total_ventas)));
            }
        }).catch(e=>{
            console.log(e);
        })
    }

    useEffect(()=>{
        fetchData();
    },[])


    const basicData = {
        labels: dates,
        datasets: [
            {
                label: 'Total en ventas',
                data: ventas,
                fill: false,
                borderColor: '#7A16BD'
            },
        ]
    };

    const {basicOptions} = getLightTheme(1);
    return(
        <div className="p-grid">
            <div className="p-col-12">
                <Chart type="line" data={basicData} options={basicOptions} />
            </div>
        </div>
    )
}

export default VentasDiariasComponent;