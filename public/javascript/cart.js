
function currency(amount) {
    return new Intl.NumberFormat('en-IN').format(amount);
}



socket.on('productUpdate', data => {
    console.log(data.action);
    console.log(data.newProduct)

    const item1 = document.querySelectorAll('.item')

    let newup = [];
    item1.forEach(e => {
        newup.push(e.children[2])
    })

    console.log(newup)

    newup.forEach(e => {
        console.log(e)
        if (data.newProduct._id.toString() === e.value.toString()) {
            console.log('found ', e)
            console.log(e.parentElement)
            e.parentElement.querySelector('.prod-img').src = `/images/${data.newProduct.imageURL}`;
            e.parentElement.querySelector('.prod-img').alt = data.newProduct.title.charAt(0).toUpperCase() + data.newProduct.title.substring(1);
            e.parentElement.querySelector('#title-name').innerText = data.newProduct.title.charAt(0).toUpperCase() + data.newProduct.title.substring(1);
            const quant = +e.parentElement.querySelector('.quantity').innerText.split(':')[1];
            console.log(quant, typeof quant)

            const realPrice = +data.newProduct.price * quant;
            console.log('pricing', realPrice)
            const rprice = currency(realPrice);
            console.log(rprice, typeof rprice)

            e.parentElement.querySelector('.innerp p').innerText = '₹' + rprice;
        }
    })

    const item = document.querySelectorAll('.item')
    console.log(item)

    let totalPrice = 0;

    item.forEach(i => {
        console.log('item ', i);
        const pp = i.querySelector('.innerp p').innerText.split('₹')[1];
        const numberp = Number(pp.replace(/,/g, ''));
        const quantt = +i.querySelector('.quantity').innerText.split(':')[1];
        console.log(numberp, quantt);
        totalPrice = totalPrice + numberp;

    })

    console.log('total price', totalPrice);


    const total = document.querySelector('.total h4').innerText.split(' ')[3]
    console.log(total)
    document.querySelector('.total h4').innerText = 'Total Price : ₹' + currency(totalPrice)


})



socket.on('productDelete', data => {
    console.log(data.action);
    console.log(data.delProduct);

    const item1 = document.querySelectorAll('.item')

    let newup = [];
    item1.forEach(e => {
        newup.push(e.children[2])
    })

    console.log(newup)

    newup.forEach(e => {
        console.log(e)
        if (data.delProduct._id.toString() === e.value.toString()) {
            console.log('found ', e)
            console.log(e.parentElement.parentElement)

            e.parentElement.parentElement.remove();


            const item = document.querySelectorAll('.item')
            console.log(item)

            let totalPrice = 0;

            item.forEach(i => {
                console.log('item ', i);
                const pp = i.querySelector('.innerp p').innerText.split('₹')[1];
                const numberp = Number(pp.replace(/,/g, ''));
                const quantt = +i.querySelector('.quantity').innerText.split(':')[1];
                console.log(numberp, quantt);
                totalPrice = totalPrice + numberp;

            })

            console.log('total price', totalPrice);


            const total = document.querySelector('.total h4').innerText.split(' ')[3]
            console.log(total)
            document.querySelector('.total h4').innerText = 'Total Price : ₹' + currency(totalPrice)
        }
    })
});