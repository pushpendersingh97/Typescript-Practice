var button = document.querySelector("button");
var input1 = document.getElementById("num1"); // It will tell us the element is HTML Input field only.
var input2 = document.getElementById("num2");
function add(num1, num2) {
    return num1 + num2;
}
button.addEventListener("click", function () {
    console.log(add(+input1.value, +input2.value));
});
