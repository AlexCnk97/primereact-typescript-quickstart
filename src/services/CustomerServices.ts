import axios from 'axios';

export class CustomerService {

    getCustomersSmall() {
        return axios.get('../enviroments/customers-small.json')
                .then(res => res.data.data);
    }

    getCustomersMedium() {
        return axios.get('../enviroments/customers-medium.json')
                .then(res => res.data.data);
    }

    getCustomersLarge() {
        return axios.get('../enviroments/customers-large.json')
                .then(res => res.data.data);
    }

    getCustomersXLarge() {
        return axios.get('../enviroments/customers-xlarge.json')
                .then(res => res.data.data);
    }
}