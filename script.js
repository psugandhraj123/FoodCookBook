const input = document.getElementById("myInput");
const ul1 = document.getElementById("myUL1");
const ul2 = document.getElementById("myUL2");
setInterval(myFunction, 1000);
function addtofav(e){
    console.log(this.parentElement.innerHTML);
    if(!ul2.innerHTML.includes(this.parentElement.innerHTML)){ul2.innerHTML += `
    <li>
    ${this.parentElement.innerHTML}
    </li>`;
    }
}
function removeFromFav(){
    this.parentElement.remove();
}
function myFunction() {
    let buttons = Array.from(ul1.querySelectorAll(".fav"));
    buttons.forEach(button=>button.addEventListener('click',addtofav));
    let removes = Array.from(ul2.querySelectorAll(".fav"));
    removes.forEach(remove=>remove.addEventListener('click',removeFromFav));
 }
function populate(meal,flag){
    
    if (flag == 1){
        return `
        <li>
        <a href="index1.html?id=${meal.idMeal}">
        ${meal.strMeal}
        </a>
        <button class = "fav">
        </button>
        </li>`;
    }
    else{ 
        try {
            ul1.innerHTML = meal.map(element =>`
            <li>
            <a href="index1.html?id=${element.idMeal}">
            ${element.strMeal}
            </a>
            <button class = "fav">
            </button>
            </li>`
            ).join("");
        } catch (error) {
            ul1.innerHTML =`<li><a>"Dish Not Found"</a></li>`;
        }
    }
}
function getmeals(){  
    ul1.innerHTML ="";
    if(input.value == "") {
        const endpoint = 'https://www.themealdb.com/api/json/v1/1/random.php';
        text ="";
        for(i = 0;i<10;i++){ 

            fetch(endpoint).then(blob => blob.json()).then(data =>{
                ul1.innerHTML += populate(data.meals[0],1);
            });
        }
    }
    else{
        const endpoint = `https://www.themealdb.com/api/json/v1/1/search.php?s=${input.value}`;
        fetch(endpoint).then(blob => blob.json()).then(data => populate(data.meals,-1));  
    }
}
window.addEventListener('load',getmeals);
window.addEventListener('popstate',getmeals);
input.addEventListener('keyup',getmeals);
