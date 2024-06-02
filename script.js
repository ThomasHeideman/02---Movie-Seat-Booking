const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const screen = document.querySelector('.screen');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');

populateUI();

let ticketPrice = +movieSelect.value; // Number(movieSelect.value);

// Save selected movie data ( index, price, classname screen)
function setMovieData(movieIndex, moviePrice, movieImage) {
  localStorage.setItem('selectedMovieIndex', movieIndex);
  localStorage.setItem('selectedMoviePrice', moviePrice);
  localStorage.setItem('selectedImageCLass', movieImage);
}

function setImage(movieImage) {
  if (!screen.classList.contains(movieImage)) {
    screen.className = 'screen';
    screen.classList.toggle(movieImage);
  }
}

// Update total and count
function updateSelectedCount() {
  const selectedSeats = document.querySelectorAll('.row .seat.selected');
  const seatsIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat));

  localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

  const selectedSeatsCount = selectedSeats.length;
  count.textContent = selectedSeatsCount;
  total.textContent = selectedSeatsCount * ticketPrice;
}

// Get Data from local storage and populate UI
function populateUI() {
  const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
  const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');
  const selectedImageCLass = localStorage.getItem('selectedImageCLass');
  // const selectedMoviePrice = localStorage.getItem('selectedMoviePrice');
  // const selectedSeatCount = selectedSeats.length + 1;

  // set seats
  if (selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add('selected');
      }
    });
  }
  // set movie
  if (selectedMovieIndex !== null) {
    movieSelect.selectedIndex = selectedMovieIndex;
  }
  // set movie background-image
  setImage(selectedImageCLass);

  // set count and price
  //   if (selectedMoviePrice !== null && selectedSeatCount !== null) {
  //     count.textContent = selectedSeatCount;
  //     total.textContent = selectedMoviePrice * selectedSeatCount;
  //   }
}

// Movie select click event
movieSelect.addEventListener('change', e => {
  ticketPrice = +e.target.value;
  let selectedMovieIndex = e.target.selectedIndex;
  const imageClass = `bg--${selectedMovieIndex}`;
  console.log(imageClass);
  console.log(imageClass);
  setMovieData(selectedMovieIndex, ticketPrice, imageClass);
  updateSelectedCount();
  setImage(imageClass);
});

// Seat click event
container.addEventListener('click', e => {
  if (
    e.target.classList.contains('seat') &&
    !e.target.classList.contains('occupied')
  ) {
    e.target.classList.toggle('selected');
    updateSelectedCount();
  }
});

updateSelectedCount();
