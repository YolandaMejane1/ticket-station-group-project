// Navigating to booking page with event details
function goToBookingPage(eventName, price) {
    window.location.href = `bookingpage.html?event=${encodeURIComponent(eventName)}&price=${price}`;
}

// Fetching event details on the booking page
const urlParams = new URLSearchParams(window.location.search);
const eventName = urlParams.get('event');
const ticketPrice = parseInt(urlParams.get('price'));

// Checking if event details exist and display them
if (eventName && ticketPrice) {
    document.getElementById('eventTitle').textContent = eventName;
    document.getElementById('ticketPrice').textContent = ticketPrice;

    const ticketQuantityInput = document.getElementById('ticketQuantity');
    const totalPriceDisplay = document.getElementById('totalPrice');

    // Updating total price when ticket quantity changes
    function updateTotalPrice() {
        const quantity = parseInt(ticketQuantityInput.value);
        const totalPrice = quantity * ticketPrice;
        totalPriceDisplay.textContent = totalPrice;
    }

    ticketQuantityInput.addEventListener('input', updateTotalPrice);
    updateTotalPrice(); 
}

// Proceed to payment page with total price
document.getElementById('proceedToPayment').addEventListener('click', function() {
    const quantity = document.getElementById('ticketQuantity').value;
    const totalPrice = quantity * ticketPrice;
    window.location.href = `payment.html?event=${encodeURIComponent(eventName)}&quantity=${quantity}&totalPrice=${totalPrice}`;
});

// Fetching and displaying event info on the payment page
const paymentUrlParams = new URLSearchParams(window.location.search);
const paymentEventName = paymentUrlParams.get('event');
const ticketQuantity = paymentUrlParams.get('quantity');
const paymentTotalPrice = paymentUrlParams.get('totalPrice');

// Checking if payment details exist and display them
if (paymentEventName && ticketQuantity && paymentTotalPrice) {
    document.getElementById('eventTitle').textContent = paymentEventName;
    document.getElementById('ticketQuantity').textContent = ticketQuantity;
    document.getElementById('totalPrice').textContent = paymentTotalPrice;
}

// Displaying booking confirmation on confirmation page
const confirmationUrlParams = new URLSearchParams(window.location.search);
const confirmedEventName = confirmationUrlParams.get('event');
const confirmedQuantity = confirmationUrlParams.get('quantity');
const confirmedTotalPrice = confirmationUrlParams.get('totalPrice');

// Checking if confirmation details exist and display them
if (confirmedEventName && confirmedQuantity && confirmedTotalPrice) {
    document.getElementById('confirmationDetails').innerHTML = `
        <h1>Booking Confirmation</h1>
        <p>Thank you for your booking!</p>
        <p>Event: ${confirmedEventName}</p>
        <p>Quantity: ${confirmedQuantity}</p>
        <p>Total Price: R${confirmedTotalPrice}.00</p>
    `;
}

// Attaching event listeners to buttons on the index.html page
function attachEventListeners() {
    const eventButtons = document.querySelectorAll('.event-button');
    eventButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            const selectedEvent = events[index];
            goToBookingPage(selectedEvent.name, selectedEvent.price);
        });
    });
}

// Initializing event listeners on index.html
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', attachEventListeners);
} else {
    attachEventListeners();
}
