import apiClient from './APIClient.js';

document.addEventListener('DOMContentLoaded', async function() {
    const authToken = localStorage.getItem('token');
    if (!authToken) {
        window.location.href = '/login'; // Redirect to login if not authenticated
        return;
    }

    // Decode the token to retrieve the username
    const decodedToken = jwt_decode(authToken);
    const username = decodedToken.username;

    // Update the header with the username
    const headerDiv = document.querySelector('.user');
    headerDiv.textContent = `@${username}`;

    try {
        const howls = await apiClient.getHowls();
        renderHowls(howls); // Include this line to render howls data
    } catch (error) {
        console.error('Error fetching howls:', error);
    }
});

document.getElementById('howlForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const howlContent = document.getElementById('howlContent').value;

    try {
        await apiClient.postHowl(howlContent);
        // Optionally, fetch and render howls again to update the list
        const howls = await apiClient.getHowls();
        for (let i = 0; i < howls.length; i++) {
            console.log('howls ' + howls[i].text);
        }
        // console.log('howls ' + howls);
        renderHowls(howls);
    } catch (error) {
        console.error('Error posting howl:', error);
    }
});

function renderHowls(howls) {
    const howlContainer = document.getElementById('howlContainer');
    howlContainer.innerHTML = ''; // Clear existing howls

    // Sort howls by datetime in reverse chronological order
    howls.sort((a, b) => new Date(b.datetime) - new Date(a.datetime));

    howls.forEach(howl => {
        const howlDiv = document.createElement('div');
        howlDiv.className = 'howl';
        // console.log('main ' + howl.text);
        howlDiv.innerHTML = `
            <div class="howl-content">${howl.text}</div> 
            <div class="howl-user">@${howl.username}</div> 
            <div class="howl-datetime">${new Date(howl.datetime).toLocaleString('en-US')}</div>
        `;
        howlContainer.appendChild(howlDiv);
    });
}

