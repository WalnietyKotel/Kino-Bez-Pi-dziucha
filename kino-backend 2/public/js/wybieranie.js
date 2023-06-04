// wybieranie.js
let nrOfSeats = 0;

const input = document.querySelector('#input');
const priceElem = document.querySelector('#price')

let seatsArr = []

// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function() {
  // Get all elements with the class "seat"
  const seats = document.querySelectorAll(".seat");

  // Get the price element
  const priceElement = document.getElementById("Price");

  // Loop through each seat and add a click event listener
  for (let i = 0; i < seats.length; i++) {
    seats[i].addEventListener("click", function() {
      // Check if the seat is already selected
      if (this.style.backgroundColor === "aqua" && !this.classList.contains('disabled')) {
        // Change the color of the clicked seat to grey
        this.style.backgroundColor = "grey";
        nrOfSeats--;

        seatsArr = seatsArr.filter(e => e !== this.id)
      } else if(!this.classList.contains('disabled')) {
        // Change the color of the clicked seat to aqua
        this.style.backgroundColor = "aqua";
        nrOfSeats++;

        console.log(typeof(seatsArr));

        seatsArr.push(this.id);

        input.value = seatsArr.toString();
        console.log(seatsArr.toString());
        console.log(input.value);
        
      }

      // Calculate the price
      const price = nrOfSeats * 10;

      priceElem.value = price;

      // Display the price in the HTML file
      priceElement.textContent = price;
    });
  }

  const takenList = document.querySelector('#takenList');

console.log(takenList.textContent);

let takenArr = takenList.textContent.split(',')

  //eliminating \n in first and last element
takenArr[0] = takenArr[0][(takenArr[0].length)-2] + takenArr[0][(takenArr[0].length)-1];
takenArr[(takenArr.length)-1] = takenArr[(takenArr.length)-1][0] + takenArr[(takenArr.length)-1][1]

console.log(takenArr);

takenArr.forEach(element => {
  seats.forEach(elementSeat => {
    if(elementSeat.id == element){
      elementSeat.classList.add('disabled');
      elementSeat.style.backgroundColor = '#f00';

    }
  })
})


});

