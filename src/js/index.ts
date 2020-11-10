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
let carList: HTMLUListElement = <HTMLUListElement> document.createElement("ul");
let inputField: HTMLInputElement = <HTMLInputElement> document.getElementById("getByVendorVendorField");

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