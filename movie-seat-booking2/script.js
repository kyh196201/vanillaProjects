const $movie = document.getElementById("movie");
const $totalCount = document.getElementById("totalCount");
const $totalPrice = document.getElementById("totalPrice");
const $seats = document.getElementById("seats");

const movies = [
    {
        title: "Avengers Endgame ($10)",
        cost: "10",
    },
    {
        title: "Joker ($11)",
        cost: "11",
    },
    {
        title: "Toy Story4 ($8)",
        cost: "8",
    },
    {
        title: "The Lion King ($9)",
        cost: "9",
    },
];

let selectedMovieIndex = 0;
let selectedSeats = [11];
let occupiedSeats = [22, 30, 32, 44, 45, 46, 47];

init();

// init
function init() {
    console.log("[init]");
    renderMovie(movies);
    renderSeats();
    updateText();
    bindEvents();
}

// update price & total
function updateText() {
    const totalCount = selectedSeats.length;
    const ticketPrice = $movie.value;

    $totalCount.innerText = totalCount;
    $totalPrice.innerText = parseInt(totalCount) * parseInt(ticketPrice);
}

// render movie
function renderMovie(data) {
    $movie.innerHTML = data
        .map((movie) => {
            return `<option value="${movie.cost}">${movie.title}</option>`;
        })
        .join("");
}

// render seats
function renderSeats() {
    const $seatArr = $seats.querySelectorAll(".seat");

    Array.from($seatArr).forEach((seat, index) => {
        if (selectedSeats.indexOf(index) > -1) {
            seat.classList.add("selected");
        } else if (occupiedSeats.indexOf(index) > -1) {
            seat.classList.add("occupied");
        }
    });
}

// movie change event
function onChangeMovie(e) {
    updateText();
}

// click seat event
function onClickSeat(e) {
    const $target = e.target.closest(".seat");

    if (!$target || $target.classList.contains("occupied")) return;

    $target.classList.toggle("selected");

    const $seatArr = $seats.querySelectorAll(".seat");
    const index = Array.prototype.indexOf.call($seatArr, $target);

    if (selectedSeats.indexOf(index) > -1) {
        selectedSeats = removeFromArray(selectedSeats, index);
    } else {
        selectedSeats = [...selectedSeats, index].sort();
    }

    updateText();
}

function bindEvents() {
    document.getElementById("movie").addEventListener("change", onChangeMovie);
    document.getElementById("seats").addEventListener("click", onClickSeat);
}

// remove from array by value
function removeFromArray(arr, value) {
    const index = arr.findIndex((item) => {
        return item === value;
    });
    return [...arr.slice(0, index), ...arr.slice(index + 1)];
}
