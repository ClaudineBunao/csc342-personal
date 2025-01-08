const howls = [
  {
    user: "@student",
    message: "This is a sample howl. #example"
  },
  {
    user: "@graduate",
    message: "Another sample howl for the feed!"
  },
  {
    user: "@student",
    message: "This is a sample howl. #example"
  },
  {
    user: "@faculty",
    message: "This is a sample howl. #example"
  },
  {
    user: "@student",
    message: "This is a sample howl. #example"
  },
  {
    user: "@graduate",
    message: "This is a sample howl. #example"
  },
  {
    user: "@graduate",
    message: "Yet another howl to showcase the feed layout."
  }
];

/* HTML to Create
<div class="howl container">
  <div class="user">@user3</div>
  <div class="content">Yet another howl to showcase the feed layout.</div>
  <div class="actions">
    <a href="#">Reply</a>
    <a href="#">Rehowl</a>
    <a href="#">Like</a>
  </div>
</div>
*/

howlContainer = document.querySelector('#howl-list');

howls.forEach(howl => {
  let howlObj = document.createElement('div');
  howlObj.className = 'howl container';
  howlContainer.appendChild(howlObj);  //creates howl obj and empty div

  let howlUser = document.createElement('div');
  howlUser.className = 'user';
  howlUser.innerHTML = howl.user; //value of that specific user ex user3
  howlObj.appendChild(howlUser);

  let howlContent = document.createElement('div');
  howlContent.className = 'content';
  howlContent.innerHTML = howl.message;
  howlObj.appendChild(howlContent);

  let howlActions = document.createElement('div');
  howlActions.className = 'actions';

  let howlRep = document.createElement('a');
  howlRep.href = '#';
  howlRep.textContent = "Reply";
  howlActions.appendChild(howlRep);

  let howlReh = document.createElement('a');
  howlReh.href = '#';
  howlReh.textContent = "Rehowl";
  howlActions.appendChild(howlReh);

  let howlLike = document.createElement('a');
  howlLike.href = '#';
  howlLike.textContent = "Like";
  howlActions.appendChild(howlLike);

  howlObj.appendChild(howlActions);
  

  //creat elem for use and val from array of howls
})