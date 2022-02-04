let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  fetchToys()

  //Fetch toys
  function fetchToys(){
    fetch ('http://localhost:3000/toys')
    .then(resp => resp.json())
    .then(data => {
      displayToys(data)
    })
  }

  const toyCollection = document.getElementById('toy-collection')

  //Create a toy card
  function createToyCard(toy) {
    const div = document.createElement('div')
    div.setAttribute('class', 'card')

    const h2 = document.createElement('h2')
    h2.innerText = toy.name

    const img = document.createElement('img')
    img.src = toy.image
    img.setAttribute('class', 'toy-avatar')

    const p = document.createElement('p')
    if (toy.likes < 2){
      p.innerText = `${toy.likes} like`
    }
    else {p.innerText = `${toy.likes} likes`}

    const btn = document.createElement('button')
    btn.innerText = `Like ❤`
    btn.setAttribute('class', 'like-btn')
    btn.setAttribute('id', `${toy.id}`)

    toyCollection.appendChild(div)
    div.appendChild(h2)
    div.appendChild(img)
    div.appendChild(p)
    div.appendChild(btn)

    //like a toy 
    btn.addEventListener('click', () => {
      toy.likes += 1 
      if (toy.likes < 2){
        p.innerText = `${toy.likes} like`
      }
      else {p.innerText = `${toy.likes} likes`}
      updateLike(toy)
    })

  }


  //Display toy card on DOM
  function displayToys(arr){
    arr.forEach(toy => {createToyCard(toy)}
  )}

  
  const newToyForm = document.querySelector('.add-toy-form')
  newToyForm.addEventListener('submit', handleSubmit)

  const newToyName = document.getElementsByClassName('input-text')[0]
  const newToyImg = document.getElementsByClassName('input-text')[1]

  
  //Handle submit of new form
  function handleSubmit(event){
    event.preventDefault()
    let toyObj = {
      name: newToyName.value,
      image: newToyImg.value,
      likes: 0
    }
    addNewToy(toyObj)
    newToyName.value = ''
    newToyImg.value = ''
  }

  //Adding new toy to database & DOM
  function addNewToy(toyObj){
    fetch('http://localhost:3000/toys', {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }, 
      body: JSON.stringify(toyObj)
    })
    .then(resp => resp.json())
    .then(data => {
      console.log(data)
      createToyCard(data)
    })
  }
  

  //Updating toy on database
  function updateLike(toyObj){
    fetch(`http://localhost:3000/toys/${toyObj.id}`, {
      method: 'PATCH', 
      headers:{
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body:JSON.stringify(toyObj)
    })
    .then(resp => resp.json())
    .then(data => console.log(data))
  }


});
