function validate(data) {
    var hasUppercase = /[A-Z]/;
    var hasLowercase = /[a-z]/;
    var hasDigit = /\d/;
    var hasSpecialChar = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/;
    console.log(data)
    if (data.oldPassword == "" || data.newPassword == "") {
        alert("some field is empty,please enter a value")
        return 0;
    }
    else if (data.oldPassword == data.newPassword) {
        alert("old password and new password feilds have same value")
        return 0;
    }
    else if (data.newPassword.length < 6 || !hasUppercase.test(data.newPassword) || !hasLowercase.test(data.newPassword) || !hasDigit.test(data.newPassword) || !hasSpecialChar.test(data.newPassword)) {
        alert("password should have  atleast 6 characters and should include atleast 1 special character,digit,lower and upper case values ")
        return 0;
    } else if (data.newPassword != String(document.getElementById("newp2").value)) {
        alert("passwords do not match")
        return 0;
    }
    return 1;
}

function resetPwd() {
    var oldp = String(document.getElementById("oldp").value)
    var newp = String(document.getElementById("newp").value)
    var newp2 = String(document.getElementById("newp2").value)
    console.log(oldp + " " + newp + " " + newp2)
    const data = {
        oldPassword: oldp,
        newPassword: newp
    }
    if (validate(data) == 1) {

        const req = new XMLHttpRequest()
        req.onreadystatechange = async () => {
            if (req.status === 200 && req.readyState === 4) {
                var res = await JSON.parse(req.responseText)
                if (res.statusCode == 200) {
                    console.log(res)
                    alert(res.mesage)
                    this.window.open("../../view/customer/customerProfile.html", '_self')
                } else {
                    alert("unsuccessful attempt ,try again")
                }
            }
            if (req.readyState == XMLHttpRequest.DONE && req.status != 200) {
                alert("unsuccessful attempt ,try again")
            }
        }
        req.open('PUT', 'http://localhost:8080/FinanceBackend/rest/customer/updateCredentials', true)
        req.setRequestHeader("Content-Type", "application/json")
        req.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem("token"));
        req.setRequestHeader('role', 'CUSTOMER')
        req.setRequestHeader('customerID', localStorage.getItem('customerID'))
        req.send(JSON.stringify(data))
    }
}

window
    .addEventListener(
        'DOMContentLoaded',
        function () {
            console.log(localStorage.getItem('token'))
            console.log(localStorage.getItem('customerID'))
            this.document.getElementById("pwdReset").addEventListener("click", () => {
                resetPwd()
            })
        }
    )