import React, { useEffect, useState } from "react"
import { View, Text, StyleSheet } from "react-native"
import axios from "axios"
const showId = 1399
// const api = 'https://api.themoviedb.org/3/tv/'+showId+'/season/1?api_key=8a869e5388c886cce43c72cff4147cbc&language=en-US'
export default function Seasons(props){
    const [data, setData] =  useState([])
// const showId = props.id
    useEffect(() => {
        for(let i = 1; i <= props.number_of_seasons; i++ )
        {
            console.log("loop")
            fetchData('https://api.themoviedb.org/3/tv/'+showId+'/season/'+i+'?api_key=8a869e5388c886cce43c72cff4147cbc&language=en-US')
        }

        async function fetchData(url)
        {
            await axios.get(url)
            .then(response => setData([...data, response.data]))
            .catch(error => console.log("Error : ", error))
        }
    },[])
    console.log("Data:  ", data)
    return(<View></View>)
}

const styles = StyleSheet.create({
    mainContainer: {
    }
})