//naviigate to booking page from buttons
function goToBookingPage(eventName, price) {

    window.location.href = `bookingpage.html?event=${encodeURIComponent(eventName)}&price=${price}`;
};

// Get event details 
const urlParams = new URLSearchParams(window.location.search);
const eventName = urlParams.get('event');
const ticketPrice = parseInt(urlParams.get('price'));

// Update booking page 
document.getElementById('eventTitle').textContent = eventName;
document.getElementById('ticketPrice').textContent = ticketPrice;

const ticketQuantityInput = document.getElementById('ticketQuantity');
const totalPriceDisplay = document.getElementById('totalPrice');

// Update total price
function updateTotalPrice() {
  const quantity = parseInt(ticketQuantityInput.value);
  const totalPrice = quantity * ticketPrice;
  totalPriceDisplay.textContent = totalPrice;
}

ticketQuantityInput.addEventListener('input', updateTotalPrice);
updateTotalPrice(); // Initialize total price 

// Proceed to payment
document.getElementById('proceedToPayment').addEventListener('click', function() {
  const quantity = ticketQuantityInput.value;
  const totalPrice = ticketQuantityInput.value * ticketPrice;
  window.location.href = `confirmation.html?event=${encodeURIComponent(eventName)}&quantity=${quantity}&totalPrice=${totalPrice}`;
});

