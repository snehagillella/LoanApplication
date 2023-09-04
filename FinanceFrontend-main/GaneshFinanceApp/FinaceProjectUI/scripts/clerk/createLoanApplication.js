const roi = {
    HMLN: 0.05,
    VHLN: 0.15,
    GDLN: 0.35
}

function setRoi() {
    const SelectLoan_id = document.getElementById("loanType")
    const allOptionsL = SelectLoan_id.options
    const indexL = SelectLoan_id.selectedIndex
    const selectedOptionL = allOptionsL[indexL]
    var loan_id = selectedOptionL.value
    console.log(roi[loan_id])
    const rateInput = document.getElementById("rate")
    rateInput.value = roi[loan_id]
}

function calcEMI() {
    var n = document.getElementById("tenure").value
    var p = document.getElementById("amount").value
    var r = document.getElementById("rate").value
    var loanType = document.getElementById("loanType").value
    console.log("hello")
    if (isNaN(n) || n <= 0) {
        alert("please choose a  Tenure")
        return;
    } else if (isNaN(p) || p <= 0) {
        alert("please choose an amount")
        return;
    }
    n = Number(n)
    p = Number(p)
    r = Number(r)
    const emi = (p * r * Math.pow((1 + r), n)) / (Math.pow(1 + r, n) - 1);
    document.getElementById("emi").value = emi.toFixed(2)
}

function validate(loan_id, custID, amount, tenure, emi, aadharElement, panElement) {

    if (loan_id == "") {
        alert("please choose a Loan Type")
        return 0;
    } else if (custID == "" || custID.length != 23) {
        alert("invalid customer ID")
        return 0;
    } else if (tenure == "") {
        alert("please choose a  Tenure")
        return 0;
    } else if (isNaN(amount) || amount <= 0) {
        alert("please choose an amount")
        return 0;
    } else if (isNaN(emi) || emi <= 0) {
        alert("please calculate EMI")
        return 0;
    } else if (!aadharElement) {
        alert("submit your aadhar image")
        return 0;

    } else if (!panElement) {
        alert("submit your pan image")
        return 0;

    }
    return 1;
}

async function convertToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = () => {
            const base64String = reader.result;
            resolve(base64String);
        };

        reader.onerror = (error) => {
            reject(error);
        };

        reader.readAsDataURL(file);
    });
}

async function getformData() {
    const amount = Number(document.getElementById("amount").value)
    const emi = Number(document.getElementById("emi").value)
    const custID = document.getElementById("customerID").value
    const SelectTenure = document.getElementById("tenure")
    const SelectLoan_id = document.getElementById("loanType")

    const allOptionsT = SelectTenure.options
    const indexT = SelectTenure.selectedIndex
    const selectedOptionT = allOptionsT[indexT]
    var tenure = Number(selectedOptionT.value)

    const allOptionsL = SelectLoan_id.options
    const indexL = SelectLoan_id.selectedIndex
    const selectedOptionL = allOptionsL[indexL]
    var loan_id = selectedOptionL.value

    var aadharElement = document.getElementById('aadhar').files[0]
    var panElement = document.getElementById('pan').files[0]

    var flag = validate(loan_id, custID, amount, tenure, emi, aadharElement, panElement)

    if (flag == 1) {
        const aadharBase64 = await convertToBase64(aadharElement);
        const panBase64 = await convertToBase64(panElement);
        const data = {
            loan_id: loan_id,
            amount: amount,
            tenure: tenure,
            emi: emi,
            aadhar: aadharBase64,
            pan: panBase64
        }
        console.log(JSON.stringify(data))

        const req = new XMLHttpRequest()
        req.onreadystatechange = async function () {
            if (req.status === 200 && req.readyState === 4) {
                var res = await JSON.parse(req.responseText)
                console.log(res)
                if (res.statusCode == 200) {
                    alert("loan application created successfully")
                    window.open("../../view/clerk/clerkHome.html", '_self')
                } else {
                    alert("attempt unsuccessfull,try again")
                }
            }
            else if (req.readyState == XMLHttpRequest.DONE && req.status != 200) {
                alert("attempt unsuccessfull,try again")
            }
        }
        req.open('POST', 'http://localhost:8080/FinanceBackend/rest/clerk/createLoanApplication', true)
        req.setRequestHeader("Content-Type", "application/json")
        req.setRequestHeader("customerId", custID)
        req.setRequestHeader('role', 'CLERK')
        req.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem("token"));
        req.send(JSON.stringify(data))
    }
}

window
    .addEventListener(
        'DOMContentLoaded',
        function () {
            calcEMI()
            this.document.getElementById("submitForm").addEventListener("click", getformData)
            this.document.getElementById("amount").addEventListener("input", calcEMI)
            this.document.getElementById("tenure").addEventListener("change", () => {
                calcEMI()
            })
            this.document.getElementById("loanType").addEventListener("change", () => {
                setRoi()
                calcEMI()
            })
        }
    )