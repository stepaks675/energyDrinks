export class generalService{
    filterUnique(arr){
        let sending = [];
        arr.forEach(obj =>{
            let {name , img, price, _id} = obj;
            _id = String(_id)
            let ex = sending.find(prod => prod.name == name)
            if (ex) {
                if (price<ex.price) {
                    ex.price = price
                    ex._id = _id
                }
            } else sending.push({name , img , price , _id});
        })
        return sending;
    }
    excludeExtra(arr){
        let sending = [];
        arr.forEach(obj =>{
            let {price , shopAdress} = obj;
            sending.push({price, shopAdress})
        })
        return sending;
    }
}