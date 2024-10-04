async function updater(){
    //обновление всех баз данных по очереди
    let spinner = document.getElementById("reloadicon").classList.add("rotating");
    let shops = ["5ka","magnet"]
    
    for (let shop of shops){
        try{
        let resp = await axios.get(`/api/update/${shop}`)
        alert(`база данных магазина ${shop} успешно обновлена`)
        } catch (err){
            alert(`при обновлении базы данных магазина ${shop} произошла ошибка, попробуйте еще раз позднее`)
        }
    }
    document.getElementById("reloadicon").classList.remove("rotating");

}

document.getElementById("updButton").onclick = function(){
    updater()
}