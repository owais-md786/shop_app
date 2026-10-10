
const delBtn=document.querySelector('.prods');


console.log(delBtn);

const deleteProduct=(e)=>{
if(e.target.className==='delete-btn')
{
    const productId=e.target.parentElement.querySelector('[name="productId"]').value;
    const csrfToken=e.target.parentElement.querySelector('[name="_csrf"]').value;
    console.log(productId);
    console.log(csrfToken);
    const productElement=e.target.parentElement.parentElement.parentElement;
    console.log(productElement);
    fetch('/admin/products/'+productId,{
        method:'DELETE',
        headers:{
            'csrf-token':csrfToken
        }
    }).then(result =>{
        console.log(result);
        return result.json();
    })
    .then(data =>{
        console.log(data);
        productElement.remove();
    })
    .catch(err =>{
        console.log(err);
    })
}
}

delBtn.addEventListener('click',deleteProduct)

