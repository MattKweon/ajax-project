var $navBar = document.querySelector('.nav-bar');
var $searchDisplay = document.querySelector('.search-display');
var $recipeDisplay = document.querySelector('.recipe-display');
var $libraryDisplay = document.querySelector('.library-display');
var $recipeCardList = document.querySelector('.recipe-card-list');
var $modalDisplay = document.querySelector('.modal-display');
var $searchForm = document.querySelector('.search-form');
var $searchBar = document.querySelector('#search-bar');
var searchInput = '';
var $ldsCircle = document.querySelector('.lds-circle');
var $networkErrorMsg = document.querySelector('.network-error-msg');
var $noRecipeMsg = document.querySelector('.no-recipe-msg');
var $here = document.querySelector('#here');

function handleClickNavBar(e) {
  var $recipeCard = document.querySelector('.recipe-card');
  if (data.recipe) {
    if ($recipeCard) {
      $recipeCard.remove();
    }
  }
  if ($noRecipeMsg) {
    $noRecipeMsg.classList.add('hidden');
  }
  data.recipe = null;
  if (e.target.matches('#search-btn')) {
    data.view = 'search-view';
  }
  if (e.target.matches('#library-tab')) {
    data.view = 'library-view';
  }
  switchDisplay();
}

$navBar.addEventListener('click', handleClickNavBar);

function handleClickHeartBtn(e) {
  if (e.target.matches('.like-btn')) {
    switchHeartBtn();
    data.savedRecipe = true;
    data.recipe.id = data.nextEntryId;
    data.library.push(data.recipe);
    data.nextEntryId++;
    $recipeCardList.prepend(createNewRecipe(data.library[data.library.length - 1]));
  }
  if (e.target.matches('.unlike-btn')) {
    switchModalDisplay('on');
    data.removeId = Number(e.target.closest('li').getAttribute('data-id'));
  }
}

document.addEventListener('click', handleClickHeartBtn);

function handleClickModal(e) {
  switchModalDisplay('off');
  if (e.target.matches('.confirm-btn')) {
    var $cardNodeList = document.querySelectorAll('.recipe-card');
    if (data.view === 'recipe-view') {
      data.view = 'search-view';
      switchDisplay();
      data.library.pop();
      $cardNodeList[0].remove();
    }
    for (var i = 0; i < data.library.length; i++) {
      if (data.removeId === data.library[i].id) {
        data.library.splice(i, 1);
      }
    }
    for (var j = 0; j < $cardNodeList.length; j++) {
      if (data.removeId === Number($cardNodeList[j].getAttribute('data-id'))) {
        $cardNodeList[j].remove();
      }
    }
  }
}

$modalDisplay.addEventListener('click', handleClickModal);

$here.addEventListener('click', function (e) {
  data.view = 'search-view';
  switchDisplay();
});

function getCocktailData(name) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://api.api-ninjas.com/v1/cocktail?name=' + name);
  xhr.setRequestHeader('X-Api-Key', 'ujIh5vKEEre0q2ZePCZcoluwqMqEinW21MpI5zdf');
  xhr.responseType = 'json';
  xhr.addEventListener('error', function () {
    $networkErrorMsg.classList.remove('hidden');
  });
  xhr.addEventListener('load', function () {
    data.recipe = xhr.response[0];
    $searchForm.reset();
    if (data.recipe === undefined) {
      $noRecipeMsg.classList.remove('hidden');
      $ldsCircle.classList.add('hidden');
    } else {
      getCocktailImg(searchInput);
    }
  });
  xhr.send();
}

function getCocktailImg(name) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://api.pexels.com/v1/search?query=' + name + ' cocktail');
  xhr.setRequestHeader('Authorization', '563492ad6f917000010000013f401851feb74faca5ffe16effdf2403');
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    var imgUrl = xhr.response.photos[0].src.original;
    data.recipe.imgUrl = imgUrl;
    var searchEntry = {
      imgUrl: data.recipe.imgUrl,
      name: data.recipe.name,
      ingredients: data.recipe.ingredients,
      instructions: data.recipe.ingredients
    };
    $recipeDisplay.append(createNewRecipe(searchEntry));
    $ldsCircle.classList.add('hidden');
  });
  xhr.send();
}

$searchBar.addEventListener('input', function (e) {
  searchInput = e.target.value;
});

$searchForm.addEventListener('submit', function (e) {
  e.preventDefault();
  data.view = 'recipe-view';
  data.savedRecipe = false;
  switchDisplay();
  $ldsCircle.classList.remove('hidden');
  getCocktailData(searchInput);
});

function beforeReloading(e) {
  switchDisplay();
  if (data.view === 'recipe-view') {
    $recipeDisplay.append(createNewRecipe(data.recipe));
  }
  if (data.library) {
    for (var i = 0; i < data.library.length; i++) {
      $recipeCardList.prepend(createNewRecipe(data.library[i]));
    }
  }
}

document.addEventListener('DOMContentLoaded', beforeReloading);

window.addEventListener('pagehide', beforeReloading);

function switchDisplay() {
  if (data.view === 'search-view') {
    $searchDisplay.classList.remove('hidden');
    $recipeDisplay.classList.add('hidden');
    $libraryDisplay.classList.add('hidden');
  }
  if (data.view === 'recipe-view') {
    $searchDisplay.classList.add('hidden');
    $recipeDisplay.classList.remove('hidden');
    $libraryDisplay.classList.add('hidden');
  }
  if (data.view === 'library-view') {
    $searchDisplay.classList.add('hidden');
    $recipeDisplay.classList.add('hidden');
    $libraryDisplay.classList.remove('hidden');
  }
}

function switchHeartBtn() {
  var $likeBtn = document.querySelector('.like-btn');
  var $unlikeBtn = document.querySelector('.unlike-btn');
  $likeBtn.classList.add('hidden');
  $unlikeBtn.classList.remove('hidden');
}

function switchModalDisplay(status) {
  if (status === 'on') {
    $modalDisplay.classList.remove('hidden');
  }
  if (status === 'off') {
    $modalDisplay.classList.add('hidden');
  }
}

function titleCase(string) {
  var output = '';
  string = string.toLowerCase().split(' ');

  output = string[0][0].toUpperCase() + string[0].slice(1).toLowerCase();
  if (string.length === 1) {
    return output;
  }
  output += ' ';
  if (string.length > 1 && string.length !== 2) {
    for (var i = 1; i < string.length - 1; i++) {
      if (string[i] === 'and' || string[i] === 'or' || string[i] === 'nor' || string[i] === 'but' ||
        string[i] === 'a' || string[i] === 'an' || string[i] === 'the' || string[i] === 'as' || string[i] === 'at' ||
        string[i] === 'by' || string[i] === 'for' || string[i] === 'in' || string[i] === 'of' || string[i] === 'on' ||
        string[i] === 'per' || string[i] === 'to') {
        output += string[i].toLowerCase() + ' ';
      } else {
        output += string[i][0].toUpperCase() + string[i].slice(1).toLowerCase() + ' ';
      }
    }
  }
  output += string[string.length - 1][0].toUpperCase() + string[string.length - 1].slice(1).toLowerCase();
  return output;
}

function createNewRecipe(entry) {
  var ingredientList = entry.ingredients;
  var cardContainer = document.createElement('li');
  cardContainer.setAttribute('class', 'recipe-card container');
  cardContainer.setAttribute('data-id', entry.id);
  var rowEl = document.createElement('div');
  rowEl.setAttribute('class', 'row wrap');
  cardContainer.appendChild(rowEl);
  var colHalf = document.createElement('div');
  colHalf.setAttribute('class', 'col-half');
  rowEl.appendChild(colHalf);
  var imgContainer = document.createElement('div');
  imgContainer.setAttribute('class', 'img-container');
  colHalf.appendChild(imgContainer);
  var cocktailImg = document.createElement('img');
  cocktailImg.setAttribute('class', 'cocktail-img');
  cocktailImg.setAttribute('src', entry.imgUrl);
  cocktailImg.setAttribute('alt', entry.name);
  imgContainer.appendChild(cocktailImg);
  var newColHalf = document.createElement('div');
  newColHalf.setAttribute('class', 'recipe-content col-half');
  rowEl.appendChild(newColHalf);
  var cocktailName = document.createElement('h1');
  cocktailName.textContent = titleCase(entry.name);
  newColHalf.appendChild(cocktailName);
  var likeBtn = document.createElement('input');
  likeBtn.setAttribute('type', 'image');
  likeBtn.setAttribute('class', 'like-btn');
  likeBtn.setAttribute('src', 'images/heart-outline.png');
  likeBtn.setAttribute('alt', 'Like Button');
  newColHalf.appendChild(likeBtn);
  var unlikeBtn = document.createElement('input');
  unlikeBtn.setAttribute('type', 'image');
  unlikeBtn.setAttribute('class', 'unlike-btn');
  unlikeBtn.setAttribute('src', 'images/heart-fill.png');
  unlikeBtn.setAttribute('alt', 'Unlike Button');
  newColHalf.appendChild(unlikeBtn);
  var ingredients = document.createElement('h3');
  ingredients.textContent = 'Ingredients';
  newColHalf.appendChild(ingredients);
  var ul = document.createElement('ul');
  newColHalf.appendChild(ul);
  for (var i = 0; i < ingredientList.length; i++) {
    var li = document.createElement('li');
    li.textContent = ingredientList[i];
    ul.appendChild(li);
  }
  var instructions = document.createElement('h3');
  instructions.textContent = 'Instructions';
  newColHalf.appendChild(instructions);
  var p = document.createElement('p');
  p.textContent = entry.instructions;
  newColHalf.appendChild(p);
  if (!data.savedRecipe) {
    unlikeBtn.classList.add('hidden');
  } else {
    likeBtn.classList.add('hidden');
  }
  return cardContainer;
}
