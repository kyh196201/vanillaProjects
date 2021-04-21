document.addEventListener("DOMContentLoaded", (e) => {
    // Elements
    const $form = document.querySelector("form");
    const $log = document.getElementById("log-message");

    // Variables
    let question = null;
    let count = 0;

    init();

    function init() {
        initGame();
        bindEvents();
    }

    function initGame() {
        question = createQuestion();

        console.log(question);

        count = 10;

        $log.innerHTML = "";
    }

    // 이벤트 세팅
    function bindEvents() {
        $form.addEventListener("submit", onSubmit);
    }

    // 문제 제출
    function onSubmit(e) {
        e.preventDefault();

        const $input = e.target.querySelector("input[type='text']");

        let answer = $input.value.trim();
        answer = answer.split("").map((num) => Number(num));

        count -= 1;

        const compareObj = compareAnswer(question, answer);

        checkIsCorrect(compareObj);

        setTimeout(() => {
            $input.value = "";
            $input.focus();
        }, 100);
    }

    // 정답 맞췄는지 체크
    function checkIsCorrect(compareObj) {
        const isCorrect = compareObj.strike === question.length;
        let retry = false;

        if (isCorrect) {
            retry = confirm("정답입니다. 다시 도전하시겠습니까?");
        } else {
            alert("오답입니다. 남은 횟수 : " + count.toString());

            $log.innerHTML += `<p>
                Input: ${compareObj.input}, strike: ${compareObj.strike}, ball: ${compareObj.ball}, out: ${compareObj.out}
            </p>`;

            if (count <= 0) {
                retry = confirm("Game Over. 다시 도전하시겠습니까?");
            }
        }

        if (retry) {
            initGame();
        }
    }

    // 정답과 문제 비교
    function compareAnswer(question, answer) {
        let strike = 0; // 숫자, 인덱스 모두 동일
        let out = 0; // 존재하지 않는 숫자
        let ball = 0; // 숫자 존재, 인덱스 다름

        for (let i = 0; i < answer.length; i++) {
            const currentAnswer = answer[i];

            for (let j = 0; j < question.length; j++) {
                // 숫자가 같은 경우
                if (currentAnswer === question[j]) {
                    i === j ? strike++ : ball++;
                    break;
                } else {
                    // 숫자가 다른 경우
                    if (j >= question.length - 1) {
                        // 마지막 인덱스인 경우
                        out++;
                    }
                }
            }
        }

        return {
            input: answer.join(""),
            strike,
            out,
            ball,
        };
    }

    // 4자리 숫자 문제 생성
    function createQuestion(n = 4) {
        const NUMBERS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

        const question = [];
        let count = 0;

        while (count < n) {
            const randomIndex = getRandomNumber(0, NUMBERS.length);

            const num = NUMBERS[randomIndex];

            if (count === 0 && num === 0) continue;

            count += 1;
            question.push(num);
            NUMBERS.splice(randomIndex, 1);
        }

        return question;
    }

    // min이상 max미만의 정수를 랜덤하게 생성하는 함수
    function getRandomNumber(min = 0, max = 10) {
        return Math.floor(Math.random() * (max - min) + min);
    }
});
