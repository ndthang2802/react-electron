import {getCookie} from '../components/function/getCookie'
class BookingApiCall{
    async getAll(){
        var token = 'Token ' + getCookie('access_token')
        return await fetch('http://127.0.0.1:8000/api/renderbooking/',{
            headers:{
                'Authorization': token,
                'Content-Type':'application/json',
            }
        }) //.then(data=>data.json())
    }
    addBooking(input){
        return fetch("url", {
              method: "POST",
              body: JSON.stringify(input),
              headers: {
                "Content-Type": "application/json"
              }
            })
              .then(response => response.json())
              .catch(error => error);
    }
}
export default new BookingApiCall()