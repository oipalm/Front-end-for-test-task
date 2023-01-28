import axios from 'axios';
import AuthParam from './AuthParam';

class Nomenclatures {
    constructor(props){this.props = props;}

    getNomenclatures() {
        const url = `${AuthParam.url}/api/v1/nomenclatures/`;
        return axios.get(url, {headers: {Authorization: AuthParam.token}}).then(response => response.data);
    }

    getNomenclaturesById(id) {
        const url = `${AuthParam.url}/api/v1/nomenclatures/${id}/`;
        return axios.get(url, {headers: {Authorization: AuthParam.token}}).then(response => response.data);
    }

    getNomenclaturesByURL(link) {
		const url = `${AuthParam.url}/api/v1/nomenclatures/${link}`;
		return axios.get(url, {headers: {Authorization: AuthParam.token }}).then(response => response.data);
	}
}

export default Nomenclatures;