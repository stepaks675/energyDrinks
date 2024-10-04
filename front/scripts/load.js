function setActive(){
    Array.from(document.getElementsByClassName("shopbtn")).forEach(el =>{
        el.classList.remove("active")
    })
    this.classList.add("active");

}
function load(shop){
    const cont = document.getElementById("container")
    cont.innerHTML ='';
    axios.get(`/api/catalog/${shop}`).then(val =>{
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

document.getElementById('5ka').onclick = function(){load("5ka");
    setActive.call(this)
};
document.getElementById('magnet').onclick = function(){load("magnet");
    setActive.call(this)
};
// document.getElementById('perek').onclick = function(){load("perek");
//     setActive.call(this)
// };