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

let weburl: string = "http://localhost:54180/api/cars";
document.getElementById("ShowCars").addEventListener("click", GetAllCars);
document.getElementById("getByVendorButton").addEventListener("click", GetAllByVendor)
document.getElementById("getByVendorPriceButton").addEventListener("click", GetAllByVendorAndPrice)
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