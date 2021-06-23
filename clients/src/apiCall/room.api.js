class RoomApiCall{
    getAllEmptyRoom(){
        return fetch('https://fake-api-nnn.herokuapp.com/api/rooms?category=East').then(data=>data.json()) // ?status=False
    }
}
export default new RoomApiCall()