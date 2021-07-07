import {getCookie} from '../components/function/getCookie'
import AuthApiCall from './auth.api'
class RoomApiCall{
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
    async getRoomById(id){
        var token = 'Token ' + getCookie('access_token')
        var res =  await fetch(`http://127.0.0.1:8000/api/room/${id}/`,{
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
    async getRoomRender(){
        var token = 'Token ' + getCookie('access_token')
        var res =  await fetch(`http://127.0.0.1:8000/api/renderroom/`,{
            headers:{
                'Authorization': token,
                'Content-Type':'application/json',
            }
        })
         
        if (res.status === 403){
            await AuthApiCall.refreshToken()
            return this.getRoomRender()
        }
        if (res.status === 200){
            res = await res.json()
            return res
        }
    }
    async getRoomByFloorNumber(floor,number){
        var token = 'Token ' + getCookie('access_token')
        var res =  await fetch(`http://127.0.0.1:8000/api/room/${floor}/${number}/`,{
            headers:{
                'Authorization': token,
                'Content-Type':'application/json',
            }
        })
         
        if (res.status === 403){
            await AuthApiCall.refreshToken()
            return this.getRoomByFloorNumber(floor,number)
        }
        if (res.status === 200){
            res = await res.json()
            return res
        }
    }
    
}
export default new RoomApiCall()