import {getCookie} from '../components/function/getCookie'
import AuthApiCall from './auth.api'
class RoomApiCall{
    getAllEmptyRoom(){
        return fetch('https://fake-api-nnn.herokuapp.com/api/rooms?category=East').then(data=>data.json()) // http://127.0.0.1:8000/api/availablerooms/
    }
    async getAllAvailableRooms(){
        var token = 'Token ' + getCookie('access_token')
        var res =  await fetch(`http://127.0.0.1:8000/api/availablerooms/`,{
            headers:{
                'Authorization': token,
                'Content-Type':'application/json',
            }
        })
         
        if (res.status === 403){
            await AuthApiCall.refreshToken()
            return this.getAllAvailableRooms()
        }
        if (res.status === 200){
            res = await res.json()
            return res
        }
    }
    getRoomById(id){
        return fetch(`http://127.0.0.1:8000/api/room/${id}/`,{
            headers:{
                'Content-Type':'application/json',
            }
        }).then(data=>data.json())
    }
}
export default new RoomApiCall()