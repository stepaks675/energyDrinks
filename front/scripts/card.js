function card(id){
    let newMap;
    let mc = document.getElementById("main-content");
    let drinkCard = document.createElement('div');
    let overlay = document.createElement('div');
    let mapa = document.createElement('div');
    
    mapa.id="map"
    overlay.classList.add("overlay");
    drinkCard.classList.add("card");

    mc.appendChild(overlay);
    overlay.appendChild(drinkCard);
    drinkCard.appendChild(mapa);

    overlay.addEventListener("click", function clicker(){
        overlay.removeEventListener("click", clicker);
        mc.removeChild(overlay);
    } )
    drinkCard.addEventListener("click", (event) => {
        event.stopPropagation();
    });

    ymaps.ready(init);
    function init(){
        newMap = new ymaps.Map("map", {
            center: [56.33389914276738,43.95430436148636],
            zoom: 14
        })
    }

    axios.get(`/api/catalog/product/${id}`).then(val =>{
        val.data.forEach(element => {
            let coords = element.shopAdress.split(", ");
            console.log(coords)
            let pmark = new ymaps.Placemark([Number(coords[0]), Number(coords[1])],{
                balloonContent: `${element.price} Р`
            })
            newMap.geoObjects.add(pmark);
        });
    })

}