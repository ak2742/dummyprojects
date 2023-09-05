import React, { useEffect, useState, useContext } from 'react'
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";
import Newscategories from './Newscategories';
import NewsContext from '../context/news/NewsContext';
import NewsItem from './NewsItem'
import Loading from './Loading'

function News(props) {
    const context = useContext(NewsContext)
    const { loading, articles, totalResults, fetchData, fetchMoreData } = context
    const mode = props.mode

    const caps = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    useEffect(() => {
        document.title = `${caps(props.category)} | ${process.env.REACT_APP_NAME}`;
        fetchData(props);
        // eslint-disable-next-line
    }, [])

    return (
        <>
            <Newscategories mode={mode} />
            {articles.length === 0 ? <h2 className='text-center'>nothing to show</h2> :
                <InfiniteScroll
                    dataLength={articles.length}
                    next={() => { fetchMoreData(props) }}
                    hasMore={articles.length !== totalResults}
                >
                    <div className="container">
                        <div className="row">
                            {articles.map((element) => {
                                return <div className="col-md-4" key={element.url ? element.url : element.title}>
                                    <NewsItem mode={mode} source={element.source.name ? element.source.name : ''} title={element.title ? element.title : ""} body={element.description ? element.description : ""} imgUrl={element.urlToImage} newsUrl={element.url ? element.url : "/unknown"} author={element.author} date={element.publishedAt} />
                                </div>
                            })}
                        </div>
                        {loading && <div className="d-flex justify-content-center"><Loading /></div>}
                    </div>
                </InfiniteScroll>
            }
        </>
    )
}

News.defaultProps = {
    country: 'in',
    pageSize: 5,
    category: 'general',
}

News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
}

export default News