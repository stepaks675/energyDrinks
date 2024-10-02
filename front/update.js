function update(){
    const cont = document.getElementById("container")
    cont.innerHTML ='';
    axios.get("/api/catalog/5ka").then(val =>{
        val.data.forEach((obj)=>{

            let newDiv = document.createElement('div')
            newDiv.classList.add("energyDrink")
            newDiv.id = obj._id;

            let name = document.createElement('h3')
            name.classList.add("energyDrinkName")

            let price = document.createElement('h2')
            price.classList.add("energyDrinkPrice")

            let image = document.createElement('img')
            image.classList.add("energyDrinkImage")

            image.src = obj.img;
            image.alt = obj.name;
            name.textContent = obj.name;
            price.textContent = obj.price;

            
            newDiv.appendChild(image)
            newDiv.appendChild(name)
            newDiv.appendChild(price)

            cont.appendChild(newDiv);

            newDiv.addEventListener('click', ()=>{
                card(newDiv.id);
            })
        })  
        }
    )
}
document.getElementById('updButton').onclick = update;