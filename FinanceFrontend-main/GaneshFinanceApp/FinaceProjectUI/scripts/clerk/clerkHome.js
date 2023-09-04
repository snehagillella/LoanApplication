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
window
    .addEventListener(
        'DOMContentLoaded',
        function () {

            // add customer
            this.document.getElementById("addCustomer").addEventListener("click", () => {

                this.window.open(src = "../../view/clerk/addCustomer.html", '_self')
            })

            // view customers
            this.document.getElementById("viewCustomers").addEventListener("click", () => {
                this.window.open(src = "../../view/clerk/viewCustomers.html", '_self')
            })

            // add application
            this.document.getElementById("addApp").addEventListener("click", () => {
                this.window.open(src = "../../view/clerk/createLoanApplication.html", '_self')
            })

            //view Apps
            this.document.getElementById("viewApps").addEventListener("click", () => {
                this.window.open(src = "../../view/clerk/viewApplications.html", '_self')
            })

            //log out
            this.document.getElementById("logoutBtn").addEventListener("click", () => {
                logout()
            })

        }
    )