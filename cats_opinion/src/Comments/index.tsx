import { useState, useRef, useCallback, useMemo } from "react";
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
    console.log(data);

    return data.results
}

const fetchFacts = async (page_nnnumber: number) => {

    const data = await fetch(facts_API + String((MAX_POST_PAGE * page_nnnumber) / 10))
        .then(response => response.json())
        .then(data => data);
    console.log(data);

    return data.data
}

const fetchProfileAndFacts = async (page_param: number = 1) => {
    const [profiles, facts] = await Promise.all([fetchProfiles(), fetchFacts(page_param)])

    // map function to merge the information
    const result = profiles.map((profile: any, index: any) => ({
        name: profile.name,
        img: profile.picture,
        comment: facts[index]?.fact || "No comment available"
    }));

    return result
}

fetchProfileAndFacts(2)

const Comments = () => {

    const {
        data,
        error,
        fetchNextPage,
        hasNextPage,
        isFetching,
        isLoading,
    } = useInfiniteQuery(
        'data', // Query key
        ({ pageParam = 1 }) => fetchProfileAndFacts(pageParam), // Query function with pageParam
        {
            getNextPageParam: (lastPage, pages:any) => {
                // Assuming there is more data if the last page contains the expected number of items
                return pages.length + 1 : undefined;
            },
        }
    );

    const handleObserver = useRef<IntersectionObserver>();
    const lastElement = useCallback(
        (element:any) => {
        if (isLoading) return;
        if (handleObserver.current) handleObserver.current?.disconnect();
        handleObserver.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasNextPage && !isFetching) {
            fetchNextPage();
            }
        });
        if (element) handleObserver.current.observe(element);
        },
        [isLoading, hasNextPage]
    );

    console.log('data ->', data)


return (
    <div>
        Comments section
        {/* <Comment name = {person.name} img={person.img} comment={person.comment} /> */}
    </div>)
}

export default Comments;