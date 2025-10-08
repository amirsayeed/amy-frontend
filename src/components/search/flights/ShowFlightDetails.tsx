import React from 'react';

const ShowFlightDetails = async () => {
    try{
        const res = await fetch("https://amybd.com/amyset/flightresult.json")
        const data = await res.json();
        console.log(data.TripList);
  
      }catch(error){
        console.log("No Search found", error)
      }
    return (
        <div>
            
        </div>
    );
};

export default ShowFlightDetails;