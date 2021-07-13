const electron = window.require("electron")

export async function getCookie(name) {
    var cookie = await electron.remote.session.defaultSession.cookies.get({ name: name }).then(cookie=>cookie)
    if (cookie.length){
        if (name === 'csrftoken'){
            return cookie[1].value
        }
        else 
            return cookie[0].value
    }
    
    return null;
}