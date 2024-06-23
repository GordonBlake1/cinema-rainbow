import { movies } from "../data/movies.js";
import imageFiles from "../data/imageFiles.js";

document.addEventListener("DOMContentLoaded", function () {
  const imageFolder = "../images/";

  // Select a random image file
  const randomIndex = Math.floor(Math.random() * imageFiles.length);
  const randomImageFile = imageFiles[randomIndex];

  // Set the background image
  const backdropImage = document.querySelector(".backdropimage");
  backdropImage.style.backgroundImage = `url(${imageFolder}${randomImageFile}.jpg)`;
});

//Create a yearly array
const moviesByYear = movies.reduce((result, movie) => {
  if (!result[movie.year]) {
    result[movie.year] = [];
  }
  result[movie.year].push(movie);
  return result;
}, {});

//Create an object based on the release year
const movieArraysByYear = Object.keys(moviesByYear).reduce((result, year) => {
  result.push({
    year: parseInt(year),
    movies: moviesByYear[year],
  });
  return result;
}, []);

//generate HTML for 1920s page
let content1920 = document.querySelector("#content-1920");

function generateHTML(movieArraysByYear) {
  let html = "";

  movieArraysByYear.forEach((yearData) => {
    yearData.movies.sort((a, b) => b.rating - a.rating);

    html += `<p class="movie-year">${yearData.year}</p>`;
    yearData.movies.forEach((movie) => {
      let color = "";
      switch (movie.rating) {
        case 10:
          color = "#cc0000";
          break;
        case 9:
          color = "#ff6600";
          break;
        case 8:
          color = "#33cc00";
          break;
        case 7:
          color = "#3366ff";
          break;
        case 6:
          color = "#cc33cc";
          break;
        default:
          color = "#c7c4c4";
      }
      html += `<p class="movie-title" style="color: ${color};">${movie.title} <span class="dir-by">(dir. by </span><span class="movie-director">${movie.director}</span><span class="dir-by">)</span></p>`;
    });
  });

  return html;
}

const html = generateHTML(movieArraysByYear);
content1920.innerHTML = html;
