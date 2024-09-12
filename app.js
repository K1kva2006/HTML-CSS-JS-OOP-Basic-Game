const container = document.getElementById("container");

class Npc {
    npc = document.createElement("div");

    left = false;
    right = false;
    x = 0;
    constructor(width, height, color, speed) {
        container.appendChild(this.npc);
        this.npc.style.width = width;
        this.npc.style.height = height;
        this.npc.style.background = color;
        this.npc.style.position = "absolute";
        this.npc.style.bottom = "80px";
        this.npc.style.left = "110px";

        this.speed = speed;

        this.moveEngine();
    }

    move() {
        this.npcX = this.npc.getBoundingClientRect().left;
        this.npcY = this.npc.getBoundingClientRect().top;
        this.npcHalfWidth = this.npc.getBoundingClientRect().width / 2;
        this.npcHalfHeight = this.npc.getBoundingClientRect().height / 2;

        if (this.x <= 0) {
            this.right = true;
            this.left = false;
        }
        if (
            this.x >=
            container.getBoundingClientRect().width -
                this.npc.getBoundingClientRect().width -
                105
        ) {
            this.left = true;
            this.right = false;
        }

        if (this.left) {
            this.x -= this.speed;
        }
        if (this.right) {
            this.x += this.speed;
        }

        this.npc.style.transform = `translateX(${this.x}px)`;
    }

    moveEngine() {
        this.move();

        requestAnimationFrame(() => this.moveEngine());
    }
}

class Player {
    player = document.createElement("div");
    up = false;
    down = false;
    left = false;
    right = false;
    x = 0;
    y = 0;
    constructor(width, height, color, speed) {
        container.appendChild(this.player);
        this.player.style.width = width;
        this.player.style.height = height;
        this.player.style.background = color;
        this.player.style.position = "absolute";
        this.player.style.bottom = "80px";
        this.speed = speed;

        this.changePositon();
        this.moveEngine();
    }

    changePositon() {
        window.addEventListener("keydown", (e) => {
            if (e.key === " " && this.y === 0) {
                this.up = true;
            }
            if (e.key.toLocaleLowerCase() === "d") {
                this.right = true;
            }
            if (e.key.toLocaleLowerCase() === "a") {
                this.left = true;
            }
        });
        window.addEventListener("keyup", (e) => {
            if (e.key.toLocaleLowerCase() === "d") {
                this.right = false;
            }
            if (e.key.toLocaleLowerCase() === "a") {
                this.left = false;
            }
        });
    }

    move() {
        if (
            this.right &&
            this.x <= container.getBoundingClientRect().width - 110
        ) {
            this.x += this.speed;
        }
        if (this.left && this.x >= 20) {
            this.x -= this.speed;
        }
        this.player.style.transform = `translate(${this.x}px, ${this.y}px`;
    }

    moveEngine() {
        this.move();
        this.jump();
        this.playerX = this.player.getBoundingClientRect().left;
        this.playerY = this.player.getBoundingClientRect().top;
        this.playerHalfWidth = this.player.getBoundingClientRect().width / 2;
        this.playerHalfHeight = this.player.getBoundingClientRect().height / 2;

        requestAnimationFrame(() => this.moveEngine());
    }

    jump() {
        if (this.up) {
            this.y -= 20;
            if (this.y === -360) {
                this.up = false;
                this.down = true;
            }
        }
        if (this.down) {
            this.y += 10;
            if (this.y === 0) {
                this.down = false;
            }
        }
    }
}

const npc = new Npc("100px", "100px", "red", 10);
const player = new Player("100px", "100px", "blue", 10);

function collision() {
    if (
        player.playerX - player.playerHalfWidth ===
            npc.npcX + npc.npcHalfWidth &&
        player.playerY === npc.npcY
    ) {
        player.player.remove();
    }
    if (
        player.playerX + player.playerHalfWidth ===
            npc.npcX - npc.npcHalfWidth &&
        player.playerY === npc.npcY
    ) {
        player.player.remove();
    }
}

function collisionEngine() {
    collision();
    requestAnimationFrame(collisionEngine);
}
collisionEngine();
