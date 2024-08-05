import React, { useEffect } from 'react';
import { useState } from 'react';
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";

const News=(props)=>{
    
    const[articles,setArticles]=useState([])
    const[loading,setLoading]=useState(true)
    const[page,setPage]=useState(1)
    const[totalResults,setTotalResults]=useState(0)

    const capitalizeFirstLetter=(string)=> {
        return string.charAt(0).toUpperCase() + string.slice(1)
    }
    // document.title= `${this.capitalizeFirstLetter(props.category)} - NewsApp`; 

    const updateNews=async()=>{
        props.setProgress(0);
        let url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=e3aede1350d74601a43ed817f15cb882&page=${page}&pageSize=${props.pageSize}`;
        setLoading(true);
        let data=await fetch(url);
        props.setProgress(30);
        let parsedData=await data.json();
        props.setProgress(60);
        console.log(parsedData);
        setArticles(parsedData.articles);
        setTotalResults(parsedData.totalResults);
        setLoading(false); 
        props.setProgress(100);
    }
    
    useEffect(()=>{
        updateNews();
    },[])

    const fetchMoreData = async() => {
        let url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=e3aede1350d74601a43ed817f15cb882&page=${page+1}&pageSize=${props.pageSize}`;
        setPage(page+1);
        setLoading(true);
        let data=await fetch(url);
        let parsedData=await data.json();
        console.log(parsedData);
        setArticles(articles.concat(parsedData.articles));
        setTotalResults(parsedData.totalResults);
        setLoading(false);
    };
 
    return (
      <div className='container my-4'>
        <h2 className='text-center' style={{margin: "80px 0px 20px 0px", fontWeight:"bold"}}>
             Today's Top {capitalizeFirstLetter(props.category)} Headlines
        </h2>

        {/* {this.state.loading && <Spinner/> }  If this loading object is not true , don't show that  */}


        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles!==totalResults}
          loader={<Spinner/>}
        >
        
        <div className="container" style={{marginTop: "6px"}}>
            <div className="row">
                {articles.map((element)=>{
                return (
                    <div className='col-md-4' key={element.url}> 
                    <NewsItem
                    title={element.title ? element.title.slice(0, 40) : ""} 
                    description={element.description ? element.description.slice(0, 80) : ""}
                    imageUrl={element.urlToImage}
                    newsUrl={element.url}
                    author={element.author}
                    date={element.publishedAt}
                    source={element.source.name}
                    />
                </div>
                );
                })}
            </div>
        </div>
        
        </InfiniteScroll>
      </div>
    )
  
}

News.defaultProps = {
    country:"id ",
    pageSize:"8",
    category:"general", 
}

News.propTypes={
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
};


export default News;

