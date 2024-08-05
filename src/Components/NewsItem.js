import React from 'react'

const NewsItem = (props) =>{
    let {title,description, imageUrl,newsUrl,author,date,source }=props;
    return (
      <div>
        <div className="card my-2" style={{width: "18rem"}}>
        <img src={imageUrl? imageUrl: "https://images.news18.com/ibnlive/uploads/2021/07/1627642197_news18_breaking_news-1200x800.jpg??impolicy=website&width=300&height=200"} className="card-img-top" alt="..." />
        <div className="card-body">
            <h5 className="card-title">{title}...</h5>
            <span className="position-absolute top-0 translate-middle badge bg-danger" style={{left: '92%', zIndex:'1' }}>
              {source}
              <span className="visually-hidden">unread messages</span>
            </span>
            <p className="card-text">{description}...</p>
            <p className="card-text"><small className="text-muted">By {author? author:"unknown"} on {new Date(date).toGMTString()}</small></p>
            <a href={newsUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary">View More</a>
        </div>
        </div>
      </div>
    )
}

export default NewsItem;
