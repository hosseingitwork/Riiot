import { useState, useRef, useCallback, useMemo, useEffect } from "react";
import { Card_info } from "../types";
import { useInfiniteQuery } from "@tanstack/react-query";
import Comment from "../components/Comment";


const MAX_POST_PAGE = 10;
const profile_API = 'https://randomuser.me/api/?results='
const facts_API = 'https://catfact.ninja/facts?page='

const fetchProfiles = async () => {

    const data = await fetch(profile_API + String(MAX_POST_PAGE))
        .then(response => response.json())
        .then(data => data);

    return data.results
}

const fetchFacts = async (page_nnnumber: number) => {

    const data = await fetch(facts_API + String((MAX_POST_PAGE * page_nnnumber) / 10))
        .then(response => response.json())
        .then(data => data);

    return data.data
}

const fetchProfileAndFacts = async (page_param: number = 1) => {
    const [profiles, facts] = await Promise.all([fetchProfiles(), fetchFacts(page_param)])

    // map function to merge the information
    const result = profiles.map((profile: any, index: any) => ({
        name: profile.name,
        img: profile.picture.large,
        comment: facts[index]?.fact || "No comment available"
    }));

    return result
}

const Comments = () => {

    const [comments, setComments] = useState([])

    useEffect( ()=>{
        fetchProfileAndFacts(1).then( (result) => {
            setComments(result);
        }).catch( (error) => {
            console.log('Error fetching profile and facts:', error)
        } )
    }, [])

    console.log('fetchProfileAndFacts ->', comments)

return (
    <div>
        Comments section
        { comments ? 
        <div>

            {
                comments.map(
                    (comment:any) => {
                        return <Comment name={comment.name} img={comment.img} comment={comment.comment} />
                    }
                )
            }

        </div>     
        :
        <>Loading...</>
        }
    </div>)
}

export default Comments;