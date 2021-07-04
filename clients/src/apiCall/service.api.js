import {getCookie} from '../components/function/getCookie'
import AuthApiCall from './auth.api'
import Cookies from 'js-cookie'
class ServiceApiCall{
    
    async getRender(){
        var token = 'Token ' + getCookie('access_token')
        var res = await fetch('http://127.0.0.1:8000/api/renderservice/',{
            headers:{
                'Authorization': token,
                'Content-Type':'application/json',
            }
        }) 
        if (res.status === 403){
            await AuthApiCall.refreshToken()
            return this.getRender()
        }
        if (res.status === 200){
            res = await res.json()
            return res
        }
        
    }

}
export default new ServiceApiCall()