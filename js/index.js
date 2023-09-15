//When the form is submitted, it should take the value of the input & search GitHub for user matches using the User Search Endpoint.
//Using the results, display information about the users to the page (username, avatar, & link to their profile)
const form = document.getElementById("github-form");
const searchWord = document.getElementById("search");

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const searchInfo = searchWord.value;
  searchWord.value = "";
  fetch(`https://api.github.com/search/users?q=${searchInfo}`, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/vnd.github.v3+json",
    },
  })
    .then((res) => res.json())
    .then(function (data) {
      const userList = document.getElementById("user-list");
      userList.innerHTML = ""; // Clear previous user list
      data.items.forEach(function (item) {
        const newItem = document.createElement("div");
        const itemDiv = document.createElement("div");
        newItem.setAttribute("id", item.id);
        newItem.className = "card";
        itemDiv.className = "getData";

        const loginText = document.createTextNode(item.login);
        newItem.appendChild(loginText);

        let img = document.createElement("img");
        let p = document.createElement("p");
        let url = document.createElement("a");

        img.src = item.avatar_url;
        img.style.display = "block";
        img.style.width = "100px";
        img.style.height = "100px";
        p.innerHTML = item.full_name;
        url.textContent = "Click here to visit the profile!";
        url.setAttribute("href", item.html_url);
        //
        newItem.style.padding = "50px";
        //
        itemDiv.appendChild(img);
        itemDiv.appendChild(p);
        itemDiv.appendChild(url);
        newItem.appendChild(itemDiv);
        userList.appendChild(newItem);
        //
        newItem.addEventListener("click", function () {
          const reposList = document.getElementById("repos-list");
          reposList.innerHTML = ""; // Clear previous repositories
        //   this.style.color = "pink";
          fetch(`https://api.github.com/users/${item.login}/repos`, {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/vnd.github.v3+json",
            },
          })
            .then((res) => res.json())
            .then(function (repos) {
              repos.forEach(function (repo) {
                let p = document.createElement("p");
                p.innerHTML = repo.name;
                reposList.appendChild(p);
              });
            });
        });
      });
    });
});

//*createTextNode "creates a new text node with the specified text as its content. It ensures that any special characters in the text are properly escaped, preventing them from being interpreted as HTML or potentially malicious scripts. By creating a text node for the user's login name, we are adding an additional layer of security to prevent any unintended or potentially malicious HTML or script injections." -Ada AI Chatbot