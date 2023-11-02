import "../../App.css";
import React, { useEffect, useState } from "react";
import fetch from "node-fetch";


export default function TempTxn() {

  const orgId = ; // Organization ID for the org interested in loading.
  const backUrl = "https://www.gigantik.io"; // Back link to site.
  const limit = 25; // Limit is the number of rows to display on each page of leaderboard
  const [offsetSetting, setOffsetSetting] = useState(0);
  const [rankings, setRankings] = useState([]);
  const [nextButtonDisabled, setNextButtonDisabled] = useState(false);


  useEffect(() => {
    runLoadLeaderboard(offsetSetting)
  }, []);


  const clickedNext = async () => {
    let offset = offsetSetting + limit
    await runLoadLeaderboard(offset);
  }

  const clickedPrev = async () => {
    if(offsetSetting > 0) {
      let offset = offsetSetting - limit;
      offset = offset < 0? 0 : offset;
      if (nextButtonDisabled) {
        setNextButtonDisabled(false)
      }
      await runLoadLeaderboard(offset);
    }
  }

  const vieweaderboard = () => {
    if(rankings.length > 0) {
      return (
        <div id="leaderboard">
          {offsetSetting === 0? <div className="ribbon"></div> : <div></div>}
          <table>
              {rankings.map((entry, index) => (
                <tr>
                  <td className="number">{(index + offsetSetting + 1)}</td>
                  <td className="name">{entry.username? entry.username : entry.wallet_id}</td>
                  <td className="points">{entry.collector_score}</td>
                </tr>
              ))}
          </table>
          <div id="buttons">
            <button className="previous" disabled={(offsetSetting === 0)} onClick={async () => await clickedPrev()}>Prev</button>
            <button className="next" disabled={nextButtonDisabled} onClick={async () => await clickedNext()}>Next</button>
          </div>
          <br />
          <br />
        </div>
      )
    } else {
      return (
        <div id="leaderboard">
          <table>
            <tr>
              <td className="number">0</td>
              <td className="name">No Entries</td>
            </tr>
          </table>
          <div id="buttons">
            <button className="previous" disabled={(offsetSetting === 0)} onClick={async () => await clickedPrev()}>Prev</button>
            <button className="next" disabled={nextButtonDisabled} onClick={async () => await clickedNext()}>Next</button>
          </div>
          <br />
          <br />
        </div>
      );
    }
  }

  const runLoadLeaderboard = async (offset) => {
    
    try {
      
      var myHeaders = new fetch.Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Access-Control-Allow-Origin", "*");

      const requestOptions = {
        method: "GET",
        mode: "cors",
        headers: myHeaders
      };
      try {
        let resp = await fetch(
          `https://api.gigantik.io/marketplace/leaderboard?limit=${limit}&offset=${offset}&org_id=${orgId}`,
          requestOptions
        );
        let object = await resp.json();
        if (object.length > 0) {
          setRankings(object)
          setOffsetSetting(offset)
          if(object.length < limit) {
            setNextButtonDisabled(true)
          } 
        } else {
          setNextButtonDisabled(true)
        }
        
        //console.log(object);
      } catch (error) {
        console.log("Got an error, replace with indication to use.");
        console.log(error);
      }
    } catch (error) {
      console.log(error);
    }

  };

  return (
    <div className="App">
      <br />
      <a href={backUrl}>BACK</a>
      <br /><br />
      <header className="App-header">
        <div className="main-div">
          <div id="header">
            <h1>Leaderboard</h1>
          </div>
          {vieweaderboard()}
        </div>
      </header>
    </div>
  );
}
