const displayINRCurency=(num)=>{
    const formattor= new Intl.NumberFormat('en-IN',{
        style: 'currency',
        currency: 'INR',
        minimumFractionDigits:2

    })

    return formattor.format(num)

}


module.exports= displayINRCurency