var nameInput = document.getElementById("name");
var rollInput = document.getElementById("roll");
var addBtn = document.getElementById("addBtn");
var list = document.getElementById("studentList");

addBtn.disabled = true;

// enable / disable Add button based on name input
nameInput.addEventListener("input", function(){
    if(nameInput.value.trim() == ""){
        addBtn.disabled = true;
    } else {
        addBtn.disabled = false;
    }
});

// Add button click
addBtn.addEventListener("click", function(){

    if(nameInput.value.trim() == ""){
        alert("Please give your name and id first");
        return;
    }

    var roll = rollInput.value;

    // Roll/ID validation: digits + hyphen allowed
    if(!/^\d+(-\d+)*$/.test(roll)){
        alert("Roll/ID must contain only digits and hyphens!");
        return;
    }

    addStudent();

});

// Add student function
function addStudent(){

    var name = nameInput.value;
    var roll = rollInput.value;

    var li = document.createElement("li");
    li.textContent = roll + " - " + name + " ";

    // present checkbox
    var checkbox = document.createElement("input");
    checkbox.type = "checkbox";

    checkbox.onchange = function(){
        updateAttendance();
        if(checkbox.checked){
            li.classList.add("present");
        } else {
            li.classList.remove("present");
        }
    }

    li.appendChild(checkbox);

    // Add "P" label after checkbox
    var pText = document.createTextNode(" P ");
    li.appendChild(pText);

    // Edit button
    var editBtn = document.createElement("button");
    editBtn.textContent = " Edit ";

    editBtn.onclick = function(){
        var newName = prompt("Enter new name", name);
        var newRoll = prompt("Enter new roll", roll);

        if(newName != null && newRoll != null){
            // Roll validation on edit
            if(!/^\d+(-\d+)*$/.test(newRoll)){
                alert("Roll/ID must contain only digits and hyphens!");
                return;
            }

            name = newName;
            roll = newRoll;
            li.childNodes[0].textContent = roll + " - " + name + " ";
        }
    }

    li.appendChild(editBtn);

    // Delete button
    var delBtn = document.createElement("button");
    delBtn.textContent = " Delete ";

    delBtn.onclick = function(){
        if(confirm("Are you sure you want to delete this student?")){
            li.remove();
            updateCount();
            updateAttendance();
        }
    }

    li.appendChild(delBtn);

    list.appendChild(li);

    // clear inputs and disable add button again
    nameInput.value = "";
    rollInput.value = "";
    addBtn.disabled = true;

    updateCount();
    updateAttendance();

}

// update total student count
function updateCount(){
    var total = document.querySelectorAll("#studentList li").length;
    document.getElementById("total").textContent = "Total students: " + total;
}

// update attendance count
function updateAttendance(){
    var boxes = document.querySelectorAll("#studentList input[type='checkbox']");
    var present = 0;
    for(var i=0;i<boxes.length;i++){
        if(boxes[i].checked){
            present++;
        }
    }
    var absent = boxes.length - present;
    document.getElementById("attendance").textContent =
        "Present: " + present + " , Absent: " + absent;
}

// search / filter students
document.getElementById("search").addEventListener("input", function(){
    var text = this.value.toLowerCase();
    var items = document.querySelectorAll("#studentList li");
    for(var i=0;i<items.length;i++){
        var name = items[i].textContent.toLowerCase();
        if(name.includes(text)){
            items[i].style.display = "block";
        } else {
            items[i].style.display = "none";
        }
    }
});

// sort students A-Z
function sortStudents(){
    var items = document.querySelectorAll("#studentList li");
    var arr = Array.from(items);
    arr.sort(function(a,b){
        return a.textContent.localeCompare(b.textContent);
    });
    for(var i=0;i<arr.length;i++){
        list.appendChild(arr[i]);
    }
}

// highlight first student
var highlightActive = false; 

function highlightFirst(){
    var items = document.querySelectorAll("#studentList li");

    if(!highlightActive){
    
        for(var i=0;i<items.length;i++){
            items[i].classList.remove("highlight");
        }

        
        if(items.length > 0){
            items[0].classList.add("highlight");
        }

        highlightActive = true; 
    } else {
        
        for(var i=0;i<items.length;i++){
            items[i].classList.remove("highlight");
        }
        highlightActive = false; 
    }
}