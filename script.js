let namaPlayer = prompt("Masukkan nama Anda:"); // Meminta nama player

        let canvas = document.getElementById("gameCanvas");
        let ctx = canvas.getContext("2d");

        let mobil = {
            x: canvas.width / 2 - 25,
            y: canvas.height - 75,
            width: 50,
            height: 75,
            speed: 10
        };

        let obstacle = {
            x: Math.random() * (canvas.width - 30),
            y: 0,
            width: 30,
            height: 30,
            speed: 3
        };

        let score = 0;
        let isGameOver = false;

        function drawMobil() {
            ctx.fillStyle = "#00F";
            ctx.fillRect(mobil.x, mobil.y, mobil.width, mobil.height);
        }

        function drawObstacle() {
            ctx.fillStyle = "#F00";
            ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
        }

        function drawScore() {
            ctx.fillStyle = "#FFF";
            ctx.font = "20px Arial";
            ctx.fillText("Score: " + score, 10, 30);
        }

        function drawPlayerInfo() {
            ctx.fillStyle = "#FFF";
            ctx.font = "18px Arial";
            ctx.fillText("Player: " + namaPlayer, canvas.width - 150, 20);
        }

        function drawGameOver() {
            ctx.fillStyle = "#FFF";
            ctx.font = "30px Arial";
            ctx.fillText("Game Over", canvas.width / 2 - 100, canvas.height / 2 - 30);
            ctx.font = "20px Arial";
            ctx.fillText("Player: " + namaPlayer, canvas.width / 2 - 70, canvas.height / 2 + 10);
            ctx.fillText("Score: " + score, canvas.width / 2 - 50, canvas.height / 2 + 40);
        }

        function draw() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            if (!isGameOver) {
                drawMobil();
                drawObstacle();
                drawScore();
                drawPlayerInfo();
            } else {
                drawGameOver();
            }
        }

        function moveMobil(direction) {
            if (!isGameOver) {
                if (direction === "left" && mobil.x > 0) {
                    mobil.x -= mobil.speed;
                } else if (direction === "right" && mobil.x < canvas.width - mobil.width) {
                    mobil.x += mobil.speed;
                }
            }
        }

        function moveObstacle() {
            if (!isGameOver) {
                obstacle.y += obstacle.speed;

                if (obstacle.y > canvas.height) {
                    obstacle.y = 0;
                    obstacle.x = Math.random() * (canvas.width - 30);

                    // Tambah skor ketika melewati rintangan
                    score++;
                }
            }
        }

        function checkCollision() {
            if (
                mobil.x < obstacle.x + obstacle.width &&
                mobil.x + mobil.width > obstacle.x &&
                mobil.y < obstacle.y + obstacle.height &&
                mobil.y + mobil.height > obstacle.y
            ) {
                isGameOver = true;
                showGameOver();
            }
        }

        function restartGame() {
            mobil.x = canvas.width / 2 - 25;
            mobil.y = canvas.height - 75;
            obstacle.x = Math.random() * (canvas.width - 30);
            obstacle.y = 0;
            score = 0;
            isGameOver = false;
            hideGameOver();
        }

        function showGameOver() {
            document.getElementById("gameOver").style.display = "block";
            document.getElementById("playerScore").innerHTML = "Score: " + score;
        }

        function hideGameOver() {
            document.getElementById("gameOver").style.display = "none";
        }

        function gameLoop() {
            draw();
            moveObstacle();
            checkCollision();
            requestAnimationFrame(gameLoop);
        }

        window.addEventListener("keydown", function (e) {
            if (!isGameOver) {
                if (e.key === "ArrowLeft") {
                    moveMobil("left");
                } else if (e.key === "ArrowRight") {
                    moveMobil("right");
                }
            } else if (e.key === "r" || e.key === "R") {
                restartGame();
            }
        });

        gameLoop();