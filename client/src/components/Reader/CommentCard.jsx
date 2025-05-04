
import { useDeleteAStoryComment } from '../../hooks/useDeleteAStoryComment';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import useWindowSize from "../../hooks/useWindowSize";
import useNavigateProfile from '../../hooks/useNavigateProfile';
import { FaEllipsisH } from "react-icons/fa";
import useImageLoad from "../../hooks/useImageLoaded";
import CommentAvatar from "./CommentAvatar"
import Trash from "../../styles/components/common/Icons/Trash";
import { useState, useEffect } from "react";
const CommentCard = ({ comment, isLoading, setDeleteModal }) => {
  const navigateToProfile = useNavigateProfile();
  const openDeleteModal = () => {
    setDeleteModal({ comment : comment["_id"], modal : true})
  }
  return (
    <> 
    {
      isLoading ?
      <div className="comment-card-container">
        <section  className="comment-card-container-first-section">
        <div
       className="comment-loader comment-loader-avatar"></div>
        </section>
        <section className="comment-card-container-second-section">
            <div className="comment-card-container-second-section-title">
            <div className="comment-loader comment-loader-username">
           
            </div>
            <div style={{color : "#777777"}} className="comment-loader comment-loader-time">
           
            </div>
          </div>
            <div className="comment-card-container-second-section-body" style={{display : "flex", flexDirection : "column", justifyContent :"space-between", gap : "5px"}}>
            <div className="comment-loader comment-loader-first-line-comment">
           
           </div>
           <div style={{color : "#777777"}} className="comment-loader  comment-loader-first-line-comment">
          
           </div>
            </div>
            </section>
    </div>  
       :
       <div className="comment-card-container">
        <section  className="comment-card-container-first-section">
        
          <CommentAvatar 
          image={comment.commentBy["picture"]}
          className="feed-profile-images-trending"
          alt="Author"
          />
        </section>
        <section className="comment-card-container-second-section">
            <div className="comment-card-container-second-section-title" style={{cursor : "pointer"}}>
            <span
                 onClick={() => {
                navigateToProfile(comment.commentBy["username"]);
              }}
            >
            {comment.commentBy["username"]}
            </span>
            <span style={{color : "#777777"}}>
            {formatDistanceToNow(comment.createdAt)}
            </span>
          </div>
            <div className="comment-card-container-second-section-body">
            {comment["comment"]}</div>
            {
              <>  <FaEllipsisH
              className='delete-modal-client'
               size={10} style={{cursor : "pointer"}} color="#555555" onClick={() => { openDeleteModal()}}/>
              </>

            
             }
            </section>
    </div>
    }
    
  
    </>

  )
}

export default CommentCard