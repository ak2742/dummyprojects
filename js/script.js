let msg_btn = () => {
  window.location.assign("/contact");
};

let my_desc = () => {
  window.location.assign("/me");
};

let itemClick = () => {
  window.location.assign("/post/");
};

let goHome = () => {
  window.location.assign("/");
};

let menuClick = (x) => {
  let hnav = document.querySelector("#hnav");
  let signin = document.querySelector("#signin");
  hnav.classList.toggle("mediaclass");
  signin.classList.toggle("mediaclass");
  x.classList.toggle("cross");
};
