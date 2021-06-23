export function ValidateAddBooking(input){
    var checkin = new Date(input.StartAt)
    var checkout = new Date(input.checkOutAt)
    var today = new Date
    if (checkin < today){
        return [false,'check in must be greater or equal today']
    }
    else if (checkout < today ){
        return [false,'check out must greater or equal today']
    }
    else if (checkout < checkin){
        return [false,'check out must greater or equal checkin']
    }
    return true
}