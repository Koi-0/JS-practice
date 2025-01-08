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
