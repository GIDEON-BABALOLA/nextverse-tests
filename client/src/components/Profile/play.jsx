{
    following  &&  !followError &&
    <button className="feed-follow-button"
  ><span style={{color: "white"}}>Following...</span></button> 

  }
  {
    !following &&  Object.keys(data).length > 0 &&
    <button className="feed-follow-button"
  >Following</button> 

  }
  {
    followError &&
     <button className="feed-follow-button"
  onClick={() => followAUser()}
  >Follow</button> 
  }


















              
              {/* <button 
          
          className="follow"
          onClick={triggerFollowUser}
          ><span className="follow-text"> 
          {!triggerFollow.isLoading ? 
          
        <span className="spinner-loader-container">
        <LoadingSpinner  />
        </span>
        
      
        : 
       triggerFollow.error ? 
        <span className="spinner-loader-container text">
        Follow
        </span>
         : Object.keys(triggerFollow.data).length > 0  ?
         <span className="spinner-loader-container text">
        Following
        </span>
         : 
         <span className="spinner-loader-container text">
        Follow
        </span>
        }
     
          </span></button>  */}