import {getCookie} from '../components/function/getCookie'
import AuthApiCall from './auth.api'
import Cookies from 'js-cookie'

class InvoiceApiCall {
    async getUnpaidBill(phone){
        var token = 'Token ' + getCookie('access_token')
        var res = await fetch('http://127.0.0.1:8000/api/unpaidbill/',{
            method:'POST',
            credentials: 'include',
            headers:{
                'Authorization': token,
                'Content-Type':'application/json',
                "X-CSRFToken": Cookies.get("csrftoken"),
            },
            body: JSON.stringify(phone)
        }) 
        if (res.status === 403){
            await AuthApiCall.refreshToken()
            return this.getUnpaidBill(phone)
        }
        else return res
    }
}

export default new InvoiceApiCall()