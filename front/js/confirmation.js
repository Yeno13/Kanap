let str = window.location.href;
let url = new URL(str);

let orderId = url.searchParams.get("orderId");

if(orderId === null) {
    window.location.href = "./index.html";
}else {
    const orderNumber = document.getElementById("orderId");
    orderNumber.innerText = orderId;
    console.log(orderId);
    localStorage.clear();
}