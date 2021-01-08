const id = window.location.href.split('?')[1].split('=')[1];
const description = document.getElementById("table");
const endpoint = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
fetch(endpoint).then(blob => blob.json()).then(data => {
    const meal = data.meals[0];
    description.innerHTML =`<tr>
    <td>Id:</td>
    <td>${meal.idMeal}</td>
  </tr>
  <tr>
    <td>Name:</td>
    <td>${meal.strMeal}</td>
  </tr>
  <tr>
    <td>Instructions:</td>
    <td>${meal.strInstructions}</td>
  </tr>
  
    `;
    console.log(meal);
});