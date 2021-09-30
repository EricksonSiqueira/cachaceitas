const searchButton = document.querySelector('#search-btn');
const randomButton = document.querySelector('#random-button');
const hiddenButton = document.querySelector('.modal-close');
const modal = document.querySelector('#modal-drink');

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

const getMeasuresArr = (drink) => {
  const measures = [];
  for (let i = 1; i <= 15; i += 1) {
    const measure = drink.drinks[0][`strMeasure${i}`];
    if (measure !== null) measures.push(measure);
  }

  return measures;
}

const getIngredientsArr = (drink) => {
  const ingredients = [];
  for (let i = 1; i <= 15; i += 1) {
    const ingredient = drink.drinks[0][`strIngredient${i}`];
    if (ingredient !== null) ingredients.push(ingredient);
  }

  return ingredients;
}

const getDrinkID = (target) => {
  const div = document.querySelector('.drink');
  if (target !== div) {
    return target.closest('.drink').id;
  } else {
    return target.id;
  }
};

const showModal = () => {
  modal.classList.add('show');
  modal.classList.remove('hide')
};

const getItensForPopUp = async ({ target }) => {
  const id = getDrinkID(target);
  const drinkObj = await getDrinkById(id);
  const drink = drinkObj.drinks[0];
  const ingredients = getIngredientsArr(drinkObj);
  const measures = getMeasuresArr(drinkObj);
  console.log(drink);
  createPopUpDrink(drink, ingredients, measures);
  showModal();
}

const generateDefaultTable = () => {
  const tableModal = document.querySelector('.ingredients-table');
  tableModal.innerHTML = '';
  const tr = document.createElement('tr');
  const thIngridient = document.createElement('th');
  const thMeasure = document.createElement('th');

  thIngridient.innerHTML = 'Ingredients';
  thMeasure.innerHTML = 'Measures';

  tr.appendChild(thIngridient);
  tr.appendChild(thMeasure);

  tableModal.appendChild(tr);
}

const createPopUpDrink = ({ strInstructions, strDrinkThumb, strDrink, }, ingredients, measures) => {
  const imgModal = document.querySelector('.drink-img-modal');
  const tableModal = document.querySelector('.ingredients-table');
  const drinkNameModal = document.querySelector('.drink-name');
  const recipeModal = document.querySelector('.recipe');
  
  imgModal.src = strDrinkThumb;
  drinkNameModal.innerHTML = strDrink;
  generateDefaultTable();
  recipeModal.innerHTML = strInstructions;

  ingredients.forEach((ingredient, index) => {
    const tr = document.createElement('tr');
    const tdIngredient = document.createElement('td');
    const tdMeasure = document.createElement('td');
    tdIngredient.innerHTML = ingredient;

    if(measures[index]){
      tdMeasure.innerHTML = measures[index];
    } else {
      tdMeasure.innerHTML = '-';
    }

    tr.appendChild(tdIngredient);
    tr.appendChild(tdMeasure);

    tableModal.appendChild(tr);
  });

  // <div id="modal-drink" class="modal-container">
  //   <div class="modal">
  //     <div class="top">
  //       <img class="drink-img-modal" src="https://www.thecocktaildb.com/images/media/drink/ypl13s1504890158.jpg"
  //         alt="imagem do drink">
  //       <div class ="ingredients-names">
  //       <h3 class ="drink-name">Nome do drink</h3>
  //       <table class ="ingredients-table">
  //       <tr>
  //       <th>Ingredientes</th>
  //       <th>Quantidades</th>
  //       </tr>
  //       </table>
  //       </div>
  //     </div>
}

const createDrink = async ({ strDrinkThumb, strDrink, idDrink }) => {
  const section = document.querySelector('.drinks-section');

  const div = document.createElement('div');
  div.className = 'drink';
  div.id = idDrink;
  div.addEventListener('click', getItensForPopUp);
  const img = document.createElement('img');
  img.src = strDrinkThumb;
  img.className = 'drink-img pink-neon';
  const span = document.createElement('span');
  span.classList.add('green-neon')
  span.innerText = strDrink;
  div.appendChild(span);
  div.appendChild(img);
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

const hiddenModal = () => {
  modal.classList.remove("show");
  modal.classList.add('hide');
}

modal.addEventListener('click', ( {target} ) => {
  if (target.classList.contains('modal-container')){
    hiddenModal();
  }
});
hiddenButton.addEventListener('click', hiddenModal);

searchButton.addEventListener('click', (event) => {
  event.preventDefault();
  const formSelec = document.querySelector(".select");
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
