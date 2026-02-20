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
        } else {
            btnAndroid.href = "#";
            btnIOS.href = "#";
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
  if(gamePopup && overlayPop){
    gamePopup.classList.add('show');
    overlayPop.classList.add('show');
  }
});

autoJoin.addEventListener('click', () => {
  autoPopup.classList.remove('show');
  autoOverlay.classList.remove('show');
  document.body.classList.remove('popup-open');

  const joinBtn = document.querySelector('.join-btn');
  if(joinBtn){
    window.open(joinBtn.getAttribute('onclick').match(/'(.*?)'/)[1], '_blank');
  }
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