window.dataLayer = window.dataLayer || [];
function gtag() {
  dataLayer.push(arguments);
}
gtag('js', new Date());

gtag('config', 'G-RRTP4WP99Z');

function getRandomInRange(min, max) {
    return Math.random() * (max - min) + min;
}

function getRandomIntInRange(min, max) {
    return Math.floor(getRandomInRange(min, max));
}

function getBalanceAndLevel() {
  const balanceElement = document.querySelector(".user-balance-large .user-balance-large-inner");
  const balanceText = balanceElement.textContent;
  const balance = parseFloat(balanceText.replace(/[^0-9.]/g, ""));

  const levelElement = document.querySelector(".user-level-info .user-level-info-left");
  const levelText = levelElement.textContent;
  const level = parseInt(levelText.split("/")[0]);

  let mas={"balanceCoins":balance,"level":level};
  return mas;
}

async function fetchA(authToken, id) {
    const url = 'https://api.hamsterkombat.io/clicker/buy-upgrade';   
    
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + authToken,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({"upgradeId": id, "timestamp": Math.floor(Date.now())})
    });
    
    const data = await response.json();
    return data;
}

async function fetchAndAnalyze(t) {
    const url = 'https://api.hamsterkombat.io/clicker/upgrades-for-buy';
    const authToken = localStorage.getItem('authToken');

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + authToken,
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        
        let upgrades = data.upgradesForBuy, 
            requiredUpgrades = [], 
            upg = {};
        
        for (const upgrade of upgrades) {
            if (upgrade.condition && upgrade.condition._type === 'ByUpgrade' && upgrade.condition.level ) {
                requiredUpgrades.push({ 
                    id: upgrade.condition.upgradeId, 
                    level: upgrade.condition.level 
                });
            }
            if (upgrade.id && upgrade.level && !upgrade.isExpired && (!upgrade.condition || upgrade.condition._type === 'ByUpgrade')) {
                upg[upgrade.id] = upgrade;
            }
        }
        
        let timr = 0, 
            balans = t.balanceCoins;

  for (const upgra of requiredUpgrades) {
if(upgra && upgra.id && upg[upgra.id] && upg[upgra.id].level && upgra && upgra.level){
            while (upg[upgra.id].level <= upgra.level && balans >= upg[upgra.id].price && upg[upgra.id].isAvailable) {
                let rat = timr + getRandomIntInRange(1200, 3000); 
                timr = rat;  
                let id = upgra.id;
                await new Promise(resolve => setTimeout(resolve, rat));
                
                if (balans >= upg[id].price) {
                    let rez = await fetchA(authToken, id);
                    balans = rez.clickerUser.balanceCoins;
                    upgrades = rez.upgradesForBuy;                    
                 
                }
            }
            if (balans < 1200) {
                return;
            }
        }
    }
        // Process available upgrades
        let availableUpgrades = [];

        for (const upgrade of upgrades) {
            if (balans > (upgrade.price*1.05) && upgrade.isAvailable && !upgrade.isExpired && (!upgrade.cooldownSeconds || upgrade.cooldownSeconds === 0) && (t.level==10 || (t.level==9 && (upgrade.price/(22*upgrade.profitPerHour))<=25) || (t.level<=7 && (upgrade.price/(22*upgrade.profitPerHour))<=5) || (t.level<=8 && (upgrade.price/(22*upgrade.profitPerHour))<=4))) {
                availableUpgrades.push(upgrade);
            }
        }

        availableUpgrades.sort((a, b) => (a.price / a.profitPerHour) - (b.price / b.profitPerHour));
      
        let tamr = 0;
        for (const ug of availableUpgrades) {
            let rat = tamr + getRandomIntInRange(1200, 3000); 
            tamr = rat;  
            
            await new Promise(resolve => setTimeout(resolve, rat));
            
            if (balans > (ug.price*1.05) && ug.isAvailable) {
                let rez = await fetchA(authToken, ug.id);
                balans = rez.clickerUser.balanceCoins;
            }
            
          let gumm=180000;
            if (balans > 1200) {
                gumm=0;
            }
          console.log(110000000000);
    setTimeout(async function () {
let al=getBalanceAndLevel();
  await fetchAndAnalyze(al);
}, getRandomIntInRange(1200, 3500) + gumm);
          return 1;
        }
    } catch (error) {
        console.error('Error:', error);
    }
}



setTimeout(() => {
let al=getBalanceAndLevel();
  fetchAndAnalyze(al); 
}, 8000);


