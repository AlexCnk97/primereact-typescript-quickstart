import axios from "axios";
import { Interface } from "readline";
import { ChartResponse } from "../interfaces/chart.line";

export class ApiService {
    constructor() { }

    static getDashboardChart(endpoint: string, param1 = 'null', param2 = 'null') {
        return new Promise<any>((resolve, reject) => {
            axios.get(`http://18.223.186.183:8000/api/dashboard/${endpoint}?dateparam1=${param1}&dateparam2=${param2}`).then(resp => {
                if (resp.data.data) {
                    console.log(resp.data.data)
                    resolve(resp.data.data);
                }
            }).catch(e => {
                reject(e);
            })
        })
    }

    static getDashboardTable(endpoint: string, param1 = 'null', param2 = 'null', search = "", limit = '10', offset = '1'){
        return new Promise<any>((resolve, reject) => {
            axios.get(`http://18.223.186.183:8000/api/dashboard/${endpoint}?dateparam1=${param1}&dateparam2=${param2}&searchbox=${search}&limit=${limit}&offset=${offset}`).then(resp => {
                if (resp.data.data) {
                    console.log(resp.data.data)
                    resolve(resp.data.data);
                }
            }).catch(e => {
                reject(e);
            })
        })
    }

}