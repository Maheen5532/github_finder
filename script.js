const searchButton = document.getElementById("searchButton");
    const content = document.getElementById("content");
    const heading = document.getElementById("heading");

    searchButton.onclick = getUser;

    function getUser() {
      const username = prompt("Write username here...");

      if (!username) {
        content.innerHTML = `<p class="error">User not found</p>`;
        return;
      }

      fetch(`https://api.github.com/users/${username}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("User not found");
          }
          return response.json();
        })
        .then((user) => {
          heading.style.display = "none"; // Hide the heading
          searchButton.style.display = "none"; // Hide the search button
          content.innerHTML = `
            <div class="user-info">
              <img src="${user.avatar_url}" alt="Avatar" />
              <h2>${user.name || "No Name"}</h2>
              <p>${user.bio || "No bio available"}</p>
              <p><strong>Public Repositories:</strong> ${user.public_repos}</p>
              <p><strong>Followers:</strong> ${user.followers}</p>
              <button onclick="resetPage()">Search Again</button>
            </div>
          `;
        })
        .catch((error) => {
          content.innerHTML = `<p class="error">Error: ${error.message}</p>`;
        });
    }

    function resetPage() {
      heading.style.display = "block"; // Show the heading again
      searchButton.style.display = "block"; // Show the search button again
      content.innerHTML = ""; // Clear the content
    }