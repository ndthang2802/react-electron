class ClientApiCall{
    async getClientInfoByPhone(phone){
        let res = await fetch(`https://fake-api-nnn.herokuapp.com/api/clients?phoneNo=${phone}`)
        return await res.json()
    }
    async getClientInfoById(id){
        let res = await fetch(`https://fake-api-nnn.herokuapp.com/api/clients?id=${id}`)
        return await res.json()
    }
}

export default new ClientApiCall()