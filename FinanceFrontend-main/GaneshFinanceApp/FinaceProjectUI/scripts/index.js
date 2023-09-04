var amtSlider = document.getElementById("amtInput");
var amtOutput = document.getElementById("amount");
amtOutput.innerHTML = Number(amtSlider.value);

var tenureSlider = document.getElementById("tenureInput");
var tenureOutput = document.getElementById("tenure");
tenureOutput.innerHTML = Number(tenureSlider.value);

function calculateEmi() {
    var p = Number(document.getElementById("amtInput").value)
    var r = Number(document.getElementById("loanType").value)
    var n = Number(document.getElementById("tenureInput").value)
    const emi = (p * r * Math.pow((1 + r), n)) / (Math.pow(1 + r, n) - 1);
    document.getElementById("emi").innerHTML = "\u20B9" + emi.toFixed(2)
}

amtSlider.addEventListener("input", () => {
    amtOutput.innerHTML = amtSlider.value
    calculateEmi()
})

tenureSlider.addEventListener("input", () => {
    tenureOutput.innerHTML = tenureSlider.value
    calculateEmi()
})

loanType.addEventListener("change", () => {
    calculateEmi()
})

window
    .addEventListener(
        'DOMContentLoaded', () => {
            calculateEmi()
        }
    )