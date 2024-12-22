import React, { useEffect, useState } from 'react';
import { useNavigate,useParams } from 'react-router-dom';

export default function Nav({userId}){
    const navigate = useNavigate();

    const logOut = ()=>{
        navigate("/login")
    }
    const openJournal = ()=>{
        navigate(`/journal/${userId}`)
    }
    const openExplore = ()=>{
        navigate(`/explore/${userId}`)
    }
    const openLiked = ()=>{
        navigate(`/liked/${userId}`)
    }

    return (
        <div>
            <button onClick={logOut}>Log out</button>
            <button onClick={openJournal}>Journal</button>
            <button onClick={openExplore}>Explore</button>
            <button onClick={openLiked}>Liked</button>
        </div>
    )

}