
const addToCartBtn=document.querySelector('.cart-btn');

const addToCartOp=(e)=>{


if (e.target.className === 'cart-btn') {
    

    navigator.vibrate(50);

    // if ('vibrate' in navigator) {
    //     navigator.vibrate(500);
    // }

        // console.log(e.target);

        const csrfToken = e.target.parentElement.querySelector('[name="_csrf"]').value
        const productId = e.target.parentElement.querySelector('[name="productId"]').value
        console.log(productId, csrfToken)

        fetch('/cart', {  // no need for 'http://localhost:8080/cart' because both the ejs page(frontend) and server runs on same domain/url (http://localhost:8080) so '/cart' would work
            method: 'POST',
            body: JSON.stringify({
                productId: productId
            }),
            headers: {
                'Content-Type': 'application/json',
                'csrf-token': csrfToken
            }
        })
            .then(result => {
                console.log(result);
                return result.json();
            })
            .then(data => {
                console.log(data);
            })
            .catch(error => {
                console.log(error)
            })
    }
}

    addToCartBtn.addEventListener('click',addToCartOp);


    function currency(amount) {
    return new Intl.NumberFormat('en-IN').format(amount);
}



    socket.on('productUpdate',data =>{
    console.log(data.action);
    console.log(data.newProduct)

    const formattedprice = currency(+data.newProduct.price)

    const productss=document.querySelectorAll('.btn')
    console.log(productss);
    let newup=[];
    productss.forEach(e =>{
        newup.push(e.children)
    })
    console.log(newup)

   newup.forEach(e =>{
    console.log(e[2].value)
    if(data.newProduct._id.toString() === e[2].value.toString()){
        console.log('matched')
        const item=e[2].parentElement.parentElement
        console.log(item)
        item.querySelector('.img img').src=`/images/${data.newProduct.imageURL}`;
        item.querySelector('.img img').alt=data.newProduct.title.charAt(0).toUpperCase()+data.newProduct.title.substring(1);
        item.querySelector('.title').innerText=data.newProduct.title.charAt(0).toUpperCase()+data.newProduct.title.substring(1);
        item.querySelector('.price').innerText=`₹${formattedprice}`
        item.querySelector('.description').innerText=data.newProduct.description;


         Notification.requestPermission().then(perm => {
        if (perm === "granted") {
            new Notification("Node Shop App", {
                body: data.action
            });


        }
    })
    }
   })
})