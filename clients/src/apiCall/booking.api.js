import {getCookie} from '../components/function/getCookie'
import AuthApiCall from './auth.api'
import Cookies from 'js-cookie'
class BookingApiCall{
    async getAll(){
        var token = 'Token ' + getCookie('access_token')
        var res = await fetch('http://127.0.0.1:8000/api/renderbooking/',{
            headers:{
                'Authorization': token,
                'Content-Type':'application/json',
            }
        }) 
        if (res.status === 403){
            await AuthApiCall.refreshToken()
            return this.getAll()
        }
        if (res.status === 200){
            res = await res.json()
            return res
        }
    }
    async addBooking(data){
        var token = 'Token ' + getCookie('access_token')
        var res = await fetch("http://127.0.0.1:8000/api/room_rental/", {
              method: "POST",
              credentials: 'include',
              headers: {
                "X-CSRFToken": Cookies.get("csrftoken"),
                'Authorization': token,
                "Content-Type": "application/json",
              },
              body: JSON.stringify(data),

            })
        if (res.status === 403){
            await AuthApiCall.refreshToken()
            return this.addBooking(data)
        }
        else
            return res 
    }
    async EditBooking(data){
        var token = 'Token ' + getCookie('access_token')
        var res = await fetch("http://127.0.0.1:8000/api/room_rental/", {
              method: "PATCH",
              credentials: 'include',
              headers: {
                "X-CSRFToken": Cookies.get("csrftoken"),
                'Authorization': token,
                "Content-Type": "application/json",
              },
              body: JSON.stringify(data),

            })
        if (res.status === 403){
            await AuthApiCall.refreshToken()
            return this.EditBooking(data)
        }
        else
            return res 
    }
}
export default new BookingApiCall()