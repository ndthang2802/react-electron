class RoomApiCall{
    getAllEmptyRoom(){
        return fetch('https://fake-api-nnn.herokuapp.com/api/rooms?category=East').then(data=>data.json()) // http://127.0.0.1:8000/api/availablerooms/
    }
    getAllAvailableRooms(){
        return fetch(`http://127.0.0.1:8000/api/availablerooms/`,{
            headers:{
                'Content-Type':'application/json',
            }
        }).then(data=>data.json())
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