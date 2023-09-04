var allApps = new Array()
var apps = new Array()

async function fetchData(id) {
    try {
        const headers = new Headers();
        headers.append('applicationId', id); 
        headers.append('role', 'CUSTOMER');
        headers.append('Authorization', 'Bearer ' + localStorage.getItem("token"))
        const requestOptions = {
            method: 'GET',
            headers: headers,
        };
        const response = await fetch('http://localhost:8080/FinanceBackend/rest/customer/getDocument', requestOptions);
        if (!response.ok) {
            throw new Error('Request failed');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

function sortByLoanType() {
    apps.sort((app1, app2) => {
        const loanType1 = app1.loan_id.toUpperCase();
        const loanType2 = app2.loan_id.toUpperCase();
        if (loanType1 < loanType2) {
            return -1;
        }
        if (loanType1 > loanType2) {
            return 1;
        }
        return 0;
    });
}

function sortByApplicationNumber() {
    apps.sort((app1, app2) => {
        const appNo1 = app1.application_number.toUpperCase(); 
        const appNo2 = app2.application_number.toUpperCase();
        if (appNo1 < appNo2) {
            return -1;
        }
        if (appNo1 > appNo2) {
            return 1;
        }
        return 0;
    });
}

function sortByStatus() {
    apps.sort((app1, app2) => {
        const status1 = app1.status.toUpperCase(); 
        const status2 = app2.status.toUpperCase();
        if (status1 < status2) {
            return -1;
        }
        if (status1 > status2) {
            return 1;
        }
        return 0;
    });
}

function sortBytimestamp() {
    apps.sort((app1, app2) => {
        const t1 = app1.timestamp.toUpperCase(); 
        const t2 = app2.timestamp.toUpperCase();
        if (t1 < t2) {
            return -1;
        }
        if (t1 > t2) {
            return 1;
        }
        return 0;
    });
}

function sortData() {
    const selectAtt = document.getElementById('sortBy')
    const allAttOptions = selectAtt.options
    const index = selectAtt.selectedIndex
    const selectedAttOption = allAttOptions[index]
    const selectedAtt = String(selectedAttOption.value)
    console.log(selectedAtt)
    if (selectedAtt == "loan_id") {
        console.log("sort by loan type")
        sortByLoanType()
    }
    else if (selectedAtt == "application_number") {
        console.log("sort by application_number")
        sortByApplicationNumber()
    }
    else if (selectedAtt == "status") {
        console.log("sort by status")
        sortByStatus()
    } else if (selectedAtt == "timestamp") {
        console.log("sort by status")
        sortBytimestamp()
    } else {
        return
    }
}

function filterData() {
    const selectLoan = document.getElementById('filterByLoanType')
    const allLoanOptions = selectLoan.options
    const index1 = selectLoan.selectedIndex
    const selectedLoanOption = allLoanOptions[index1]
    const selectedLoanType = String(selectedLoanOption.value)

    const selectStatus = document.getElementById('filterByStatus')
    const allStatusOptions = selectStatus.options
    const index2 = selectStatus.selectedIndex
    const selectedStatusOption = allStatusOptions[index2]
    const selectedStatus = String(selectedStatusOption.value)

    const selectedDate = String(document.getElementById('filterByDate').value)
    const selectedAppNo = String(document.getElementById('filterByAppNo').value)

    apps = [...allApps];
    if (selectedLoanType.length > 0) {
        var filteredAppsByLoanType = new Array()
        apps.forEach((app) => {
            if (app.loan_id == selectedLoanType) {
                filteredAppsByLoanType.push(app)
            }
        })
        apps = filteredAppsByLoanType
    }
    if (selectedStatus.length > 0) {
        var filteredAppsByStatus = new Array()
        apps.forEach((app) => {
            if (app.status == selectedStatus) {
                filteredAppsByStatus.push(app)
            }
        })
        apps = filteredAppsByStatus
    }
    console.log(selectedDate)
    if (selectedDate.length > 0) {
        var filteredAppsByDate = new Array()
        apps.forEach((app) => {
            if (String(app.timestamp.substring(0, 10)) == selectedDate) {
                filteredAppsByDate.push(app)
            }
        })
        apps = filteredAppsByDate
    }
    if (selectedAppNo.length > 0) {
        var filteredAppsByAppNo = new Array()
        apps.forEach((app) => {
            if (String(app.application_number) == selectedAppNo) {
                filteredAppsByAppNo.push(app)
            }
        })
        apps = filteredAppsByAppNo
    }
    console.log(apps)
    sortData()
    addContent()
}

function addContent() {
    var tb = document.getElementById("tbody");
    while (tb.firstChild) {
        tb.removeChild(tb.firstChild);
    }
    if(apps.length == 0){
        document.getElementById("norecords").style.display = "block"
        document.getElementById("tableContainer").style.display = "none"
    }
    else{
        document.getElementById("norecords").style.display = "none"
        document.getElementById("tableContainer").style.display = "block"
    apps.forEach((app) => {
        let row = document.createElement("tr")
        let c1 = document.createElement("td")
        let c2 = document.createElement("td")
        let c3 = document.createElement("td")
        let c4 = document.createElement("td")
        let c5 = document.createElement("td")
        let c6 = document.createElement("td")
        let c7 = document.createElement("td")
        let c8 = document.createElement("td")
        let c9 = document.createElement("td")
        c1.innerText = app.application_number
        c2.innerText = app.loan_id
        c3.innerText = app.cust_id
        c4.innerText = "\u20B9" + app.amount
        c5.innerText = "\u20B9" + app.emi
        c6.innerText = app.tenure + " months"
        c7.innerText = app.status
        const time = String(app.timestamp)
        const date = time.substring(0, 10)
        c9.innerText = date
        var btn = document.createElement("button")
        btn.classList.add("btn")
        btn.classList.add("btn-success")
        btn.type = "button"
        btn.value = app.application_number
        btn.innerHTML = "View" + '&nbsp' + "Docs"
        btn.addEventListener("click", async () => {
            var data = await fetchData(app.application_number);
            data = data.responseData
            console.log(data)
            var aadharContains = document.getElementById("aadharImg")
            var panContains = document.getElementById("panImg")
            aadharContains.src = data.aadhar
            panContains.src = data.pan
            var modal = document.getElementById("myModal");
            var span = document.getElementsByClassName("close")[0];
            modal.style.display = "block";
            span.onclick = function () {
                modal.style.display = "none";
            }
        })
        btn.classList.add("btn")
        btn.classList.add("btn-primary")
        c8.appendChild(btn)
        row.appendChild(c9);
        row.appendChild(c1);
        row.appendChild(c2);
        row.appendChild(c3);
        row.appendChild(c4);
        row.appendChild(c5);
        row.appendChild(c6);
        row.appendChild(c7);
        row.appendChild(c8);
        tb.appendChild(row)
    })
}
}

function getApplications() {
    const req = new XMLHttpRequest()

    req.onreadystatechange = () => {
        if (req.status === 200 && req.readyState === 4) {

            const serviceResponseObject = JSON.parse(req.responseText)
            allApps = serviceResponseObject.responseData
            apps = [...allApps]
            addContent()
        }
    }
    req.open('GET', 'http://localhost:8080/FinanceBackend/rest/customer/getMyApplications')
    req.setRequestHeader("customerId", localStorage.getItem("customerID"))
    req.setRequestHeader('role', 'CUSTOMER')
    req.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem("token"));
    req.send()
}

window
    .addEventListener(
        'DOMContentLoaded',
        function () {
            getApplications()
            this.document.getElementById("getApps").addEventListener("click", filterData)
        }
    )