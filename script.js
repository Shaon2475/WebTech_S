// TYPING ANIMATION

const typingElement = document.getElementById("typing-text");

const phrases=[
"Front-End Developer",
"HTML CSS Enthusiast",
"JavaScript Learner"
];

let phraseIndex=0;
let charIndex=0;
let deleting=false;

function type(){

let text=phrases[phraseIndex];

if(!deleting){
typingElement.textContent=text.substring(0,charIndex++);
}else{
typingElement.textContent=text.substring(0,charIndex--);
}

if(charIndex===text.length){
deleting=true;
setTimeout(type,1000);
return;
}

if(charIndex===0){
deleting=false;
phraseIndex=(phraseIndex+1)%phrases.length;
}

setTimeout(type,80);

}

type();


// DYNAMIC PROJECTS

const projects=[

{
title:"Portfolio Website",
desc:"Personal portfolio using HTML CSS JS",
img:"https://via.placeholder.com/200"
},

{
title:"Student Manager App",
desc:"JavaScript app to manage student records",
img:"https://via.placeholder.com/200"
},

{
title:"Electric products management system",
desc:"A web app to manage electric products",
img:"https://via.placeholder.com/200"
}

];

const container=document.getElementById("projectContainer");

projects.forEach(p=>{

let card=document.createElement("div");

card.className="card";

card.innerHTML=`
<img src="${p.img}">
<h3>${p.title}</h3>
<p>${p.desc}</p>
<a href="${p.link}" class="btn">View</a>
`;

container.appendChild(card);

});


// FORM VALIDATION

document.getElementById("contactForm").addEventListener("submit",function(e){

e.preventDefault();

let name=document.getElementById("name").value;
let email=document.getElementById("email").value;
let subject=document.getElementById("subject").value;
let message=document.getElementById("message").value;

let valid=true;

if(name===""){
document.getElementById("nameError").textContent="Enter name";
valid=false;
}

if(email==="" || !email.includes("@")){
document.getElementById("emailError").textContent="Enter valid email";
valid=false;
}

if(subject===""){
document.getElementById("subjectError").textContent="Enter subject";
valid=false;
}

if(message===""){
document.getElementById("messageError").textContent="Enter message";
valid=false;
}

if(valid){
alert("Message Sent!");
}

});


// DARK MODE

const toggle=document.getElementById("themeToggle");

toggle.onclick=function(){

document.body.classList.toggle("dark");

localStorage.setItem("theme",
document.body.classList.contains("dark"));

};

if(localStorage.getItem("theme")==="true"){
document.body.classList.add("dark");
}


// SCROLL TO TOP

let topBtn=document.getElementById("topBtn");

window.onscroll=function(){

if(window.scrollY>300){
topBtn.style.display="block";
}else{
topBtn.style.display="none";
}

};

topBtn.onclick=function(){

window.scrollTo({
top:0,
behavior:"smooth"
});

};