async function update(){
    let response = await fetch("/api/catalog/5ka")
    let val = await response.json();
    const cont = document.getElementById("container")
    for (let key in val){

            let newDiv = document.createElement('div')
            newDiv.classList.add("energyDrink")

            let name = document.createElement('h3')
            name.classList.add("energyDrinkName")

            let image = document.createElement('img')
            image.classList.add("energyDrinkImage")

            image.src = val[key]
            image.alt = key
            name.textContent = key

            newDiv.appendChild(image)
            newDiv.appendChild(name)

            cont.appendChild(newDiv);
        }
}

document.getElementById('updButton').onclick = update;