function setup() {
  database = firebase.database();
  database.ref().once('value', function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
      var key = childSnapshot.key;
      clubArray.push(key);
    });
    // Create scrollable lists for each club
    createScrollableLists();
  });
}

function draw() {
  clubArray.forEach(element => {
    let drift = random(-0.1, 0.1); // Drift in the stock price
    let noise = randomGaussian(0, volatility); // Random noise
    let deltaPrice = drift * initialPrice * timeInterval + noise; // Change in stock price

    // Update stock price for each club
    let stock_price = database.ref(`/clubs/${element.trim()}/stock-price`);
    stock_price.set(deltaPrice);
  });
  delay(10000)
}
