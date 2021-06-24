class ClientApiCall{
    async getClientInfoByPhone(phone){
        phone = phone.slice(0,4) + ' ' + phone.slice(4,8) + ' ' + phone.slice(8,12)
        let res = await fetch(`https://fake-api-nnn.herokuapp.com/api/clients?phoneNo=${phone}`)
        return await res.json()
    }
}

export default new ClientApiCall()