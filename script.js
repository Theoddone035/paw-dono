// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCZJwgnqiD2g10bmMFiCQ-jJgwDKgveCaY",
  authDomain: "pawshaven-035.firebaseapp.com",
  projectId: "pawshaven-035",
  storageBucket: "pawshaven-035.firebasestorage.app",
  messagingSenderId: "34015718343",
  appId: "1:34015718343:web:64c7b2478e0527809247e2",
  measurementId: "G-NB0M1CDJB7"
};
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const database = firebase.database();

// Protect pages
auth.onAuthStateChanged((user) => {
    if (!user && window.location.pathname !== '/index.html') {
        window.location.href = 'index.html';
    }
});

// Logout
document.getElementById('logout-button').addEventListener('click', () => {
    auth.signOut().then(() => {
        window.location.href = 'index.html';
    }).catch((error) => {
        alert('Logout failed: ' + error.message);
    });
});

// Donation form
document.getElementById('donation-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const user = auth.currentUser;
    if (!user) return;
    let amount = document.querySelector('input[name="amount"]:checked').value === 'custom' ?
        parseFloat(document.getElementById('custom-amount').value) :
        parseFloat(document.querySelector('input[name="amount"]:checked').value);
    const extras = Array.from(document.querySelectorAll('input[name="extras"]:checked'))
        .reduce((sum, extra) => {
            const values = { 'chew-toy': 10, 'squeaky-toy': 15, 'treats': 5, 'bed': 30, 'bowl': 20 };
            return sum + values[extra.value];
        }, 0);
    database.ref('donations').push({
        userId: user.uid,
        amount: amount + extras,
        timestamp: firebase.database.ServerValue.TIMESTAMP
    }).then(() => {
        alert('Thank you for your donation intent! We will contact you for details.');
    }).catch((error) => {
        alert('Error saving donation: ' + error.message);
    });
});

// Enable custom amount input
document.querySelectorAll('input[name="amount"]').forEach(input => {
    input.addEventListener('change', () => {
        const customInput = document.getElementById('custom-amount');
        customInput.disabled = input.value !== 'custom';
        if (input.value === 'custom') customInput.focus();
    });
});

// Navigation
function showPage(section) {
    document.querySelectorAll('#donation-section, #stories-section, #testimonials-section')
        .forEach(div => div.classList.add('hidden'));
    document.getElementById(${section}-section).classList.remove('hidden');
}