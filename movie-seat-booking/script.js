document.addEventListener("DOMContentLoaded", (e) => {
    const $movie = document.getElementById("movie");
    const $seats = document.getElementById("seats");
    const $totalSeats = document.getElementById("totalSeats");
    const $totalPrice = document.getElementById("totalPrice");
    const MAX_SEATS = 48;
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

    let selectedSeats = [4, 8];
    let occupiedSeats = [10];
    let selectedCost = $movie.value;

    $movie.addEventListener("change", onChangeMovie);
    $seats.addEventListener("click", onClickSeat);

    function drawMovies(movies) {
        $movie.innerHTML = movies
            .map((movie) => {
                return `<option value="${movie.cost}" ${
                    movie.selected ? "selected" : ""
                }>${movie.title}</option>`;
            })
            .join("");
    }

    function drawSeats() {
        let htmlString = "";

        for (let i = 0; i < MAX_SEATS; i++) {
            let className = "";

            if (occupiedSeats.includes(i)) {
                className = "seat--occupied";
            } else if (selectedSeats.includes(i)) {
                className = "seat--selected";
            }

            htmlString += `
                <li class="seat ${className}" data-id=${i}>좌석1</li>
            `;
        }

        $seats.innerHTML = htmlString;
    }

    function showSelectedSeats() {
        $totalSeats.innerHTML = selectedSeats.length;
    }

    function showTotalPrice() {
        $totalPrice.innerHTML = selectedCost * selectedSeats.length;
    }

    // NOTE 화살표 함수를 썼을 경우, 이벤트핸들러 this === undefined,
    // NOTE 일반 함수로 썼을경우 this === 자기 자신
    function onChangeMovie(e) {
        selectedCost = this.value;
        showTotalPrice();
    }

    function selectSeat(id) {
        selectedSeats = [...selectedSeats, id];
        drawSeats();
        showSelectedSeats();
        showTotalPrice();
    }

    function removeSeat(id) {
        const index = selectedSeats.findIndex((seat) => seat === id);

        selectedSeats = [
            ...selectedSeats.slice(0, index),
            ...selectedSeats.slice(index + 1),
        ];
    }

    function onClickSeat(e) {
        const target = e.target;

        if (target.tagName !== "LI") return;

        const seatId = target.dataset.id * 1;

        if (occupiedSeats.includes(seatId)) return;

        if (selectedSeats.includes(seatId)) {
            removeSeat(seatId);
        } else {
            selectSeat(seatId);
        }
        drawSeats();
        showSelectedSeats();
        showTotalPrice();
    }

    drawMovies(movies);
    drawSeats();
    showSelectedSeats();
    showTotalPrice();
});
