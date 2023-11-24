
let cartIcon = document.querySelector("#cart-icon");
let cart = document.querySelector(".cart");
let closeCart = document.querySelector("#close-cart"); 

cartIcon.onclick = () => {
    cart.classList.add("active");
};

// Close Cart
closeCart.onclick= () => {
    cart.classList.remove("active");
}

if (document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded", ready);
}else {
    ready();
}

function ready() {
// Reomve Items From Cart
    var reomveCartButtons = document.getElementsByClassName('cart-remove') 
    console.log(reomveCartButtons)
    for (var i =0; i < reomveCartButtons.length; i++){
        var button = reomveCartButtons[i]
        button.addEventListener("click", removeCartItem);
    }
    
    var quantityInputs = document.getElementsByClassName("cart-quantity"); 
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i];
        input.addEventListener("change", quantityChanged);
    }

    // Add To Cart

    var addCart = document.getElementsByClassName("add-cart"); 
    for (var i = 0; i < addCart.length; i++) { 
        var button = addCart[i];
        button.addEventListener("click", addCartClicked);
    }
    document
        .getElementsByClassName("btn-buy")[0]
        .addEventListener("click", buyButtonClicked);
}
// Buy Button
function buyButtonClicked(){
    let dd = " ";
    var li = document.getElementById('cart-icon');
    li.style.color='black';
    var cartContent = document.getElementsByClassName('cart-content')[0];
    var cartBoxes = document.getElementsByClassName('cart-box');
    var total = 0;
    if (cartBoxes.length <=0) {
        alert("No item In Cart");
    } else {

    
        for (var i = 0; i < cartBoxes.length; i++) {
            dd = dd + " *** "
            var cartBox = cartBoxes[i];

            var product = cartBox.getElementsByClassName("cart-product-title")[0].innerText;     

            var priceElement = cartBox.getElementsByClassName("cart-price")[0];
            var quantityElement = cartBox.getElementsByClassName("cart-quantity")[0];

            
            var price = parseFloat(priceElement.innerText.replace("$", ""));
            var quantity = quantityElement.value;
            total = total + (price * quantity);
            dd = dd + product + " / Price : " + price + " /  Quantity : " + quantity;
            
        }
        dd = dd + "--->  Total : " + total +"$";
    
        console.log(dd);
        
        



        let number = "+96181413340";
        var url ="https://wa.me/" + number + "?text=" + dd + "%0a";
        window.open(url, '_blank').focus();
        




        //alert('Your Order is placed');
        var cartContent = document.getElementsByClassName("cart-content")[0];
    
        while (cartContent.hasChildNodes()){
            
            cartContent.removeChild(cartContent.firstChild);
        }
        updatetotal();
    }
}
// Reomve Items From Cart
function removeCartItem(event) {
    var buttonClicked = event.target;
    buttonClicked.parentElement.remove();
    updatetotal();
}

function quantityChanged(event) {
    var input = event.target;
    if (isNaN(input.value) || input.value <= 0) { 
        input.value = 1;
    }    
    updatetotal();
}

// Add To cart
function addCartClicked(event) {
    var button = event.target;
    var shopProducts = button.parentElement;
    var title = shopProducts.getElementsByClassName("product-title")[0].innerText; 
    var price = shopProducts.getElementsByClassName("price")[0].innerText; 
    var productImg = shopProducts.getElementsByClassName("product-img")[0].src; 
    addProductToCart(title, price, productImg);
    updatetotal();
}

function addProductToCart(title, price, productImg) {

    var cartBoxes = document.getElementsByClassName('cart-box');
    var li = document.getElementById('cart-icon');
    li.style.color='red';
    li.textContent=cartBoxes.length+1;


    var cartShopBox = document.createElement("div");
    cartShopBox.classList.add("cart-box");
    var cartItems = document.getElementsByClassName("cart-content")[0];
    var cartItemsNames = cartItems.getElementsByClassName("cart-product-title"); 
    for (var i = 0; i < cartItemsNames.length; i++) {
        if (cartItemsNames[i].innerText == title) {
            alert("You have already add this item to cart");
            return;
        }
    }
    
var cartBoxContent = `
                        <img src="${productImg}" alt="" class="cart-img"> 
                        <div class="detail-box">
                            <div class="cart-product-title">${title}</div>
                            <div class="cart-price">${price}</div>
                            <input type="number" value="1" class="cart-quantity">
                        </div>
                        <!-- Remove Cart -->
                        <i class='bx bxs-trash cart-remove'></i>`;
cartShopBox.innerHTML = cartBoxContent;
cartItems.append(cartShopBox);
cartShopBox
    .getElementsByClassName("cart-remove")[0]
    .addEventListener("click", removeCartItem);
cartShopBox
    .getElementsByClassName("cart-quantity")[0]
    .addEventListener("change", quantityChanged);
}   


function updatetotal(){
    var li = document.getElementById('cart-icon');
    var cartContent = document.getElementsByClassName('cart-content')[0];
    var cartBoxes = document.getElementsByClassName('cart-box');
    var total = 0;
    for (var i = 0; i < cartBoxes.length; i++) {
        var cartBox = cartBoxes[i];
        var priceElement = cartBox.getElementsByClassName("cart-price")[0];
        var quantityElement = cartBox.getElementsByClassName("cart-quantity")[0];
        var price = parseFloat(priceElement.innerText.replace("$", ""));
        var quantity = quantityElement.value;
        total = total + (price * quantity);
        li.textContent=cartBoxes.length;
    }
// تحديد بعد الفاصلة 
    total = Math.round(total * 100) / 100;
    document.getElementsByClassName("total-price")[0].innerText = "$" + total;

    if (cartBoxes.length <= 0) {
        
        li.style.color='white';
        li.textContent=cartBoxes.length;
    }
    
}
