const auth = firebase.auth();
document.getElementById('login-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    auth.signInWithEmailAndPassword(email, password)
        .then(() => { window.location.href = 'home.html'; })
        .catch((error) => { alert('Login failed: ' + error.message); });
});
const database = firebase.database();
document.getElementById('donation-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const amount = document.getElementById('amount').value;
    const user = firebase.auth().currentUser;
    if (user) {
        database.ref('donations').push({
            userId: user.uid,
            amount: amount,
            timestamp: firebase.database.ServerValue.TIMESTAMP
        }).then(() => alert('Thank you for your donation intent!'));
    }
});
fetch('stories/story1.json')
  .then(response => {
    if (!response.ok) {
      throw new Error(HTTP error! Status: ${response.status});
    }
    return response.json();
  })
  .then(data => {
    const storyContainer = document.getElementById('stories');
    if (!storyContainer) {
      throw new Error('Element with id "stories" not found in DOM');
    }

    storyContainer.innerHTML = `
      <h2>${data.title}</h2>
      <p>${data.text}</p>
      <img src="${data.image}" alt="Dog">
    `;
  })
  .catch(error => {
    console.error('Error loading story:', error);
  });