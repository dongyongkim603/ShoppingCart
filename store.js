
/**
 * this checks the state of the webpage. If the page is loading it an event listener will listen for the DOMConetentLoaded
 * to tell the ready function to initialize. else if the page it running the function ready will run regardless
 */
if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}

/**
 * This function will look through HTML document and find all the buttons related to the cart and add an action listener event
 * that will call the removeItem function when clicked on the buttons with 'danger' class and call the addToCart when the buttons
 * with 'shop-item' are clicked. 
 */
function ready() {
    var removeCartItemButtons = document.getElementsByClassName('btn-danger')
    console.log(removeCartItemButtons)
    for (var i = 0; i < removeCartItemButtons.length; i++) {
        var button = removeCartItemButtons[i]
        button.addEventListener('click', removeItem)
    }

    var quantityInputs = document.getElementsByClassName('cart-quantity-input')
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i]
        input.addEventListener('change', quantityChange)
    }

    var addToCartButtons = document.getElementsByClassName('shop-item-button')
    for (var i = 0; i < addToCartButtons.length; i++) {
        var button = addToCartButtons[i]
        button.addEventListener('click', addToCart)
    }
}

/**
 * Checks the values of the event to make sure they are numbers and non-negitive and will call the updataTotal
 * function
 * @param {The button that is passed in as a return object from the AddEventListener} event 
 */
function quantityChange(event) {
    var input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    updateTotal()
}

/**
 * Will add the items correleated to the event parameter, to the users cart.
 * @param {The button that is passed in as a return object from the AddEventListener} event 
 */
function addToCart(event) {
    var button = event.target
    var shopItem = button.parentElement.parentElement
    var title = shopItem.getElementsByClassName('shop-item-title')[0].innerText
    var price = shopitem.getElementsByClassName('shop-item-price')[0].innerText
    var image = shopItem.getElementsByClassName('shop-item-image')[0].src
    console.log(title, price, image)
}

/**
 * finds the parent element from the HTML file and removes it from the view when the event is triggered
 * @param {The button that is passed in as a return object from the AddEventListener} event 
 */
function removeItem(event) {
    var buttonClicked = event.target
    buttonClicked.parentElement.parentElement.remove()
    updateTotal()
}

/**
 * Goes through the HTML document, finds the cart related elements, and takes the price and quantity values.
 * The total price is generated by aggragating all price and quantity text values converted to floats and multiplying them
 * together. This final total will then replace the total in the HTML view
 */
function updateTotal() {

    var cartItemContainer = document.getElementsByClassName('cart-items')[0]
    var cartRows = cartItemContainer.getElementsByClassName('cart-row')
    var total = 0
    for (var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i]
        var priceElement = cartRow.getElementsByClassName('cart-price')[0]
        var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')
        [0]
        var price = parseFloat(priceElement.innerText.replace('$', ''))
        var quantity = quantityElement.value
        console.log(price * quantity)
        total = total + (price * quantity)
    }
    total = Math.round(total * 100) / 100
    document.getElementsByClassName('cart-total-price')[0].innerText = '$' + total
}