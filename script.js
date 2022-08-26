"use strict";
const interval = document.querySelectorAll(".interval");
const days = document.querySelector(".btm-report-box");
const hours = document.querySelectorAll(".hrs");
const h2 = document.querySelectorAll(".h2");
const error = document.querySelector(".errmsg");
let p =
  "No Internet connection <br> Check your connection, then refresh the page.";
const renderError = (msg) => {
  const getMode = window.navigator.onLine;

  if (!getMode) {
    error.innerHTML = `${msg}`;
  } else {
    error.innerHTML = "";
  }
};

//LITTLE HELPER FUNCTION TO GET DATA FROM DATA.JSON
const getJson = async (url) => {
  const response = await fetch(url);
  // console.log(response)
  // if(!response.ok) throw new Error('Problem getting data')
  const data = await response.json();
  console.log(data);
  return data;
};

// FETCHING INFO FOR DAILY
const dailyFetch = async function () {
  try {
    const jsonData = await getJson("./data.json", { mode: "no-cors" });
    hours.forEach((e, i) => {
      h2[i].innerHTML = `${jsonData[i].timeframes.daily.current}hrs`;
      hours[
        i
      ].innerHTML = `Yesterday - ${jsonData[i].timeframes.daily.previous}hrs`;
    });
  } catch (err) {
    renderError(p);
  }
};

// FETCHING INFO FOR DAILY
const weeklyFetch = async function () {
  try {
    const jsonData = await getJson("./data.json", { mode: "no-cors" });
    hours.forEach((e, i) => {
      h2[i].innerHTML = `${jsonData[i].timeframes.weekly.current}hrs`;
      hours[
        i
      ].innerHTML = `Last week - ${jsonData[i].timeframes.weekly.previous}hrs`;
    });
  } catch (err) {
    renderError(p);
  }
};
// FETCHING INFO FOR DAILY
const monthlyFetch = async function () {
  try {
    const jsonData = await getJson("./data.json", { mode: "no-cors" });
    hours.forEach((e, i) => {
      h2[i].innerHTML = `${jsonData[i].timeframes.monthly.current}hrs`;
      hours[
        i
      ].innerHTML = `Last month - ${jsonData[i].timeframes.monthly.previous}hrs`;
    });
  } catch (err) {
    renderError(p);
  }
};

//ADDING ACTIVE CLASS TO CLICKED ELEMENT
days.addEventListener("click", (e) => {
  const clicked = e.target.closest(".interval");
  //  console.log(clicked)
  //GUARD CLAUSE
  if (!clicked) return;
  // REMOVE ACTIVE CLASSES
  interval.forEach((int) => int.classList.remove("active"));

  //ADD ACTIVE CLASS TO CLICKED ELEMENT
  clicked.classList.add("active");

  switch (e.target.innerHTML) {
    case "Daily":
      dailyFetch();
      break;

    case "Weekly":
      weeklyFetch();
      break;
    case "Monthly":
      monthlyFetch();
      break;
  }
});
