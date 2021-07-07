import Cookies from 'js-cookie'
import {getCookie} from '../components/function/getCookie'
class AuthApiCall{
    async getToken(data){
        return  await fetch('http://127.0.0.1:8000/api/token/',{   // server
            method : 'POST',
            credentials:'include',
            headers : {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(data)
        })
    }

    async refreshToken(){
        const res =  await fetch('http://127.0.0.1:8000/api/refresh_token/',{   // server
        method : 'POST',
        credentials:'include',
        headers : {
            "X-CSRFToken": Cookies.get("csrftoken"),
            'Content-Type' : 'application/json',
        }
        }).then(data=>data.json())
        document.cookie = `access_token=${res['access_token']};SameSite=None;Secure;`

    }

    async getStaffInfo(){
        var token = 'Token ' + getCookie('access_token')
        var res = await fetch('http://127.0.0.1:8000/api/staff/',{
            headers:{
                'Authorization': token,
                'Content-Type':'application/json',
            }
        }) 
        if (res.status === 403){
            await this.refreshToken()
            return this.getStaffInfo()
        }
        if (res.status === 200){
            res = await res.json()
            return res
        }
    }

    async logOut(){
        var token = 'Token ' + getCookie('access_token')
        var res = await fetch("http://127.0.0.1:8000/api/logout/", {
              method: "POST",
              credentials: 'include',
              headers: {
                "X-CSRFToken": Cookies.get("csrftoken"),
                'Authorization': token,
                "Content-Type": "application/json",
              }
            })
        if (res.status === 403){
            await this.refreshToken()
            return this.logOut()
        }
        if (res.status === 200){
            document.cookie = `access_token=;Max-Age=0;SameSite=None;Secure;`
            window.location.reload();
        }
    }

}

export default new AuthApiCall()

