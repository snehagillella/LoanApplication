var customers = new Array()

function loadData() {
    var tb = document.getElementById("customerEntity");
    customers.forEach((customer) => {
        let row = document.createElement("tr")
        let c1 = document.createElement("td")
        let c2 = document.createElement("td")
        let c3 = document.createElement("td")
        let c4 = document.createElement("td")
        let c5 = document.createElement("td")
        c1.innerText = customer.customerName
        c2.innerText = customer.customerEmail
        c3.innerText = customer.customerId
        c4.innerText = customer.customerGender
        c5.innerText = customer.customerMobile
        row.append(c1)
        row.append(c2)
        row.append(c3)
        row.append(c4)
        row.append(c5)
        tb.append(row)
    }
    )
}

function getCustomers() {
    const req = new XMLHttpRequest()
    console.log("hello")

    req.onreadystatechange = () => {
        if (req.status === 200 && req.readyState === 4) {
            // console.log(req.responseText)
            const serviceResponseObject = JSON.parse(req.responseText)
            customers = serviceResponseObject.responseData
            console.log(customers)
            loadData()
        }
    }

    req.open('GET', 'http://localhost:8080/FinanceBackend/rest/clerk/getAllCustomers')
    req.setRequestHeader('role', 'CLERK')
    req.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem("token"));
    req.send()
}

window
    .addEventListener(
        'DOMContentLoaded', () => {
            getCustomers()
            loadData()
        }
    )