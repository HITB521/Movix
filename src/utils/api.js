import axios from "axios";


const BASE_URL = "https://api.themoviedb.org/3";
const TMDB_TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlMDFjNGI2NmI5MzE3MTg0MWM3MTZhOTZjN2QzMzgwOSIsInN1YiI6IjY1MTdkODFjOTY3Y2M3MDBlMjljYjA4YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.qNkSvE3JfspOpyhAzYY324JrFzgsXjNaj4FGOyMLtV4";



const headers = {
    Authorization: "bearer " + TMDB_TOKEN,
};

export const fetchDataFromApi = async (url, params) => {
    try {
        const { data } = await axios.get(BASE_URL + url, {
            headers,
            params,
        });
        return data;
    } catch (err) {
        console.log(err);
        return err;
    }
};