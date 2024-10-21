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

const events = [
    { name: "Startup Founder", location: "Rosebank, The Link", price: 0 },
    { name: "Founders Dinner", location: "Sandton, Convention Centre", price: 550 },
    { name: "World Economic Forum", location: "Cape Town, Convention Centre", price: 300 },
    { name: "Dubane Summer Break", location: "UShaka Marine", price: 350 },
    { name: "Founders Comedy Special", location: "Blackrock Casino", price: 400 },
    { name: "Event 6", location: "Location 6", price: 450 },
];

document.getElementById('proceedToPayment').onclick = function() {
    const selectedEventIndex = document.getElementById('eventSelect').value;
    const selectedEvent = events[selectedEventIndex];
  
    // event details in storage to access on the payment page
    localStorage.setItem('selectedEvent', JSON.stringify(selectedEvent));
  
    // Redirect to payment page
    window.location.href = 'payment.html';
  };
  
const selectedEvent = JSON.parse(localStorage.getItem('selectedEvent'));

if (selectedEvent) {
  // Display event details 
  document.getElementById('eventDetails').innerHTML = `
    <h2>${selectedEvent.name}</h2>
    <p>Location: ${selectedEvent.location}</p>
    <p>Price: R${selectedEvent.price}.00</p>
  `;
  
  // Display booking confirmation 
  document.getElementById('confirmationDetails').innerHTML = `
    <h1>Booking Confirmation</h1>
    <p>Thank you for your booking!</p>
    <p>Event: ${selectedEvent.name}</p>
    <p>Location: ${selectedEvent.location}</p>
    <p>Price: R${selectedEvent.price}.00</p>
  `;
}
