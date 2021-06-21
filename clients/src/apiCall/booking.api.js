class BookingApiCall{
    getById(id){
        url = 'url'+`?id=${id}`
        return fetch(url)
    }
    update(data){

    }
    getAvailable(){
        url = 'url'+'status=available'
        return fetch(url)
    }
}
export default new BookingApiCall()