<<<<<<< HEAD
/* =========================================================
   HOME — PROMOTION SLIDER
========================================================= */

const promoSlides = [...document.querySelectorAll('.promotion-slide')];
const promoDots = [...document.querySelectorAll('.promo-dot')];

let promoIndex = 0;
let promoTimer;

function showPromotion(index) {
    if (!promoSlides.length) return;

    promoIndex =
        (index + promoSlides.length) % promoSlides.length;

    promoSlides.forEach((slide, i) => {
        slide.classList.toggle('active', i === promoIndex);
    });

    promoDots.forEach((dot, i) => {
        dot.classList.toggle('active', i === promoIndex);
    });
}

function restartPromotion() {
    clearInterval(promoTimer);

    promoTimer = setInterval(() => {
        showPromotion(promoIndex + 1);
    }, 5500);
}

document.getElementById('promoPrev')?.addEventListener('click', () => {
    showPromotion(promoIndex - 1);
    restartPromotion();
});

document.getElementById('promoNext')?.addEventListener('click', () => {
    showPromotion(promoIndex + 1);
    restartPromotion();
});

promoDots.forEach(dot => {
    dot.addEventListener('click', () => {
        showPromotion(Number(dot.dataset.slide));
        restartPromotion();
    });
});

showPromotion(0);
restartPromotion();


/* =========================================================
   HOME — HOT GAMES
   LOAD FROM JSON / AUTO ROTATE
========================================================= */

const hotList = document.getElementById('hotGameList');

const HOT_ROTATE_MS = 60 * 60 * 1000;

const hotProviders = [
    '918KISS',
    'MEGA888',
    'PUSSY888'
];

let hotGames = {};

let hotIndexes = {
    '918KISS': 0,
    'MEGA888': 0,
    'PUSSY888': 0
};


/* ---------------------------------------------------------
   RANDOM RATING
--------------------------------------------------------- */

function randomRating() {
    return (4.5 + Math.random() * 0.4).toFixed(1);
}


/* ---------------------------------------------------------
   FILE NAME → GAME NAME
--------------------------------------------------------- */

function getGameName(filename) {
    return filename
        .replace(/\.[^/.]+$/, '')
        .replace(/[_-]+/g, ' ')
        .trim();
}


/* ---------------------------------------------------------
   RENDER HOT GAMES
--------------------------------------------------------- */

function renderHotGames() {
    if (!hotList) return;

    hotList.innerHTML = hotProviders
        .map((provider, index) => {

            const games = hotGames[provider];

            if (!games || !games.length) {
                return '';
            }

            const gameIndex =
                hotIndexes[provider] % games.length;

            const filename = games[gameIndex];
            const gameName = getGameName(filename);

            const image =
                `Image/HotGames/${provider}/${filename}`;

            const rating = randomRating();

            return `
                <article class="hot-rank-preview">

                    <span class="hot-rank">
                        ${index + 1}
                    </span>

                    <img
                        src="${image}"
                        alt="${gameName}"
                        class="hot-game-image"
                    >

                    <div class="hot-info">

                        <div class="hot-meta">

                            <span class="hot-badge">
                                HOT
                            </span>

                            <span class="rating">
                                ★ ${rating}
                            </span>

                        </div>

                        <strong>
                            ${gameName}
                        </strong>

                        <small>
                            ${provider}
                        </small>

                    </div>

                </article>
            `;
        })
        .join('');
}


/* ---------------------------------------------------------
   ROTATE HOT GAMES
--------------------------------------------------------- */

function rotateHotGames() {
    hotProviders.forEach(provider => {

        if (
            hotGames[provider] &&
            hotGames[provider].length > 1
        ) {
            hotIndexes[provider] =
                (hotIndexes[provider] + 1) %
                hotGames[provider].length;
        }

    });

    renderHotGames();
}


/* ---------------------------------------------------------
   LOAD GAMES.JSON
--------------------------------------------------------- */

fetch('Image/HotGames/games.json')
    .then(response => {

        if (!response.ok) {
            throw new Error('games.json tidak ditemukan');
        }

        return response.json();
    })
    .then(data => {

        hotGames = data;

        renderHotGames();

        setInterval(
            rotateHotGames,
            HOT_ROTATE_MS
        );
    })
    .catch(error => {

        console.error(
            'HOT GAME ERROR:',
            error
        );
    });


/* =========================================================
   HOME — POPULAR GAME
   AUTO SCROLL
========================================================= */

const popularTrack =
    document.getElementById('popularTrack');

if (popularTrack) {

    let position = 0;
    let lastTime = 0;
    let loopWidth = 0;
    let paused = false;


    /* -----------------------------------------------------
       CALCULATE LOOP WIDTH
    ----------------------------------------------------- */

    function updateLoopWidth() {

        const cards =
            popularTrack.querySelectorAll('.popular-card');

        if (cards.length < 2) return;

        const half =
            Math.floor(cards.length / 2);

        loopWidth =
            cards[half].offsetLeft -
            cards[0].offsetLeft;
    }


    /* -----------------------------------------------------
       ANIMATE POPULAR GAME
    ----------------------------------------------------- */

    function animatePopular(timestamp) {

        if (!lastTime) {
            lastTime = timestamp;
        }

        const delta =
            timestamp - lastTime;

        lastTime = timestamp;

        if (!paused && loopWidth > 0) {

            position += delta * 0.035;

            if (position >= loopWidth) {
                position -= loopWidth;
            }

            popularTrack.style.transform =
                `translateX(-${position}px)`;
        }

        requestAnimationFrame(
            animatePopular
        );
    }


    /* -----------------------------------------------------
       PAUSE ON HOVER
    ----------------------------------------------------- */

    popularTrack.addEventListener(
        'mouseenter',
        () => {
            paused = true;
        }
    );

    popularTrack.addEventListener(
        'mouseleave',
        () => {

            paused = false;
            lastTime = performance.now();
        }
    );


    /* -----------------------------------------------------
       INITIALIZE
    ----------------------------------------------------- */

    window.addEventListener(
        'resize',
        updateLoopWidth
    );

    updateLoopWidth();

    requestAnimationFrame(
        animatePopular
    );
}


/* =========================================================
   PROMOTION / REGISTER / LOGIN
========================================================= */

document
    .getElementById('registerBtn')
    ?.addEventListener(
        'click',
        () => {
            window.open(
                'https://www.watsapp.cc/DISNEY/',
                '_blank'
            );
        }
    );


document
    .getElementById('loginBtn')
    ?.addEventListener(
        'click',
        () => {
            window.open(
                'https://www.watsapp.cc/DISNEY/',
                '_blank'
            );
        }
    );


/* =========================================================
   LIVE CHAT
========================================================= */

document
    .getElementById('liveChatBtn')
    ?.addEventListener(
        'click',
        function (event) {

            event.preventDefault();


            /* Remove active from all nav buttons */

            document
                .querySelectorAll('.nav-button')
                .forEach(button => {
                    button.classList.remove(
                        'active'
                    );
                });


            /* Set Live Chat active */

            this.classList.add('active');


            /* Try to open Chatway */

            const tryOpenChat = () => {

                const chat =
                    document.querySelector(
                        '.chatway--trigger-container'
                    );

                if (!chat) {
                    return false;
                }


                const button =
                    chat.querySelector(
                        'button, [role="button"], a'
                    );


                if (button) {

                    button.click();

                    return true;
                }


                chat.click();

                return true;
            };


            /* Try immediately */

            if (tryOpenChat()) {
                return;
            }


            /* Retry until Chatway loads */

            let count = 0;

            const timer =
                setInterval(() => {

                    count++;

                    if (
                        tryOpenChat() ||
                        count >= 40
                    ) {
                        clearInterval(timer);
                    }

                }, 250);
        }
    );

/* ---------------------------------------------------------
   FORMAT CASHOUT
--------------------------------------------------------- */

function formatCashout(value) {

    const num =
        parseFloat(value);

    if (Number.isNaN(num)) {
        return value;
    }

    return 'RM ' +
        num.toLocaleString('en-US');
}


/* ---------------------------------------------------------
   MASK NAME
--------------------------------------------------------- */

function maskedName(rawName) {

    const name =
        String(rawName ?? '').trim();

    const visibleChars = 3;
    const maxStars = 6;
    const minStars = 6;

    let hiddenStars =
        name.length - visibleChars;


    if (hiddenStars > maxStars) {
        hiddenStars = maxStars;
    }


    if (hiddenStars < minStars) {
        hiddenStars = minStars;
    }


    const visible =
        name.slice(-visibleChars);


    return '*'.repeat(hiddenStars) +
        visible;
}


/* ---------------------------------------------------------
   FETCH & RENDER SHEET
--------------------------------------------------------- */

function fetchAndRenderSheet() {

    fetch(
        'https://opensheet.elk.sh/1pQMcGZU6OIXoF59wYoxX3254Vs7_Fi-8jjcHT7nb7j4/data'
    )
        .then(response => response.json())

        .then(rows => {

            const lastRows =
                rows.slice(-5);

            let html = '';
            let mobileHtml = '';


            lastRows.forEach(row => {

                const name =
                    maskedName(row.name);

                const cashout =
                    formatCashout(
                        row.cashout
                    );


                /* Desktop */

                html += `
                    <tr>
                        <td>${cashout}</td>
                        <td>${name}</td>
                        <td>${row.game}</td>
                        <td>${row.name_game}</td>
                    </tr>
                `;


                /* Mobile */

                mobileHtml += `
                    <article class="live-row">

                        <div>
                            <small>Cashout</small>
                            <strong class="cashout">
                                ${cashout}
                            </strong>
                        </div>

                        <div>
                            <small>Name</small>
                            <strong>
                                ${name}
                            </strong>
                        </div>

                        <div>
                            <small>Game</small>
                            <strong>
                                ${row.game}
                            </strong>
                        </div>

                        <div>
                            <small>Name Game</small>
                            <strong>
                                ${row.name_game}
                            </strong>
                        </div>

                    </article>
                `;
            });


            document
                .getElementById('sheetData')
                .innerHTML = html;


            document
                .getElementById('liveMobileList')
                .innerHTML = mobileHtml;
        })

        .catch(error => {
            console.error(
                'Fetch error:',
                error
            );
        });
}


fetchAndRenderSheet();

setInterval(
    fetchAndRenderSheet,
    5000
);


/* =========================================================
   NAVIGATION — ACTIVE PAGE
========================================================= */

const currentPage =
    window.location.pathname
        .split('/')
        .pop()
        .toLowerCase();


document
    .querySelectorAll('.nav-button')
    .forEach(button => {

        const href =
            button.getAttribute('href');


        if (!href || href === '#') {
            return;
        }


        const linkPage =
            href
                .split('/')
                .pop()
                .toLowerCase();


        button.classList.remove(
            'active'
        );


        if (
            linkPage === currentPage ||
            (
                currentPage === '' &&
                linkPage === 'index.html'
            )
        ) {
            button.classList.add(
                'active'
            );
        }
    });


/* =========================================================
   DOWNLOAD PAGE — SEARCH
========================================================= */

const downloadSearch =
    document.getElementById(
        'downloadSearch'
    );


downloadSearch?.addEventListener(
    'input',
    function () {

        const keyword =
            this.value
                .trim()
                .toLowerCase();


        document
            .querySelectorAll(
                '.download-game-card'
            )
            .forEach(card => {

                const gameName =
                    card
                        .querySelector('strong')
                        ?.textContent
                        .trim()
                        .toLowerCase() || '';


                card.classList.toggle(
                    'hidden',
                    keyword !== '' &&
                    !gameName.includes(
                        keyword
                    )
                );
            });
    }
);


/* =========================================================
   FLOATING CONTACT
========================================================= */

const floatingContact =
    document.querySelector(
        '.floating-contact'
    );

const contactToggle =
    document.querySelector(
        '.contact-toggle'
    );

const contactClose =
    document.querySelector(
        '.contact-close'
    );


if (
    floatingContact &&
    contactToggle
) {

    contactToggle.addEventListener(
        'click',
        () => {

            floatingContact.classList.toggle(
                'active'
            );
        }
    );


    if (contactClose) {

        contactClose.addEventListener(
            'click',
            () => {

                floatingContact.classList.remove(
                    'active'
                );
            }
        );
    }
}


/* =========================================================
   HOME — POPULAR SECTION CLICK
========================================================= */

document
    .getElementById('popularSection')
    ?.addEventListener(
        'click',
        event => {

            /* Jangan pindah halaman
               kalau klik tombol panah */

            if (
                event.target.closest(
                    '.popular-arrow'
                )
            ) {
                return;
            }


            window.location.href =
                'download.html';
        }
    );


/* =========================================================
   HOME — PROMOTION CLICK
========================================================= */

document
    .getElementById('promotionSlider')
    ?.addEventListener(
        'click',
        event => {

            if (
                event.target.closest(
                    '.promotion-slide'
                )
            ) {
                window.location.href =
                    'promotion.html';
            }
        }
    );

/* =========================================================
PROMOTION POPUP
========================================================= */

const promotionPopup = document.getElementById('promotionPopup');
const promotionPopupClose = document.getElementById('promotionPopupClose');

if (promotionPopup) {

    window.addEventListener('load', () => {
        promotionPopup.classList.add('active');
    });

    promotionPopupClose?.addEventListener('click', () => {
        promotionPopup.classList.remove('active');
    });

    promotionPopup.addEventListener('click', (e) => {
        if (e.target === promotionPopup) {
            promotionPopup.classList.remove('active');
        }
    });

}

/* =========================================================
   CUSTOM LIVE CHAT
========================================================= */
const customLiveChat = document.getElementById('customLiveChat');
const customLiveChatImage = document.getElementById('customLiveChatImage');

let chatWasOpened = false;

function showCustomLiveChat() {
    if (!customLiveChat) return;

    customLiveChat.classList.remove('hidden');
}

function hideCustomLiveChat() {
    if (!customLiveChat) return;

    customLiveChat.classList.add('hidden');
}

function openChatwayFromCustom() {

    const chat = document.querySelector('.chatway--trigger-container');

    if (!chat) {
        console.warn('Chatway trigger belum ditemukan');
        return false;
    }

    const button = chat.querySelector(
        'button, [role="button"], a'
    );

    if (button) {
        button.click();
    } else {
        chat.click();
    }

    chatWasOpened = true;

    return true;
}

customLiveChatImage?.addEventListener('click', () => {
    if (openChatwayFromCustom()) {
        hideCustomLiveChat();
    }

});

setInterval(() => {
    if (!chatWasOpened) return;
    const chatWindow =
        document.querySelector(
            '[class*="chatway"], [id*="chatway"]'
        );

    if (!chatWindow) return;
    const style = window.getComputedStyle(chatWindow);
    const isHidden =
        style.display === 'none' ||
        style.visibility === 'hidden' ||
        style.opacity === '0';

    if (isHidden) {
        showCustomLiveChat();
        chatWasOpened = false;
    }

}, 500);
=======
const slides = document.querySelectorAll('.slide');
let index = 0;
slides.forEach(slide => {
    slide.style.opacity = 0;
});
slides[0].classList.add('active');
slides[0].style.opacity = 1;
setInterval(() => {
    slides[index].classList.remove('active');
    slides[index].style.opacity = 0;

    index = (index + 1) % slides.length;

    slides[index].classList.add('active');
    slides[index].style.opacity = 1;
}, 5500);

const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
hamburger.addEventListener('click', (e) => {
    e.stopPropagation(); // 
    navMenu.classList.toggle('active');
});
document.addEventListener('click', (e) => {
    if (!navMenu.contains(e.target) && !hamburger.contains(e.target)) {
        navMenu.classList.remove('active');
    }
});

const searchInput = document.getElementById('gameSearch');
const gameItems = document.querySelectorAll('.game-item');
searchInput.addEventListener('keyup', () => {
    const value = searchInput.value.toLowerCase();

    gameItems.forEach(item => {
        const title = item.querySelector('.game-title')
            .textContent
            .toLowerCase();

        item.style.display = title.includes(value) ? 'block' : 'none';
    });
});

const overlayPop = document.getElementById('popupOverlay');
const gamePopup = document.getElementById('gamePopup');
const downloadPopup = document.getElementById('downloadPopup');
const downloadBtn = document.getElementById('downloadBtn');
const btnAndroid = document.getElementById('btnAndroid');
const btnAndroidAPK = document.getElementById("btnAndroidAPK");
const btnIOS = document.getElementById('btnIOS');
const downloadTitle = document.getElementById('downloadTitle');
const games = document.querySelectorAll('.game-item');
const gameLinks = {
    "918KISS": { android: "https://b1.918kiss.com/", ios: "https://b1.918kiss.com/" },
    "MEGA888": { android: "http://m.mega566.com/mega/index.html", ios: "http://m.mega566.com/mega/index.html" },
    "PUSSY888": { android: "https://md.pussy888.com/", ios: "https://md.pussy888.com/" },
    "NEWTOWN": { android: "https://m.newmax11.com/index.html", ios: "https://www.newmax11.com/" },
    "XE88": { android: "https://d2.xe88.club/", ios: "https://d2.xe88.club/" },
    "918KISS 2": { android: "https://m.918kiss.ws/", ios: "https://m.918kiss.ws/" },
    "JOKER": { android: "https://www.joker123.net/", ios: "https://www.joker123.net/" },
    "KISS KAYA": { android: "https://123.889ifun.com/", ios: "https://123.889ifun.com/" },
    "WF GAMING": { android: "https://wf.wfgtech0022.com/login", ios: "https://wf.wfgtech0022.com/login" },
};

downloadBtn.addEventListener('click', (e) => {
    e.preventDefault();
    gamePopup.classList.add('show');
    overlayPop.classList.add('show');
});

games.forEach(game => {
    game.addEventListener('click', () => {
        const gameName = game.querySelector('.game-title').textContent.trim();

        downloadTitle.textContent = `DOWNLOAD ${gameName}`;
        if (gameLinks[gameName]) {
            btnAndroid.href = gameLinks[gameName].android;
            btnIOS.href = gameLinks[gameName].ios;
        }

        if (gameName === "918KISS") {

            btnAndroidAPK.style.display = "block";

            btnAndroidAPK.href =
                "https://github.com/DisneyOn/Menu/releases/download/918kiss-v1.0/918kiss.apk";

        }
        else if (gameName === "MEGA888") {

            btnAndroidAPK.style.display = "block";

            btnAndroidAPK.href =
                "https://github.com/DisneyOn/Menu/releases/download/Mega888-v0.1/Mega888.apk";

        }
        else {

            btnAndroidAPK.style.display = "none";
            btnAndroidAPK.href = "#";

        }

        gamePopup.classList.remove('show');
        downloadPopup.classList.add('show');
        overlayPop.classList.add('show');
    });
});

overlayPop.addEventListener('click', () => {
    overlayPop.classList.remove('show');
    gamePopup.classList.remove('show');
    downloadPopup.classList.remove('show');
});

function formatCashout(value) {
    let num = parseFloat(value);
    if (isNaN(num)) return value;
    return "RM " + num.toLocaleString('en-US');
}

function fetchAndRenderSheet() {
    fetch("https://opensheet.elk.sh/1pQMcGZU6OIXoF59wYoxX3254Vs7_Fi-8jjcHT7nb7j4/data")
        .then(res => res.json())
        .then(rows => {
            let html = "";
            const lastRows = rows.slice(-5);

            lastRows.forEach(r => {
                let name = r.name.trim();
                const visibleChars = 3;
                const maxStars = 6;
                const minStars = 6;

                let hiddenStars = name.length - visibleChars;
                if (hiddenStars > maxStars) hiddenStars = maxStars;
                if (hiddenStars < minStars) hiddenStars = minStars;

                const visible = name.slice(-visibleChars);
                const hidden = "*".repeat(hiddenStars);
                name = hidden + visible;

                const cashout = formatCashout(r.cashout);

                html += `
                    <tr>
                        <td>${cashout}</td>
                        <td class="sensor-name">${name}</td>
                        <td>${r.game}</td>
                        <td>${r.name_game}</td>
                    </tr>
                `;
            });

            document.getElementById("sheetData").innerHTML = html;
        })
        .catch(err => console.error("Fetch error:", err));
}
fetchAndRenderSheet();
setInterval(fetchAndRenderSheet, 5000);

const floatingTab = document.getElementById('floatingTab');
const floatingContact = document.getElementById('floatingContact');

floatingTab.addEventListener('click', () => {
    floatingContact.classList.toggle('active');
});

const autoPopup = document.getElementById('autoPopup');
const autoOverlay = document.getElementById('autoOverlay');
const autoDownload = document.getElementById('autoDownload');
const autoJoin = document.getElementById('autoJoin');

window.addEventListener('load', () => {
    setTimeout(() => {
        autoPopup.classList.add('show');
        autoOverlay.classList.add('show');
        document.body.classList.add('popup-open');
    }, 1000);
});

autoDownload.addEventListener('click', () => {
    autoPopup.classList.remove('show');
    autoOverlay.classList.remove('show');
    document.body.classList.remove('popup-open');

    const gamePopup = document.getElementById('gamePopup');
    const overlayPop = document.getElementById('popupOverlay');
    if (gamePopup && overlayPop) {
        gamePopup.classList.add('show');
        overlayPop.classList.add('show');
    }
});

document.getElementById("autoJoin").addEventListener("click", function () {
    window.open("https://www.watsapp.cc/DISNEY/", "_blank");
});

document.getElementById("joinBtn").addEventListener("click", function () {
    window.open("https://www.watsapp.cc/DISNEY/", "_blank");
});

autoOverlay.addEventListener('click', () => {
    autoPopup.classList.remove('show');
    autoOverlay.classList.remove('show');
    document.body.classList.remove('popup-open');
});

document.addEventListener('DOMContentLoaded', () => {

    const rulesBtn = document.getElementById('rulesBtn');
    const popup = document.getElementById('rulesPopup');
    const closeBtn = popup.querySelector('.close');
    const content = document.getElementById('rulesContent');

    const btnTurnover = document.getElementById('btnTurnover');
    const btnCashout = document.getElementById('btnCashout');

    const turnoverText = `
Syarat Turnover
========================
Slot Game
No Bonus > NO TURNOVER
Take Bonus > TURNOVER x2

Live & Table Game
No Bonus > TURNOVER x5
Live and Table tidak di benarkan ambil BONUS

OceanKing & Fish
No Bonus > TURNOVER x2
Tembak ikan tidak di benarkan ambil BONUS

!! WARNING !!
Jika anda ambil bonus dan main game
Live & Table Game
OceanKing & Fish
COMPANY tidak dapat bagi CUCI
Hanya bagi balik CREDIT TOPUP
`;

    const cashoutText = `
Syarat Cashout
=======================
- Min Topup 20
- Min Cashout 50

Slot Game & Tembak Ikan
IN RM20 - RM30 = 3K
IN RM31 - RM100 = 10K
IN RM101 - RM499 = 100K
IN RM500 - RM1K = 300K

Live Game Only
IN RM100 - RM500 = Max Cuci 5K
IN RM600 - RM1000 = Max Cuci 10K
IN RM1000 +++ = Max Cuci 30K

Topup Under 20
Min Cashout 50
Max Cashout 200
`;

    rulesBtn.addEventListener('click', e => {
        e.preventDefault();
        popup.classList.add('show');
    });

    closeBtn.addEventListener('click', () => {
        popup.classList.remove('show');
    });

    btnTurnover.addEventListener('click', () => {
        content.textContent = turnoverText;
    });

    btnCashout.addEventListener('click', () => {
        content.textContent = cashoutText;
    });

});

document.addEventListener('DOMContentLoaded', () => {
    const rebateBtn = document.getElementById('rebateBtn');
    const popup = document.getElementById('rebatePopup');
    const WHATSAPP_LINK = "https://www.watsapp.cc/DISNEY/";
    const rebateData = {
        title: "Claim Rebate Rules",
        rules: [
            "Min IN 20",
            "Mesti Cukup 3 Resit Untuk CLAIM Rebate Bonus 5%",

            "Selepas Cashout / Cuci Rebate akan Reset",
            "Selepas Claim Rebate Akan Reset"
        ]
    };

    function openRebatePopup() {
        popup.innerHTML = `
      <button class="close">✕</button>
      <h3>${rebateData.title}</h3>

      <div class="content">
        <ul>
          ${rebateData.rules.map(r => `<li>${r}</li>`).join("")}
        </ul>
      </div>

      <button class="btn-wa">CLAIM</button>
    `;
        popup.classList.add('show');
        popup.querySelector('.close').onclick = () => {
            popup.classList.remove('show');
        };

        popup.querySelector('.btn-wa').onclick = () => {
            window.open(WHATSAPP_LINK, "_blank");
        };
    }
    rebateBtn.addEventListener('click', e => {
        e.preventDefault();
        openRebatePopup();
    });

});

function createStar() {
    const star = document.createElement("div");
    star.classList.add("star");

    const size = Math.random() * 15 + 10;
    star.style.width = size + "px";
    star.style.height = size + "px";

    star.style.left = Math.random() * window.innerWidth + "px";

    const duration = Math.random() * 3 + 3;
    star.style.animationDuration = duration + "s, 1s";

    document.getElementById("star-container").appendChild(star);
    setTimeout(() => {
        star.remove();
    }, duration * 1000);
}

setInterval(createStar, 200);
>>>>>>> 2fb6665f5a33d1e4bbe6b3b072debe5b7b8f7ad6
