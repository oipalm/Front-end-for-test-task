import axios from 'axios';
const API_URL = 'http://127.0.0.1:8000';

const AuthID = 'Token b74ffede0fa251a2c446bdf7cfa35e40308139e4';

class Nomenclatures {
    constructor(props){this.props = props;}

    getNomenclatures() {
        const url = `${API_URL}/api/v1/nomenclatures/`;
        return axios.get(url, {headers: {Authorization: AuthID}}).then(response => response.data);
    }

    getNomenclaturesById(id) {
        const url = `${API_URL}/api/v1/nomenclatures/${id}/`;
        return axios.get(url, {headers: {Authorization: AuthID}}).then(response => response.data);
    }

    getNomenclaturesByURL(link) {
		const url = `${API_URL}/api/v1/nomenclatures/${link}`;
		return axios.get(url, {headers: {Authorization: AuthID }}).then(response => response.data);
	}
}

export default Nomenclatures;