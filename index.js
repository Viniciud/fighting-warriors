const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

canvas.width = window.screen.width;
canvas.height = 576;

context.fillRect(0, 0, canvas.width, canvas.height);

const gravity = 0.8;

// differents screen resolutions
if (window.screen.width <= 1024) {
    console.log('screen w1 ', window.screen.width)
    var background = new Sprite({
        position: {
            x: 0,
            y: 0
        },
        imageSrc: './assets/GameBackground.png'
    })
}
else if (window.screen.width > 1024 && window.screen.width <= 1280) {
    console.log('screen w2 ', window.screen.width)
    var background = new Sprite({
        position: {
            x: 0,
            y: 0
        },
        imageSrc: './assets/GameBackground3.png'
    })
}
else if (window.screen.width > 1280 && window.screen.width < 1920) {
    console.log('screen w3 ', window.screen.width)
    var background = new Sprite({
        position: {
            x: 0,
            y: 0
        },
        imageSrc: './assets/GameBackground2.png'
    })
}
else if (window.screen.width >= 1920) {
    console.log('screen w4 ', window.screen.width)
    var background = new Sprite({
        position: {
            x: 0,
            y: 0
        },
        imageSrc: './assets/GameBackground4.png'
    })
}

const shop = new Sprite({
    position: {
        x: 680,
        y: 137
    },
    imageSrc: './assets/shop.png',
    scale: 1,
    framesMax: 6
})

const player = new Fighter({
    position: { x: 0, y: 0 },
    velocity: { x: 0, y: 0 },
    offset: { x: 0, y: 0 },
    imageSrc: './assets/samurai/Idle.png',
    framesMax: 8,
    scale: 2,
    offset: {
        x: 155,
        y: 145
    },
    sprites: {
        idle: {
            imageSrc: './assets/samurai/Idle.png',
            framesMax: 8
        },
        run: {
            imageSrc: './assets/samurai/Run.png',
            framesMax: 8
        },
        jump: {
            imageSrc: './assets/samurai/Jump.png',
            framesMax: 2
        },
        fall: {
            imageSrc: './assets/samurai/Fall.png',
            framesMax: 2
        },
        attack1: {
            imageSrc: './assets/samurai/Attack1.png',
            framesMax: 6
        },
        takeHit: {
            imageSrc: './assets/samurai/Take Hit - white silhouette.png',
            framesMax: 4
        },
        death: {
            imageSrc: './assets/samurai/Death.png',
            framesMax: 6
        }
    },
    attackBox: {
        offset: {
            x: 100,
            y: 30
        },
        width: 120,
        height: 50
    },
    damage: 15
});

const enemy = new Fighter({
    position: { x: 400, y: 100 },
    velocity: { x: 0, y: 0 },
    offset: { x: 0, y: 0 },
    imageSrc: './assets/ronin-R/Idle.png',
    framesMax: 4,
    invert: true,
    scale: 2,
    offset: {
        x: 215,
        y: 155
    },
    sprites: {
        idle: {
            imageSrc: './assets/ronin-R/Idle.png',
            framesMax: 4
        },
        run: {
            imageSrc: './assets/ronin-R/Run.png',
            framesMax: 8
        },
        jump: {
            imageSrc: './assets/ronin-R/Jump.png',
            framesMax: 2
        },
        fall: {
            imageSrc: './assets/ronin-R/Fall.png',
            framesMax: 2
        },
        attack1: {
            imageSrc: './assets/ronin-R/Attack1.png',
            framesMax: 4
        },
        takeHit: {
            imageSrc: './assets/ronin-R/Take hit.png',
            framesMax: 3
        },
        death: {
            imageSrc: './assets/ronin-R/Death.png',
            framesMax: 7
        }
    },
    attackBox: {
        offset: {
            x: -180,
            y: 30
        },
        width: 120,
        height: 50
    },
    damage: 6.25
});

// const enemy = new Fighter({
//     position: { x: 400, y: 100 },
//     velocity: { x: 0, y: 0 },
//     offset: { x: 0, y: 0 },
//     imageSrc: './assets/warrior-R/Idle.png',
//     framesMax: 10,
//     invert: true,
//     scale: 2,
//     offset: {
//         x: 120,
//         y: 65
//     },
//     sprites: {
//         idle: {
//             imageSrc: './assets/warrior-R/Idle.png',
//             framesMax: 10
//         },
//         run: {
//             imageSrc: './assets/warrior-R/Run.png',
//             framesMax: 8
//         },
//         jump: {
//             imageSrc: './assets/warrior-R/Jump.png',
//             framesMax: 3
//         },
//         fall: {
//             imageSrc: './assets/warrior-R/Fall.png',
//             framesMax: 3
//         },
//         attack1: {
//             imageSrc: './assets/warrior-R/Attack1.png',
//             framesMax: 7
//         },
//         takeHit: {
//             imageSrc: './assets/warrior-R/Take hit.png',
//             framesMax: 3
//         },
//         death: {
//             imageSrc: './assets/warrior-R/Death.png',
//             framesMax: 11
//         }
//     },
//     attackBox: {
//         offset: {
//             x: -100,
//             y: 30
//         },
//         width: 120,
//         height: 50
//     },
//     damage: 20
// });

const keys = {
    a: {
        pressed: false
    },
    d: {
        pressed: false
    },
    ArrowLeft: {
        pressed: false
    },
    ArrowRight: {
        pressed: false
    }
}

decreaseTimer()

function animate() {
    window.requestAnimationFrame(animate);
    context.fillStyle = 'black';
    context.fillRect(0, 0, canvas.width, canvas.height)

    background.update();
    shop.update();
    context.fillStyle = 'rgba(0,124,255, 0.15)'
    context.fillRect(0, 0, canvas.width, canvas.height)
    player.update();
    enemy.update();

    player.velocity.x = 0;
    enemy.velocity.x = 0;

    //player movement

    if (keys.a.pressed && player.lastKey == 'a') {
        player.velocity.x = -5;
        player.switchSprite('run');
    }
    else if (keys.d.pressed && player.lastKey == 'd') {
        player.velocity.x = 5;
        player.switchSprite('run');
    }
    else {
        player.switchSprite('idle');
    }

    //player jumping
    if (player.velocity.y < 0) {
        player.switchSprite('jump');
    }
    else if (player.velocity.y > 0) {
        player.switchSprite('fall');
    }

    //second player movement
    if (keys.ArrowLeft.pressed && enemy.lastKey == 'ArrowLeft') {
        enemy.velocity.x = -5;
        enemy.switchSprite('run');
    }
    else if (keys.ArrowRight.pressed && enemy.lastKey == 'ArrowRight') {
        enemy.velocity.x = 5;
        enemy.switchSprite('run');
    } else {
        enemy.switchSprite('idle');
    }

    //second player jumping
    if (enemy.velocity.y < 0) {
        enemy.switchSprite('jump');
    }
    else if (enemy.velocity.y > 0) {
        enemy.switchSprite('fall');
    }

    //detect for collision & enemy gets hit
    if (rectangularCollision({ rectangle1: player, rectangle2: enemy }) &&
        player.isAttacking && player.framesCurrent == 4) {
        player.takeHit(enemy)
        player.isAttacking = false;
        gsap.to('#enemy-health', {
            width: enemy.health + '%'
        })
    }

    //if player misses
    if (player.isAttacking && player.framesCurrent == 4) {
        player.isAttacking = false;
    }

    // player gets hit
    if (rectangularCollision({ rectangle1: enemy, rectangle2: player }) &&
        enemy.isAttacking && enemy.framesCurrent == 2) {
        enemy.takeHit(player)
        enemy.isAttacking = false;
        gsap.to('#player-health', {
            width: player.health + '%'
        })
    }

    //if second player misses
    if (enemy.isAttacking && enemy.framesCurrent == 2) {
        enemy.isAttacking = false;
    }

    //end game based on health
    if (enemy.health <= 0 || player.health <= 0) {
        determineWinner({ player, enemy, timerId });
    }
}

animate();

window.addEventListener('keydown', (event) => {
    // console.log('key ', event.key)
    if(event.key == 'e' && (player.dead || enemy.dead)) {
        window.location.reload();
    }

    if (!enemy.dead) {

        switch (event.key) {
            case 'd':
                keys.d.pressed = true;
                player.lastKey = 'd';
                break;
            case 'a':
                keys.a.pressed = true;
                player.lastKey = 'a';
                break;
            case 'w':
                player.velocity.y = -20;
                break;
            case ' ':
                player.attack();
                break;
        }
    }
    if (!player.dead) {
        switch (event.key) {
            case 'ArrowRight':
                keys.ArrowRight.pressed = true;
                enemy.lastKey = 'ArrowRight';
                break;
            case 'ArrowLeft':
                keys.ArrowLeft.pressed = true;
                enemy.lastKey = 'ArrowLeft';
                break;
            case 'ArrowUp':
                enemy.velocity.y = -20;
                break;
            case '1':
                enemy.attack();
                break;
        }
    }
})

window.addEventListener('keyup', (event) => {
    switch (event.key) {
        case 'd':
            keys.d.pressed = false;
            break;
        case 'a':
            keys.a.pressed = false;
            break;
    }

    //second player
    switch (event.key) {
        case 'ArrowRight':
            keys.ArrowRight.pressed = false;
            break;
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = false;
            break;
    }
})