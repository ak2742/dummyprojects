let i = 0;
let text = "Hello friends, welcome to my website.";
let typeIt = () => {
  document.getElementById("typeText").innerHTML += text.charAt(i);
  i++;
  setTimeout(typeIt, 100);
};
typeIt();
