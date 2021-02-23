import React, { useRef } from 'react';
import { Calendar } from 'primereact/calendar';
import { SelectButton } from 'primereact/selectbutton';
import { useState } from 'react';
import { DATEOPTIONS, dateOptions } from '../../helpers/date.options';


import '../../App.css';
import 'primeflex/primeflex.css';

interface Props{
    handleDateChange: Function;
}

const DateParams:React.FC<Props> = ({handleDateChange}) => {
    const [date1, setDate1] = useState<Date | Date[]>();
    const [selectButton, setSelectButton] = useState<DATEOPTIONS>();
    const [isDisabled, setIsDisabled] = useState(false);
    const ref = useRef<Calendar>(null)


    const setCurrentDate = <T extends Date | Date[] | DATEOPTIONS>(data:T,caso:number) =>{
        if(data){
            if(caso == 0){  
                setIsDisabled(false);        
                setDate1(data as Date | Date[]); 
                setSelectButton(undefined); 
                handleDateChange(data as Date | Date[]); 
            }else{ 
                setIsDisabled(true);
                setSelectButton(data as DATEOPTIONS); 
                setDate1((data as DATEOPTIONS).value); 
                handleDateChange((data as DATEOPTIONS).value);
            }
        }else{
            setSelectButton(undefined);
            
            setIsDisabled(false)
        }
    }

    return (
        <div className="p-grid">
            <div className="p-col-12 dateparam">
                <Calendar
                    ref={ref}
                    keepInvalid
                    value={date1}
                    onChange={(e) => setCurrentDate(e.value, 0)}
                    showIcon
                    placeholder="Rango de fecha"
                    selectionMode="range"
                    disabled={isDisabled}
                     />
                <SelectButton
                    
                    value={selectButton}
                    options={dateOptions}
                    onChange={(e) => setCurrentDate(e.value as DATEOPTIONS,1)}
                    optionLabel="name" />
            </div>
        </div>
    )
}

export default DateParams;