function currencyINR(amount) {
    return new Intl.NumberFormat('en-IN').format(amount);
}



const addToCartBtn = document.querySelector('.cart-btn');
const prods = document.querySelector('.prods');
const deleteBtn = document.querySelector('.deleteAll-btn');
const footer = document.querySelector('.foot')
const header = document.querySelector('.content h1');
const deleteIt = document.querySelector('.deleteIT');


// console.log('addtocart',addToCartBtn,prods)
const CartOperations = (e) => {

    
    //console.log(e.target);

    //for adding fresh product to cart
    if (e.target.className === 'cart-btn') {
        navigator.vibrate(50);

        console.log(e.target);

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

    //for add more quantity to cart
    if (e.target.className === 'add-btn') {
        console.log('i am add more btn', e.target)
        navigator.vibrate(50);

        const productId = e.target.parentElement.querySelector('[name="productId"]').value
        const csrfToken = e.target.parentElement.querySelector('[name="_csrf"]').value

        console.log(productId, csrfToken);

        const price = document.querySelector('.total .price');
        console.log('this is price', price)

        const quant = e.target.parentElement.querySelector('.quantity')
        console.log(quant.innerText)

        const priceOfOne = e.target.parentElement.parentElement.querySelector('.price .innerp p')
        console.log(priceOfOne.innerText)
        //   const backToNumber = Number(price.replace(/,/g, ''));
        //   console.log(backToNumber)
        let totalSum = 0;

        fetch('/add-cart', {  // no need for 'http://localhost:8080/add-cart' because both the ejs page(frontend) and server runs on same domain/url (http://localhost:8080) so '/add-cart' would work
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
                return result.json()
            })
            .then(data => {
                console.log(data);
                data.product.forEach(e => {
                    totalSum += e.totalPrice
                })

                const curren = currencyINR(totalSum);
                price.innerText = "Total Price : ₹" + curren;


                const oneProduct = data.product.find(f => productId.toString() === f._doc._id.toString());
                console.log(oneProduct);
                quant.innerText = "Qty:" + oneProduct.quantity;
                priceOfOne.innerText = "₹" + oneProduct.quantPrice;


            })
            .catch(err => {
                console.log(err);
            })
    }

    //for quantity minus from cart
    if (e.target.className === `minus-btn`) {
        console.log('i am minus more btn', e.target)
        navigator.vibrate(50);

        const productId = e.target.parentElement.querySelector('[name="productId"]').value
        const csrfToken = e.target.parentElement.querySelector('[name="_csrf"]').value

        const productElement = e.target.parentElement.parentElement.parentElement;



        console.log(productId, csrfToken);

        const price = document.querySelector('.total .price');
        console.log('this is price', price)

        const quant = e.target.parentElement.querySelector('.quantity')
        console.log(quant.innerText)

        const priceOfOne = e.target.parentElement.parentElement.querySelector('.price .innerp p')
        console.log(priceOfOne.innerText)
        //   const backToNumber = Number(price.replace(/,/g, ''));
        //   console.log(backToNumber)
        let totalSum = 0;

        fetch('/minus-cart', { // no need for 'http://localhost:8080/minus-cart' because both the ejs page(frontend) and server runs on same domain/url (http://localhost:8080) so '/minus-cart' would work
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
                return result.json()
            })
            .then(data => {
                console.log(data);

                if (data.product.length <= 0) {
                    prods.remove();

                    footer.remove();
                    deleteIt.remove()

                    header.innerText = 'Cart Empty';
                }


                const oneProduct = data.product.find(f => productId.toString() === f._doc._id.toString());

                if (!oneProduct) {
                    productElement.remove();
                }



                // const quantityofMe=oneProduct.quantity;
                // if(quantityofMe === 1){
                //    e.target.classList.add('disappear');
                //    e.target.classList.remove('not');
                //    disappear="disappear";
                // }
                // if(quantityofMe>1){
                //     e.target.classList.remove('disappear');
                //     e.target.classList.add('not');
                //    disappear="not";
                // }

                data.product.forEach(e => {
                    totalSum += e.totalPrice
                })

                const curren = currencyINR(totalSum);
                price.innerText = "Total Price : ₹" + curren;



                console.log(oneProduct);

                if(oneProduct){

                    quant.innerText = "Qty:" + oneProduct.quantity;
                    priceOfOne.innerText = "₹" + oneProduct.quantPrice;
                }


            })
            .catch(err => {
                console.log(err);
            })
    }


    //for per cart item deletion
    if (e.target.className === 'cross-btn cross') {
        console.log('i am cross btn', e.target)
        navigator.vibrate(50);

        const productElement = e.target.parentElement.parentElement;

        const productId = e.target.parentElement.querySelector('[name="productId"]').value
        const csrfToken = e.target.parentElement.querySelector('[name="_csrf"]').value

        console.log(productId, csrfToken);

        const price = document.querySelector('.total .price');
        console.log('this is price', price)

        const quant = e.target.parentElement.querySelector('.quantity')
        console.log(quant.innerText)

        const priceOfOne = e.target.parentElement.parentElement.querySelector('.price .innerp p')
        console.log(priceOfOne.innerText)
        //   const backToNumber = Number(price.replace(/,/g, ''));
        //   console.log(backToNumber)
        let totalSum = 0;

        fetch('/delete-cart', { // no need for 'http://localhost:8080/delete-cart' because both the ejs page(frontend) and server runs on same domain/url (http://localhost:8080) so '/delete-cart' would work
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
                return result.json()
            })
            .then(data => {
                console.log(data);

                if (data.product.length <= 0) {
                    prods.remove();

                    footer.remove();
                    deleteIt.remove()

                    header.innerText = 'Cart Empty';
                }
                data.product.forEach(e => {
                    totalSum += e.totalPrice
                })

                const curren = currencyINR(totalSum);

                price.innerText = "Total Price : ₹" + curren;


                productElement.remove();



            })
            .catch(err => {
                console.log(err);
            })
    }

}

prods.addEventListener('click', CartOperations)




const deleteAllCartItems = (e) => {
    //for deleting all cart items at once
    if (e.target.className === 'deleteAll-btn') {
        navigator.vibrate(50);
        console.log('i am delete btn', e.target)

        const productElement = e.target.parentElement;


        const csrfToken = e.target.parentElement.querySelector('[name="_csrf"]').value


        fetch('/delete-all-cart', {  // no need for 'http://localhost:8080/delete-all-cart' because both the ejs page(frontend) and server runs on same domain/url (http://localhost:8080) so '/delete-all-cart' would work
            method: 'POST',

            headers: {
                'Content-Type': 'application/json',
                'csrf-token': csrfToken
            }
        })
            .then(result => {
                console.log(result);
                return result.json()
            })
            .then(data => {
                console.log(data);

                prods.remove();
                productElement.remove();
                footer.remove();

                header.innerText = data.cartHeader;



            })
            .catch(err => {
                console.log(err);
            })
    }
}


deleteBtn.addEventListener('click', deleteAllCartItems)




