import { useState,useEffect } from 'react';
import { fetchDataFromApi } from "./utils/api";
import { useDispatch,useSelector } from "react-redux";
import { getApiConfiguration,getGenres} from './store/homeSlice';
import './App.css'
import { BrowserRouter ,Routes,Route} from 'react-router-dom';
import Home from './pages/home/Home';
import Details from './pages/details/Details';
import PageNotFound from './pages/404/PageNotFound';
import SearchResult from './pages/searchResult/SearchResult';
import Explore from './pages/explore/Explore';
import Header from './Components/header/Header';
import Footer from './Components/footer/Footer';








function App() {
  const dispatch =useDispatch();
  useEffect(()=>{
    fetchApiConfig();
    genresCall();

  },[]);
  const fetchApiConfig=()=>{
    fetchDataFromApi("/configuration")
    .then((res)=>{
    

//constructing the url according to the API
    const url ={
      backdrop :res.images.secure_base_url + "original",
      poster :res.images.secure_base_url + "original",
      profile :res.images.secure_base_url + "original",

    };
    dispatch(getApiConfiguration(url))}
    );
    
  };
  const genresCall = async()=>{
    let promises=[]
    let endPoints =["tv","movie"];
    let allGenres={}
    endPoints.forEach((url)=>{
      promises.push(fetchDataFromApi(`/genre/${url}/list`))
    })
    const data =await Promise.all(promises);
    console.log("data was",data);
    data.map(({genres})=>{
      return genres.map((item)=>(allGenres[item.id]=item))

    }//destructured genre because it contains two arrays
    );
    console.log(allGenres);
    dispatch(getGenres(allGenres));

  }

  return (
   <BrowserRouter>
   <Header/>
   <Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="/:mediaType/:id" element ={<Details/>}/>
    <Route path="/search/:query" element ={<SearchResult/>}/>
    <Route path="/explore/:mediaType" element={<Explore/>}/>
    <Route path="*" element ={<PageNotFound/>}/>

   </Routes>
   <Footer/>
   </BrowserRouter>
  )
}

export default App
