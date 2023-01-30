import axios from 'axios';
import AuthParam from './AuthParam';

class Workorders {
    constructor(props){this.props = props;}

    getOrders() {
        const url = `${AuthParam.url}/api/v1/workorders/`;
        return axios.get(url, {headers: {Authorization: AuthParam.token}}).then(response => response.data);
    }

    getOrderById(id) {
        const url = `${AuthParam.url}/api/v1/workorders/${id}/`;
        return axios.get(url, {headers: {Authorization: AuthParam.token}}).then(response => response.data);
    }

    getOrdersByURL(link) {
		const url = `${AuthParam.url}/api/v1/workorders/${link}`;
		return axios.get(url, {headers: {Authorization: AuthParam.token}}).then(response => response.data);
	}

    getOnSearch(search) {
        const url = `${AuthParam.url}/api/v1/workorders/?search=${search}`;
        return axios.get(url, {headers: {Authorization: AuthParam.token}}).then(response => response.data);
    }

    getOrderByFilter(param) {
        const url = `${AuthParam.url}/api/v1/workorders/?ordering=${param}`;
        return axios.get(url, {headers: {Authorization: AuthParam.token}}).then(response => response.data);
    }

    createOrder(order) {
        const url = `${AuthParam.url}/api/v1/workorders/`;
        return axios.post(url, order, {headers: {Authorization: AuthParam.token,  "Content-Type": "application/json"}});
    }

    updateOrder(order) {
        const url = `${AuthParam.url}/api/v1/workorders/${order.id}/`;
        return axios.put(url, order, {headers: {Authorization: AuthParam.token,  "Content-Type": "application/json"}});
    }

    getProducts(id) {
        const url = `${AuthParam.url}/api/v1/workorders/${id}/products/`;
        return axios.get(url, {headers: {Authorization: AuthParam.token}}).then(response => response.data);
    }

    postProducts(id, data) {
        const url = `${AuthParam.url}/api/v1/workorders/${id}/products/`;
        //console.log(data);
        return axios.post(url, data, {headers: {Authorization: AuthParam.token,  "Content-Type": "application/json"}}).then(response => response.status).catch(error => error.response.status);
    }
    
}

export default Workorders;