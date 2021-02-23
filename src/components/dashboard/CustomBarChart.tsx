import React from 'react';
import { Chart } from 'primereact/chart';
import { getLightTheme } from '../../helpers/chart.theme';

interface Props {
    labels: {
        x: any,
        y: any
    };
    type: string;
    title: string;
}

interface DATASET {
    label: any,
    data: any,
    fill: boolean,
    backgroundColor?: any;   
    borderColor?:any;
}

const CustomBarChart: React.FC<Props> = ({ type, labels, title }) => {
    let datasets: DATASET = {
        label: title,
        data: labels.y,
        fill: false,
    };
    if(type == "line"){
        datasets.borderColor = "#7A16BD"
    }else{
        datasets.backgroundColor = "#7A16BD"
    }
    

    const basicData = {
        labels: labels.x,
        datasets: [datasets]
    };

    const { basicOptions } = getLightTheme();
    return (
        <div className="p-grid">
            <div className="p-col-12">
                <Chart type={type} data={basicData} options={basicOptions} />
            </div>
        </div>
    )
}

export default CustomBarChart;