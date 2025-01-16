var batter;
var score = 0;
var target;
var audio = new Audio('audio/click.mp3');

function toss(oddyaeve, tu) {
    if ((oddyaeve == 0 || oddyaeve == 1) && (tu > 0 && tu < 7)) {
        var tc = Math.floor(Math.random() * 6) + 1;
        console.log(tc)
        console.log(tc + tu)
        var tl = gsap.timeline()

        tl.to('.keys', {
            scale: 0,
        });
        tl.to('.batorball', {
            scale: 1,
        })
        if ((tc + tu) % 2 == oddyaeve) {
            // console.log("You want batting or bowling")

            // batorball(true);//user
            document.querySelector('.batorball').innerHTML = `
             <i>You won the toss!</i><br>What is tour choices?
            <div class="btn">
                <button class="b bat" onclick="batorball(true,'bat')">Bat</button>
                <button class="b ball" onclick="batorball(true,'ball')">Ball</button>
            </div>`
        }
        else {
            // console.log("comp")
            batorball(false);//comp
        }
    }
    else {
        console.log("invalid input")
    }
}

const uhead = document.querySelector('.user .head')
const chead = document.querySelector('.comp .head')
function batorball(x, userChoice) {
    if (x) {
        console.log("You want batting or bowling")
        var batball = userChoice
        if (batball == 'bat') {
            batter = 'user';
            uhead.innerHTML = `user(bat🏏)`
            chead.innerHTML = `computer(ball 🥎)`
            audio.play()
        }
        else {
            batter = 'comp';
            chead.innerHTML = `computer(bat🏏)`
            uhead.innerHTML = `user(ball 🥎)`
            audio.play()
        }
        var th = gsap.timeline()
        th.to('.batorball', {
            scale: 0,
            duration: .7,
        })
        th.to('.main', {
            display: "flex",
            duration: 0.01,
        });
        th.to('.main', {
            scale: 1,
            duration: .7,
        })
    }
    else {
        var ran = Math.random();
        if (ran <= 0.5) {
            console.log("comp choose to bat")
            batter = 'comp'
            chead.innerHTML += `(bat🏏)`
            uhead.innerHTML += `(ball 🥎)`
            document.querySelector('.batorball').innerHTML = `Computer won the toss and choose to bat 
                <button class="b" onclick="showMain()">Continue</button>
            `;
        }
        else {
            console.log("comp choose to ball")
            batter = 'user';
            uhead.innerHTML += `(bat🏏)`
            chead.innerHTML += `(ball 🥎)`
            document.querySelector('.batorball').innerHTML = `Computer won the toss and choose to ball
            <button class="b" onclick="showMain()">Continue</button>`;
        }
    }
}

function showMain() {
    audio.play()
    var th = gsap.timeline()
    th.to('.batorball', {
        scale: 0,
        duration: .7,
    })
    th.to('.main', {
        display: "flex",
        duration: 0.01,
    });
    th.to('.main', {
        scale: 1,
        duration: .7,
    })
}

var cpp = 0
function scores(userRun) {
    // var audio = new Audio('audio/click.mp3');
    audio.play();
    document.querySelectorAll('.ks').forEach(button => {
        button.disabled = true;
    });

    var change = false;
    const targetelem = document.querySelector('.target')
    var compRun = Math.floor(Math.random() * 6) + 1;
    if (batter == 'user') {
        if (userRun == compRun) {
            if (cpp == 0) {
                target = score + 1;
                targetelem.innerHTML = `Target: ${target}`
                gsap.to(targetelem, {
                    opacity: 1,
                })
                score = 0;
                batter = 'comp'
                chead.innerHTML = `computer(bat🏏)`
                uhead.innerHTML = `user(ball 🥎)`
            }
            cpp++
        } else {
            score += userRun;
        }

    }
    else if (batter == 'comp') {
        if (userRun == compRun) {
            if (cpp == 0) {
                target = score + 1;
                targetelem.innerHTML = `Target: ${target}`
                gsap.to(targetelem, {
                    opacity: 1,
                })
                score = 0;
                batter = 'user'
                uhead.innerHTML = `user(bat🏏)`
                chead.innerHTML = `computer(ball 🥎)`
            }
            cpp++
        } else {
            score += compRun;
        }
    }
    document.querySelector('.score').innerHTML = `Score: ${score}`
    console.log('comp:', compRun)
    console.log('user:', userRun)
    console.log('score:', score)
    document.querySelector('.user .img').style.backgroundImage = `url(imgs/${userRun}.png)`
    document.querySelector('.comp .img').style.backgroundImage = `url(imgs/${compRun}.png)`
    console.log('c:', cpp)
    over(cpp, compRun, userRun);
}

function over(c, compRun, userRun) {
    const win = new Audio('audio/win.mp3');
    const lose = new Audio('audio/lose.mp3');
    if (c >= 2 && compRun == userRun) {
        const result = document.querySelector('.result');
        if (score <= target) {
            console.log(batter, " loses")
            if (batter == 'user') {
                result.innerHTML = `You Lost<br>
                <button onclick="location.reload()">Restart</button>`

                lose.play();
            } else if (batter == 'comp') {
                result.innerHTML = `You Won<br>
                <button onclick="location.reload()">Restart</button>`
                win.play();
            }
            gsap.to(result, {
                scale: 1,
                duration: .5,
            })

        } else if (score >= target) {
            console.log(batter, " wins")
            if (batter == 'user') {
                result.innerHTML = `You won<br>
                <button onclick="location.reload()">Restart</button>`
                win.play();
            } else if (batter == 'comp') {
                result.innerHTML = `You Lost<br>
                <button onclick="location.reload()">Restart</button>`
                lose.play();
            }
            gsap.to(result, {
                scale: 1,
                duration: .5,
            })
        }
    }
    else {
        document.querySelectorAll('.ks').forEach(button => {
            button.disabled = false;
        });
    }

    
    
    if (c==1 && score >= target) {
        console.log(batter, " wins")
        const result = document.querySelector('.result');
        if (batter == 'user') {
            result.innerHTML = `You won<br>
                <button onclick="location.reload()">Restart</button>`
            win.play();
        } else if (batter == 'comp') {
            result.innerHTML = `You Lost<br>
                <button onclick="location.reload()">Restart</button>`
            lose.play();
        }
        gsap.to(result, {
            scale: 1,
            duration: .5,
        })
    }
}
var ch;
function start() {
    document.querySelector('.toss').classList.add('active')
    document.querySelector('.start').classList.add('active')
    document.querySelectorAll('button').forEach(e => {
        e.addEventListener('click', () => {
            audio.play();
        })
    })
    audio.play()
}

function choice(e) {
    ch = e

    var tl = gsap.timeline()
    tl.to('.toss', {
        opacity: 0,
        duration: .3,

    })
    tl.to('.toss', {
        delay: .5,
        display: "none",
        duration: 0.01,
    });
    tl.to('.keys', {
        scale: 1,
        ease: "bounce.out",
        duration: 1,
    })
    tl.to('.toss', {
        display: "none",
        duration: 0.01,
        // ease: "power1.in",
    })
}

function tossValue(e) {
    toss(ch, e)
}


