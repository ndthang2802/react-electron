export function ValidateAddBooking(input){
    if (!input.name){
        return {key:'name',value:'Name is empty'}
    }
    if (!input.phone){
        return {key:'phone',value:'Phone is empty'}
    }
    if (!input.email){
        return {key: 'email',value :'Email is empty'}
    }
    if (!input.identify){
        return {key : 'identify',value: 'Identify is empty'}
    }
    if (input.phone.length < 10 ){
        return {key:'phone',value:'Invalid phone number'}
    }
    if (input.identify.length < 9){
        return {key : 'identify',value: 'Invalid identify'}
    }
    return true
}
export function ValidateEditBooking(input){
    if (input.phone && input.phone.length < 10){
        return {key:'phone',value:'Invalid phone number'}
    }
    if (input.identify && input.identify.length < 9){
        return {key : 'identify',value: 'Invalid identify'}
    }
    if (!input.name && !input.phone && !input.email && !input.identify && !input.check_out_at ){
        return {key:'empty',value:'empty request'}
    }
    return true
}
export function completeEditData(newinput,oldClient,OldCheckout){
    if (!newinput.phone){
        newinput['phone'] = oldClient.phone
    }
    if (!newinput.name){
        newinput['name'] = oldClient.fullname
    }
    if (!newinput.email){
        newinput['email'] = oldClient.email
    }
    if (!newinput.identify){
        newinput['identify'] = oldClient.identify
    }
    if (!newinput.check_out_at){
        newinput['check_out_at'] = OldCheckout
    }
    return newinput

}
export function completeBookData(newinput,id_room){
    newinput['room'] = id_room
    return newinput

}
export function hasError(error){
    var keys = Object.keys(error)
    for (var key of keys){
        if (error[key] !== ''){
            return true
        }
    }
    return false
}