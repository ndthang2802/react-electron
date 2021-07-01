import Cookies from 'js-cookie'

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
        return await fetch('http://127.0.0.1:8000/api/refresh_token/',{   // server
        method : 'POST',
        credentials:'include',
        headers : {
            "X-CSRFToken": Cookies.get("csrftoken"),
            'Content-Type' : 'application/json',
        }
        }).then(data=>data.json())
    }


}

export default new AuthApiCall()

