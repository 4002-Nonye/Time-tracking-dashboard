"use strict";
const interval = document.querySelectorAll(".interval");
const days = document.querySelector(".btm-report-box");
const hours = document.querySelectorAll(".hrs");
const h2 = document.querySelectorAll(".h2");

//LITTLE HELPER FUNCTION TO GET DATA FROM DATA.JSON
const getJson = async (url) => {
  const response = await fetch(url);
  const data = await response.json();
  //   console.log(data)
  return data;
};

// FETCHING INFO FOR DAILY
const dailyFetch = async function () {
  const jsonData = await getJson("./data.json", { mode: "no-cors" });
  hours.forEach((e, i) => {
    h2[i].innerHTML = `${jsonData[i].timeframes.daily.current}hrs`;
    hours[
      i
    ].innerHTML = `Yesterday - ${jsonData[i].timeframes.daily.previous}hrs`;
  });
};

// FETCHING INFO FOR DAILY
const weeklyFetch = async function () {
  const jsonData = await getJson("./data.json", { mode: "no-cors" });
  hours.forEach((e, i) => {
    h2[i].innerHTML = `${jsonData[i].timeframes.weekly.current}hrs`;
    hours[
      i
    ].innerHTML = `Last week - ${jsonData[i].timeframes.weekly.previous}hrs`;
  });
};
// FETCHING INFO FOR DAILY
const monthlyFetch = async function () {
  const jsonData = await getJson("./data.json", { mode: "no-cors" });
  hours.forEach((e, i) => {
    h2[i].innerHTML = `${jsonData[i].timeframes.monthly.current}hrs`;
    hours[
      i
    ].innerHTML = `Last month - ${jsonData[i].timeframes.monthly.previous}hrs`;
  });
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
