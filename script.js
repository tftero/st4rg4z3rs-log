const repositoriesList = document.getElementById("starred-repositories");

function renderRepositories(repositories) {
  repositoriesList.innerHTML = repositories
    .map(
      (repository) => `
        <li class="repository">
          <h2><a href="${repository.url}" target="_blank" rel="noreferrer">${repository.name}</a></h2>
          <p>${repository.description}</p>
          <div class="meta">
            <span class="language">${repository.language}</span>
          </div>
        </li>
      `,
    )
    .join("");
}

fetch("events.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Failed to load repositories");
    }

    return response.json();
  })
  .then((data) => renderRepositories(data))
  .catch((error) => {
    console.error(error);
    repositoriesList.innerHTML =
      '<li class="repository"><p>Unable to load starred repositories right now.</p></li>';
  });
