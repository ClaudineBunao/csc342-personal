import apiClient from './APIClient.js';

document.addEventListener('DOMContentLoaded', async function () {
    try {
        // Fetch user info to check if the user is authenticated
        const userInfo = await apiClient.getUserInfo();
        // console.log('User info:', userInfo);

        // Display the username on the home page
        const usernameElement = document.getElementById('username');
        if (usernameElement) {
            usernameElement.textContent = userInfo.username;
        }

        const headerDiv = document.querySelector('.user');
        if (headerDiv) {
            headerDiv.textContent = `@${userInfo.username}`;

            // Create a logout option
            const logoutOption = document.createElement('div');
            logoutOption.textContent = 'Logout';
            logoutOption.classList.add('logout-option');

            // Append the logout option to the headerDiv
            headerDiv.appendChild(logoutOption);

            // Log out and redirect to the login page when the logout option is clicked
            logoutOption.addEventListener('click', async function () {
                await apiClient.logout();
                window.location.href = '/login';
            });
        }

        const howls = await apiClient.getHowls();
        renderHowls(howls); 
    } catch (error) {
        console.error('Error fetching user info:', error);
        window.location.href = '/login'; // Redirect to login if not authenticated
    }
});

document.getElementById('howlForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    const howlContent = document.getElementById('howlContent').value;

    try {
        await apiClient.postHowl(howlContent);
        // Optionally, fetch and render howls again to update the list
        const howls = await apiClient.getHowls();
        renderHowls(howls);
        // for (let i = 0; i < howls.length; i++) {
        //     console.log('howls ' + howls[i].text);
        // }
        // // console.log('howls ' + howls);
        // renderHowls(howls);
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
        // const user = users[howl.userId];
        const howlDiv = document.createElement('div');
        howlDiv.className = 'howl';
        // console.log('main ' + howl.text);
        howlDiv.innerHTML = `
            <div class="howl-user">@${howl.username}</div> 
            <div class="howl-content">${howl.text}</div> 
            <div class="howl-datetime">${new Date(howl.datetime).toLocaleString('en-US')}</div>
        `;
        howlContainer.appendChild(howlDiv);
    });
}
