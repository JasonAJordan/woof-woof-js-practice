//DOM ELEMENTS //
dogBar = document.querySelector('#dog-bar')
dogInfo = document.querySelector('#dog-info')
filter = document.querySelector('#good-dog-filter')
console.log(filter)

//Event Handlers //

function showDogInfo(singleDogObj) {
    //console.log(singleDogObj)
    dogInfo.innerHTML = `
    <img src=${singleDogObj.image}>
    <h2>${singleDogObj.name}</h2>
    <button>${singleDogObj.isGoodDog ? "Good Dog!" : "Bad Dog!"}</button>`

    // dogButton.innerText = singleDogObj.isGoodDog ? "Good Dog!" : "Bad Dog!"
    goodBtn = dogInfo.querySelector("button")
    goodBtn.dataset.id = singleDogObj.id
    goodBtn.addEventListener("click", onGoodDogButtonClick)

    console.log(goodBtn)
    // goodBtn.addEventListener("click", goodDog)
}

function onGoodDogButtonClick(event){
    let newValue;
    if (event.target.innerText.includes("Good")){
      event.target.innerText = "Bad Dog"
      newValue = false
    } else {
      event.target.innerText = "Good Dog"
      newValue = true
    }

    toggleGoodDog(event.target.dataset.id, newValue)
        .then(getDogs)

}

function dogSpanClick(event) {
    getSingleDog(event.target.dataset.id)
        .then(showDogInfo)

}

filter.addEventListener("click", event => {

    if (filter.innerText === 'Filter good dogs: OFF'){
        filter.innerText = 'Filter good dogs: ON'
        getDogsFilter();

    } else {
        filter.innerText ='Filter good dogs: OFF'
        getDogs();
       
    }



})

// Render Funtions //
function renderDogName(dogObj){

    span = document.createElement('span')
    span.innerHTML = `${dogObj.name}`
    span.dataset.id = dogObj.id
    span.addEventListener("click", dogSpanClick)

    dogBar.append(span)

}

// Fetch Functions //
function getDogs(){
    dogBar.innerHTML = '';

    fetch('http://localhost:3000/pups')
        .then(response => response.json())
        // .then(data => console.log(data));
            .then(dogs => dogs.forEach(dogObj => {
                renderDogName(dogObj);
        }))

}

function getSingleDog(id) {
    // console.log(id)
    return fetch(`http://localhost:3000/pups/${id}`)
        .then(r => r.json())

}

function toggleGoodDog(id, newValue) {
    const options = {
        method: "PATCH",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify({
          isGoodDog: newValue
        })
    }
    return fetch(`http://localhost:3000/pups/${id}`, options)
            .then(r => r.json())
}   

function getDogsFilter(){
    dogBar.innerText = '';

    fetch('http://localhost:3000/pups')
    .then(response => response.json())
    // .then(data => console.log(data));
        .then(dogs => dogs.forEach(dogObj => {
            if (dogObj.isGoodDog === true){
                renderDogName(dogObj);
            }
    }))

}




//inti renders //

getDogs();