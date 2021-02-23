export const CALCULATED_DATE = 24 * 60 * 60 * 1000;

export interface DATEOPTIONS{
    name:string;
    value:Date | Date[];
}

export const dateOptions: DATEOPTIONS[] = [
    { name: 'Hoy', value: [new Date(Date.now())]},
    { name: 'Últimos 7 días', value: [new Date(Date.now() - 7 * CALCULATED_DATE), new Date(Date.now()) ]},
    { name: 'Últimos 15 días', value: [new Date(Date.now() - 15 * CALCULATED_DATE), new Date(Date.now()) ] },
    { name: 'Hace un mes', value: [new Date(Date.now() - 31 * CALCULATED_DATE), new Date(Date.now()) ] }
];