// <-----------------------------NAVBAR --------------------------------------->

const navToggleBtn = document.querySelectorAll(".nav-toggle-btn");
for (let btn of navToggleBtn) {
  btn.addEventListener("click", () => {
    console.log("hii");
    document.querySelector(".toggle-nav-link").classList.toggle("toggle-right");
  });
}

// <----------------------------Announcment ----------------------->
document.querySelectorAll(".anc-btn1").forEach((button) => {
    button.addEventListener("click", function () {
      this.classList.toggle("open1");
      document.querySelector(".side").classList.toggle("open");
    });
  });


  
// <-----------------------------Complaints ------------------------------->
document.addEventListener('DOMContentLoaded', function() {
    // Your JS code here
    initComplaints();
  });
  
  let buildingbtn = document.querySelector("#building");
  let problembtn = document.querySelector("#problem");
  let subProbelembtn = document.querySelector("#subProbelem");
  
  let buildinglist = document.querySelectorAll("#buildinglist li a");
  let problemlist = document.querySelectorAll("#problemlist li a");
  let subProbelemlist = document.querySelector("#subProbelemlist");

let selectedBuildingInput = document.querySelector("#selectedBuilding");
let selectedProblemInput = document.querySelector("#selectedProblem");
let selectedSubProblemInput = document.querySelector("#selectedSubProblem");
  
  
  
  function initComplaints() {
    // For Buildings
    buildinglist.forEach((ele) => {
      ele.addEventListener("click", function() {
        buildingbtn.textContent = this.textContent;
        selectedBuildingInput.value = this.textContent;
      });
    });
  
    // For Problems
    problemlist.forEach((ele) => {
      ele.addEventListener("click", function() {
        problembtn.textContent = this.textContent;
        selectedProblemInput.value = this.textContent; 
        subProbelembtn.disabled = false; 
        subProbelembtn.textContent = "Sub-problem"; 
        updateSubProblemList(problembtn.textContent.trim());  
      });
    });
  
    // For Sub-problems (propagated dynamically)
    subProbelemlist.addEventListener("click", function(event) {
      if (event.target.tagName === "A") {
        subProbelembtn.textContent = event.target.textContent; 
        selectedSubProblemInput.value = event.target.textContent;
      }
    });
  }
  
  function updateSubProblemList(problem) {
    subProbelemlist.innerHTML = "";  
    let sublist = [];
  
    if (problem === "Mess") {
      sublist = ["Breakfast", "Lunch", "Snacks", "Dinner"];
    } else if (problem === "Infranstructure") {
      sublist = ["Wifi", "Electricity", "Cupboards", "Furniture", "Plumbing"];
    } else if (problem === "Laundary") {
      sublist = ["No Proper Work", "Clothes Missing", "Delivery Delay"];
    } else {
      subProbelembtn.disabled = true;
    }
      
    propgate(sublist);
  }
  
  function propgate(sublist) {
    sublist.forEach(sub => {
      let li = document.createElement("li");
      li.innerHTML = `<a class="dropdown-item" href="#">${sub}</a>`;
      subProbelemlist.appendChild(li);
    });
  }
  
  