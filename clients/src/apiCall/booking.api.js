class BookingApiCall{
    getById(id){
        var url = 'url'+`?id=${id}`
        return fetch(url)
    }
    update(data){

    }
    getAvailable(){
        var url = 'url'+'status=available'
        return fetch(url)
    }
    getAll(){
        return fetch('https://fake-api-nnn.herokuapp.com/api/roomrentals').then(data=>data.json())
    }
    getClientInfo(idrental){
        return fetch(`https://fake-api-nnn.herokuapp.com/api/roomrentals/${idrental}/clients`).then(data=>data.json())
    }
    getRoomInfo(idrental){
        return fetch(`https://fake-api-nnn.herokuapp.com/api/roomrentals/${idrental}/rooms`).then(data=>data.json())
    }
}
export default new BookingApiCall()