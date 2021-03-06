import axios, {
    AxiosResponse,
    AxiosError
} from "../../node_modules/axios/index";

interface Car {
    id: number;
    vendor: string;
    model: string;
    price: number;
}

let weburl: string = "https://localhost:44313/api/cars";
document.getElementById("ShowCars").addEventListener("click", GetAllCars);
document.getElementById("getByVendorButton").addEventListener("click", GetAllByVendor)
document.getElementById("getByVendorPriceButton").addEventListener("click", GetAllByVendorAndPrice)
document.getElementById("addNewCarButton").addEventListener("click", AddNewCar)
document.getElementById("DeleteCarButton").addEventListener("click", DeleteCar)
document.getElementById("UpdateCarButton").addEventListener("click", UpdateCar)
let carList: HTMLUListElement = <HTMLUListElement> document.createElement("ul");


function GetAllCars(){
    axios.get(weburl)
    .then(function(response){
        carList.innerHTML = "";
        carList = <HTMLUListElement> document.createElement("ul");
        response.data.forEach((element: Car) => {
            let car = document.createElement("li");
            car.setAttribute("id", element.id.toString());
            car.innerHTML = (element.id + ": " + element.vendor + ", " + element.model + " (Costs: " + element.price + ")");
            carList.appendChild(car);
        });
        carList.setAttribute("id", "CarsList");
        document.getElementById("placedData").appendChild(carList);
        console.log(response.status);
    })
    .catch(function(error){
        console.log(error);
    });
}

function GetAllByVendor(){
    let inputField: HTMLInputElement = <HTMLInputElement> document.getElementById("getByVendorVendorField");
    axios.get(weburl + "/byVendor/" + inputField.value)
    .then(function(response){
        carList.innerHTML = "";
        carList = <HTMLUListElement> document.createElement("ul");
        response.data.forEach((element: Car) => {
            let car = document.createElement("li");
            car.setAttribute("id", element.id.toString());
            car.innerHTML = (element.id + ": " + element.vendor + ", " + element.model + " (Costs: " + element.price + ")");
            carList.appendChild(car);
        });
        carList.setAttribute("id", "CarsList");
        document.getElementById("getByVendorData").appendChild(carList);
        console.log(response);
    })
    .catch(function(error){
        console.log(error);
    });
}

function GetAllByVendorAndPrice(){
    let inputFieldVendor: HTMLInputElement = <HTMLInputElement> document.getElementById("getByVendorPriceVendorfield");
    let inputFieldPrice: HTMLInputElement = <HTMLInputElement> document.getElementById("getByVendorPricePricefield");
    axios.get(weburl + "/byVendor/" + inputFieldVendor.value + "/price/" + inputFieldPrice.value)
    .then(function(response){
        carList.innerHTML = "";
        carList = <HTMLUListElement> document.createElement("ul");
        response.data.forEach((element: Car) => {
            let car = document.createElement("li");
            car.setAttribute("id", element.id.toString());
            car.innerHTML = (element.id + ": " + element.vendor + ", " + element.model + " (Costs: " + element.price + ")");
            carList.appendChild(car);
        });
        carList.setAttribute("id", "CarsList");
        document.getElementById("getByVendorPriceData").appendChild(carList);
        console.log(response);
    })
    .catch(function(error){
        console.log(error);
    });
}

function AddNewCar(){
    let vendor = (<HTMLInputElement> document.getElementById("addNewCarVendor")).value;
    let model = (<HTMLInputElement> document.getElementById("addNewCarModel")).value;
    let price: number = parseFloat((<HTMLInputElement> document.getElementById("addNewCarPrice")).value);

   
    
    if (vendor != null && model != null && price != null){
        axios.post<Car>(weburl,  {Vendor: vendor,  Model: model, Price: price})
        .then(function(repsonse){
            GetAllCars();
        })
        .catch();
    }
}

function DeleteCar(){
    let Id: number = parseFloat((<HTMLInputElement> document.getElementById("DeleteCarID")).value);

    axios.delete(weburl + "/deleteById/" + Id)
    .then(function(response){
        GetAllCars();
    })
    .catch()
}

function UpdateCar(){
    let Id: number = parseFloat((<HTMLInputElement> document.getElementById("UpdateCarID")).value);
    let vendor = (<HTMLInputElement> document.getElementById("UpdateCarVendor")).value;
    let model = (<HTMLInputElement> document.getElementById("UpdateCarModel")).value;
    let price: number = parseFloat((<HTMLInputElement> document.getElementById("UpdateCarPrice")).value);

   
    
    if (vendor != null && model != null && price != null){
        axios.put<Car>(weburl + "/" + Id,  {Id: Id, Vendor: vendor,  Model: model, Price: price})
        .then(function(repsonse){
            GetAllCars();
        })
        .catch();
    }
}