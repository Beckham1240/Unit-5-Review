"use strict";

/*
   New Perspectives on HTML5, CSS3, and JavaScript 6th Edition
   Tutorial 13
   Review Assigment

   Shopping Cart Form Script
   
   Author: Beckham Le
   Date:   5/20/20
   
   Filename: co_cart.js
   
   Function List
   =============
   
   calcCart()
      Calculates the cost of the customer order
      
   formatNumber(val, decimals)
      Format a numeric value, val, using the local
      numeric format to the number of decimal
      places specified by decimals
      
   formatUSACurrency(val)
      Formats val as U.S.A. currency
   
*/ 

window.addEventListener("load", function(){
   //calculates cost of customer's order
   calcCart();
   //Event handler for web form
   var cart = document.forms.cart;
   cart.elements.modelQty.onchange = calcCart;

   //Loops through all shipping options and runs calcCart funct when an option clicked on
   var shipOptions = document.querySelectorAll('input[name="shipping"]');
   for(var i=0; i<shipOptions.length;i++){
      shipOptions[i].onclick = calcCart;
   }
});

function calcCart(){
   var cart = document.forms.cart;
   var qIndex = cart.elements.modelQty.selectedIndex;
   var quantity = cart.elements.modelQty[qIndex].value;
   var orderCost = document.querySelectorAll('input[name="modelCost"]').value*quantity;

   //formats value of user's order into US currency format
   cart.elements.orderCost.value = formatUSCurrency(orderCost);

   //Retrieve cost of user's shipping plan
   var shipCost = document.querySelector('input[name=shipping]:checked').value*quantity;
   cart.elements.shippingCost.value = formatNumber(shipCost, 2);

   //calculate the order subtotal
   cart.elements.subTotal.value = formatNumber(orderCost + shipCost, 2);

   //calculate the order salestax
   var salesTax = 0.05*(orderCost + shipCost);
   cart.elements.salesTax.value = formatNumber(salesTax, 2);

   //calculate the total cost of the order
   var total = orderCost + shipCost + salesTax;
   cart.elements.cartTotal.value = formatUSCurrency(total);

   //Store the order details
   cart.elements.shippingType.value = document.querySelector('input[name="shipping"]:checked').nextSibling.nodeValue;
}





function formatNumber(val, decimals) {
   return val.toLocaleString(undefined, {minimumFractionDigits: decimals, 
                                         maximumFractionDigits: decimals});
}

function formatUSCurrency(val) {
   return val.toLocaleString('en-US', {style: "currency", currency: "USD"} );
}
