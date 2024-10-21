// Step 1: Navigate to booking page with event details
function goToBookingPage(eventName, price) {
    window.location.href = `bookingpage.html?event=${encodeURIComponent(eventName)}&price=${price}`;
}

// Step 2: Fetch event details on the booking page
const urlParams = new URLSearchParams(window.location.search);
const eventName = urlParams.get('event');
const ticketPrice = parseInt(urlParams.get('price'));

// Check if event details exist and display them
if (eventName && ticketPrice) {
    document.getElementById('eventTitle').textContent = eventName;
    document.getElementById('ticketPrice').textContent = ticketPrice;

    const ticketQuantityInput = document.getElementById('ticketQuantity');
    const totalPriceDisplay = document.getElementById('totalPrice');

    // Step 3: Update total price when ticket quantity changes
    function updateTotalPrice() {
        const quantity = parseInt(ticketQuantityInput.value);
        const totalPrice = quantity * ticketPrice;
        totalPriceDisplay.textContent = totalPrice;
    }

    ticketQuantityInput.addEventListener('input', updateTotalPrice);
    updateTotalPrice(); // Initialize total price on page load
}

// Step 4: Proceed to payment page with total details
document.getElementById('proceedToPayment').addEventListener('click', function() {
    const quantity = document.getElementById('ticketQuantity').value;
    const totalPrice = quantity * ticketPrice;
    window.location.href = `payment.html?event=${encodeURIComponent(eventName)}&quantity=${quantity}&totalPrice=${totalPrice}`;
});

// Step 5: Fetch and display event info on the payment page
const paymentUrlParams = new URLSearchParams(window.location.search);
const paymentEventName = paymentUrlParams.get('event');
const ticketQuantity = paymentUrlParams.get('quantity');
const paymentTotalPrice = paymentUrlParams.get('totalPrice');

// Check if payment details exist and display them
if (paymentEventName && ticketQuantity && paymentTotalPrice) {
    document.getElementById('eventTitle').textContent = paymentEventName;
    document.getElementById('ticketQuantity').textContent = ticketQuantity;
    document.getElementById('totalPrice').textContent = paymentTotalPrice;
}

// Step 6: Display booking confirmation on confirmation page
const confirmationUrlParams = new URLSearchParams(window.location.search);
const confirmedEventName = confirmationUrlParams.get('event');
const confirmedQuantity = confirmationUrlParams.get('quantity');
const confirmedTotalPrice = confirmationUrlParams.get('totalPrice');

// Check if confirmation details exist and display them
if (confirmedEventName && confirmedQuantity && confirmedTotalPrice) {
    document.getElementById('confirmationDetails').innerHTML = `
        <h1>Booking Confirmation</h1>
        <p>Thank you for your booking!</p>
        <p>Event: ${confirmedEventName}</p>
        <p>Quantity: ${confirmedQuantity}</p>
        <p>Total Price: R${confirmedTotalPrice}.00</p>
    `;
}

// Example events array for selection (replace with dynamic event data)
const events = [
    { name: "Startup Founder", location: "Rosebank, The Link", price: 0 },
    { name: "Founders Dinner", location: "Sandton, Convention Centre", price: 550 },
    { name: "World Economic Forum", location: "Cape Town, Convention Centre", price: 300 },
    { name: "Dubane Summer Break", location: "UShaka Marine", price: 350 },
    { name: "Founders Comedy Special", location: "Blackrock Casino", price: 400 },
    { name: "Event 6", location: "Location 6", price: 450 },
];

// Attach event listeners to buttons on the index page
function attachEventListeners() {
    const eventButtons = document.querySelectorAll('.event-button');
    eventButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            const selectedEvent = events[index];
            goToBookingPage(selectedEvent.name, selectedEvent.price);
        });
    });
}

// Initialize event listeners if on index.html
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', attachEventListeners);
} else {
    attachEventListeners();
}
