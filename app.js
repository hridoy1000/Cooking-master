const firstUrl = "https://www.themealdb.com/api/json/v1/1/";
const inputArea = document.getElementById("search-field");
const searchBtn = document.getElementById("search-btn");
const display = document.getElementById("display");
const details = document.getElementById("details-area");

searchBtn.addEventListener("click",()=>{
    searchByName(inputArea.value);
            })
            const searchByName = keyword =>{
                if (keyword != "") {
                    load(display, true);
                    let url = `${firstUrl}search.php?s=${keyword}`;
                    fetch(encodeURI(url))
                    .then(data=>data.json())
                    .then(data=>{
                        load(display, false);
                        displayFood(data);
                    });
                }    
            }
            const displayFood = data => {
                if (data.meals === null) {
                    showNotFoundMessage();
                } else {
                    display.innerHTML = createFoodCard(data)
                }
            }
            const showNotFoundMessage = () => {
                display.innerHTML = `<h1>Not found</h1><br>
                <span class="material-icons" style="font-size:30px;padding: 20px 10px">
                sentiment_very_dissatisfied
                </span>`;
            }
            const createFoodCard = data => {
                let meals = data.meals;
                let elementString = "";
                meals.forEach(data => {
                        elementString += `<div class="food-item" onclick="showFoodDetails(${data.idMeal})">
                            <div class="thumbnail">
                                <img src="${data.strMealThumb}"/>
                            </div>
                            <div class="food-name">
                                <h3>${data.strMeal}</h3>
                            </div>
                        </div>`;
                });
                return elementString;
}
                const showFoodDetails = id => {
                    let url = `${firstUrl}lookup.php?i=${id}`;
                    fetch(encodeURI(url))
                        .then(data=>data.json())
                        .then(data=>{
                            let item = data.meals[0];
                            let ingredients = "";
                            for(let i = 1; i <= 10; i++){
                                ingredients += `<li><i class="material-icons">check_box</i> ${item["strIngredient"+i]}</li>`;
                            }
                        details.innerHTML = `<section id="modal">
                        <div class="modal-content">
                            <div class="modal-body">
                            <div class="food-details">
                                <button id="modal-btn" onclick="hideDetails()">X</button>
                                <img src="${item.strMealThumb}" />
                                <div class="details">
                                <h1>${item.strMeal}</h1>
                                <h4>Ingredients</h4>
                                <ul>${ingredients}</ul>
                                </div>
                            </div>
                            </div>
                        </div>
                        </section>`;
                    });
}
const hideDetails = ()=> {
    details.innerHTML = "";
}
const load = (parent, argument) => {
    argument ? parent.innerHTML = `<div class="load"></div>` : "";
}