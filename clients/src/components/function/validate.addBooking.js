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
    if (input.identify.length < 9){
        return {key : 'identify',value: 'Invalid identify'}
    }
    if (!input.phone.match(/\d/g).length===10){
        return {key:'phone',value:'Invalid phone number'}
    }
    return true
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