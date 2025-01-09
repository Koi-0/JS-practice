<<<<<<< HEAD
const options = {
    method: "GET",
    headers: {
        accept: "application/json",
        Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhOTg3OTk1NWI5YzBkMzcwOTkxYTY0ODk1YzU5NTdjNCIsIm5iZiI6MTczNjMzNDQ2Mi4zMDIsInN1YiI6IjY3N2U1YzdlYzgxYWNhYTYzZGJiMTA2YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ztyWoSbdikTHGb8_XNIs4qa5EuF-KVcOoBkD599TxD0",
    },
};

fetch("https://api.themoviedb.org/3/movie/popular?language=en-US&page=1", options)
    .then((res) => res.json())
    .then((res) => console.log(res))
    .catch((err) => console.error(err));

console.log(options);
=======
// 인기 있는 영화 API 가져오기
const options = {
    method: "GET",
    headers: {
        accept: "application/json",
        Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhOTg3OTk1NWI5YzBkMzcwOTkxYTY0ODk1YzU5NTdjNCIsIm5iZiI6MTczNjMzNDQ2Mi4zMDIsInN1YiI6IjY3N2U1YzdlYzgxYWNhYTYzZGJiMTA2YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ztyWoSbdikTHGb8_XNIs4qa5EuF-KVcOoBkD599TxD0",
    },
};

fetch("https://api.themoviedb.org/3/movie/popular?api_key=a9879955b9c0d370991a64895c5957c4&language=ko-KR&page=1", options)
    .then((res) => res.json())
    .then((res) => {
        // console.log(res);

        // 데이터 출력
        res["results"].forEach(function (doc) {
            let poster = "https://media.themoviedb.org/t/p/w440_and_h660_face" + doc["poster_path"];
            let title = doc["title"];
            let comment = doc["vote_average"];

            // console.log(poster);
            // console.log(title);
            // console.log(comment);

            const movieCard = document.querySelector(".movieCard");

            let temp_html = `
            <div class="card">
                        <img src="${poster}" alt="" class="poster">
                        <div class="txt">
                            <div class="title">${title}</div>
                            <div class="comment">평점 : ${comment}</div>
                        </div>
                    </div>
            `;
            let movie = document.createElement("div");
            movie.innerHTML = temp_html;
            movieCard.appendChild(movie);
        });
    })
    .catch((err) => console.error(err));
>>>>>>> 95eca08 (영화 카드 리스트 UI 구현 완료)
