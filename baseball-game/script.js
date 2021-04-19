document.addEventListener("DOMContentLoaded", (e) => {
    // 4자리 숫자를 설정하는 함수
    const getQuestion = (length) => {
        const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        const question = [];

        while (question.length < length) {
            const randomIndex = Math.floor(Math.random() * numbers.length);

            // 첫번째 자리의 수가 0일 경우 다시 뽑는다.
            if (numbers[randomIndex] === 0 && question.length === 0) continue;

            question.push(numbers[randomIndex]);

            // 뽑은 숫자 제거
            numbers.splice(randomIndex, 1);
        }

        return question;
    };

    // 폼에 입력한 값이 올바른 정답인지 체크
    const validateAnswer = (answer) => {
        if (answer.length < 4) return false;

        if (!/^\d+$/.test(answer)) return false;

        if (Number(answer.charAt(0)) === 0) return false;

        return true;
    };

    // 배열 내에 중복된 데이터가 있는지 체크하는 함수
    const isDuplicatedValue = (array = []) => {
        let isDuplicated = false;

        for (let i = 0; i < array.length; i++) {}
    };

    // 정답 입력 이벤트 핸들러
    const submitAnswer = (answer = "") => {
        console.log(validateAnswer(answer));
    };

    const bindEvents = () => {
        document.querySelector("form").addEventListener("submit", (e) => {
            e.preventDefault();

            const $input = document.getElementById("answer");
            submitAnswer($input.value.trim());
        });
    };

    // Init
    const init = () => {
        const question = getQuestion(4);

        bindEvents();
    };

    init();
});
