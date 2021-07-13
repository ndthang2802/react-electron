import {getCookie} from '../components/function/getCookie'
const electron = window.require("electron")

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
        var csrf = await getCookie("csrftoken")
        const res =  await fetch('http://127.0.0.1:8000/api/refresh_token/',{   // server
        method : 'POST',
        credentials:'include',
        headers : {
            "X-CSRFToken": csrf,
            'Content-Type' : 'application/json',
        }
        }).then(data=>data.json())
        const cookieJar = electron.remote.session.defaultSession.cookies;
        var cookie = {url:'http:localhost',name : 'access_token' , value : res['access_token'] }
        cookieJar.set(cookie)
    }

    async getStaffInfo(){
        var token = 'Token ' + await getCookie('access_token')
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
        var token = 'Token ' + await getCookie('access_token')
        var res = await fetch("http://127.0.0.1:8000/api/logout/", {
              method: "POST",
              credentials: 'include',
              headers: {
                "X-CSRFToken": await getCookie("csrftoken"),
                'Authorization': token,
                "Content-Type": "application/json",
              }
            })
        if (res.status === 403){
            await this.refreshToken()
            return this.logOut()
        }
        if (res.status === 200){
            const cookieJar = electron.remote.session.defaultSession.cookies;
            var cookie = {url:'http:localhost',name : 'access_token' , value : '',expired : 0 }
            cookieJar.set(cookie)
            electron.remote.getCurrentWindow().reload()
        }
    }

}

export default new AuthApiCall()

