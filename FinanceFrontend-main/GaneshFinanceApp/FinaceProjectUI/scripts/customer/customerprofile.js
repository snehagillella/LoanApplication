var customerDetails

function logout(){
    req = new XMLHttpRequest()
    req.onreadystatechange = async () => {
        if (req.status === 200 && req.readyState === 4) {
            const res = req.responseText
            console.log(res)
            localStorage.removeItem("token")
            localStorage.removeItem("customerID")
            this.window.open(src="../../view/index.html",'_self')

        }
    }
    req.open('DELETE', 'http://localhost:8080/FinanceBackend/rest/authentication/logout')
    req.setRequestHeader('Authorization',  localStorage.getItem("token"));
    req.send()
}

function viewProfile(){
    document.getElementById("name").innerText = customerDetails.customerName
    document.getElementById("email").innerText = customerDetails.customerEmail
    document.getElementById("gender").innerText = customerDetails.customerGender
    document.getElementById("mobile").innerText = customerDetails.customerMobile
    document.getElementById("accNo").innerText = customerDetails.accountNumber
    document.getElementById("balance").innerText = customerDetails.balance
    document.getElementById("greetings").innerText = "Welcome  " + customerDetails.customerName
}

function getCustomerDetails(){
    const req = new XMLHttpRequest()

    req.onreadystatechange = () => {
        if (req.status === 200 && req.readyState === 4) {
            const serviceResponseObject = JSON.parse(req.responseText)
            customerDetails = serviceResponseObject.responseData
            console.log(customerDetails)
            viewProfile()
        }
    }

    req.open('GET', 'http://localhost:8080/FinanceBackend/rest/customer/getMyProfile')
    req.setRequestHeader("customerId", localStorage.getItem("customerID"))
    req.setRequestHeader('role','CUSTOMER')
    req.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem("token"));
    req.send()
}


window.addEventListener(
     'DOMContentLoaded',
     function(){  
        getCustomerDetails()
        this.document.getElementById("customerId").innerHTML = this.localStorage.getItem("customerID")
        document.getElementById("applyLoan").addEventListener("click",()=>{
            window.open('../../view/customer/createApplication.html','_self')
        }
        );
        document.getElementById("myApps").addEventListener("click",()=>{
            window.open('../../view/customer/myApplications.html','_self')
        }
        );
        document.getElementById("withdrawApps").addEventListener("click",()=>{
            window.open('../../view/customer/withdrawApplication.html','_self')
        }
        );
         this.document.getElementById("logoutBtn").addEventListener("click", ()=>{
            logout()
        })
        this.document.getElementById("resetPWD").addEventListener("click", ()=>{
            window.open('../../view/customer/resetPassword.html','_self')
        })
        
     }
)