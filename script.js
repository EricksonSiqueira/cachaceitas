const searchButton = document.querySelector('#search-btn');

const getDrinkByName = async (drink) => {
  const API_URL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
  const res = await fetch(`${API_URL}${drink}`);
  const data = await res.json();
  
  return data;
};

const createDrink = async ({ strDrinkThumb, strDrink }) => {
    const section = document.querySelector('.drinks-section');

    const div = document.createElement('div');
    div.className = 'drink';
    const img = document.createElement('img');
    img.src = strDrinkThumb;
    img.className = 'drink-img';
    const span = document.createElement('span');
    span.innerText = strDrink;

    div.appendChild(img);
    div.appendChild(span);
    section.appendChild(div);
}

const clearDrinksSection = () => {
  const section = document.querySelector('.drinks-section');
  section.innerHTML = '';
}

const renderDrink = async (searchType, search) => {
  if(searchType === 'name'){
    try {
      clearDrinksSection();
      const newDrink = await getDrinkByName(search);
      newDrink.drinks.forEach((drink) => createDrink(drink));
    } catch (error){
      
    }
  } else if (searchType === 'ingredient') {

  }
}

searchButton.addEventListener('click', (event) => {
  event.preventDefault();
  const formSelec = document.querySelector(".form-select");
  const searchSelected = formSelec.value;
  const inputValue = document.querySelector('#search-input').value;
  
  renderDrink(searchSelected, inputValue);
})

window.onload = () => {
    renderDrink('name', '');
};
