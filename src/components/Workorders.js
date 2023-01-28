import axios from 'axios';
const API_URL = 'http://127.0.0.1:8000';

const AuthID = 'Token b74ffede0fa251a2c446bdf7cfa35e40308139e4';

class Workorders {
    constructor(props){this.props = props;}

    getOrders() {
        const url = `${API_URL}/api/v1/workorders/`;
        return axios.get(url, {headers: {Authorization: AuthID}}).then(response => response.data);
    }

    getOrderById(id) {
        const url = `${API_URL}/api/v1/workorders/${id}/`;
        return axios.get(url, {headers: {Authorization: AuthID}}).then(response => response.data);
    }

    getOrdersByURL(link) {
		const url = `${API_URL}/api/v1/workorders/${link}`;
		return axios.get(url, {headers: {Authorization: AuthID}}).then(response => response.data);
	}

    getOnSearch(search) {
        const url = `${API_URL}/api/v1/workorders/?search=${search}`;
        return axios.get(url, {headers: {Authorization: AuthID}}).then(response => response.data);
    }

    getOrderByFilter(param) {
        const url = `${API_URL}/api/v1/workorders/?ordering=${param}`;
        return axios.get(url, {headers: {Authorization: AuthID}}).then(response => response.data);
    }

    createOrder(order) {
        const url = `${API_URL}/api/v1/workorders/`;
        return axios.post(url, order, {headers: {Authorization: AuthID,  "Content-Type": "application/json"}});
    }

    updateOrder(order) {
        const url = `${API_URL}/api/v1/workorders/${order.id}/`;
        return axios.put(url, order, {headers: {Authorization: AuthID,  "Content-Type": "application/json"}});
    }

    getProducts(id) {
        const url = `${API_URL}/api/v1/workorders/${id}/products/`;
        return axios.get(url, {headers: {Authorization: AuthID}}).then(response => response.data);
    }

    postProducts(id, data) {
        const url = `${API_URL}/api/v1/workorders/${id}/products/`;
        console.log(data);
        return axios.post(url, data.data, {headers: {Authorization: AuthID,  "Content-Type": "application/json"}});
    }
    
}

export default Workorders;