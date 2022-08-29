"use strict";
const interval = document.querySelectorAll("button");
const days = document.querySelector(".btm-report-box");
const hours = document.querySelectorAll(".hrs");
const h2 = document.querySelectorAll(".h2");
const error = document.querySelector(".errmsg");
const container = document.querySelector(".entire-container");
const spinner = document.querySelector(".spinner");

//LITTLE HELPER FUNCTION TO RENDER SPINNER WHILE USER WAITS FOR DATA TO BE FETCHED
const renderSpinner = () => {
  spinner.classList.remove("spinner-hidden");
};
//LITTLE HELPER FUNCTION TO HIDE SPINNER AFTER DATA HAS BEEN FETCHED
const hideSpinner = () => {
  spinner.classList.add("spinner-hidden");
};

//LITTLE HELPER FUNCTION TO GET DATA FROM DATA.JSON
const getJson = async () => {
  renderSpinner();

  const response = await fetch("./data.json", { mode: "no-cors" });
  if (!response.ok) throw new Error("Problem getting data");
  if (response) hideSpinner();
  const data = await response.json();

  return data;
};
//LITTLE HELPER FUNCTION TO RENDER ERROR
const renderError = () => {
  error.classList.remove("hidden");
  container.style.display = "none";
  document.body.style.backgroundColor = "white";
};

// FETCHING INFO FOR DAILY
const dailyFetch = async function () {
  try {
    const jsonData = await getJson();
    hours.forEach((e, i) => {
      let finalData = jsonData[i].timeframes.daily.current;
      let finalDataDaily = jsonData[i].timeframes.daily.previous;

      //CHECK IF NUMBER IS GREATER THAN 1 , ONFALSE - HR.... ONTRUE - HRS
      let hrs = finalData > 1 ? "hrs" : "hr";
      let time = finalDataDaily > 1 ? "hrs" : "hr";

      h2[i].innerHTML = `${finalData}${hrs}`;

      hours[i].innerHTML = ` Yesterday - ${finalDataDaily}${time}`;
    });
  } catch (err) {
    renderError();
  }
};

// FETCHING INFO FOR WEEKLY
const weeklyFetch = async function () {
  try {
    const jsonData = await getJson();
    hours.forEach((e, i) => {
      h2[i].innerHTML = `${jsonData[i].timeframes.weekly.current}hrs`;
      hours[
        i
      ].innerHTML = `Last week - ${jsonData[i].timeframes.weekly.previous}hrs`;
    });
  } catch (err) {
    renderError();
  }
};
// FETCHING INFO FOR MONTHLY
const monthlyFetch = async function () {
  try {
    const jsonData = await getJson();
    hours.forEach((e, i) => {
      h2[i].innerHTML = `${jsonData[i].timeframes.monthly.current}hrs`;
      hours[
        i
      ].innerHTML = `Last month - ${jsonData[i].timeframes.monthly.previous}hrs`;
    });
  } catch (err) {
    renderError();
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
