const searchButton = document.querySelector('#search-btn');
const randomButton = document.querySelector('#random-button');

const getDrinkByName = async (drink) => {
  const API_URL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
  const res = await fetch(`${API_URL}${drink}`);
  const data = await res.json();

  return data;
};

const getDrinkByIngredient = async (ingredient) => {
  const API_URL = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=';
  const res = await fetch(`${API_URL}${ingredient}`);
  const data = await res.json();

  return data;
};

const getRandomDrink = async () => {
  const API_URL = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';
  const res = await fetch(API_URL);
  const data = await res.json();

  return data;
};

const getDrinkById = async (id) => {
  const API_URL = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=';
  const res = await fetch(`${API_URL}${id}`);
  const data = await res.json();
  return (data);
}

const getIngredientsArr = (drink) => {
  const ingredients = [];
  for (let i = 1; i <= 15; i += 1) {
    const ingredient = drink.drinks[0][`strIngredient${i}`];
    if (ingredient !== null) ingredients.push(ingredient);
  }
  return ingredients;
}

const getDrinkID = async ({ target }) => {
  const div = document.querySelector('.drink');
  if (target !== div) {
    return getDrinkById(target.closest('.drink').id);
  } else {
    return getDrinkById(target.id);
  }
};

const createDrink = async ({ strDrinkThumb, strDrink, idDrink }) => {
  const section = document.querySelector('.drinks-section');

  const div = document.createElement('div');
  div.className = 'drink';
  div.id = idDrink;
  div.addEventListener('click', getDrinkID);
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

const renderClaudiaoError = () => {

}

const renderDrink = async (searchType, search) => {
  try {
    if (searchType === 'name') {
      clearDrinksSection();
      const newDrink = await getDrinkByName(search);
      newDrink.drinks.forEach((drink) => createDrink(drink));

    } else if (searchType === 'ingredient') {
      clearDrinksSection();
      const newDrink = await getDrinkByIngredient(search);
      newDrink.drinks.forEach((drink) => createDrink(drink));
    }
  } catch {

  }
}

searchButton.addEventListener('click', (event) => {
  event.preventDefault();
  const formSelec = document.querySelector(".form-select");
  const searchSelected = formSelec.value;
  const inputValue = document.querySelector('#search-input').value;

  renderDrink(searchSelected, inputValue);
});

randomButton.addEventListener('click', async (event) => {
  event.preventDefault();
  clearDrinksSection();
  const resObj = await getRandomDrink();
  createDrink(resObj.drinks[0]);
})

window.onload = () => {
  renderDrink('name', '');
};
