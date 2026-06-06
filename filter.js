const submit=document.getElementById("submit");
submit.addEventListener("click", () => {
   const asset=document.getElementById("text1").value;
   const category=document.getElementById("category").value;
   const avail=document.getElementById("avail").value;
   localStorage.setItem("asset", asset);
   localStorage.setItem("avail", avail);
   localStorage.setItem("category", category);
   

   window.location.href = "request.html";

});
const userEmail = localStorage.getItem("email");
const userName = localStorage.getItem("name");