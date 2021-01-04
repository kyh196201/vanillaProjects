document.addEventListener("DOMContentLoaded", (e) => {
    const $movieSelector = document.getElementById("movie");
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

    let selectedSeats = getSeatData();
    let selectedMovieIndex = getMovieData();
    let occupiedSeats = [10, 12, 22];

    $movieSelector.addEventListener("change", onChangeMovie);
    $seats.addEventListener("click", onClickSeat);

    render();

    // functions
    // render movie select
    function drawMovies() {
        $movieSelector.innerHTML = movies
            .map((movie, index) => {
                return `<option value="${movie.cost}" ${
                    isSelected(index) ? "selected" : ""
                }>${movie.title}</option>`;
            })
            .join("");
    }

    // check select item is checked
    function isSelected(index) {
        return +selectedMovieIndex === index;
    }

    // render seats
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

    function render() {
        drawSeats();
        drawMovies();
        updateSelectedCount();
    }

    function updateSelectedCount() {
        $totalSeats.innerHTML = selectedSeats.length;
        $totalPrice.innerHTML = $movieSelector.value * selectedSeats.length;
    }

    // NOTE 화살표 함수를 썼을 경우, 이벤트핸들러 this === undefined,
    // NOTE 일반 함수로 썼을경우 this === 자기 자신
    function onChangeMovie(e) {
        setMovieData();
        updateSelectedCount();
    }

    function selectSeat(id) {
        selectedSeats = [...selectedSeats, id];
        setSeatData();
    }

    function removeSeat(id) {
        const index = selectedSeats.findIndex((seat) => seat === id);

        selectedSeats = [
            ...selectedSeats.slice(0, index),
            ...selectedSeats.slice(index + 1),
        ];
        setSeatData();
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
        updateSelectedCount();
    }

    // save selectedSeats to localStorage
    function setSeatData() {
        localStorage.setItem("selectedSeats", JSON.stringify(selectedSeats));
    }

    // load selectedSeats to localStorage
    function getSeatData() {
        const seats = localStorage.getItem("selectedSeats");

        if (seats !== null) {
            return JSON.parse(seats);
        } else {
            return [];
        }
    }

    // save selected movie
    function setMovieData() {
        localStorage.setItem(
            "selectedMovieIndex",
            $movieSelector.selectedIndex
        );
    }

    // load selected movie
    function getMovieData() {
        return localStorage.getItem("selectedMovieIndex") || 0;
    }
});
