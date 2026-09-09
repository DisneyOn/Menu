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

const HOT_ROTATE_MS = 5000;

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