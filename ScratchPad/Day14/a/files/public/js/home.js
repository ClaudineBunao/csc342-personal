import { } from './darkMode.js';
import HTTPClient from './HTTPClient.js';


//Task a.4: Displaying Howls on the Frontend
const howlList = document.getElementById('howlList');
const howlTemplate = document.getElementById('howlTemplate');

function renderHowl(howl) {
    const howlInstance = howlTemplate.content.cloneNode(true);
    const howlElement = howlInstance.querySelector('.howl.container');
    
    const howlUser = howlElement.querySelector('.user');
    howlUser.textContent = howl.user;
    
    const howlContent = howlElement.querySelector('.content');
    howlContent.textContent = howl.message;

    //appear at the top
    howlList.prepend(howlElement);
        
}

HTTPClient.get('/howls').then(howls =>{
    howls.forEach(howl => {
        renderHowl(howl);
    });
});

//Task b.1: Posting New Howls

