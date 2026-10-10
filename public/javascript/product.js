function currency(amount) {
    return new Intl.NumberFormat('en-IN').format(amount);
}


let prodss = document.querySelector('.prods');


socket.on('productCreated', data => {
    console.log(data.action);
    console.log(data.product);

    const formattedprice = currency(+data.product.price)

    const productHTML = `<div class="prod">
                                <div class="item">
                                    <div class="img">
                                        <img class="prod-img" src="/images/${data.product.imageURL}"
                                            alt="${data.product.title.charAt(0).toUpperCase() + data.product.title.substring(1)}">
                                    </div>
                                    <div class="title">
                                        <p id="title-name">
                                            ${data.product.title.charAt(0).toUpperCase() + data.product.title.substring(1)}
                                        </p>
                                    </div>
                                    <div class="price">
                                        <div class="innerp">
                                            <span>Price: </span>
                                            <p>

                                                ₹${formattedprice}
                                            </p>

                                        </div>
                                    </div>
                                    <div class="action-btn">
                                        <a href="/products/ product._id " class="detail-btn">Details</a>

                                           <input type="hidden" name="_csrf" value="${data.csrfTokenTest}">
    <button class="cart-btn" type="button">Add To Cart</button>
    <input type="hidden" name="productId" value="${data.product._id}">
                                    </div>
                                </div>

                            </div>`


prodss.insertAdjacentHTML('beforeend',productHTML);

    Notification.requestPermission().then(perm => {
        if (perm === "granted") {
            new Notification("Node Shop App", {
                body: data.action
            });


        }
    })
})



socket.on('productUpdate',data =>{
    console.log(data.action);
    console.log(data.newProduct)

    const formattedprice = currency(+data.newProduct.price)

    const productss=document.querySelectorAll('.action-btn')
    console.log(productss);
    let newup=[];
    productss.forEach(e =>{
        newup.push(e.children)
    })
    console.log(newup)

   newup.forEach(e =>{
    console.log(e[3].value)
    if(data.newProduct._id.toString() === e[3].value.toString()){
        console.log('matched')
        const item=e[3].parentElement.parentElement
        console.log(item)
        item.querySelector('.prod-img').src=`/images/${data.newProduct.imageURL}`;
        item.querySelector('.prod-img').alt=data.newProduct.title.charAt(0).toUpperCase()+data.newProduct.title.substring(1);
        item.querySelector('#title-name').innerText=data.newProduct.title.charAt(0).toUpperCase()+data.newProduct.title.substring(1);
        item.querySelector('.innerp p').innerText=`₹${formattedprice}`


        
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



socket.on('productDelete',data =>{
    console.log(data.action);
    console.log(data.delProduct);


    const productss=document.querySelectorAll('.action-btn')
    console.log(productss);
    let newup=[];
    productss.forEach(e =>{
        newup.push(e.children)
    })
    console.log(newup)

   newup.forEach(e =>{
    console.log(e[3].value)
    if(data.delProduct._id.toString() === e[3].value.toString()){
        console.log('matched')
        const item=e[3].parentElement.parentElement.parentElement
        console.log(item)
        item.remove();

        Notification.requestPermission().then(perm => {
        if (perm === "granted") {
            new Notification("Node Shop App", {
                body: data.action
            });


        }
    })
        return;
        }
   })
})