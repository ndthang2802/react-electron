const axios = require('axios');
const Url = `https://fake-api-nnn.herokuapp.com/api/services`
class ServiceApiCall{
    getbyId = (id)=>{
        return axios.get(`${Url}/${id}`).then(res=>res.data)
    }

    getAll = ()=>{
        return axios.get(`${Url}`).then(res=>res.data)
        
    }
    getServiceTypeInfo = (id)=>{
        return axios.get(`${Url}/${id}/servicetypes`).then(res=>res.data)
    }
    getRoomInfo = (id)=>{
        return axios.get(`${Url}/${id}/rooms`).then(res=>res.data)
    }
    deleteServie = (id)=>{
        return axios.delete(`${Url}/${id}`)
    }
}
export default new ServiceApiCall()