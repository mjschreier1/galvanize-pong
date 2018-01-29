// your code here
function populateScores() {
  var scores = `<h1 class="scores-title">Top Scores</h1>`;
  fetch("https://galvanize-leader-board.herokuapp.com/api/v1/leader-board")
    .then(response => {
      if(response.status < 200 || response.status >= 400) {
        reject()
      }
      return response.json()
    })
    .then(json => json.filter(score => score.game_name === "GBP"))
    .then(filteredJson => filteredJson.sort((a, b) => b.score - a.score ))
    .then(sortedJson => sortedJson.filter((score, index) => index <= 2))
    .then(topThree => topThree.forEach(highScore => {
      scores +=
      `<p class="score-card">
        <span class="player-name">${highScore.player_name}</span>
        <span class="score">${highScore.score}</span>
      </p>`
    }))
    .then(() => {
      document.querySelector(".scores").innerHTML = scores
    })
    .catch(() => {
      document.querySelector(".scores").innerHTML = "<p>Oops, problem loading high scores</p>"
    })
}

populateScores();

document.querySelector("#myCanvas").addEventListener("gameOver", endGame);

function endGame() {
  alertFinalScore();
  postFinalScore()
}

function alertFinalScore(finalScore) {
  alert("Your final score is " + score)
}

function postFinalScore() {
  fetch("https://galvanize-leader-board.herokuapp.com/api/v1/leader-board", {
    method: "POST",
    body: JSON.stringify({
      "game_name": "GBP",
      "player_name": document.querySelector(".big-input").value,
      "score": score
    }),
    headers: new Headers({
      "Content-Type": "application/json"
    })
  })
    .then((response) => {
      if(response.status < 200 || response.status >= 400) {
        throw new Error(response.statusText)
      }
      populateScores()
    })
    .catch((error) => { console.error(error) })
}
