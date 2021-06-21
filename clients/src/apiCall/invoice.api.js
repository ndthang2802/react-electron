class InvoiceApiCall {
    getById(id){
        url = 'url'+`?id=${id}`
        return fetch(url)
    }
    get(){
        return fetch('url')
    }
    delete(id){
        return fetch('url',{
            method: 'delete',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify({'id':id})
        })
    }
    create(data){
        return fetch('url',{
            method: 'post',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify(data)
        })
    }
}

export default new InvoiceApiCall()