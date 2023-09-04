function logout() {
    req = new XMLHttpRequest()
    req.onreadystatechange = async () => {
        if (req.status === 200 && req.readyState === 4) {
            const res = req.responseText
            console.log(res)
            localStorage.removeItem("token")
            this.window.open(src = "../../view/index.html", '_self')
        }
    }
    req.open('DELETE', 'http://localhost:8080/FinanceBackend/rest/authentication/logout')
    req.setRequestHeader('Authorization', localStorage.getItem("token"));
    req.send()
}

function deductEMI() {
    req = new XMLHttpRequest()
    req.onreadystatechange = async () => {
        if (req.status === 200 && req.readyState === 4) {
            var res = await JSON.parse(req.responseText)
            console.log(res)
            if (res.statusCode == 200) {
                alert(res.mesage)
                window.open("../../view/manager/managerHome.html", '_self')
            } else {
                alert(res.mesage)
            }
        }
        else if (req.readyState == XMLHttpRequest.DONE && req.status != 200) {
            alert("attempt unsuccessfull,try again")
        }
    }
    req.open('GET', 'http://localhost:8080/FinanceBackend/rest/manager/tickleEmi')
    req.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem("token"));
    req.setRequestHeader('role', 'MANAGER');
    req.send()
}

window
    .addEventListener(
        'DOMContentLoaded',
        function () {
            //view Apps
            this.document.getElementById("viewAll").addEventListener("click", () => {
                this.window.open(src = "../../view/manager/viewApplications.html", '_self')
            })
            //approve apps
            this.document.getElementById("approveApps").addEventListener("click", () => {
                this.window.open(src = "../../view/manager/approveApplications.html", '_self')
            })
            //log out
            this.document.getElementById("logoutBtn").addEventListener("click", () => {
                logout()
            })
            // deduct EMI
            this.document.getElementById("deductEMI").addEventListener("click", () => {
                deductEMI()
            })
        }
    )