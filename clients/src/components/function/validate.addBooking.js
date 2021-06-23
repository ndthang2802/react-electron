export function ValidateAddBooking(input){
    var checkin = new Date(input.StartAt)
    var checkout = new Date(input.checkOutAt)
    var today = new Date()
    if (checkin < today){
        return [false,'Check in must be greater or equal today']
    }
    else if (checkout < today ){
        return [false,'Check out must greater or equal today']
    }
    else if (checkout < checkin){
        return [false,'Check out must greater or equal checkin']
    }
    else if (!input.name){
        return [false,'Name is empty']
    }
    else if (!input.phone){
        return [false,'Phone is empty']
    }
    else if (!input.email){
        return [false,'Email is empty']
    }
    else if (!input.identify){
        return [false,'Identify is empty']
    }
    return [true]
}