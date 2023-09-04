function validate(data) {
    var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    var mobilePattern = /^\d{10}$/;
    var hasUppercase = /[A-Z]/;
    var hasLowercase = /[a-z]/;
    var hasDigit = /\d/;
    var hasSpecialChar = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/;

    if (data.customerName == "" || data.customerName.length <= 3) {
        alert("please give a valid customer name")
        return 0;
    }
    else if (data.customerGender == "") {
        alert("please choose your gender")
        return 0;
    } else if (!emailPattern.test(data.customerEmail)) {
        alert("please choose a proper email")
        return 0;
    } else if (!mobilePattern.test(data.customerMobile)) {
        alert("please choose a proper phoneNumber")
        return 0;
    }
    else if (data.password.length < 6 || !hasUppercase.test(data.password) || !hasLowercase.test(data.password) || !hasDigit.test(data.password) || !hasSpecialChar.test(data.password)) {
        alert("password should have  atleast 6 characters and should include atleast 1 special character,digit,lower and upper case values ")
        return 0;
    } else if (data.password != String(document.getElementById("confirmPwd").value)) {
        alert("passwords donot match")
        return 0;
    }
    return 1;
}
function getFormData() {

    const data = {
        customerName: document.getElementById("name").value,
        customerGender: String(document.getElementById("gender").value),
        customerEmail: document.getElementById("email").value,
        customerMobile: document.getElementById("mobile").value,
        userName: document.getElementById("email").value,
        password: document.getElementById("pwd").value
    }
    //validations
    var flag = validate(data)

    if (flag == 1) {
        const req = new XMLHttpRequest()
        req.onreadystatechange = async () => {
            if (req.status === 200 && req.readyState === 4) {
                var res = await JSON.parse(req.responseText)
                console.log(res)
                if (res.statusCode == 200) {
                    alert("new customer created successfully")
                    window.open('../../view/clerk/clerkHome.html', '_self')
                } else {
                    alert("attempt unsuccessfull,try again")
                }
            }
            else if (req.readyState == XMLHttpRequest.DONE && req.status != 200) {
                alert("attempt unsuccessfull,try again")
            }
        }
        req.open('POST', 'http://localhost:8080/FinanceBackend/rest/clerk/createCustomer', true)
        req.setRequestHeader("Content-Type", "application/json")
        req.setRequestHeader('role', 'CLERK')
        req.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem("token"));
        req.send(JSON.stringify(data))

    }

}

window
    .addEventListener(
        'DOMContentLoaded',
        function () {

            this.document.getElementById("addCust").addEventListener("click", getFormData)
        }
    )