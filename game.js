document.addEventListener('DOMContentLoaded', () => {
    let candleCount = 0;
    let money = 0;
    let gameOver = false;
    const candleContainer = document.getElementById('candle-container');
    const moneyDisplay = document.getElementById('money-display');
    const gameStatus = document.getElementById('game-status');
    const restartButton = document.getElementById('restart-button');
    let previousCandleHeight = 0;

    // Function to create a candle
    function createCandle(color, top) {
        const candle = document.createElement('div');
        candle.classList.add('candle');
        candle.classList.add(color === 'green' ? 'green-candle' : 'red-candle');
        candle.style.left = `${candleCount * 22}px`;

        if (color === 'green') {
            const height = Math.floor(Math.random() * 11) + 20; // Random height
            candle.style.height = `${height}px`;
            candle.style.bottom = `${previousCandleHeight}px`;
            previousCandleHeight += height;
        } else {
            candle.style.height = `${previousCandleHeight}px`; // Red candle spans the previous green candles height
            candle.style.bottom = '0px';
        }

        candleContainer.appendChild(candle);
    }


    // Function to check if the player wins
    function checkWinCondition() {
        const containerWidth = candleContainer.clientWidth;
        const candleRightEdge = (candleCount * 22) + 20; // Position of the right edge of the last candle
        return candleRightEdge >= containerWidth;
    }

    function checkMoon() {
        const containerHeight = candleContainer.clientHeight;
        const topOfLastCandle = previousCandleHeight;
        return topOfLastCandle >= containerHeight;
    }

    // Function to handle the click event
    document.body.addEventListener('click', () => {
        if (gameOver) {
            // Restart the game
            return;
        } else {
            // Random chance of losing
            const loseChance = 0.04 + (candleCount * 0.01); // Start at 10%, increase by 1% per candle

            if (Math.random() < loseChance) { // 10% chance
                gameStatus.innerText = 'Boom! You lost everything! Click to restart.';
                createCandle('red'); // Create a big red candle
                gameOver = true;
                restartButton.style.display = 'block'; // Show restart button
            } else {
                // Create a green candle
                createCandle('green');
                candleCount += 1; // Increase candle count
                money += 10; // Increase money
                moneyDisplay.innerText = `Money: $${money}`;
                gameStatus.innerText = 'Keep going!';

                if (checkWinCondition()) {
                    gameStatus.innerText = 'Congratulations! You win! Click to restart.';
                    gameOver = true;
                    restartButton.style.display = 'block'; // Show restart button
                }

                if (checkMoon()) {
                    gameStatus.innerText = 'TO THE MOON!!!';
                    moneyDisplay.innerText = `Money: $${1000000}`;
                    gameOver = true;
                    restartButton.style.display = 'block'; // Show restart button
                }
            }
        }
    });


    restartButton.addEventListener('click', () => {
        gameOver = false;
        candleContainer.innerHTML = ''; // Clear all candles
        previousCandleHeight = 0; // Reset height tracking
        candleCount = 0; // Reset candle count
        money = 0; // Reset money
        moneyDisplay.innerText = `Money: $${money}`;
        gameStatus.innerText = 'Tap to generate green candles!';
        restartButton.style.display = 'none'; // Hide restart button
    });
});