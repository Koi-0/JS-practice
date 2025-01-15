// TMDB API 연동 및 데이터 가져오기
const options = {
    method: "GET",
    headers: {
        accept: "application/json",
        Authorization: "Bearer a9879955b9c0d370991a64895c5957c4", // 개인 API-KEY 사용
    },
};

// 기본 이미지 경로
const basicImgUrl = "https://image.tmdb.org/t/p/w500";
const defaultImgUrl = "default-image.jpg"; // 기본 이미지가 없는 경우 사용할 경로

// 영화 카드가 표시될 DOM 요소
const movieCard = document.querySelector("#movieCard"); // 영화 카드 영역
const form = document.querySelector("form"); // form 태그는 submit(click + enter) 이벤트를 통해 검색
const input = document.querySelector(".movieSearch"); // 영화 제목 검색 input

// 공통 : 영화 카드 렌더링 함수
const renderMovies = (movies) => {
    movieCard.innerHTML = ""; // 기존 영화 카드 초기화

    movies.forEach((movie) => {
        const posterPath = movie.poster_path ? `${basicImgUrl}/${movie.poster_path}` : defaultImgUrl;
        const cardHtml = `
            <div class="card" data-id="${movie.id}">
                <img src="${posterPath}" alt="${movie.title}" class="poster" />
                <div class="txt">
                    <div class="title">${movie.title}</div>
                    <div class="comment">평점 : ${movie.vote_average}</div>
                </div>
            </div>
        `;

        movieCard.innerHTML += cardHtml;
    });
};

// STEP 1 : TMDB API의 인기 영화 데이터를 가져와서 초기 화면에 표시
fetch("https://api.themoviedb.org/3/movie/popular?api_key=a9879955b9c0d370991a64895c5957c4&language=ko-KR&page=1", options)
    .then((res) => res.json())
    .then((data) => renderMovies(data.results))
    .catch((err) => console.error("인기 영화 데이터 로드 실패:", err));

// STEP 2: 검색한 영화 데이터를 가져오기 위한 비동기 함수
const fetchMovies = async function (inputValue) {
    try {
        const res = await fetch(`https://api.themoviedb.org/3/search/movie?query=${inputValue}&include_adult=false&language=ko-KR&page=1`, options);
        const data = await res.json();
        return data.results; // 검색 결과 배열 반환
    } catch (error) {
        alert(err.message);
        return [];
    }
};

// 검색창 입력 시 실시간 필터링
input.addEventListener("input", async function () {
    const query = input.value.trim().toLowerCase();
    if (query) {
        const movies = await fetchMovies(query); // Promise 해결
        renderMovies(movies);
    }
});

// form 제출 시 검색 처리 기능
form.addEventListener("submit", async function (e) {
    e.preventDefault(); // form의 기본 동작인 새로고침을 막아준다.

    const inputValue = input.value.trim(); // trim() : 공백 제거

    if (!inputValue) {
        alert("영화 제목을 입력하세요.");
        return;
    }

    const movies = await fetchMovies(inputValue); // 입력된 검색어로 영화 데이터 가져오기
    renderMovies(movies); // 검색 결과 렌더링
});

// STEP 3 : 영화 상세 모달 구현
const modal = document.createElement("div");

modal.id = "movieModal";
modal.style.display = "none";
modal.innerHTML = `
    <div class="modal-content">
        <p id="closeModal" class="close">X</p>
        <div id="modalDetails"></div>
    </div>
`;

document.body.append(modal);

// 모달 닫기 기능
document.querySelector("#closeModal").addEventListener("click", () => {
    modal.style.display = "none";
});

// 영화 상세 정보를 가져오는 함수
const getMovieDetails = async function (movieId) {
    try {
        const res = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=a9879955b9c0d370991a64895c5957c4&?language=ko-KR`, options);
        const data = await res.json();

        return data; // 영화 상세 정보 반환
    } catch (error) {
        console.error("상세 정보 로드 실패:", err);
    }
};

// 영화 카드 클릭 이벤트 핸들러
movieCard.addEventListener("click", async (e) => {
    const card = e.target.closest(".card");
    if (!card) return; // 카드가 아닌 부분 클릭 시 무시

    const movieId = card.dataset.id; // 카드에 설정된 영화 ID 가져오기
    const details = await getMovieDetails(movieId);

    // 상세 정보 렌더링
    if (details) {
        const posterPath = details.poster_path ? `${basicImgUrl}/${details.poster_path}` : defaultImgUrl;

        document.querySelector("#modalDetails").innerHTML = `
            <img src="${posterPath}" alt="${details.title}" class="poster" />
            <div class = text>
                <h2 class = title>${details.title}</h2>
                <p class = releaseDate><strong>개봉일 :</strong> ${details.release_date}</p>
                <p class = average><strong>평점 :</strong> ${details.vote_average}</p>
                <p class = overView><strong>줄거리 :</strong> ${details.overview}</p>
                <button class="plusBookMark">북마크 추가</button>
            </div>
        `;
        modal.style.display = "block"; // 모달 표시
    }
});
