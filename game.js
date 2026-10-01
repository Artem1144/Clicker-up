// === СОСТОЯНИЕ ===
var coins=0,coinsPerClick=1,totalEarned=0,totalTaps=0,totalPlayTime=0;
var crystals=0,crystalsMax=1000,goldenMultiplier=1,goldenTimer=0,unlocked={};
var shards=0,bloodMoonActive=false,bloodMoonTimer=0;
var eventMultiplier=1,eventTimer=0,eventName="",currentEventKey="";
var crystalBoostMultiplier=1,crystalBoostTimer=0,crystalBoostName="";
var usedPromos={},logoClicks=0,logoClickTimer=null,logoCooldown=0,ownedItems={};
var secretUnlocked=false,secretAutoClicker=false,secretClickerInterval=null,secretAutoClickerTimer=0;
var depositUnlocked=false,depositLevel=0,lastDepositTimeKey="";
var generatorLevel=1,generatorTimer=180;
var lastClickTime=0;
var GENERATOR_MAX_LEVEL=50,GENERATOR_BASE_COST=100,GENERATOR_COST_MULT=1.5,GENERATOR_DURATION=180;
var smileSkinUnlocked=false,smileSkinActive=false;
var lastDisplayedCoins=0;
var lastShopUpdate=0;
var chestsOpened=0;
var personalBestCoins=0;
var lastRecordCheck=0;
var theftActive=false,theftTimer=0,theftTickTimer=null,theftTotalLost=0,lastTheftKey="";
var THEFT_TICK_INTERVAL=25,THEFT_DURATION=600,THEFT_PERCENT=0.01;
var theftRestored=false;
var UPGRADE_MAX_LEVEL=699,UPGRADE_COST_MULT=1.077;
var GLOBAL_UPGRADE_COST_MULT=10;
var profile={nickname:"",id:"",createdAt:0};
var tapTimestamps=[],tapViolations=[];
var TAP_LIMIT=100,TAP_WINDOW=1000,VIOLATION_WINDOW=10000,VIOLATION_THRESHOLD=3;
var notesUnlocked={};
var note1Shown=false,note2Shown=false,note3Shown=false;
var tutorialActive=false,tutorialStep=0;
var TUTORIAL_DONE_KEY="clicker-tutorial-done-v1";
var TUTORIAL_STEPS=[
"👆 Нажми на большую кнопку — получишь монеты",
"🛒 Покупай улучшения в Магазине — доход идёт сам",
"⚡ Прокачивай генератор, чтобы тапать чаще!",
"🎁 Раз в час открывай Сундук — там кристаллы и осколки",
"📜 Выполняй ежедневные Задания — обновляются каждый день",
"🎨 Покупай Скины и заглядывай в Магазин за 💎",
"🕵️ В игре есть немало секретных действий — попробуй их найти!"
];
var DEPOSIT_LEVELS=[
{level:1,cost:1000000000000000,emoji:"😭"},{level:2,cost:5000000000000000,emoji:"😢"},
{level:3,cost:15000000000000000,emoji:"😟"},{level:4,cost:50000000000000000,emoji:"😐"},
{level:5,cost:100000000000000000,emoji:"😕"},{level:6,cost:250000000000000000,emoji:"🙂"},
{level:7,cost:500000000000000000,emoji:"😊"},{level:8,cost:1000000000000000000,emoji:"😄"},
{level:9,cost:5000000000000000000,emoji:"😁"},{level:10,cost:15000000000000000000,emoji:"😂"},
{level:11,cost:50000000000000000000,emoji:"🤣"},{level:12,cost:100000000000000000000,emoji:"😎"},
{level:13,cost:500000000000000000000,emoji:"🥳"},{level:14,cost:1000000000000000000000,emoji:"😍"},
{level:15,cost:5000000000000000000000,emoji:"🤩"},{level:16,cost:25000000000000000000000,emoji:"😻"},
{level:17,cost:100000000000000000000000,emoji:"🥰"},{level:18,cost:500000000000000000000000,emoji:"😘"},
{level:19,cost:1000000000000000000000000,emoji:"😇"},{level:20,cost:5000000000000000000000000,emoji:"🤑"},
{level:21,cost:25000000000000000000000000,emoji:"👑"},{level:22,cost:100000000000000000000000000,emoji:"🌟"},
{level:23,cost:500000000000000000000000000,emoji:"💫"},{level:24,cost:1000000000000000000000000000,emoji:"🌈"},
{level:25,cost:5000000000000000000000000000,emoji:"✨"}];
var DEPOSIT_DROP_INTERVAL=30*60*1000,DEPOSIT_HUNGRY_RATE=5000000;
var gulauActive=false,gulauTimer=0;
var bossActive=false,bossHP=150,bossMaxHP=150,bossTimeLeft=45.0,bossTimerInterval=null,bossClickCooldown=0,bossClickCount=0,bossClickTimer=null,bossRewardClaimed=false;
var alarmTimeout=null,alarmActive=false,alarmClicks=0,alarmSound=null,ALARM_TIME=5*60*1000;
var rewardClaimed=false,rewardTabShown=false,noteShown=false;
var pahanUnlocked=false,pahanActive=false,pahanTimer=0,pahanTickInterval=null,pahanTimerInterval=null;
var PAHAN_TAPS_PER_SEC=2,PAHAN_REWARD_PER_TAP=1e27,PAHAN_DURATION=10;

// === КОЛЕСО ===
var WHEEL_SECTORS=[
{type:"coins",value:0.05,label:"+5% 💰"},
{type:"gems",value:15,label:"+15 💎"},
{type:"shards",value:20,label:"+20 🌑"},
{type:"coins",value:0.15,label:"+15% 💰"},
{type:"empty",value:0,label:"Пусто ❌"},
{type:"gems",value:30,label:"+30 💎"},
{type:"coins",value:0.25,label:"+25% 💰"},
{type:"shards",value:50,label:"+50 🌑"},
{type:"negCoins",value:-0.15,label:"−15% 💰"},
{type:"gems",value:50,label:"+50 💎"},
{type:"negGems",value:-5,label:"−5 💎"},
{type:"negShards",value:-10,label:"−10 🌑"}];
var wheelSpinning=false,wheelFreeUsed=false,wheelPaidUsed=false,wheelLastResetDay="";

// === ГЛОБАЛЬНЫЕ УЛУЧШЕНИЯ ===
var globalUpgrades={
superClicker:{id:"superClicker",name:"🌟 Супер кликер",desc:"+1 к базовому клику за уровень",cost:1500,baseCost:1500,count:0,maxLevel:5,effect:"click",amount:1}};

// === БУСТЕРЫ ===
var BOOSTERS={
boost2:{id:"boost2",icon:"⚡",name:"Буст ×2",desc:"Множитель ×2 на 15 минут",duration:15*60,mult:2,storage:0},
boost3:{id:"boost3",icon:"⚡",name:"Буст ×3",desc:"Множитель ×3 на 10 минут",duration:10*60,mult:3,storage:0},
boost5:{id:"boost5",icon:"⚡",name:"Буст ×5",desc:"Множитель ×5 на 5 минут",duration:5*60,mult:5,storage:0}};

var CRYSTAL_ITEMS={
coinsBag:{icon:"💰",name:"Мешок монет",desc:"1 час дохода монетами",cost:5},
boost2:{icon:"⚡",name:"Буст ×2",desc:"Множитель ×2 на 15 минут → в хранилище",cost:10},
boost3:{icon:"⚡",name:"Буст ×3",desc:"Множитель ×3 на 10 минут → в хранилище",cost:20},
boost5:{icon:"⚡",name:"Буст ×5",desc:"Множитель ×5 на 5 минут → в хранилище",cost:35},
chest:{icon:"🎁",name:"Мгновенный сундук",desc:"Сразу открывает сундук",cost:20},
depositUp:{icon:"🏦",name:"+1 уровень вклада",desc:"Только если вклад куплен",cost:100}};

// === ФОНЫ (8) ===
var BACKGROUNDS={
base:{id:"base",name:"Базовый",cls:"",cost:0,owned:true},
space:{id:"space",name:"🌌 Космос",cls:"bg-space",cost:25,particles:"stars",owned:false},
flame:{id:"flame",name:"🔥 Пламя",cls:"bg-flame",cost:25,particles:"sparks",owned:false},
ocean:{id:"ocean",name:"🌊 Океан",cls:"bg-ocean",cost:25,particles:"bubbles",owned:false},
sakura:{id:"sakura",name:"🌸 Сакура",cls:"bg-sakura",cost:25,particles:"petals",owned:false},
ice:{id:"ice",name:"❄️ Лёд",cls:"bg-ice",cost:25,particles:"snow",owned:false},
bloodmoon:{id:"bloodmoon",name:"🌑 Кровавая луна",cls:"bg-bloodmoon",cost:25,particles:"pulse",owned:false},
volcano:{id:"volcano",name:"🌋 Вулкан",cls:"bg-volcano",cost:25,particles:"lava",owned:false},
nebula:{id:"nebula",name:"🌌 Туманность",cls:"bg-nebula",cost:25,particles:"nebula",owned:false}};
var activeBg="base";
var bgParticles=[];
var bgCanvas=null,bgCtx=null,bgAnimFrame=null;

// === КВЕСТЫ ===
var quests=[],questsDate="",questsClaimed=0;
var QUEST_TYPES={
taps_100:{icon:"👆",name:"Сделай 100 тапов",goal:100,reward:2,rewardType:"💎",stat:"taps"},
taps_500:{icon:"💪",name:"Сделай 500 тапов",goal:500,reward:5,rewardType:"💎",stat:"taps"},
taps_1000:{icon:"🔥",name:"Сделай 1000 тапов",goal:1000,reward:10,rewardType:"💎",stat:"taps"},
coins_10k:{icon:"💰",name:"Заработай 10K монет",goal:10000,reward:2,rewardType:"💎",stat:"earn"},
coins_100k:{icon:"🏆",name:"Заработай 100K монет",goal:100000,reward:5,rewardType:"💎",stat:"earn"},
coins_1m:{icon:"👑",name:"Заработай 1M монет",goal:1000000,reward:10,rewardType:"💎",stat:"earn"},
buy_upgrades_5:{icon:"🔧",name:"Купи 5 улучшений",goal:5,reward:3,rewardType:"💎",stat:"upgrades"},
open_chest:{icon:"🎁",name:"Открой сундук",goal:1,reward:5,rewardType:"💎",stat:"chest"},
catch_golden:{icon:"🪙",name:"Поймай золотую монетку",goal:1,reward:3,rewardType:"💎",stat:"golden"},
buy_skin:{icon:"🎨",name:"Купи скин",goal:1,reward:5,rewardType:"💎",stat:"skin"},
deposit_up:{icon:"🏦",name:"Улучши вклад",goal:1,reward:5,rewardType:"🌑",stat:"deposit"},
prestige_item:{icon:"🩸",name:"Купи предмет за осколки",goal:1,reward:5,rewardType:"🌑",stat:"item"}};
var questProgress={};
var settings={showFloat:true,showGolden:true,showDaily:true,sound:true,music:false};

// === СКИНЫ ===
var SKIN_PRICE=5;
var skins={
gold:{name:"Золотистый",bg:"radial-gradient(circle at 30% 30%, #fff59d, #f9a825)",owned:true},
blue:{name:"Синий",bg:"radial-gradient(circle at 30% 30%, #90caf9, #1565c0)",owned:false},
green:{name:"Зелёный",bg:"radial-gradient(circle at 30% 30%, #a5d6a7, #2e7d32)",owned:false},
diamond:{name:"Алмазный",bg:"radial-gradient(circle at 30% 30%, #e1f5fe, #0277bd)",owned:false},
ruby:{name:"Рубиновый",bg:"radial-gradient(circle at 30% 30%, #ff8a80, #b71c1c)",owned:false},
gennadii:{name:"GENNADII",special:true,secret:true,owned:false}};
var activeSkin="gold";

// === ЭМОДЗИ-СКИНЫ ===
var EMOJI_SKINS={
heart:{id:"heart",emoji:"❤️",name:"Сердечко",cost:10,anim:"pulse",owned:false},
fire_heart:{id:"fire_heart",emoji:"❤️‍🔥",name:"Огненное сердце",cost:10,anim:"pulse-shake",owned:false},
shield:{id:"shield",emoji:"🛡",name:"Щит",cost:10,anim:"bounce",owned:false},
candy:{id:"candy",emoji:"🍬",name:"Конфета",cost:10,anim:"wobble",owned:false}};
var activeEmojiSkin=null;

// === ПРЕДМЕТЫ ===
var ITEMS={
blade:{icon:"🩸",name:"Кровавый клинок",desc:"Оружие первых охотников",cost:5,bonuses:[0.05,0.08,0.12]},
amulet:{icon:"🧿",name:"Амулет луны",desc:"Оберег из чёрного камня",cost:10,bonuses:[0.10,0.15,0.22]},
elixir:{icon:"⚗️",name:"Кровавый эликсир",desc:"Зелье из лунной росы",cost:20,bonuses:[0.15,0.22,0.32]},
candle:{icon:"🕯️",name:"Свеча ритуала",desc:"Горит вечно алым светом",cost:35,bonuses:[0.20,0.30,0.42]},
skull:{icon:"💀",name:"Череп врага",desc:"Трофей с поля битвы",cost:55,bonuses:[0.25,0.37,0.52]},
bat:{icon:"🦇",name:"Летучая мышь",desc:"Хранительница ночи",cost:80,bonuses:[0.30,0.45,0.62]},
orb:{icon:"🔮",name:"Тёмный шар",desc:"Видит сквозь время",cost:120,bonuses:[0.40,0.58,0.80]},
scythe:{icon:"🗡️",name:"Серп луны",desc:"Жнёт врагов как колосья",cost:180,bonuses:[0.50,0.72,1.00]},
wings:{icon:"🦋",name:"Крылья вампира",desc:"Дар ночной охоты",cost:250,bonuses:[0.75,1.05,1.45]},
crown:{icon:"👑",name:"Венец луны",desc:"Власть над Кровавой луной",cost:500,bonuses:[1.00,1.40,1.90]}};
var ITEM_MAX_LEVEL=3,ITEM_PRICE_MULT=[1,2.5,6.25];

// === УЛУЧШЕНИЯ ===
var upgrades={
clicker:{name:"👆 Кликер",desc:"+1 монета за тап",cost:10,baseCost:10,count:0,effect:"click",amount:1},
farm:{name:"🌾 Ферма",desc:"+1 монета в секунду",cost:50,baseCost:50,count:0,effect:"auto",amount:1},
factory:{name:"🏭 Фабрика",desc:"+10 монет в секунду",cost:500,baseCost:500,count:0,effect:"auto",amount:10},
bank:{name:"🏦 Банк",desc:"+100 монет в секунду",cost:5000,baseCost:5000,count:0,effect:"auto",amount:100},
server:{name:"🖥️ Серверная",desc:"+1000 монет в секунду",cost:50000,baseCost:50000,count:0,effect:"auto",amount:1000},
lab:{name:"🔬 Лаборатория",desc:"+10000 монет в секунду",cost:500000,baseCost:500000,count:0,effect:"auto",amount:10000},
space:{name:"🚀 Космостанция",desc:"+100K монет в секунду",cost:5000000,baseCost:5000000,count:0,effect:"auto",amount:100000},
quantum:{name:"⚛️ Квантовый комп",desc:"+1M монет в секунду",cost:50000000,baseCost:50000000,count:0,effect:"auto",amount:1000000},
portal:{name:"🌀 Портал",desc:"+10M монет в секунду",cost:500000000,baseCost:500000000,count:0,effect:"auto",amount:10000000},
galaxy:{name:"🌌 Галактика",desc:"+100M монет в секунду",cost:5000000000,baseCost:5000000000,count:0,effect:"auto",amount:100000000},
universe:{name:"🌠 Вселенная",desc:"+1B монет в секунду",cost:50000000000,baseCost:50000000000,count:0,effect:"auto",amount:1000000000},
multiverse:{name:"♾️ Мультивселенная",desc:"+10B монет в секунду",cost:500000000000,baseCost:500000000000,count:0,effect:"auto",amount:10000000000},
singularity:{name:"🕳️ Сингулярность",desc:"+100B монет в секунду",cost:5000000000000,baseCost:5000000000000,count:0,effect:"auto",amount:100000000000},
godmode:{name:"👁️ Око Творца",desc:"+1T монет в секунду",cost:50000000000000,baseCost:50000000000000,count:0,effect:"auto",amount:1000000000000},
infinity:{name:"💫 Бесконечность",desc:"+10T монет в секунду",cost:500000000000000,baseCost:500000000000000,count:0,effect:"auto",amount:10000000000000},
timecrystal:{name:"🕰️ Кристалл времени",desc:"+100T монет в секунду",cost:5000000000000000,baseCost:5000000000000000,count:0,effect:"auto",amount:100000000000000},
blackhole:{name:"🌑 Чёрная дыра",desc:"+1Qa монет в секунду",cost:50000000000000000,baseCost:50000000000000000,count:0,effect:"auto",amount:1000000000000000},
omega:{name:"♎ Омега",desc:"+10Qa монет в секунду",cost:500000000000000000,baseCost:500000000000000000,count:0,effect:"auto",amount:10000000000000000},
eternity:{name:"🌌 Вечность",desc:"+100Qa монет в секунду",cost:5000000000000000000,baseCost:5000000000000000000,count:0,effect:"auto",amount:100000000000000000},
creation:{name:"✨ Творец",desc:"+1Qi монет в секунду",cost:50000000000000000000,baseCost:50000000000000000000,count:0,effect:"auto",amount:1000000000000000000},
absolute:{name:"🔱 Абсолют",desc:"+10Qi монет в секунду",cost:500000000000000000000,baseCost:500000000000000000000,count:0,effect:"auto",amount:10000000000000000000},
transcend:{name:"🕉️ Трансцендентность",desc:"+30Qi монет в секунду",cost:5000000000000000000000,baseCost:5000000000000000000000,count:0,effect:"auto",amount:30000000000000000000},
genesis:{name:"💠 Генезис",desc:"+250Qi монет в секунду",cost:50000000000000000000000,baseCost:50000000000000000000000,count:0,effect:"auto",amount:250000000000000000000}};

// === ДОСТИЖЕНИЯ ===
var achievements=[
{id:"tap_1",icon:"👆",title:"Первый тап",desc:"Сделайте 1 тап",tier:"bronze",check:function(){return totalTaps>=1;}},
{id:"tap_100",icon:"💪",title:"Сотня тапов",desc:"Сделайте 100 тапов",tier:"bronze",check:function(){return totalTaps>=100;}},
{id:"tap_1000",icon:"🔥",title:"Тысяча тапов",desc:"Сделайте 1000 тапов",tier:"bronze",check:function(){return totalTaps>=1000;}},
{id:"tap_5k",icon:"⚡",title:"5 000 тапов",desc:"Сделайте 5 000 тапов",tier:"silver",check:function(){return totalTaps>=5000;}},
{id:"tap_10k",icon:"🌟",title:"10 000 тапов",desc:"Сделайте 10 000 тапов",tier:"silver",check:function(){return totalTaps>=10000;}},
{id:"tap_25k",icon:"💫",title:"25 000 тапов",desc:"Сделайте 25 000 тапов",tier:"silver",check:function(){return totalTaps>=25000;}},
{id:"tap_50k",icon:"🌠",title:"50 000 тапов",desc:"Сделайте 50 000 тапов",tier:"silver",check:function(){return totalTaps>=50000;}},
{id:"tap_100k",icon:"👑",title:"100 000 тапов",desc:"Сделайте 100 000 тапов",tier:"gold",check:function(){return totalTaps>=100000;}},
{id:"tap_250k",icon:"🏆",title:"250 000 тапов",desc:"Сделайте 250 000 тапов",tier:"gold",check:function(){return totalTaps>=250000;}},
{id:"tap_500k",icon:"👑",title:"500 000 тапов",desc:"Сделайте 500 000 тапов",tier:"gold",check:function(){return totalTaps>=500000;}},
{id:"tap_1m",icon:"💠",title:"Миллион тапов",desc:"Сделайте 1 000 000 тапов",tier:"gold",check:function(){return totalTaps>=1000000;}},
{id:"coins_100",icon:"💰",title:"Сотня",desc:"Накопите 100 монет",tier:"bronze",check:function(){return coins>=100;}},
{id:"coins_1k",icon:"💎",title:"Тысячник",desc:"Накопите 1K монет",tier:"bronze",check:function(){return coins>=1000;}},
{id:"coins_1m",icon:"🏆",title:"Миллионер",desc:"Накопите 1M монет",tier:"bronze",check:function(){return coins>=1000000;}},
{id:"coins_1b",icon:"👑",title:"Миллиардер",desc:"Накопите 1B монет",tier:"silver",check:function(){return coins>=1000000000;}},
{id:"coins_1t",icon:"🌟",title:"Триллионер",desc:"Накопите 1T монет",tier:"silver",check:function(){return coins>=1000000000000;}},
{id:"coins_1qa",icon:"💵",title:"Квадриллионер",desc:"Накопите 1 Qa монет",tier:"silver",check:function(){return coins>=1000000000000000;}},
{id:"coins_1qi",icon:"🌈",title:"Квинтиллионер",desc:"Накопите 1 Qi монет",tier:"gold",check:function(){return coins>=1000000000000000000;}},
{id:"coins_1sx",icon:"💠",title:"Секстиллионер",desc:"Накопите 1 Sx монет",tier:"gold",check:function(){return coins>=1000000000000000000000;}},
{id:"coins_1sp",icon:"🌌",title:"Септиллионер",desc:"Накопите 1 Sp монет",tier:"gold",check:function(){return coins>=1000000000000000000000000;}},
{id:"coins_1oc",icon:"🌠",title:"Октиллионер",desc:"Накопите 1 Oc монет",tier:"gold",check:function(){return coins>=1000000000000000000000000000;}},
{id:"coins_1no",icon:"💎",title:"Нониллионер",desc:"Накопите 1 No монет",tier:"gold",check:function(){return coins>=1000000000000000000000000000000;}},
{id:"earn_1m",icon:"📈",title:"Первая прибыль",desc:"Заработайте 1M за всё время",tier:"bronze",check:function(){return totalEarned>=1000000;}},
{id:"earn_1b",icon:"💼",title:"Оборот",desc:"Заработайте 1B за всё время",tier:"silver",check:function(){return totalEarned>=1000000000;}},
{id:"first_up",icon:"🔧",title:"Улучшатель",desc:"Купите первое улучшение",tier:"bronze",check:function(){return upgrades.clicker.count>=1;}},
{id:"farm_10",icon:"🌾",title:"Фермер",desc:"Купите 10 ферм",tier:"bronze",check:function(){return upgrades.farm.count>=10;}},
{id:"factory_5",icon:"🏭",title:"Промышленник",desc:"Купите 5 фабрик",tier:"silver",check:function(){return upgrades.factory.count>=5;}},
{id:"bank_5",icon:"🏦",title:"Банкир",desc:"Купите 5 банков",tier:"silver",check:function(){return upgrades.bank.count>=5;}},
{id:"space_1",icon:"🚀",title:"Космонавт",desc:"Купите космостанцию",tier:"silver",check:function(){return upgrades.space.count>=1;}},
{id:"quantum_1",icon:"⚛️",title:"Квантовый скачок",desc:"Купите квантовый компьютер",tier:"silver",check:function(){return upgrades.quantum.count>=1;}},
{id:"portal_1",icon:"🌀",title:"Портал открыт",desc:"Купите портал",tier:"silver",check:function(){return upgrades.portal.count>=1;}},
{id:"galaxy_1",icon:"🌌",title:"Владыка галактик",desc:"Купите галактику",tier:"silver",check:function(){return upgrades.galaxy.count>=1;}},
{id:"universe_1",icon:"🌠",title:"Властелин миров",desc:"Купите вселенную",tier:"gold",check:function(){return upgrades.universe.count>=1;}},
{id:"infinity_1",icon:"💫",title:"Бесконечность",desc:"Купите бесконечность",tier:"gold",check:function(){return upgrades.infinity.count>=1;}},
{id:"timecrystal_1",icon:"🕰️",title:"Владыка времени",desc:"Купите Кристалл времени",tier:"gold",check:function(){return upgrades.timecrystal.count>=1;}},
{id:"blackhole_1",icon:"🌑",title:"Пожиратель",desc:"Купите Чёрную дыру",tier:"gold",check:function(){return upgrades.blackhole.count>=1;}},
{id:"omega_1",icon:"♎",title:"Омега",desc:"Купите Омегу",tier:"gold",check:function(){return upgrades.omega.count>=1;}},
{id:"eternity_1",icon:"🌌",title:"Вечность",desc:"Купите Вечность",tier:"gold",check:function(){return upgrades.eternity.count>=1;}},
{id:"creation_1",icon:"✨",title:"Творец",desc:"Купите Творца",tier:"gold",check:function(){return upgrades.creation.count>=1;}},
{id:"absolute_1",icon:"🔱",title:"Абсолют",desc:"Купите Абсолют",tier:"gold",check:function(){return upgrades.absolute.count>=1;}},
{id:"transcend_1",icon:"🕉️",title:"Трансцендент",desc:"Купите Трансцендентность",tier:"gold",check:function(){return upgrades.transcend.count>=1;}},
{id:"genesis_1",icon:"💠",title:"Генезис",desc:"Купите Генезис",tier:"gold",check:function(){return upgrades.genesis.count>=1;}},
{id:"deposit_5",icon:"😕",title:"Смайлик ур. 5",desc:"Поднимите вклад до 5 уровня",check:function(){return depositLevel>=5;}},
{id:"deposit_10",icon:"😂",title:"Смайлик ур. 10",desc:"Поднимите вклад до 10 уровня",check:function(){return depositLevel>=10;}},
{id:"deposit_15",icon:"🤩",title:"Смайлик ур. 15",desc:"Поднимите вклад до 15 уровня",check:function(){return depositLevel>=15;}},
{id:"deposit_20",icon:"🤑",title:"Смайлик ур. 20",desc:"Поднимите вклад до 20 уровня",check:function(){return depositLevel>=20;}},
{id:"deposit_25",icon:"✨",title:"Смайлик ур. 25",desc:"Достигните максимума вклада",check:function(){return depositLevel>=25;}},
{id:"gen_10",icon:"⚡",title:"Генератор ур. 10",desc:"Прокачайте генератор до 10",check:function(){return generatorLevel>=10;}},
{id:"gen_25",icon:"💥",title:"Генератор ур. 25",desc:"Прокачайте генератор до 25",check:function(){return generatorLevel>=25;}},
{id:"gen_50",icon:"🚀",title:"Генератор ур. 50",desc:"Достигните максимума генератора",check:function(){return generatorLevel>=50;}},
{id:"cps_100",icon:"⚡",title:"Электростанция",desc:"100 монет в секунду",tier:"bronze",check:function(){return getCPS()>=100;}},
{id:"cps_10k",icon:"🌩️",title:"Гроза",desc:"10K монет в секунду",tier:"bronze",check:function(){return getCPS()>=10000;}},
{id:"cps_1m",icon:"🌪️",title:"Ураган",desc:"1M монет в секунду",tier:"silver",check:function(){return getCPS()>=1000000;}},
{id:"cps_100m",icon:"🌊",title:"Цунами",desc:"100M монет в секунду",tier:"silver",check:function(){return getCPS()>=100000000;}},
{id:"cps_1b",icon:"🌀",title:"Космический шторм",desc:"1B монет в секунду",tier:"gold",check:function(){return getCPS()>=1000000000;}},
{id:"cps_1t",icon:"💫",title:"Сингулярность",desc:"1T монет в секунду",tier:"gold",check:function(){return getCPS()>=1000000000000;}},
{id:"cps_1qa",icon:"🌌",title:"Бог скорости",desc:"1Qa монет в секунду",tier:"gold",check:function(){return getCPS()>=1000000000000000;}},
{id:"crystals_10",icon:"💎",title:"Первые капли",desc:"Накопите 10 кристаллов",tier:"bronze",check:function(){return crystals>=10;}},
{id:"crystals_50",icon:"💠",title:"Коллекционер",desc:"Накопите 50 кристаллов",tier:"bronze",check:function(){return crystals>=50;}},
{id:"crystals_200",icon:"🔷",title:"Богач",desc:"Накопите 200 кристаллов",tier:"silver",check:function(){return crystals>=200;}},
{id:"crystals_500",icon:"💠",title:"Сокровищница",desc:"Накопите 500 кристаллов",tier:"silver",check:function(){return crystals>=500;}},
{id:"crystals_800",icon:"👑",title:"Алмазный лорд",desc:"Накопите 800 кристаллов",tier:"gold",check:function(){return crystals>=800;}},
{id:"crystals_1000",icon:"🏆",title:"Максимум",desc:"Достигните лимита кристаллов",tier:"gold",check:function(){return crystals>=1000;}},
{id:"shards_25",icon:"🩸",title:"Первая кровь",desc:"Накопите 25 осколков",tier:"bronze",check:function(){return shards>=25;}},
{id:"shards_100",icon:"💀",title:"Кровопийца",desc:"Накопите 100 осколков",tier:"bronze",check:function(){return shards>=100;}},
{id:"shards_500",icon:"🌑",title:"Владыка крови",desc:"Накопите 500 осколков",tier:"silver",check:function(){return shards>=500;}},
{id:"shards_1000",icon:"🩸",title:"Кровавый барон",desc:"Накопите 1 000 осколков",tier:"silver",check:function(){return shards>=1000;}},
{id:"shards_5k",icon:"👹",title:"Кровавый король",desc:"Накопите 5 000 осколков",tier:"gold",check:function(){return shards>=5000;}},
{id:"shards_10k",icon:"😈",title:"Кровавый император",desc:"Накопите 10 000 осколков",tier:"gold",check:function(){return shards>=10000;}},
{id:"shards_50k",icon:"💀",title:"Кровавый бог",desc:"Накопите 50 000 осколков",tier:"gold",check:function(){return shards>=50000;}},
{id:"time_10m",icon:"⏰",title:"10 минут",desc:"Проведите в игре 10 минут",tier:"bronze",check:function(){return totalPlayTime>=600;}},
{id:"time_1h",icon:"⏱️",title:"1 час",desc:"Проведите в игре 1 час",tier:"bronze",check:function(){return totalPlayTime>=3600;}},
{id:"time_6h",icon:"🕐",title:"6 часов",desc:"Проведите в игре 6 часов",tier:"silver",check:function(){return totalPlayTime>=21600;}},
{id:"time_12h",icon:"🕛",title:"12 часов",desc:"Проведите в игре 12 часов",tier:"silver",check:function(){return totalPlayTime>=43200;}},
{id:"time_24h",icon:"📅",title:"Сутки в игре",desc:"Проведите в игре 24 часа",tier:"silver",check:function(){return totalPlayTime>=86400;}},
{id:"time_week",icon:"📆",title:"Неделя в игре",desc:"Проведите в игре 7 дней",tier:"gold",check:function(){return totalPlayTime>=604800;}},
{id:"time_month",icon:"🗓️",title:"Живая легенда",desc:"Проведите в игре 30 дней",tier:"gold",check:function(){return totalPlayTime>=2592000;}},
{id:"leader_top3",icon:"🥉",title:"В топ-3",desc:"Войти в топ-3 лидерборда",tier:"bronze",check:function(){return unlocked.leader_top3===true;}},
{id:"leader_top2",icon:"🥈",title:"Серебро",desc:"Занять 2 место в лидерборде",tier:"silver",check:function(){return unlocked.leader_top2===true;}},
{id:"leader_top1",icon:"🥇",title:"Золото",desc:"Возглавить лидерборд",tier:"gold",check:function(){return unlocked.leader_top1===true;}},
{id:"chest_1",icon:"🎁",title:"Первый сундук",desc:"Откройте сундук",tier:"bronze",check:function(){return chestsOpened>=1;}},
{id:"chest_10",icon:"🗝️",title:"Кладоискатель",desc:"Откройте 10 сундуков",tier:"silver",check:function(){return chestsOpened>=10;}},
{id:"chest_100",icon:"💰",title:"Сундук-мастер",desc:"Откройте 100 сундуков",tier:"gold",check:function(){return chestsOpened>=100;}},
{id:"super_clicker_max",icon:"🌟",title:"Супер кликер",desc:"Прокачайте Супер кликер до максимума",tier:"gold",check:function(){return globalUpgrades.superClicker.count>=5;}},
{id:"wheel_first",icon:"🎡",title:"Первое вращение",desc:"Крутите колесо фортуны",tier:"bronze",check:function(){return unlocked.wheel_first===true;}},
{id:"bg_all",icon:"🖼️",title:"Коллекционер фонов",desc:"Купите все 8 фонов",tier:"gold",check:function(){return unlocked.bg_all===true;}}
];

var SAVE_KEY="clicker-save";
var PROFILE_KEY="clicker-profile";
var firebaseConfig={databaseURL:"https://clickerup-80939-default-rtdb.firebaseio.com/"};
var db=null;

var NOTES_DATA={
note1:{icon:"📜",title:"Записка №1",preview:"«Он заставляет меня нажимать эту чёртову кнопку…»",text:"«Он заставляет меня нажимать эту чёртову кнопку. Я устал. Сутки напролёт я сижу здесь и нажимаю её — ради денег. Лишь это поможет…»",sign:"— ???",unlocked:false},
note2:{icon:"📜",title:"Записка №2",preview:"«Сначала… Как по мне, всё выглядит красиво…»",text:"«Сначала.. Как по мне, всё выглядит красиво, и.. Так правильно, столько существ объединились.. Но мне не даёт покоя один факт, зачем это всё, в чем смысл такого бизнеса?»",sign:"— ???",unlocked:false},
note3:{icon:"📜",title:"Записка №3",preview:"«Дорогой дневник, я наконец-то нашёл работу!»",text:"«Дорогой дневник, я наконец-то нашел работу!\nЭта студия самая богатая в этом городе, и.. подозреваю что в этом мире!\nДумаю ничего не случится, ведь если в такой студии работают миллионы людей.. И не людей, то и для меня это место станет настоящим домом»",sign:"— ???",unlocked:false}};

var FORTUNES=[
"Сегодня удача на твоей стороне. Тапай смелее!",
"Один тап — и мир изменится. Может, именно этот?",
"Смайлик сегодня доволен тобой. Не подведи его.",
"Хороший день для покупки улучшений.",
"Если что-то не получается — просто тапай ещё.",
"Кровавая луна знает о тебе больше, чем ты думаешь.",
"Он смотрит. Он всегда смотрит.",
"Кристаллы приходят к терпеливым.",
"Сегодня ты найдёшь то, что давно искал.",
"Не все кликеры одинаково полезны. Некоторые — судьба.",
"Записки — не просто текст. Это предупреждение.",
"Ты слишком много тапаешь. Но это не точно.",
"Пахан одобряет твой выбор.",
"Иногда лучший ход — остановиться. Но не сегодня.",
"Сегодня хороший день для рекорда.",
"Твой смайлик мечтает о 25 уровне.",
"Кровавые осколки любят настойчивых.",
"Если увидишь золотую монетку — не зевай.",
"Один клик отделяет тебя от величия.",
"Сегодня можно всё. Даже купить скин.",
"Тайна ближе, чем кажется. Просто копай глубже.",
"Не забывай про сундук. Он ждёт.",
"Что-то хорошее случится через 67 тапов.",
"Сегодня звезда по имени Ты восходит.",
"Мир — это кликер. Ты — его игрок.",
"Слушай музыку. Она знает ритм удачи.",
"Не все секреты нужно искать. Некоторые найдут тебя.",
"Сегодня никто не догонит тебя в лидерборде.",
"День, когда сбывается загаданное на 228 тапе.",
"Улыбнись смайлику — и он улыбнётся тебе.",
"Тот, кто читает это, уже победитель.",
"Два клика — и ты ближе к цели.",
"Жизнь как сундук: откроешь — узнаешь.",
"Кристаллы — это застывшее время. Береги их.",
"Сегодня лучше, чем вчера. И это факт.",
"Кто-то наблюдает за твоими успехами. Продолжай.",
"Хорошее предсказание всегда сбывается. Это — хорошее.",
"Не всё золото, что блестит. Но монетка точно твоя."
];
var FORTUNE_KEY="clicker-last-fortune-day";

var _fmtCache={};
var _fmtCacheCount=0;
function formatNumber(n){
n=Math.floor(n);
var cached=_fmtCache[n];
if(cached!==undefined)return cached;
var result;
if(n<1000)result=n.toString();
else if(n<1000000)result=(n/1000).toFixed(1)+"K";
else if(n<1000000000)result=(n/1000000).toFixed(2)+"M";
else if(n<1000000000000)result=(n/1000000000).toFixed(2)+"B";
else if(n<1000000000000000)result=(n/1000000000000).toFixed(2)+"T";
else if(n<1000000000000000000)result=(n/1000000000000000).toFixed(2)+"Qa";
else if(n<1000000000000000000000)result=(n/1000000000000000000).toFixed(2)+"Qi";
else if(n<1000000000000000000000000)result=(n/1000000000000000000000).toFixed(2)+"Sx";
else if(n<1000000000000000000000000000)result=(n/1000000000000000000000000).toFixed(2)+"Sp";
else if(n<1000000000000000000000000000000)result=(n/1000000000000000000000000000).toFixed(2)+"Oc";
else if(n<1000000000000000000000000000000000)result=(n/1000000000000000000000000000000).toFixed(2)+"No";
else if(n<1000000000000000000000000000000000000)result=(n/1000000000000000000000000000000000).toFixed(2)+"Dc";
else result=n.toExponential(2);
_fmtCache[n]=result;
_fmtCacheCount++;
if(_fmtCacheCount>500){_fmtCache={};_fmtCacheCount=0;}
return result;
}

// === ФИКС ПРОКРУТКИ: БЛОКИРОВКА/РАЗБЛОКИРОВКА ===
function lockScroll(){document.body.classList.add("no-scroll");}
function unlockScroll(){document.body.classList.remove("no-scroll");}
function syncScrollLock(){
var anyOpen=document.querySelector(".modal:not(.hidden), #chest-overlay:not(.hidden), #wheel-overlay:not(.hidden), #offline-popup:not(.hidden), #alarm-overlay:not(.hidden), #tutorial-overlay:not(.hidden)");
if(anyOpen)lockScroll();else unlockScroll();
}

// === FIREBASE ===
function initFirebase(){
try{
if(typeof firebase==="undefined"){console.warn("Firebase SDK не загружен");return;}
firebase.initializeApp(firebaseConfig);
db=firebase.database();
console.log("Firebase подключён");
}catch(e){console.warn("Firebase не подключён:",e);}}

// === АНТИЧИТ ===
function checkTapLimit(){
var now=Date.now();
var newArr=[];
for(var i=0;i<tapTimestamps.length;i++){
if(now-tapTimestamps[i]<TAP_WINDOW)newArr.push(tapTimestamps[i]);
}
tapTimestamps=newArr;
if(tapTimestamps.length>=TAP_LIMIT){
tapViolations.push(now);
var newViol=[];
for(var j=0;j<tapViolations.length;j++){
if(now-tapViolations[j]<VIOLATION_WINDOW)newViol.push(tapViolations[j]);
}
tapViolations=newViol;
if(tapViolations.length>=VIOLATION_THRESHOLD){
tapViolations=[];tapTimestamps=[];
var lost=Math.floor(coins*0.5);coins-=lost;
var popup=document.createElement("div");
popup.className="achievement-popup";
popup.style.background="linear-gradient(135deg, #b71c1c, #ff5252)";
popup.style.color="white";
popup.textContent="⛔ Обнаружен автокликер! −50% монет ("+formatNumber(lost)+")";
document.body.appendChild(popup);
setTimeout(function(){popup.remove();},5000);
saveGame();
}
return false;
}
tapTimestamps.push(now);
return true;
}

// === КРИСТАЛЛЫ ===
function addCrystals(amount){
if(amount<=0)return;
var space=crystalsMax-crystals;
if(space<=0){var conv=amount*1e15;coins+=conv;totalEarned+=conv;showCrystalConvert(amount);return;}
if(amount<=space){crystals+=amount;}
else{var overflow=amount-space;crystals=crystalsMax;var conv2=overflow*1e15;coins+=conv2;totalEarned+=conv2;showCrystalConvert(overflow);}}
function showCrystalConvert(amount){
var popup=document.createElement("div");
popup.className="achievement-popup";
popup.textContent="💎 Лимит 1000! "+amount+" 💎 → "+formatNumber(amount*1e15)+" монет";
document.body.appendChild(popup);
setTimeout(function(){popup.remove();},3500);}

// === СОХРАНЕНИЕ ===
function saveGame(){
if(window.__resetting)return;
var data={coins:coins,coinsPerClick:coinsPerClick,totalEarned:totalEarned,totalTaps:totalTaps,totalPlayTime:totalPlayTime,crystals:crystals,chestsOpened:chestsOpened,personalBestCoins:personalBestCoins,lastTheftKey:lastTheftKey,unlocked:unlocked,lastTime:Date.now(),shards:shards,eventMultiplier:eventMultiplier,eventTimer:eventTimer,eventName:eventName,currentEventKey:currentEventKey,crystalBoostMultiplier:crystalBoostMultiplier,crystalBoostTimer:crystalBoostTimer,crystalBoostName:crystalBoostName,usedPromos:usedPromos,ownedItems:ownedItems,secretUnlocked:secretUnlocked,secretAutoClicker:secretAutoClicker,secretAutoClickerTimer:secretAutoClickerTimer,depositUnlocked:depositUnlocked,depositLevel:depositLevel,lastDepositTimeKey:lastDepositTimeKey,generatorLevel:generatorLevel,generatorTimer:generatorTimer,smileSkinUnlocked:smileSkinUnlocked,smileSkinActive:smileSkinActive,gulauActive:gulauActive,gulauTimer:gulauTimer,rewardClaimed:rewardClaimed,bossRewardClaimed:bossRewardClaimed,noteShown:noteShown,notesUnlocked:notesUnlocked,pahanUnlocked:pahanUnlocked,quests:quests,questsDate:questsDate,questsClaimed:questsClaimed,questProgress:questProgress,boostersStorage:{},upgrades:{},globalUpgrades:{},wheelState:{freeUsed:wheelFreeUsed,paidUsed:wheelPaidUsed,lastResetDay:wheelLastResetDay},activeBg:activeBg,bgOwned:{},emojiSkinsOwned:{}};
for(var bid in BOOSTERS){data.boostersStorage[bid]=BOOSTERS[bid].storage;}
for(var id in upgrades){data.upgrades[id]={count:upgrades[id].count};}
for(var gid in globalUpgrades){data.globalUpgrades[gid]={count:globalUpgrades[gid].count};}
for(var bgid in BACKGROUNDS){data.bgOwned[bgid]=BACKGROUNDS[bgid].owned;}
for(var esid in EMOJI_SKINS){data.emojiSkinsOwned[esid]=EMOJI_SKINS[esid].owned;}
localStorage.setItem(SAVE_KEY,JSON.stringify(data));
try{localStorage.setItem("clicker-used-promos",JSON.stringify(usedPromos));}catch(e){}}

// === ПРОФИЛЬ ===
function saveProfile(){try{localStorage.setItem(PROFILE_KEY,JSON.stringify(profile));}catch(e){}}
function loadProfile(){
try{
var raw=localStorage.getItem(PROFILE_KEY);
if(raw){
var data=JSON.parse(raw);
profile.nickname=data.nickname||"";
profile.id=data.id||"";
profile.createdAt=data.createdAt||0;
}
}catch(e){}}
function hasProfile(){return profile.nickname&&profile.nickname.length>=2;}
function generateProfileId(){
var ts=Date.now();
var chars="abcdefghijklmnopqrstuvwxyz0123456789";
var rand="";
for(var i=0;i<4;i++){rand+=chars[Math.floor(Math.random()*chars.length)];}
return "u_"+ts+"_"+rand;
}
function ensureProfileId(){
if(!profile.id&&hasProfile()){
profile.id=generateProfileId();
saveProfile();
}
}
function showProfileModal(){
var modal=document.getElementById("modal-profile");
if(!modal)return;
modal.classList.remove("hidden");
syncScrollLock();
var input=document.getElementById("profile-name-input");
if(input){
input.value=profile.nickname||"";
if(hasProfile()){input.setAttribute("readonly","readonly");}
else{input.removeAttribute("readonly");}
}
setTimeout(function(){if(input&&!hasProfile())input.focus();},300);
}
function setupProfileSave(){
var btn=document.getElementById("profile-save-btn");
var input=document.getElementById("profile-name-input");
var err=document.getElementById("profile-error");
if(!btn||!input)return;
btn.onclick=function(){
if(hasProfile()){document.getElementById("modal-profile").classList.add("hidden");syncScrollLock();return;}
var name=input.value.trim();
if(!name||name.length<2){if(err)err.textContent="Ник должен быть хотя бы 2 символа";return;}
if(name.length>15){if(err)err.textContent="Ник не длиннее 15 символов";return;}
if(!/^[a-zA-Zа-яА-Я0-9_ ]+$/.test(name)){if(err)err.textContent="Только буквы, цифры, пробел и _";return;}
profile.nickname=name;
profile.id=generateProfileId();
profile.createdAt=Date.now();
saveProfile();
if(err)err.textContent="";
document.getElementById("modal-profile").classList.add("hidden");
updateLeaderboardName();
syncScrollLock();
setTimeout(function(){startTutorial();},500);
saveGame();
};
}
function updateLeaderboardName(){
var input=document.getElementById("leader-name");
if(input){input.value=profile.nickname||"";}
}

// === ОБУЧЕНИЕ ===
function startTutorial(){
if(tutorialActive)return;
tutorialActive=true;tutorialStep=0;
var overlay=document.getElementById("tutorial-overlay");
if(!overlay)return;
overlay.classList.remove("hidden");
syncScrollLock();
renderTutorialStep();
}
function renderTutorialStep(){
var textEl=document.getElementById("tutorial-text");
var nextBtn=document.getElementById("tutorial-next");
if(!textEl||!nextBtn)return;
textEl.textContent=TUTORIAL_STEPS[tutorialStep];
nextBtn.textContent=(tutorialStep===TUTORIAL_STEPS.length-1)?"Завершить ✓":"Далее ▶";
}
function nextTutorialStep(){
tutorialStep++;
if(tutorialStep>=TUTORIAL_STEPS.length){endTutorial();return;}
renderTutorialStep();
}
function endTutorial(){
tutorialActive=false;tutorialStep=0;
var overlay=document.getElementById("tutorial-overlay");
if(overlay)overlay.classList.add("hidden");
syncScrollLock();
try{localStorage.setItem(TUTORIAL_DONE_KEY,"1");}catch(e){}
}
function setupTutorial(){
var nextBtn=document.getElementById("tutorial-next");
var skipBtn=document.getElementById("tutorial-skip");
if(nextBtn)nextBtn.onclick=nextTutorialStep;
if(skipBtn)skipBtn.onclick=endTutorial;
}

// === ЗАПИСКИ ===
function unlockNote(id){
if(notesUnlocked[id])return;
notesUnlocked[id]=true;
if(NOTES_DATA[id])NOTES_DATA[id].unlocked=true;
var tab=document.getElementById("tab-note");
if(tab)tab.classList.remove("hidden");
renderNoteList();saveGame();
}
function renderNoteList(){
var list=document.getElementById("note-list");
if(!list)return;
list.innerHTML="";
var anyUnlocked=false;
for(var id in NOTES_DATA){
var n=NOTES_DATA[id];
if(!notesUnlocked[id])continue;
anyUnlocked=true;
var div=document.createElement("div");
div.className="note-list-item";
div.innerHTML='<div class="note-list-icon">'+n.icon+'</div>'+'<div class="note-list-info">'+'<div class="note-list-title">'+n.title+'</div>'+'<div class="note-list-preview">'+n.preview+'</div>'+'</div>';
div.onclick=function(noteId){
return function(){showNoteDetail(noteId);};
}(id);
list.appendChild(div);
}
if(!anyUnlocked){
list.innerHTML='<p style="text-align:center;color:#d4c5a0;font-size:13px;">Пока нет записок. Их можно найти в игре…</p>';
}}
function showNoteDetail(id){
var n=NOTES_DATA[id];
if(!n)return;
document.getElementById("note-list-view").style.display="none";
document.getElementById("note-detail-view").style.display="block";
document.getElementById("note-detail-text").textContent=n.text;
document.getElementById("note-detail-sign").textContent=n.sign;
}
function setupNoteBack(){
var btn=document.getElementById("note-back");
if(btn)btn.onclick=function(){
document.getElementById("note-list-view").style.display="block";
document.getElementById("note-detail-view").style.display="none";
};
}
function checkNotesUnlock(){
if(!note1Shown&&coins>=1000000000000000000){
note1Shown=true;
unlockNote("note1");
noteShown=true;
var tab=document.getElementById("tab-note");
if(tab)tab.classList.remove("hidden");
var popup=document.createElement("div");
popup.className="achievement-popup";
popup.textContent="📜 Странная записка появилась в игре...";
popup.style.background="linear-gradient(135deg, #d4c5a0, #8b7355)";
popup.style.color="#1a1a2e";
document.body.appendChild(popup);
setTimeout(function(){popup.remove();},5000);
playSound("achievement");
saveGame();
}
if(!note2Shown&&coins>=1000000000000000000000){
note2Shown=true;
unlockNote("note2");
var popup2=document.createElement("div");
popup2.className="achievement-popup";
popup2.textContent="📜 Ещё одна записка появилась в игре...";
popup2.style.background="linear-gradient(135deg, #d4c5a0, #8b7355)";
popup2.style.color="#1a1a2e";
document.body.appendChild(popup2);
setTimeout(function(){popup2.remove();},5000);
playSound("achievement");
saveGame();
}
if(!note3Shown&&coins>=2e31){
note3Shown=true;
unlockNote("note3");
var popup3=document.createElement("div");
popup3.className="achievement-popup";
popup3.textContent="📜 Третья записка появилась в игре...";
popup3.style.background="linear-gradient(135deg, #d4c5a0, #8b7355)";
popup3.style.color="#1a1a2e";
document.body.appendChild(popup3);
setTimeout(function(){popup3.remove();},5000);
playSound("achievement");
saveGame();
}}
function checkNoteTab(){
var tab=document.getElementById("tab-note");
if(!tab)return;
if(note1Shown||note2Shown||note3Shown||notesUnlocked["note1"]||notesUnlocked["note2"]||notesUnlocked["note3"]){tab.classList.remove("hidden");}
else{tab.classList.add("hidden");}}

// === ЗАГРУЗКА ===
function loadGame(){
var raw=localStorage.getItem(SAVE_KEY);
if(!raw)return;
try{
var data=JSON.parse(raw);
coins=data.coins||0;coinsPerClick=data.coinsPerClick||1;totalEarned=data.totalEarned||0;
totalTaps=data.totalTaps||0;totalPlayTime=data.totalPlayTime||0;
lastDisplayedCoins=coins;
chestsOpened=data.chestsOpened||0;
personalBestCoins=data.personalBestCoins||coins;
lastTheftKey=data.lastTheftKey||"";
var loadedCrystals=data.crystals||0;
if(loadedCrystals>crystalsMax){
var overflow=loadedCrystals-crystalsMax;var conv=overflow*1e15;coins+=conv;totalEarned+=conv;crystals=crystalsMax;
setTimeout(function(){var popup=document.createElement("div");popup.className="achievement-popup";popup.textContent="💎 Лимит 1000! Излишек "+overflow+" 💎 → "+formatNumber(conv)+" монет";document.body.appendChild(popup);setTimeout(function(){popup.remove();},5000);},2000);
}else{crystals=loadedCrystals;}
if(data.unlocked){for(var u in data.unlocked)unlocked[u]=data.unlocked[u];}
if(data.upgrades){for(var id2 in data.upgrades){if(upgrades[id2]){upgrades[id2].count=data.upgrades[id2].count;}}}
for(var rid in upgrades){
var ru=upgrades[rid];
if(ru.count>=UPGRADE_MAX_LEVEL){ru.count=UPGRADE_MAX_LEVEL;ru.cost=Infinity;}
else{ru.cost=Math.floor(ru.baseCost*Math.pow(UPGRADE_COST_MULT,ru.count));}
}
if(data.globalUpgrades){for(var gid in data.globalUpgrades){if(globalUpgrades[gid]){globalUpgrades[gid].count=data.globalUpgrades[gid].count||0;}}}
for(var ggid in globalUpgrades){var gu=globalUpgrades[ggid];gu.cost=Math.floor(gu.baseCost*Math.pow(GLOBAL_UPGRADE_COST_MULT,gu.count));}
if(data.boostersStorage){for(var bid in data.boostersStorage){if(BOOSTERS[bid])BOOSTERS[bid].storage=data.boostersStorage[bid]||0;}}
if(data.bgOwned){for(var bgid in data.bgOwned){if(BACKGROUNDS[bgid])BACKGROUNDS[bgid].owned=!!data.bgOwned[bgid];}}
if(data.activeBg&&BACKGROUNDS[data.activeBg])activeBg=data.activeBg;
if(data.emojiSkinsOwned){for(var esid in data.emojiSkinsOwned){if(EMOJI_SKINS[esid])EMOJI_SKINS[esid].owned=!!data.emojiSkinsOwned[esid];}}
if(data.wheelState){
wheelFreeUsed=data.wheelState.freeUsed||false;
wheelPaidUsed=data.wheelState.paidUsed||false;
wheelLastResetDay=data.wheelState.lastResetDay||"";
}
if(data.lastTime){
var secondsAway=Math.floor((Date.now()-data.lastTime)/1000);
var capped=Math.min(secondsAway,8*3600);
var earned=Math.floor(getCPS()*capped);
if(earned>0){
coins+=earned;totalEarned+=earned;
document.getElementById("offline-amount").textContent=formatNumber(earned);
var missedParts=[];
var lastChest=parseInt(localStorage.getItem("lastChest")||"0");
var chestCdLeft=3600000-(Date.now()-lastChest);
if(lastChest>0&&chestCdLeft<=0&&secondsAway>=3600){missedParts.push("🎁 Сундук был готов");}
var totalBoosters=0;for(var bb in BOOSTERS){totalBoosters+=(BOOSTERS[bb].storage||0);}
if(totalBoosters>0){missedParts.push("📦 Бустеров в хранилище: <b>"+totalBoosters+"</b>");}
if(data.depositUnlocked&&data.depositLevel>=1&&data.depositLevel<=5&&secondsAway>=600){missedParts.push("😭 Смайлик был голоден");}
var todayKey=new Date().toDateString();
var lastDay=localStorage.getItem("lastOfflineDay")||"";
if(lastDay&&lastDay!==todayKey&&secondsAway>=3600){missedParts.push("📜 Задания обновились");}
localStorage.setItem("lastOfflineDay",todayKey);
var missedEl=document.getElementById("offline-missed");
if(missedEl){
if(missedParts.length>0){missedEl.innerHTML=missedParts.join("<br>");missedEl.classList.remove("hidden");}
else{missedEl.classList.add("hidden");}
}
document.getElementById("offline-popup").classList.remove("hidden");
syncScrollLock();
playSound("achievement");
document.getElementById("offline-close").onclick=function(){document.getElementById("offline-popup").classList.add("hidden");syncScrollLock();saveGame();};
}
if(data.depositUnlocked&&data.depositLevel>=1&&data.depositLevel<=5){var hungerPenalty=Math.floor(DEPOSIT_HUNGRY_RATE*capped);if(hungerPenalty>0)coins=Math.max(0,coins-hungerPenalty);}}
shards=data.shards||0;eventMultiplier=data.eventMultiplier||1;eventTimer=data.eventTimer||0;eventName=data.eventName||"";currentEventKey=data.currentEventKey||"";
crystalBoostMultiplier=data.crystalBoostMultiplier||1;crystalBoostTimer=data.crystalBoostTimer||0;crystalBoostName=data.crystalBoostName||"";
try{var globalPromos=localStorage.getItem("clicker-used-promos");if(globalPromos)usedPromos=JSON.parse(globalPromos);else if(data.usedPromos)usedPromos=data.usedPromos;}catch(e){if(data.usedPromos)usedPromos=data.usedPromos;}
if(data.ownedItems){ownedItems=data.ownedItems;for(var oid in ownedItems){if(ownedItems[oid]===true)ownedItems[oid]=1;if(ownedItems[oid]===false)delete ownedItems[oid];}}
secretUnlocked=data.secretUnlocked||false;secretAutoClicker=data.secretAutoClicker||false;secretAutoClickerTimer=data.secretAutoClickerTimer||0;
depositUnlocked=data.depositUnlocked||false;depositLevel=data.depositLevel||0;
lastDepositTimeKey=data.lastDepositTimeKey||"";
generatorLevel=data.generatorLevel||1;
if(generatorLevel<1)generatorLevel=1;
if(generatorLevel>GENERATOR_MAX_LEVEL)generatorLevel=GENERATOR_MAX_LEVEL;
generatorTimer=GENERATOR_DURATION;
smileSkinUnlocked=data.smileSkinUnlocked||false;
smileSkinActive=data.smileSkinActive||false;
if(!smileSkinUnlocked)smileSkinActive=false;
gulauActive=data.gulauActive||false;gulauTimer=data.gulauTimer||0;
rewardClaimed=data.rewardClaimed||false;bossRewardClaimed=data.bossRewardClaimed||false;noteShown=data.noteShown||false;pahanUnlocked=data.pahanUnlocked||false;
if(data.notesUnlocked){
for(var nid in data.notesUnlocked){
if(data.notesUnlocked[nid]){
notesUnlocked[nid]=true;
if(NOTES_DATA[nid])NOTES_DATA[nid].unlocked=true;
}
}
}
if(notesUnlocked["note1"])note1Shown=true;
if(notesUnlocked["note2"])note2Shown=true;
if(notesUnlocked["note3"])note3Shown=true;
quests=data.quests||[];questsDate=data.questsDate||"";questsClaimed=data.questsClaimed||0;questProgress=data.questProgress||{};
if(gulauActive&&gulauTimer>0){document.getElementById("gulau-info").style.display="block";updateGulauTimer();}
if(secretUnlocked&&secretAutoClicker&&secretAutoClickerTimer>0){setTimeout(function(){startSecretAutoClicker();},500);}
if(crystalBoostTimer>0&&crystalBoostMultiplier>1){document.body.classList.add("boost-active");}
checkDailyBonus();checkRewardTab();checkNoteTab();updateDepositSideButton();updatePahanButton();updateBoostBanner();
applyOfflineDepositDrop();
lastDisplayedCoins=coins;
}catch(e){console.warn("Ошибка загрузки:",e);}}
// === ВРЕМЯ ВКЛАДА ===
function getTimeKey(){
var d=new Date();
var y=d.getFullYear();var m=("0"+(d.getMonth()+1)).slice(-2);var day=("0"+d.getDate()).slice(-2);
var h=("0"+d.getHours()).slice(-2);
var half=Math.floor(d.getMinutes()/30)*30;
var hh=("0"+half).slice(-2);
return y+"-"+m+"-"+day+"-"+h+"-"+hh;
}
function getTimeKeyValue(key){
var parts=key.split("-");
return new Date(parseInt(parts[0]),parseInt(parts[1])-1,parseInt(parts[2]),parseInt(parts[3]),parseInt(parts[4])).getTime();
}
function applyOfflineDepositDrop(){
if(!depositUnlocked||depositLevel<1)return;
var nowKey=getTimeKey();
if(!lastDepositTimeKey){lastDepositTimeKey=nowKey;saveGame();return;}
if(lastDepositTimeKey===nowKey)return;
var lastMs=getTimeKeyValue(lastDepositTimeKey);
var nowMs=getTimeKeyValue(nowKey);
var HALF=30*60*1000;
var ticks=Math.floor((nowMs-lastMs)/HALF);
if(ticks<=0){lastDepositTimeKey=nowKey;saveGame();return;}
if(ticks>500)ticks=500;
var totalDrop=0;
for(var i=0;i<ticks;i++){var drop=Math.random()<0.5?1:3;totalDrop+=drop;}
var before=depositLevel;
depositLevel=Math.max(1,depositLevel-totalDrop);
if(depositLevel!==before){
setTimeout(function(){
var popup=document.createElement("div");
popup.className="achievement-popup";
popup.textContent="😭 Смайлик упал: "+before+" → "+depositLevel;
document.body.appendChild(popup);
setTimeout(function(){popup.remove();},4000);
},1500);
}
lastDepositTimeKey=nowKey;
saveGame();
}
function checkDepositTimeTick(){
if(!depositUnlocked)return;
var nowKey=getTimeKey();
if(!lastDepositTimeKey){lastDepositTimeKey=nowKey;return;}
if(lastDepositTimeKey===nowKey)return;
var lastMs=getTimeKeyValue(lastDepositTimeKey);
var nowMs=getTimeKeyValue(nowKey);
var HALF=30*60*1000;
var ticks=Math.floor((nowMs-lastMs)/HALF);
if(ticks<=0){lastDepositTimeKey=nowKey;return;}
var totalDrop=0;
for(var i=0;i<ticks;i++){var drop=Math.random()<0.5?1:3;totalDrop+=drop;}
var before=depositLevel;
depositLevel=Math.max(1,depositLevel-totalDrop);
lastDepositTimeKey=nowKey;
if(depositLevel!==before){
updateDepositSideButton();
var modal=document.getElementById("modal-deposit");
if(modal&&!modal.classList.contains("hidden"))renderDeposit();
var popup=document.createElement("div");
popup.className="achievement-popup";
popup.textContent="😭 Смайлик упал: "+before+" → "+depositLevel;
document.body.appendChild(popup);
setTimeout(function(){popup.remove();},4000);
saveGame();
}}

// === НАСТРОЙКИ ===
function loadSettings(){
var raw=localStorage.getItem("clicker-settings");
if(raw){try{var data=JSON.parse(raw);settings.showFloat=data.showFloat!==false;settings.showGolden=data.showGolden!==false;settings.showDaily=data.showDaily!==false;settings.sound=data.sound!==false;settings.music=data.music===true;}catch(e){}}
var el1=document.getElementById("opt-float"),el2=document.getElementById("opt-golden"),el3=document.getElementById("opt-daily"),el4=document.getElementById("opt-sound"),el5=document.getElementById("opt-music");
if(el1)el1.checked=settings.showFloat;if(el2)el2.checked=settings.showGolden;if(el3)el3.checked=settings.showDaily;if(el4)el4.checked=settings.sound;if(el5)el5.checked=settings.music;}
function saveSettings(){localStorage.setItem("clicker-settings",JSON.stringify(settings));}

// === ЗВУКИ ===
var sounds={},bgMusic=null,bgMusic2=null,currentMusicIndex=0;
function initSounds(){
var names=["click","ui","achievement","chest","boss","eat"];
names.forEach(function(n){try{sounds[n]=new Audio("sounds/"+n+".mp3");sounds[n].volume=0.4;}catch(e){}});
try{bgMusic=new Audio("sounds/music.mp3");bgMusic.loop=false;bgMusic.volume=0.25;
bgMusic.addEventListener("ended",function(){playNextMusic();});}catch(e){}
try{bgMusic2=new Audio("sounds/music2.mp3");bgMusic2.loop=false;bgMusic2.volume=0.25;
bgMusic2.addEventListener("ended",function(){playNextMusic();});}catch(e){}
try{alarmSound=new Audio("sounds/alarm.mp3");alarmSound.loop=true;alarmSound.volume=0.5;}catch(e){}}
function playSound(name){
if(!settings.sound)return;
var snd=sounds[name];if(!snd)return;
var now=Date.now();
if(!snd._lastPlay)snd._lastPlay=0;
if(now-snd._lastPlay<80)return;
snd._lastPlay=now;
try{snd.currentTime=0;snd.play();}catch(e){}
}
function playMusic(){
if(!settings.music)return;
var track=(currentMusicIndex===0)?bgMusic:bgMusic2;
if(!track)return;
try{track.currentTime=0;track.play().catch(function(){});}catch(e){}
}
function playNextMusic(){
if(!settings.music)return;
var other=(currentMusicIndex===0)?bgMusic2:bgMusic;
if(other){try{other.pause();other.currentTime=0;}catch(e){}}
currentMusicIndex=1-currentMusicIndex;
var track=(currentMusicIndex===0)?bgMusic:bgMusic2;
if(!track)return;
try{track.currentTime=0;track.play().catch(function(){});}catch(e){}
}
function stopMusic(){
try{if(bgMusic)bgMusic.pause();}catch(e){}
try{if(bgMusic2)bgMusic2.pause();}catch(e){}
}
function unlockAudio(){
for(var n in sounds){try{var p=sounds[n].play();if(p&&p.then){p.then(function(){sounds[n].pause();sounds[n].currentTime=0;}).catch(function(){});}}catch(e){}}
if(settings.music)playMusic();
document.removeEventListener("touchstart",unlockAudio);document.removeEventListener("click",unlockAudio);}
document.addEventListener("touchstart",unlockAudio,{once:true,passive:true});
document.addEventListener("click",unlockAudio,{once:true});
function handleVisibilityChange(){if(document.hidden)stopMusic();else{if(settings.music)playMusic();}}
function handlePageHide(){stopMusic();}
function handleWindowBlur(){stopMusic();}
document.addEventListener("visibilitychange",handleVisibilityChange);
window.addEventListener("pagehide",handlePageHide);
window.addEventListener("blur",handleWindowBlur);
window.addEventListener("beforeunload",function(){stopMusic();});

/* === ФОНЫ === */
function applyBackground(){
document.body.classList.remove("bg-space","bg-flame","bg-ocean","bg-sakura","bg-ice","bg-bloodmoon","bg-volcano","bg-nebula","has-bg");
if(activeBg==="base"){bgParticles=[];return;}
var bg=BACKGROUNDS[activeBg];
if(!bg)return;
document.body.classList.add("has-bg",bg.cls);
bgParticles=[];
var pt=bg.particles;
var count=pt==="stars"?60:pt==="snow"?40:pt==="petals"?30:pt==="bubbles"?25:pt==="sparks"?35:pt==="lava"?30:pt==="nebula"?15:20;
for(var i=0;i<count;i++){
bgParticles.push({
x:Math.random()*100,y:Math.random()*100,
size:pt==="stars"?Math.random()*1.8+0.6:Math.random()*3+1.5,
speed:pt==="sparks"?0.4+Math.random()*0.4:0.15+Math.random()*0.35,
drift:Math.random()*0.3-0.15,
rot:Math.random()*Math.PI*2,
rotSpeed:Math.random()*0.04-0.02,
alpha:0.4+Math.random()*0.6
});
}
}
function renderBgParticles(){
if(!bgCanvas||!bgCtx)return;
var W=bgCanvas.width,H=bgCanvas.height;
bgCtx.clearRect(0,0,W,H);
if(activeBg==="base"){bgAnimFrame=requestAnimationFrame(renderBgParticles);return;}
var pt=BACKGROUNDS[activeBg].particles;
for(var i=0;i<bgParticles.length;i++){
var p=bgParticles[i];
if(pt==="stars"){p.alpha=0.4+Math.sin(Date.now()/600+i)*0.4;}
else if(pt==="sparks"){p.y-=p.speed*0.5;p.x+=p.drift*0.2;if(p.y<-5){p.y=105;p.x=Math.random()*100;}}
else if(pt==="bubbles"){p.y-=p.speed*0.4;p.x+=Math.sin(Date.now()/900+i)*0.15;if(p.y<-5){p.y=105;p.x=Math.random()*100;}}
else if(pt==="petals"){p.y+=p.speed*0.3;p.x+=Math.sin(Date.now()/800+i)*0.3;p.rot+=p.rotSpeed;if(p.y>105){p.y=-5;p.x=Math.random()*100;}}
else if(pt==="snow"){p.y+=p.speed*0.25;p.x+=p.drift;p.rot+=p.rotSpeed*0.5;if(p.y>105){p.y=-5;p.x=Math.random()*100;}}
else if(pt==="pulse"){p.alpha=0.3+Math.abs(Math.sin(Date.now()/1200+i))*0.5;}
else if(pt==="lava"){p.y-=p.speed*0.35;p.x+=Math.sin(Date.now()/700+i)*0.2;if(p.y<-5){p.y=105;p.x=Math.random()*100;}}
else if(pt==="nebula"){p.alpha=0.2+Math.abs(Math.sin(Date.now()/2000+i))*0.4;}
var px=(p.x/100)*W,py=(p.y/100)*H,sz=p.size;
bgCtx.save();
bgCtx.globalAlpha=p.alpha;
if(pt==="stars"){bgCtx.fillStyle="#fff";bgCtx.beginPath();bgCtx.arc(px,py,sz,0,Math.PI*2);bgCtx.fill();}
else if(pt==="sparks"){bgCtx.fillStyle="#ff9500";bgCtx.fillRect(px,py,sz*0.6,sz*2);}
else if(pt==="bubbles"){bgCtx.strokeStyle="rgba(180,230,255,.7)";bgCtx.lineWidth=1.5;bgCtx.beginPath();bgCtx.arc(px,py,sz*2,0,Math.PI*2);bgCtx.stroke();}
else if(pt==="petals"){bgCtx.translate(px,py);bgCtx.rotate(p.rot);bgCtx.fillStyle="#ffb0d0";bgCtx.beginPath();bgCtx.ellipse(0,0,sz*2,sz,0,0,Math.PI*2);bgCtx.fill();}
else if(pt==="snow"){bgCtx.translate(px,py);bgCtx.rotate(p.rot);bgCtx.strokeStyle="#fff";bgCtx.lineWidth=1;for(var k=0;k<3;k++){bgCtx.beginPath();bgCtx.moveTo(-sz,-sz);bgCtx.lineTo(sz,sz);bgCtx.stroke();bgCtx.rotate(Math.PI/3);}}
else if(pt==="pulse"){var g=bgCtx.createRadialGradient(px,py,0,px,py,sz*15);g.addColorStop(0,"rgba(255,0,0,.8)");g.addColorStop(1,"rgba(255,0,0,0)");bgCtx.fillStyle=g;bgCtx.beginPath();bgCtx.arc(px,py,sz*15,0,Math.PI*2);bgCtx.fill();}
else if(pt==="lava"){bgCtx.fillStyle="rgba(255,100,0,.9)";bgCtx.beginPath();bgCtx.arc(px,py,sz*1.5,0,Math.PI*2);bgCtx.fill();}
else if(pt==="nebula"){var g2=bgCtx.createRadialGradient(px,py,0,px,py,sz*20);g2.addColorStop(0,"rgba(160,100,255,.7)");g2.addColorStop(0.5,"rgba(80,50,200,.3)");g2.addColorStop(1,"rgba(80,50,200,0)");bgCtx.fillStyle=g2;bgCtx.beginPath();bgCtx.arc(px,py,sz*20,0,Math.PI*2);bgCtx.fill();}
bgCtx.restore();
}
bgAnimFrame=requestAnimationFrame(renderBgParticles);
}
function resizeBgCanvas(){
if(!bgCanvas)return;
bgCanvas.width=window.innerWidth;
bgCanvas.height=window.innerHeight;
}
function startBgAnimation(){
if(!bgCanvas){bgCanvas=document.getElementById("bg-canvas");if(bgCanvas)bgCtx=bgCanvas.getContext("2d");}
resizeBgCanvas();
if(bgAnimFrame)cancelAnimationFrame(bgAnimFrame);
renderBgParticles();
}
function renderBackgrounds(){
var list=document.getElementById("bg-list");if(!list)return;
list.innerHTML="";
for(var id in BACKGROUNDS){
var bg=BACKGROUNDS[id];
var div=document.createElement("div");
var classes="skin-item";
if(activeBg===id)classes+=" active";
if(!bg.owned)classes+=" locked";
div.className=classes;div.dataset.bgid=id;
var priceText="";
if(activeBg===id)priceText='<div class="skin-price">✓ Активен</div>';
else if(bg.owned)priceText='<div class="skin-price">Нажмите</div>';
else priceText='<div class="skin-price">'+bg.cost+' 💎</div>';
div.innerHTML='<div class="bg-preview '+id+'"></div>'+'<div class="skin-name">'+bg.name+'</div>'+priceText;
list.appendChild(div);
}
document.querySelectorAll("[data-bgid]").forEach(function(el){el.onclick=function(){
var id=el.dataset.bgid;var bg=BACKGROUNDS[id];
if(bg.owned){
if(activeBg===id&&id!=="base"){activeBg="base";}
else{activeBg=id;}
playSound("ui");
applyBackground();
startBgAnimation();
renderBackgrounds();
saveGame();
return;
}
if(crystals<bg.cost){alert("Недостаточно кристаллов!\nНужно: "+bg.cost+" 💎\nУ вас: "+crystals+" 💎");return;}
crystals-=bg.cost;
bg.owned=true;
activeBg=id;
playSound("ui");
applyBackground();
startBgAnimation();
renderBackgrounds();
updateUI();
var allOwned=true;var count=0;
for(var bid in BACKGROUNDS){if(bid==="base")continue;if(BACKGROUNDS[bid].owned)count++;else allOwned=false;}
if(allOwned&&count===8&&!unlocked.bg_all){unlocked.bg_all=true;checkAchievements();}
saveGame();};});}

// === СКИНЫ ===
function loadSkins(){
var raw=localStorage.getItem("clicker-skins");
if(raw){
try{
var data=JSON.parse(raw);
if(data.owned){for(var id in data.owned){if(skins[id])skins[id].owned=data.owned[id];}}
if(data.active&&skins[data.active])activeSkin=data.active;
if(data.emojiOwned){for(var eid in data.emojiOwned){if(EMOJI_SKINS[eid])EMOJI_SKINS[eid].owned=data.emojiOwned[eid];}}
if(data.activeEmoji&&EMOJI_SKINS[data.activeEmoji])activeEmojiSkin=data.activeEmoji;
}catch(e){}}
}
function saveSkins(){
var ownedData={};for(var id in skins){ownedData[id]=skins[id].owned;}
var emojiOwned={};for(var eid in EMOJI_SKINS){emojiOwned[eid]=EMOJI_SKINS[eid].owned;}
localStorage.setItem("clicker-skins",JSON.stringify({owned:ownedData,active:activeSkin,emojiOwned:emojiOwned,activeEmoji:activeEmojiSkin}));}
function applySkin(){
var btn=document.getElementById("click-btn");if(!btn)return;
btn.classList.remove("skin-gennadii");
btn.classList.remove("has-emoji","skin-heart","skin-fire_heart","skin-shield","skin-candy");
var emojiEl=btn.querySelector(".emoji-skin-display");
if(emojiEl)emojiEl.remove();
if(activeEmojiSkin&&EMOJI_SKINS[activeEmojiSkin]&&EMOJI_SKINS[activeEmojiSkin].owned){
var es=EMOJI_SKINS[activeEmojiSkin];
btn.classList.add("has-emoji","skin-"+es.id);
btn.style.background="";
btn.style.boxShadow="";
var span=document.createElement("span");
span.className="emoji-skin-display";
span.textContent=es.emoji;
btn.appendChild(span);
return;
}
var skin=skins[activeSkin];
if(activeSkin==="gennadii"&&skin.owned){
btn.classList.add("skin-gennadii");
btn.style.background="";
btn.style.boxShadow="";
return;
}
if(skin.image)btn.style.background="url('"+skin.image+"') center / cover no-repeat";
else btn.style.background=skin.bg;
btn.style.boxShadow="0 6px 0 rgba(0, 0, 0, 0.4)";}
function renderSkins(){
var list=document.getElementById("skins-list");if(!list)return;list.innerHTML="";
for(var id in skins){var skin=skins[id];
if(skin.secret&&!skin.owned)continue;
var div=document.createElement("div");
var classes="skin-item";
if(activeEmojiSkin===null&&activeSkin===id)classes+=" active";
if(!skin.owned)classes+=" locked";
div.className=classes;div.dataset.id=id;
var previewStyle,previewText;
if(skin.special&&id==="gennadii"){previewStyle="background:radial-gradient(circle at 50% 50%, #f4a8c0 0%, #f4a8c0 40%, #e8d7b8 42%, #e8d7b8 100%);";previewText="";}
else if(skin.image){previewStyle="background:url('"+skin.image+"') center / cover no-repeat;";previewText="";}
else{previewStyle="background:"+skin.bg+";";previewText="ТАП";}
var priceText="";
if(activeEmojiSkin===null&&activeSkin===id)priceText='<div class="skin-price">✓ Выбран</div>';
else if(skin.owned)priceText='<div class="skin-price">Нажмите</div>';
else if(skin.special)priceText='<div class="skin-price">Только промокод</div>';
else priceText='<div class="skin-price">'+SKIN_PRICE+' 💎</div>';
div.innerHTML='<div class="skin-preview" style="'+previewStyle+'">'+previewText+'</div>'+'<div class="skin-name">'+skin.name+'</div>'+priceText;
list.appendChild(div);}
document.querySelectorAll(".skin-item[data-id]").forEach(function(el){el.onclick=function(){
var id=el.dataset.id;var skin=skins[id];
if(skin.owned){
activeSkin=id;activeEmojiSkin=null;
playSound("ui");saveSkins();applySkin();renderSkins();renderEmojiSkins();
return;
}
if(skin.special){alert("Этот скин можно получить только через промокод!");return;}
if(crystals<SKIN_PRICE){alert("Недостаточно кристаллов!\nНужно: "+SKIN_PRICE+" 💎\nУ вас: "+crystals+" 💎");return;}
crystals-=SKIN_PRICE;skin.owned=true;activeSkin=id;activeEmojiSkin=null;playSound("ui");addQuestProgress("skin",1);saveSkins();applySkin();renderSkins();renderEmojiSkins();updateUI();saveGame();};});}
function renderEmojiSkins(){
var list=document.getElementById("emoji-skins-list");if(!list)return;
list.innerHTML="";
for(var id in EMOJI_SKINS){
var es=EMOJI_SKINS[id];
var div=document.createElement("div");
var classes="skin-item";
if(activeEmojiSkin===id)classes+=" active";
if(!es.owned)classes+=" locked";
div.className=classes;div.dataset.eid=id;
var priceText="";
if(activeEmojiSkin===id)priceText='<div class="skin-price">✓ Выбран</div>';
else if(es.owned)priceText='<div class="skin-price">Нажмите</div>';
else priceText='<div class="skin-price">'+es.cost+' 💎</div>';
div.innerHTML='<div class="skin-preview" style="font-size:38px;background:#0e1a30;color:#fff">'+es.emoji+'</div>'+'<div class="skin-name">'+es.name+'</div>'+priceText;
list.appendChild(div);}
document.querySelectorAll("[data-eid]").forEach(function(el){el.onclick=function(){
var id=el.dataset.eid;var es=EMOJI_SKINS[id];
if(es.owned){
activeEmojiSkin=(activeEmojiSkin===id)?null:id;
playSound("ui");saveSkins();applySkin();renderSkins();renderEmojiSkins();
return;
}
if(crystals<es.cost){alert("Недостаточно кристаллов!\nНужно: "+es.cost+" 💎\nУ вас: "+crystals+" 💎");return;}
crystals-=es.cost;es.owned=true;activeEmojiSkin=id;playSound("ui");saveSkins();applySkin();renderSkins();renderEmojiSkins();updateUI();saveGame();};});}
function renderSmileSkins(){
var list=document.getElementById("smile-skins-list");if(!list)return;list.innerHTML="";
var div=document.createElement("div");
var isActive=smileSkinActive,isUnlocked=smileSkinUnlocked;
var classes="skin-item";
if(isActive)classes+=" active";
if(!isUnlocked)classes+=" locked";
div.className=classes;
var priceText="";
if(!isUnlocked)priceText='<div class="skin-price">Только промокод</div>';
else if(isActive)priceText='<div class="skin-price">✓ Включён</div>';
else priceText='<div class="skin-price">Нажмите чтобы включить</div>';
div.innerHTML='<div class="smile-skin-preview blood"><span>😈</span></div>'+'<div class="skin-name">Кровавая мутация</div>'+priceText;
list.appendChild(div);
div.onclick=function(){
if(!smileSkinUnlocked){alert("Этот скин можно получить только через промокод!");return;}
smileSkinActive=!smileSkinActive;
playSound("ui");
renderSmileSkins();
updateDepositSideButton();
var modal=document.getElementById("modal-deposit");
if(modal&&!modal.classList.contains("hidden"))renderDeposit();
saveGame();};}
function getItemBonus(){
var sum=0;for(var id in ITEMS){var lvl=ownedItems[id]||0;if(typeof lvl==="boolean")lvl=lvl?1:0;if(lvl>0){sum+=ITEMS[id].bonuses[lvl-1];}}
return 1+sum;}

// === ПРЕДМЕТЫ ===
function renderItems(){
var list=document.getElementById("items-list"),shardsEl=document.getElementById("items-shards"),crystalsEl=document.getElementById("items-crystals");
if(!list)return;if(shardsEl)shardsEl.textContent=shards;if(crystalsEl)crystalsEl.textContent=crystals;
list.innerHTML="";
for(var id in ITEMS){
var item=ITEMS[id];var lvl=ownedItems[id]||0;if(typeof lvl==="boolean")lvl=lvl?1:0;
var isMax=lvl>=ITEM_MAX_LEVEL;var currentBonus=lvl>0?item.bonuses[lvl-1]:0;var nextBonus=!isMax?item.bonuses[lvl]:0;
var nextCost=!isMax?Math.round(item.cost*ITEM_PRICE_MULT[lvl]):0;var canBuy=!isMax&&shards>=nextCost;
var div=document.createElement("div");div.className="item-card"+(lvl>0?" owned":"");
var effectLine="";
if(lvl===0)effectLine="Не куплено · Ур. 0/3";
else if(isMax)effectLine="Максимум · Ур. 3/3 · +"+Math.round(currentBonus*100)+"%";
else effectLine="Ур. "+lvl+"/3 · +"+Math.round(currentBonus*100)+"% → +"+Math.round(nextBonus*100)+"%";
var btnText="";
if(isMax)btnText="✓ Максимум";else if(lvl===0)btnText=nextCost+" 🌑";else btnText="Улучшить: "+nextCost+" 🌑";
var btnClass="item-buy"+(isMax?" owned-btn":"")+(btnText.length>10?" long-btn":"");
div.innerHTML='<div class="item-icon">'+item.icon+'</div>'+'<div class="item-info">'+'<div class="item-name">'+item.name+'</div>'+'<div class="item-desc">'+item.desc+'</div>'+'<div class="item-effect">'+effectLine+'</div>'+'</div>'+'<button class="'+btnClass+'" data-id="'+id+'"'+(isMax||!canBuy?' disabled':'')+'>'+btnText+'</button>';
list.appendChild(div);}
document.querySelectorAll(".item-buy").forEach(function(btn){btn.onclick=function(){
var id=btn.dataset.id;var item=ITEMS[id];var lvl=ownedItems[id]||0;if(typeof lvl==="boolean")lvl=lvl?1:0;
if(lvl>=ITEM_MAX_LEVEL)return;var cost=Math.round(item.cost*ITEM_PRICE_MULT[lvl]);
if(shards<cost){alert("Недостаточно осколков!\nНужно: "+cost+" 🌑\nУ вас: "+shards+" 🌑");return;}
shards-=cost;ownedItems[id]=lvl+1;playSound("ui");addQuestProgress("item",1);renderItems();updateUI();saveGame();};});}

// === МАГАЗИН ЗА КРИСТАЛЛЫ ===
function renderCrystalShop(){
var list=document.getElementById("crystal-list");if(!list)return;list.innerHTML="";
for(var id in CRYSTAL_ITEMS){
var item=CRYSTAL_ITEMS[id];var disabled=false;var statusText="";var btnText=item.cost+' 💎';
if(id==="boost2"||id==="boost3"||id==="boost5"){statusText="В хранилище: "+(BOOSTERS[id]?BOOSTERS[id].storage:0);}
else if(id==="coinsBag"){var gain=Math.floor(getCPS()*3600);statusText=gain>0?("Даст "+formatNumber(gain)+" монет"):"CPS пока 0";}
else if(id==="depositUp"){if(!depositUnlocked||depositLevel>=25){disabled=true;statusText=!depositUnlocked?"Сначала купите вклад":"Вклад на максимуме";}else{statusText="Ур. "+depositLevel+" → "+(depositLevel+1);}}
else if(id==="chest"){statusText="Сразу откроется";}
var div=document.createElement("div");div.className="item-card";
div.innerHTML='<div class="item-icon">'+item.icon+'</div>'+'<div class="item-info">'+'<div class="item-name">'+item.name+'</div>'+'<div class="item-desc">'+item.desc+'</div>'+'<div class="item-effect">'+statusText+'</div>'+'</div>'+'<button class="item-buy crystal-buy" data-id="'+id+'"'+(disabled?' disabled':'')+'>'+btnText+'</button>';
list.appendChild(div);}
document.querySelectorAll(".crystal-buy").forEach(function(btn){
if(btn.disabled){btn.onclick=null;return;}
btn.onclick=function(){buyCrystalItem(btn.dataset.id);};});}
function buyCrystalItem(id){
var item=CRYSTAL_ITEMS[id];if(!item)return;
if(id==="depositUp"){
if(!depositUnlocked){alert("Сначала купите вклад в модалке смайлика!");return;}
if(depositLevel>=25){alert("Вклад уже на максимуме (25 ур.)!");return;}
}
if(id==="boost2"||id==="boost3"||id==="boost5"){
if(crystalBoostTimer>0&&crystalBoostMultiplier>1){alert("Буст уже активен, дождись окончания!");return;}
}
if(crystals<item.cost){alert("Недостаточно кристаллов!\nНужно: "+item.cost+" 💎\nУ вас: "+crystals+" 💎");return;}
crystals-=item.cost;
if(id==="coinsBag"){var gain=Math.floor(getCPS()*3600);coins+=gain;totalEarned+=gain;alert("💰 Получено "+formatNumber(gain)+" монет!");}
else if(id==="boost2"||id==="boost3"||id==="boost5"){addBoosterToStorage(id);}
else if(id==="chest"){
var r=getChestRewards();
openChestAnimation(r.crystals,r.coins,r.shards,r.booster,function(){addCrystals(r.crystals);coins+=r.coins;totalEarned+=r.coins;shards+=r.shards;if(r.booster)addBoosterToStorage(r.booster);chestsOpened++;addQuestProgress("chest",1);updateUI();updateChestButton();checkAchievements();saveGame();});}
else if(id==="depositUp"){depositLevel++;lastDepositTimeKey=getTimeKey();playSound("eat");addQuestProgress("deposit",1);updateDepositSideButton();}
playSound("ui");updateBoostBanner();updateUI();renderCrystalShop();saveGame();}

// === БУСТЕРЫ ===
function addBoosterToStorage(id){
if(!BOOSTERS[id])return;
BOOSTERS[id].storage=(BOOSTERS[id].storage||0)+1;
showBoosterAddedPopup(id);
saveGame();
if(document.getElementById("modal-boosters")&&!document.getElementById("modal-boosters").classList.contains("hidden"))renderBoosters();
}
function showBoosterAddedPopup(id){
var b=BOOSTERS[id];if(!b)return;
var popup=document.createElement("div");
popup.className="achievement-popup";
popup.textContent=b.icon+" Бустер ×"+b.mult+" добавлен в хранилище";
document.body.appendChild(popup);
setTimeout(function(){popup.remove();},3000);
}
function activateBooster(id){
var b=BOOSTERS[id];if(!b)return;
if(!b.storage||b.storage<=0){alert("Нет бустеров в наличии!");return;}
if(crystalBoostTimer>0&&crystalBoostMultiplier>1){alert("Активен другой бустер — дождись окончания!");return;}
b.storage--;
crystalBoostMultiplier=b.mult;
crystalBoostTimer=b.duration;
crystalBoostName=b.icon+" Буст ×"+b.mult;
playSound("ui");updateBoostBanner();updateUI();renderCrystalShop();renderBoosters();saveGame();
}
function renderBoosters(){
var list=document.getElementById("boosters-list");
var banner=document.getElementById("booster-active-banner");
if(!list)return;
if(banner){
if(crystalBoostTimer>0&&crystalBoostMultiplier>1){
var m=Math.floor(crystalBoostTimer/60);
var s=crystalBoostTimer%60;
banner.textContent="⚡ Активен ×"+crystalBoostMultiplier+" — осталось "+m+":"+(s<10?"0":"")+s;
banner.classList.remove("hidden");
}else{banner.classList.add("hidden");}
}
list.innerHTML="";
for(var id in BOOSTERS){
var b=BOOSTERS[id];var count=b.storage||0;
var isActive=(crystalBoostTimer>0&&crystalBoostMultiplier===b.mult);
var isAnotherActive=(crystalBoostTimer>0&&crystalBoostMultiplier>1&&!isActive);
var classes="booster-card";
if(count<=0)classes+=" empty";
if(isActive)classes+=" active-booster";
var div=document.createElement("div");div.className=classes;
var btnText="Активировать";var btnDisabled=false;
if(count<=0){btnText="Нет в наличии";btnDisabled=true;}
else if(isAnotherActive){btnText="Активен другой";btnDisabled=true;}
else if(isActive){btnText="Уже активен";btnDisabled=true;}
div.innerHTML='<div class="booster-icon">'+b.icon+'</div>'+'<div class="booster-info">'+'<div class="booster-name">'+b.name+'</div>'+'<div class="booster-desc">'+b.desc+'</div>'+'<div class="booster-count">📦 В наличии: '+count+'</div>'+'</div>'+'<button class="booster-activate-btn" data-bid="'+id+'"'+(btnDisabled?' disabled':'')+'>'+btnText+'</button>';
list.appendChild(div);}
document.querySelectorAll(".booster-activate-btn").forEach(function(btn){
if(btn.disabled){btn.onclick=null;return;}
btn.onclick=function(){activateBooster(btn.dataset.bid);};});}
function updateBoostBanner(){
var banner=document.getElementById("boost-banner");if(!banner)return;
if(crystalBoostTimer>0&&crystalBoostMultiplier>1){
var m=Math.floor(crystalBoostTimer/60);var s=crystalBoostTimer%60;
banner.textContent=crystalBoostName+" — "+m+":"+(s<10?"0":"")+s;
banner.classList.remove("hidden");document.body.classList.add("boost-active");}
else{banner.classList.add("hidden");document.body.classList.remove("boost-active");}}
function updateCrystalBoostTimer(){
if(crystalBoostTimer>0){crystalBoostTimer--;if(crystalBoostTimer<=0){crystalBoostTimer=0;crystalBoostMultiplier=1;crystalBoostName="";}updateBoostBanner();var mb=document.getElementById("modal-boosters");if(mb&&!mb.classList.contains("hidden"))renderBoosters();}}

// === ГЕНЕРАТОР ===
function getGeneratorCPS(){
if(generatorLevel<1)return 1;
return Math.max(1,Math.floor(generatorLevel/2.5));}
function getGeneratorCooldownMs(){return Math.round(1000/getGeneratorCPS());}
function getGeneratorCost(){
if(generatorLevel>=GENERATOR_MAX_LEVEL)return Infinity;
return Math.round(GENERATOR_BASE_COST*Math.pow(GENERATOR_COST_MULT,generatorLevel-1));}
function upgradeGenerator(){
if(generatorLevel>=GENERATOR_MAX_LEVEL)return;
var cost=getGeneratorCost();
if(coins<cost){alert("Недостаточно монет!\nНужно: "+formatNumber(cost)+"\nУ вас: "+formatNumber(coins));return;}
coins-=cost;generatorLevel++;generatorTimer=GENERATOR_DURATION;
playSound("ui");updateGeneratorButton();renderGenerator();updateUI();saveGame();}
function updateGeneratorTimer(){
generatorTimer--;
if(generatorTimer<=0){
generatorTimer=GENERATOR_DURATION;
var drops=[1,2,3,5];
var drop=drops[Math.floor(Math.random()*drops.length)];
var before=generatorLevel;
generatorLevel=Math.max(1,generatorLevel-drop);
if(generatorLevel!==before){
updateGeneratorButton();
var modal=document.getElementById("modal-generator");
if(modal&&!modal.classList.contains("hidden"))renderGenerator();
showGeneratorDropPopup(drop);
}}
updateGeneratorButton();}
function showGeneratorDropPopup(drop){
var popup=document.createElement("div");
popup.className="achievement-popup";
popup.textContent="⚡ Генератор упал на "+drop+" ур. (сейчас "+generatorLevel+")";
document.body.appendChild(popup);
setTimeout(function(){popup.remove();},3000);}
function updateGeneratorButton(){
var btn=document.getElementById("generator-btn");if(!btn)return;
var cps=getGeneratorCPS();
var cpsText=(cps<1)?("1 тап / "+(1/cps).toFixed(1)+" сек"):(cps+" тап/сек");
btn.textContent="⚡ Генератор: Ур. "+generatorLevel+" ("+cpsText+")";}
function renderGenerator(){
var content=document.getElementById("generator-content");if(!content)return;
var cps=getGeneratorCPS();
var isMax=generatorLevel>=GENERATOR_MAX_LEVEL;
var nextCost=isMax?0:getGeneratorCost();
var m=Math.floor(generatorTimer/60);var s=generatorTimer%60;
var cpsText=(cps<1)?("1 тап за "+(1/cps).toFixed(1)+" сек"):(cps+" тапов/сек");
var progressPercent=(generatorTimer/GENERATOR_DURATION)*100;
var html='<div class="generator-emoji">⚡</div>';
html+='<div class="generator-level">Уровень '+generatorLevel+' / '+GENERATOR_MAX_LEVEL+'</div>';
html+='<div class="generator-stat">Скорость: <b>'+cpsText+'</b></div>';
html+='<div class="generator-stat">До падения: <b>'+m+':'+(s<10?"0":"")+s+'</b></div>';
html+='<div class="generator-bar"><div class="generator-bar-fill" style="width:'+progressPercent+'%"></div></div>';
html+='<div class="generator-warning">⚠️ Раз в 3 минуты уровень падает на 1–5</div>';
if(!isMax){
html+='<div class="deposit-desc">Улучшить: <b>'+formatNumber(nextCost)+'</b> монет</div>';
html+='<button id="generator-upgrade-btn" class="deposit-btn" type="button">⚡ Улучшить</button>';
}else{
html+='<div class="deposit-happy">✨ Максимальный уровень!</div>';}
content.innerHTML=html;
var btn=document.getElementById("generator-upgrade-btn");
if(btn){btn.disabled=coins<nextCost;btn.onclick=upgradeGenerator;}}
function updateGeneratorUI(){
var modal=document.getElementById("modal-generator");
if(modal&&!modal.classList.contains("hidden"))renderGenerator();
updateGeneratorButton();}
var cooldownInterval=null;
function startCooldownUI(){
if(cooldownInterval)return;
cooldownInterval=setInterval(function(){
var btn=document.getElementById("click-btn");if(!btn)return;
if(generatorLevel>=20){
btn.classList.remove("cooldown");
btn.classList.add("tap-ready");
var txtOff=document.getElementById("tap-cooldown-text");
if(txtOff)txtOff.textContent="";
return;
}
var cd=getGeneratorCooldownMs();
var elapsed=Date.now()-lastClickTime;
var left=cd-elapsed;
if(left>0){
var secLeft=(left/1000).toFixed(1);
var txt=document.getElementById("tap-cooldown-text");
if(txt)txt.textContent="⌛ "+secLeft;
btn.classList.add("cooldown");btn.classList.remove("tap-ready");
}else{
btn.classList.remove("cooldown");btn.classList.add("tap-ready");
var txt2=document.getElementById("tap-cooldown-text");
if(txt2)txt2.textContent="";
}
},100);}

// === ВКЛАД ===
function getCurrentDepositEmoji(){if(!depositUnlocked||depositLevel<1)return "❓";var lvl=DEPOSIT_LEVELS[depositLevel-1];return lvl?lvl.emoji:"❓";}
function updateDepositSideButton(){
var btn=document.getElementById("deposit-side-btn");if(!btn)return;
btn.classList.remove("lvl-hungry","lvl-mid","lvl-happy","lvl-max");
if(!depositUnlocked){btn.textContent="❓";return;}
btn.textContent=getCurrentDepositEmoji();
if(depositLevel<=5)btn.classList.add("lvl-hungry");else if(depositLevel<=15)btn.classList.add("lvl-mid");else if(depositLevel<25)btn.classList.add("lvl-happy");else btn.classList.add("lvl-max");}
function renderDeposit(){
var content=document.getElementById("deposit-content");if(!content)return;
if(!depositUnlocked){
content.innerHTML='<div class="deposit-emoji">❓</div>'+'<div class="deposit-desc">Купите вклад за <b>1 Qa</b> монет, чтобы открыть смайлика.</div>'+'<div class="deposit-desc" style="color:#aaa;font-size:13px;">Смайлик будет расти с каждым вложением.</div>'+'<button id="deposit-buy-btn" class="deposit-btn" type="button">💰 Купить вклад за 1 Qa</button>';
var btn=document.getElementById("deposit-buy-btn");
if(btn){btn.disabled=coins<DEPOSIT_LEVELS[0].cost;btn.onclick=function(){if(coins<DEPOSIT_LEVELS[0].cost)return;coins-=DEPOSIT_LEVELS[0].cost;depositUnlocked=true;depositLevel=1;lastDepositTimeKey=getTimeKey();playSound("eat");renderDeposit();updateDepositSideButton();updateUI();saveGame();};}
return;}
var emoji=getCurrentDepositEmoji();var isHungry=depositLevel<=5;var isMax=depositLevel>=25;
var skinClass="";
if(smileSkinActive&&smileSkinUnlocked){skinClass=" skin-blood";if(depositLevel>=21)skinClass+=" gold-spark";}
var emojiHtml;
if(smileSkinActive&&smileSkinUnlocked){emojiHtml='<div class="deposit-emoji'+skinClass+(isHungry?' hungry':'')+'" id="deposit-emoji-el"><span class="emoji-inner">'+emoji+'</span></div>';}
else{emojiHtml='<div class="deposit-emoji'+(isHungry?' hungry':'')+'" id="deposit-emoji-el">'+emoji+'</div>';}
var html=emojiHtml;
html+='<div class="deposit-level">Уровень '+depositLevel+' / 25</div>';
if(isHungry)html+='<div class="deposit-warning">😭 Голодный! Ест 5M монет в секунду</div>';
else if(isMax)html+='<div class="deposit-happy">✨ Полный вклад! Смайлик сыт и доволен.</div>';
else html+='<div class="deposit-happy">Смайлик доволен</div>';
if(!isMax){var nextCost=DEPOSIT_LEVELS[depositLevel].cost;html+='<div class="deposit-desc">Следующий уровень: <b>'+formatNumber(nextCost)+'</b> монет</div>';html+='<button id="deposit-buy-btn" class="deposit-btn" type="button">💰 Вложить '+formatNumber(nextCost)+'</button>';}
else html+='<div class="deposit-desc" style="color:#4caf50;">Достигнут максимум!</div>';
content.innerHTML=html;
var btn2=document.getElementById("deposit-buy-btn");
if(btn2){var need=DEPOSIT_LEVELS[depositLevel].cost;btn2.disabled=coins<need;btn2.onclick=function(){if(coins<need)return;coins-=need;depositLevel++;lastDepositTimeKey=getTimeKey();playSound("eat");addQuestProgress("deposit",1);renderDeposit();updateDepositSideButton();updateUI();saveGame();};}
var emojiEl=document.getElementById("deposit-emoji-el");
if(emojiEl){emojiEl.style.cursor="pointer";emojiEl.onclick=bossEmojiClick;}}
function updateDepositHunger(){
if(!depositUnlocked){var hi=document.getElementById("hungry-info");if(hi)hi.style.display="none";return;}
if(depositLevel<=5){var hi2=document.getElementById("hungry-info");if(hi2)hi2.style.display="block";var eaten=Math.min(coins,DEPOSIT_HUNGRY_RATE);if(eaten>0)coins-=eaten;}
else{var hi3=document.getElementById("hungry-info");if(hi3)hi3.style.display="none";}}
function checkDepositDrop(){checkDepositTimeTick();}

// === БОСС ===
function setupBossSecret(){
var emoji=document.getElementById("boss-emoji");
if(emoji){emoji.onclick=function(){if(!bossActive)return;if(bossClickCooldown>0)return;bossClickCooldown=0.05;bossHP--;if(bossHP<0)bossHP=0;updateBossUI();emoji.classList.remove("hurt");void emoji.offsetWidth;emoji.classList.add("hurt");if(bossHP<=0)winBoss();};}
var startBtn=document.getElementById("boss-start");if(startBtn)startBtn.onclick=function(){startBoss();};}
function startBoss(){
bossActive=true;bossHP=bossMaxHP;bossTimeLeft=45.0;
document.getElementById("boss-result").textContent="";document.getElementById("boss-result").className="";
document.getElementById("boss-start").style.display="none";updateBossUI();
if(bossTimerInterval)clearInterval(bossTimerInterval);
bossTimerInterval=setInterval(function(){if(!bossActive)return;bossTimeLeft-=0.05;bossClickCooldown-=0.05;if(bossClickCooldown<0)bossClickCooldown=0;if(bossTimeLeft<=0){bossTimeLeft=0;loseBoss();}updateBossUI();},50);}
function updateBossUI(){
var fill=document.getElementById("boss-hp-fill"),text=document.getElementById("boss-hp-text"),timer=document.getElementById("boss-timer");
if(fill)fill.style.width=(bossHP/bossMaxHP*100)+"%";if(text)text.textContent=bossHP+" / "+bossMaxHP;if(timer)timer.textContent="⏱ "+bossTimeLeft.toFixed(1)+" с";}
function winBoss(){
bossActive=false;if(bossTimerInterval){clearInterval(bossTimerInterval);bossTimerInterval=null;}
var res=document.getElementById("boss-result");
if(!bossRewardClaimed){bossRewardClaimed=true;shards+=25;if(res){res.textContent="🏆 Победа! +25 🌑 кровавых осколков!";res.className="win";}}
else{if(res){res.textContent="🏆 Победа! (награда уже получена ранее)";res.className="win";}}
document.getElementById("boss-start").style.display="block";document.getElementById("boss-start").textContent="🔁 Ещё раз";
playSound("achievement");updateUI();saveGame();}
function loseBoss(){
bossActive=false;if(bossTimerInterval){clearInterval(bossTimerInterval);bossTimerInterval=null;}
var penalty=10000000000000000000;var lost=Math.min(coins,penalty);coins-=lost;
var res=document.getElementById("boss-result");if(res){res.textContent="💀 Провал! −"+formatNumber(lost)+" монет.";res.className="lose";}
document.getElementById("boss-start").style.display="block";document.getElementById("boss-start").textContent="🔁 Попробовать снова";
playSound("ui");updateUI();saveGame();}
function bossEmojiClick(){
bossClickCount++;if(bossClickTimer)clearTimeout(bossClickTimer);
bossClickTimer=setTimeout(function(){bossClickCount=0;},1500);
if(bossClickCount>=3){bossClickCount=0;openBossModal();}}
function openBossModal(){
var modal=document.getElementById("modal-boss");if(!modal)return;
var depositModal=document.getElementById("modal-deposit");if(depositModal)depositModal.classList.add("hidden");
bossActive=false;bossHP=bossMaxHP;bossTimeLeft=45.0;
document.getElementById("boss-result").textContent="";document.getElementById("boss-result").className="";
document.getElementById("boss-start").style.display="block";document.getElementById("boss-start").textContent="🔥 Начать бой";
updateBossUI();modal.classList.remove("hidden");syncScrollLock();playSound("boss");}

// === ТРЕВОГА ===
function resetAlarmTimer(){if(alarmTimeout)clearTimeout(alarmTimeout);alarmTimeout=setTimeout(triggerAlarm,ALARM_TIME);}
function triggerAlarm(){
if(alarmActive)return;alarmActive=true;alarmClicks=0;updateAlarmCounter();
var overlay=document.getElementById("alarm-overlay");if(overlay)overlay.classList.remove("hidden");
syncScrollLock();
if(alarmSound&&settings.sound){try{alarmSound.currentTime=0;alarmSound.play().catch(function(){});}catch(e){}}}
function stopAlarm(){
alarmActive=false;var overlay=document.getElementById("alarm-overlay");if(overlay)overlay.classList.add("hidden");
syncScrollLock();
if(alarmSound){try{alarmSound.pause();alarmSound.currentTime=0;}catch(e){}}
resetAlarmTimer();}
function updateAlarmCounter(){var c=document.getElementById("alarm-counter");if(c)c.textContent=alarmClicks+" / 5";}
function setupAlarm(){
var overlay=document.getElementById("alarm-overlay");if(!overlay)return;
overlay.onclick=function(){if(!alarmActive)return;alarmClicks++;updateAlarmCounter();playSound("ui");if(alarmClicks>=5)stopAlarm();};
resetAlarmTimer();}

// === НАГРАДА ===
function checkRewardTab(){
var tab=document.getElementById("tab-reward");if(!tab)return;
if(rewardClaimed){tab.classList.add("hidden");return;}
if(upgrades.clicker.count>=228){
if(!rewardTabShown){tab.classList.remove("hidden");rewardTabShown=true;
var popup=document.createElement("div");popup.className="achievement-popup";popup.textContent="🏅 Ты прокачал Кликер до 228! Открой вкладку «Награда»!";document.body.appendChild(popup);setTimeout(function(){popup.remove();},5000);
playSound("achievement");}}
else{tab.classList.add("hidden");rewardTabShown=false;}}
function claimReward(){
if(rewardClaimed)return;addCrystals(25);rewardClaimed=true;
var res=document.getElementById("reward-result");
if(res){res.textContent="🎉 Ты получил +25 🌑 кровавых осколков!";res.style.color="#4caf50";}
var btn=document.getElementById("reward-claim");if(btn){btn.disabled=true;btn.textContent="✅ Получено";}
playSound("achievement");updateUI();saveGame();
setTimeout(function(){var tab=document.getElementById("tab-reward");if(tab)tab.classList.add("hidden");var modal=document.getElementById("modal-reward");if(modal)modal.classList.add("hidden");syncScrollLock();},2000);}

// === КВЕСТЫ ===
function getTodayKey(){var d=new Date();if(d.getHours()<6)d.setDate(d.getDate()-1);return d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate();}
function generateQuests(){
var availableKeys=[];
for(var key in QUEST_TYPES){
if(key==="buy_skin"){var hasUnownedSkin=false;for(var sid in skins){if(!skins[sid].owned&&!skins[sid].special){hasUnownedSkin=true;break;}}if(!hasUnownedSkin)continue;}
if(key==="deposit_up"){if(depositLevel>=25)continue;}
if(key==="prestige_item"){var hasUnownedItem=false;for(var iid in ITEMS){var lv=ownedItems[iid]||0;if(typeof lv==="boolean")lv=lv?1:0;if(lv<ITEM_MAX_LEVEL){hasUnownedItem=true;break;}}if(!hasUnownedItem)continue;}
availableKeys.push(key);}
var chosen=[];
while(chosen.length<3&&availableKeys.length>0){var idx=Math.floor(Math.random()*availableKeys.length);chosen.push(availableKeys[idx]);availableKeys.splice(idx,1);}
quests=chosen;questsDate=getTodayKey();questsClaimed=0;questProgress={};
quests.forEach(function(id){questProgress[id]=0;});saveGame();}
function checkQuestsUpdate(){var today=getTodayKey();if(questsDate!==today)generateQuests();}
function addQuestProgress(statName,amount){
if(!quests||quests.length===0)return;
quests.forEach(function(id){var type=QUEST_TYPES[id];if(!type)return;if(type.stat!==statName)return;
var claimedKey="clicker-quest-claimed-"+questsDate+"-"+id;
try{if(localStorage.getItem(claimedKey)==="1")return;}catch(e){}
questProgress[id]=(questProgress[id]||0)+amount;});}
function isQuestClaimed(id){var claimedKey="clicker-quest-claimed-"+questsDate+"-"+id;try{return localStorage.getItem(claimedKey)==="1";}catch(e){return false;}}
function claimQuest(id){
var type=QUEST_TYPES[id];if(!type)return;if(isQuestClaimed(id))return;
var progress=questProgress[id]||0;if(progress<type.goal)return;
var claimedKey="clicker-quest-claimed-"+questsDate+"-"+id;try{localStorage.setItem(claimedKey,"1");}catch(e){}
if(type.rewardType==="💎")addCrystals(type.reward);
else if(type.rewardType==="🌑")shards+=type.reward;
else if(type.rewardType==="💰"){coins+=type.reward;totalEarned+=type.reward;}
playSound("achievement");renderQuests();updateUI();saveGame();}
function renderQuests(){
var list=document.getElementById("quests-list"),timerEl=document.getElementById("quests-timer");if(!list)return;
checkQuestsUpdate();
if(timerEl){var now=new Date();var reset=new Date();reset.setHours(6,0,0,0);if(now.getHours()>=6)reset.setDate(reset.getDate()+1);
var diffMs=reset-now;var hours=Math.floor(diffMs/(1000*60*60));var mins=Math.floor((diffMs%(1000*60*60))/(1000*60));
timerEl.textContent="⏰ Сброс через "+hours+" ч "+mins+" мин";}
list.innerHTML="";if(!quests||quests.length===0)generateQuests();
quests.forEach(function(id){
var type=QUEST_TYPES[id];if(!type)return;
var progress=questProgress[id]||0;var isClaimed=isQuestClaimed(id);var isDone=progress>=type.goal;
var classes="quest-card";if(isClaimed)classes+=" claimed";else if(isDone)classes+=" done";
var div=document.createElement("div");div.className=classes;
var percent=Math.min(100,(progress/type.goal)*100);var rewardText="Награда: "+type.reward+" "+type.rewardType;
var buttonHtml="";
if(isClaimed)buttonHtml='<div class="quest-claimed-label">✅ Получено</div>';
else if(isDone)buttonHtml='<button class="quest-claim-btn" data-id="'+id+'">🎁 Забрать награду</button>';
else buttonHtml='<button class="quest-claim-btn" disabled>Ещё не выполнено</button>';
div.innerHTML='<div class="quest-header">'+'<div class="quest-icon">'+type.icon+'</div>'+'<div class="quest-name">'+type.name+'</div>'+'<div class="quest-progress-text">'+formatNumber(progress)+" / "+formatNumber(type.goal)+'</div>'+'</div>'+'<div class="quest-progress-bar">'+'<div class="quest-progress-fill" style="width:'+percent+'%"></div>'+'</div>'+'<div class="quest-reward">'+rewardText+'</div>'+buttonHtml;
list.appendChild(div);});
document.querySelectorAll(".quest-claim-btn").forEach(function(btn){btn.onclick=function(){var id=btn.dataset.id;if(id)claimQuest(id);};});}

// === ЛИДЕРБОРД ===
function submitLeaderboardScore(){
var submitBtn=document.getElementById("leader-submit");if(!submitBtn)return;
if(!db){alert("❌ Лидерборд не подключён.");return;}
if(!hasProfile()){alert("❌ Сначала задай ник в профиле!");showProfileModal();return;}
ensureProfileId();
var name=profile.nickname;
var score=Math.floor(totalEarned);
var entryId=profile.id;
submitBtn.disabled=true;submitBtn.textContent="Отправка...";
db.ref("leaderboard/"+entryId).set({name:name,score:score,id:entryId,timestamp:Date.now()}).then(function(){
alert("✅ Рекорд отправлен!\n\nНик: "+name+"\nID: "+entryId+"\nОчки: "+formatNumber(score));
submitBtn.disabled=false;submitBtn.textContent="📤 Отправить рекорд";loadLeaderboard();
}).catch(function(err){alert("❌ Ошибка: "+err.message);submitBtn.disabled=false;submitBtn.textContent="📤 Отправить рекорд";});}
function loadLeaderboard(){
var list=document.getElementById("leaders-list");if(!list)return;
if(!db){list.innerHTML='<p style="text-align:center;color:#ff5252;padding:20px;">Лидерборд не подключён</p>';return;}
list.innerHTML='<p class="leaders-loading">Загрузка...</p>';
db.ref("leaderboard").orderByChild("score").limitToLast(25).once("value").then(function(snapshot){
var entries=[];snapshot.forEach(function(cs){var data=cs.val();entries.push({name:data.name||"Аноним",score:data.score||0,id:data.id||""});});
if(entries.length===0){list.innerHTML='<p style="text-align:center;color:#aaa;padding:20px;">Пока нет рекордов. Будь первым! 🏆</p>';return;}
entries.sort(function(a,b){return b.score-a.score;});
if(hasProfile()&&profile.id){
var myRank=-1;
for(var ri=0;ri<entries.length;ri++){if(entries[ri].id===profile.id){myRank=ri+1;break;}}
if(myRank>=1&&myRank<=3){
var key="leader_top"+myRank;
if(!unlocked[key]){unlocked[key]=true;checkAchievements();saveGame();}
}
}
var html="";var medals=["🥇","🥈","🥉"];
entries.slice(0,25).forEach(function(entry,index){
var rank=index+1;var rankClass=rank<=3?" rank-"+rank:"";var medal=rank<=3?medals[rank-1]:rank;
var displayName=entry.name;
if(entry.id){displayName=entry.name+" ("+entry.id+")";}
html+='<div class="leader-row'+rankClass+'">'+'<div class="leader-rank">'+medal+'</div>'+'<div class="leader-name">'+escapeHtml(displayName)+'</div>'+'<div class="leader-score">'+formatNumber(entry.score)+'</div>'+'</div>';
});
list.innerHTML=html;}).catch(function(err){list.innerHTML='<p style="text-align:center;color:#ff5252;padding:20px;">Ошибка загрузки: '+err.message+'</p>';});}
function escapeHtml(text){var div=document.createElement("div");div.textContent=text;return div.innerHTML;}

// === КОЛЕСО ФОРТУНЫ ===
function getTodayKeyWheel(){var d=new Date();return d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate();}
function checkWheelReset(){
var today=getTodayKeyWheel();
if(wheelLastResetDay!==today){wheelFreeUsed=false;wheelPaidUsed=false;wheelLastResetDay=today;}
}
function renderWheel(){
checkWheelReset();
var rotor=document.getElementById("wheel-rotor");
if(rotor&&!rotor.hasChildNodes()){
var R=140,cx=150,cy=150;
for(var i=0;i<12;i++){
var a1=(Math.PI*2/12)*i-Math.PI/2;
var a2=(Math.PI*2/12)*(i+1)-Math.PI/2;
var x1=cx+R*Math.cos(a1),y1=cy+R*Math.sin(a1);
var x2=cx+R*Math.cos(a2),y2=cy+R*Math.sin(a2);
var colors=["#4caf50","#4fc3f7","#9c27b0","#4caf50","#666","#4fc3f7","#4caf50","#9c27b0","#b71c1c","#4fc3f7","#b71c1c","#b71c1c"];
var path=document.createElementNS("http://www.w3.org/2000/svg","path");
path.setAttribute("d","M "+cx+" "+cy+" L "+x1+" "+y1+" A "+R+" "+R+" 0 0 1 "+x2+" "+y2+" Z");
path.setAttribute("fill",colors[i]);
path.setAttribute("stroke","#16213e");
path.setAttribute("stroke-width","2");
rotor.appendChild(path);
var midA=(a1+a2)/2;
var tx=cx+(R*0.65)*Math.cos(midA),ty=cy+(R*0.65)*Math.sin(midA);
var txt=document.createElementNS("http://www.w3.org/2000/svg","text");
txt.setAttribute("x",tx);txt.setAttribute("y",ty);
txt.setAttribute("text-anchor","middle");txt.setAttribute("dominant-baseline","middle");
txt.setAttribute("fill","#fff");txt.setAttribute("font-size","10");txt.setAttribute("font-weight","bold");
txt.textContent=WHEEL_SECTORS[i].label;
rotor.appendChild(txt);
}
}
var freeBtn=document.getElementById("wheel-spin-free");
var paidBtn=document.getElementById("wheel-spin-paid");
if(freeBtn){
if(wheelFreeUsed){freeBtn.disabled=true;freeBtn.textContent="🎁 Завтра";}
else{freeBtn.disabled=false;freeBtn.textContent="🎁 Крутить бесплатно";}
}
if(paidBtn){
if(wheelFreeUsed&&!wheelPaidUsed){
var price=getWheelPrice();
paidBtn.disabled=false;
paidBtn.textContent="💰 Крутить за "+price.text;
paidBtn.dataset.priceKey=price.key;
}
else if(!wheelFreeUsed){paidBtn.disabled=true;paidBtn.textContent="💰 Сначала бесплатный";}
else{paidBtn.disabled=true;paidBtn.textContent="💰 Завтра";}
}
var timerEl=document.getElementById("wheel-timer");
if(timerEl){
if(wheelFreeUsed&&wheelPaidUsed){timerEl.textContent="Следующие спины — завтра в 9:00";}
else if(!wheelFreeUsed){timerEl.textContent="1 бесплатный + 1 платный спин в день";}
else{timerEl.textContent="Доступен платный спин";}
}
}
function getWheelPrice(){
if(coins<1e18)return {key:"qa",text:"1 Qa",value:1e15};
if(coins<1e21)return {key:"qi",text:"1 Qi",value:1e18};
return {key:"sx",text:"1 Sx",value:1e21};
}
function openWheel(){
var overlay=document.getElementById("wheel-overlay");if(!overlay)return;
document.getElementById("wheel-result").textContent="";
renderWheel();
overlay.classList.remove("hidden");
syncScrollLock();
}
function closeWheel(){
var overlay=document.getElementById("wheel-overlay");if(overlay)overlay.classList.add("hidden");
syncScrollLock();
}
function spinWheel(isFree){
if(wheelSpinning)return;
var price;
if(!isFree){
checkWheelReset();
if(!wheelFreeUsed){alert("Сначала используй бесплатный спин!");return;}
if(wheelPaidUsed){alert("Платный спин уже использован!");return;}
price=getWheelPrice();
if(coins<price.value){alert("Недостаточно монет!\nНужно: "+price.text);return;}
coins-=price.value;
wheelPaidUsed=true;
}else{
checkWheelReset();
if(wheelFreeUsed){alert("Бесплатный спин уже использован!");return;}
wheelFreeUsed=true;
}
wheelSpinning=true;
if(!unlocked.wheel_first){unlocked.wheel_first=true;checkAchievements();}
var sectorIdx=Math.floor(Math.random()*12);
var rotor=document.getElementById("wheel-rotor");
if(!rotor){wheelSpinning=false;return;}
var sectorAngle=360/12;
// sectorIdx=0 рисуется от -90° (сверху), значит чтобы показать его — поворот 0
// сдвиг +15° (sectorAngle/2) чтобы стрелка попала в центр
var targetRotation=-sectorIdx*sectorAngle+sectorAngle/2;
var totalRotation=360*5+((targetRotation%360)+360)%360;
var currentRot=window.__wheelRot||0;
var fullRot=currentRot+totalRotation;
window.__wheelRot=fullRot;
rotor.style.transition="transform 5s cubic-bezier(.17,.67,.3,1)";
rotor.style.transformOrigin="150px 150px";
rotor.style.transform="rotate("+fullRot+"deg)";
playSound("ui");
setTimeout(function(){
var sector=WHEEL_SECTORS[sectorIdx];
applyWheelReward(sector);
wheelSpinning=false;
renderWheel();
saveGame();
},5100);
}
function applyWheelReward(sector){
var resultEl=document.getElementById("wheel-result");
var text="";
if(sector.type==="coins"){
var gain=Math.floor(coins*sector.value);
if(sector.value<0){gain=Math.floor(coins*Math.abs(sector.value));coins=Math.max(0,coins-gain);text="💀 Потеряно "+formatNumber(gain)+" монет!";}
else{coins+=gain;totalEarned+=gain;text="💰 Получено "+formatNumber(gain)+" монет!";}
}else if(sector.type==="gems"){
addCrystals(sector.value);text="💎 +"+sector.value+" кристаллов!";
}else if(sector.type==="shards"){
shards+=sector.value;text="🌑 +"+sector.value+" осколков!";
}else if(sector.type==="negGems"){
var lost=Math.min(crystals,Math.abs(sector.value));crystals-=lost;text="💀 −"+lost+" кристаллов!";
}else if(sector.type==="negShards"){
var lostS=Math.min(shards,Math.abs(sector.value));shards-=lostS;text="💀 −"+lostS+" осколков!";
}else if(sector.type==="negCoins"){
var lostC=Math.floor(coins*Math.abs(sector.value));coins=Math.max(0,coins-lostC);text="💀 −"+formatNumber(lostC)+" монет!";
}else{text="❌ Пусто. В следующий раз повезёт!";}
if(resultEl)resultEl.textContent=text;
playSound(sector.type==="empty"?"ui":"achievement");
updateUI();
}

// === ГЛОБАЛЬНЫЕ УЛУЧШЕНИЯ ===
function renderGlobalShop(){
var list=document.getElementById("global-shop-list");if(!list){console.warn("global-shop-list не найден");return;}
list.innerHTML="";
for(var id in globalUpgrades){
var gu=globalUpgrades[id];
var isMax=gu.count>=gu.maxLevel;
var div=document.createElement("div");
div.className="item";
var nextCost=isMax?"—":formatNumber(gu.cost);
var btnHtml=isMax
?'<button class="buy" disabled style="background:#4caf50;color:#fff">✓ Максимум</button>'
:'<button class="buy" data-gid="'+id+'">Купить: '+nextCost+'</button>';
div.innerHTML='<div class="info">'+'<div class="name">'+gu.name+'</div>'+'<div class="desc">'+gu.desc+'</div>'+'<div class="owned">Уровень: <span id="gowned-'+id+'">'+gu.count+'</span> / '+gu.maxLevel+'</div>'+'</div>'+'<div class="right">'+btnHtml+'</div>';
list.appendChild(div);
}
document.querySelectorAll(".buy[data-gid]").forEach(function(btn){
btn.onclick=function(){
var id=btn.dataset.gid;var gu=globalUpgrades[id];if(!gu)return;
if(gu.count>=gu.maxLevel)return;
if(coins>=gu.cost){
coins-=gu.cost;gu.count++;
gu.cost=Math.floor(gu.baseCost*Math.pow(GLOBAL_UPGRADE_COST_MULT,gu.count));
playSound("ui");updateUI();renderGlobalShop();checkAchievements();saveGame();
}
};
});
}
function updateGlobalShopUI(){
for(var id in globalUpgrades){
var gu=globalUpgrades[id];
var el=document.getElementById("gowned-"+id);
if(el)el.textContent=gu.count;
var btn=document.querySelector('.buy[data-gid="'+id+'"]');
if(btn){
if(gu.count>=gu.maxLevel){btn.disabled=true;btn.textContent="✓ Максимум";btn.style.background="#4caf50";btn.style.color="#fff";}
else{btn.disabled=coins<gu.cost;}
}
}
  }
// === ГУЛАУ ===
function startGulau(){gulauActive=true;gulauTimer=15*60;document.getElementById("gulau-info").style.display="block";updateGulauTimer();}
function updateGulauTimer(){var el=document.getElementById("gulau-timer");if(el&&gulauActive){var m=Math.floor(gulauTimer/60);var s=gulauTimer%60;el.textContent=m+":"+(s<10?"0":"")+s;}}
function endGulau(){gulauActive=false;gulauTimer=0;document.getElementById("gulau-info").style.display="none";}

// === ЭКСПОРТ/ИМПОРТ ===
function exportSave(){
try{var raw=localStorage.getItem(SAVE_KEY);if(!raw){alert("Нет сохранения для экспорта.");return;}
var data=JSON.parse(raw);data.exportDate=Date.now();var json=JSON.stringify(data);var encoded=btoa(unescape(encodeURIComponent(json)));
var box=document.getElementById("export-box"),text=document.getElementById("export-text");
if(box&&text){text.value=encoded;box.classList.remove("hidden");}}catch(e){alert("Ошибка экспорта: "+e.message);}}
function copyExport(){
var text=document.getElementById("export-text");if(!text)return;text.select();text.setSelectionRange(0,999999);
try{document.execCommand("copy");alert("✅ Скопировано!");}catch(e){try{navigator.clipboard.writeText(text.value);alert("✅ Скопировано!");}catch(err){alert("Не удалось скопировать. Выделите текст и скопируйте вручную.");}}}
function importSave(){
var text=document.getElementById("import-text"),result=document.getElementById("import-result");if(!text||!result)return;
var code=text.value.trim();result.className="";
if(!code){result.textContent="Вставьте код сохранения.";result.classList.add("error");return;}
try{var json=decodeURIComponent(escape(atob(code)));var data=JSON.parse(json);
if(!data||typeof data.coins==="undefined")throw new Error("Неверный формат");
if(!confirm("⚠️ Текущий прогресс будет заменён.\nПродолжить?"))return;
window.__resetting=true;localStorage.setItem(SAVE_KEY,json);result.textContent="✅ Прогресс загружен! Перезагрузка...";result.classList.add("success");
setTimeout(function(){location.reload();},800);}catch(e){result.textContent="❌ Ошибка: "+e.message;result.classList.add("error");}}

// === ЕЖЕДНЕВНЫЙ БОНУС ===
function checkDailyBonus(){
if(!settings.showDaily)return;var last=localStorage.getItem("lastDaily");var streak=parseInt(localStorage.getItem("dailyStreak")||"0");var now=Date.now();var oneDay=24*60*60*1000;
if(!last||now-parseInt(last)>=oneDay){
if(last&&now-parseInt(last)>2*oneDay)streak=0;
streak+=1;var bonus=Math.max(100,Math.floor(getCPS()*60));coins+=bonus;totalEarned+=bonus;
var text="🎁 Ежедневный бонус (день "+streak+"): "+formatNumber(bonus)+" монет!";
if(streak%7===0){addCrystals(5);text+="\n💎 +5 кристаллов за серию 7 дней!";}
localStorage.setItem("lastDaily",now.toString());localStorage.setItem("dailyStreak",streak.toString());
setTimeout(function(){alert(text);updateUI();},500);}}

// === ИВЕНТЫ ===
var EVENTS={
rain:{name:"💰 Монетный дождь",mult:1.5,duration:180,color:"#4caf50"},
storm:{name:"⚡ Молниеносный потенциал",mult:1.8,duration:120,color:"#ffc107"},
fast:{name:"🏃 Быстрый способ",mult:1.3,duration:300,color:"#2196f3"},
income:{name:"💵 Заработок",mult:1.2,duration:240,color:"#9c27b0"}};
var lastEventKey=localStorage.getItem("lastEventKey")||"";
function getQuarterKey(){var d=new Date();var q=Math.floor(d.getMinutes()/15)*15;return d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate()+"-"+d.getHours()+"-"+q;}
function startRandomEvent(){
var keys=Object.keys(EVENTS);var key=keys[Math.floor(Math.random()*keys.length)];var ev=EVENTS[key];
currentEventKey=key;eventMultiplier=ev.mult;eventTimer=ev.duration;eventName=ev.name;
var banner=document.getElementById("event-banner");
if(banner){banner.textContent=ev.name+" x"+ev.mult;banner.style.background="linear-gradient(135deg, "+ev.color+", #000)";banner.classList.remove("hidden");}
playSound("ui");updateUI();saveGame();}
function endEvent(){eventTimer=0;eventMultiplier=1;eventName="";currentEventKey="";var banner=document.getElementById("event-banner");if(banner)banner.classList.add("hidden");updateUI();saveGame();}
function updateEvent(){
var now=new Date();var mins=now.getMinutes();var secs=now.getSeconds();var currentKey=getQuarterKey();
var isStartOfQuarter=(mins%15===0)&&(secs<5);
if(isStartOfQuarter&&lastEventKey!==currentKey){lastEventKey=currentKey;localStorage.setItem("lastEventKey",lastEventKey);startRandomEvent();return;}
if(eventTimer>0){eventTimer--;if(eventTimer<=0){endEvent();return;}
var banner=document.getElementById("event-banner");
if(banner){var ev=EVENTS[currentEventKey];if(ev){var m=Math.floor(eventTimer/60);var s=eventTimer%60;banner.textContent=ev.name+" x"+ev.mult+" — "+m+":"+(s<10?"0":"")+s;}}}}

// === КРОВАВАЯ ЛУНА ===
function isBloodMoonTime(){var d=new Date();var mins=d.getMinutes();var h=d.getHours();return (h%3===0)&&(mins<30);}
function startBloodMoon(){
bloodMoonActive=true;var d=new Date();var mins=d.getMinutes();var secs=d.getSeconds();bloodMoonTimer=(30-mins)*60-secs;
document.body.classList.add("blood-moon");document.getElementById("blood-info").style.display="block";
var banner=document.createElement("div");banner.className="blood-banner";banner.innerHTML="🌕 КРОВАВАЯ ЛУНА 🌕<br>Доход x2!";banner.id="blood-banner";
document.body.appendChild(banner);setTimeout(function(){var b=document.getElementById("blood-banner");if(b)b.remove();},5000);
playSound("ui");updateUI();}
function endBloodMoon(){
bloodMoonActive=false;bloodMoonTimer=0;document.body.classList.remove("blood-moon");document.getElementById("blood-info").style.display="none";
var b=document.getElementById("blood-banner");if(b)b.remove();}
function updateBloodMoon(){
var inTime=isBloodMoonTime();
if(inTime&&!bloodMoonActive)startBloodMoon();
if(!inTime&&bloodMoonActive)endBloodMoon();
if(bloodMoonActive){var d=new Date();var mins=d.getMinutes();var secs=d.getSeconds();bloodMoonTimer=(30-mins)*60-secs;
var timerEl=document.getElementById("blood-timer");
if(timerEl){var m=Math.floor(bloodMoonTimer/60);var s=bloodMoonTimer%60;timerEl.textContent=m+":"+(s<10?"0":"")+s;}}}

// === ИВЕНТ «КРАЖА» ===
function getTheftKey(){
var d=new Date();
return d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate()+"-"+d.getHours();
}
function isTheftTime(){
var d=new Date();
var h=d.getHours();
var m=d.getMinutes();
return (h===11||h===19)&&(m<10);
}
function saveTheftState(){
try{localStorage.setItem("clicker-theft-state",JSON.stringify({active:theftActive,timer:theftTimer,lost:theftTotalLost,key:lastTheftKey}));}catch(e){}
}
function clearTheftState(){
try{localStorage.removeItem("clicker-theft-state");}catch(e){}
}
function loadTheftState(){
try{
var raw=localStorage.getItem("clicker-theft-state");
if(!raw)return false;
var data=JSON.parse(raw);
if(!data||!data.active)return false;
if(data.key!==getTheftKey()){clearTheftState();return false;}
if(data.timer<=0){clearTheftState();return false;}
startTheft(data.timer,data.lost||0);
return true;
}catch(e){return false;}
}
function startTheft(resumeTimer,resumeLost){
if(theftActive)return;
theftActive=true;
theftTotalLost=resumeLost||0;
theftTimer=(typeof resumeTimer==="number"&&resumeTimer>0)?resumeTimer:THEFT_DURATION;
if(theftTickTimer)clearInterval(theftTickTimer);
theftTickTimer=setInterval(function(){
if(!theftActive)return;
theftTimer--;
if(theftTimer<=0){endTheft();return;}
if(theftTimer%THEFT_TICK_INTERVAL===0){
var lost=Math.floor(coins*THEFT_PERCENT);
if(lost>0){
coins-=lost;
theftTotalLost+=lost;
showTheftLossPopup(lost);
updateUI();
saveTheftState();
}
}
updateTheftBanner();
},1000);
var banner=document.getElementById("theft-banner");
if(!banner){
banner=document.createElement("div");
banner.id="theft-banner";
banner.className="blood-banner";
banner.style.background="linear-gradient(135deg,#4a0000,#8b0000,#b71c1c)";
banner.style.top="auto";
banner.style.bottom="20px";
banner.innerHTML="🚨 КРАЖА! 🚨<br><span id='theft-timer-txt'>10:00</span> · Украдено: <span id='theft-lost-txt'>0</span>";
document.body.appendChild(banner);
}
if(!resumeTimer){
playSound("alarm");
var popup=document.createElement("div");
popup.className="achievement-popup";
popup.style.background="linear-gradient(135deg,#8b0000,#b71c1c)";
popup.style.color="#fff";
popup.textContent="🚨 Ивент «КРАЖА» начался! Потеряно будет ~22% монет.";
document.body.appendChild(popup);
setTimeout(function(){popup.remove();},5000);
}
saveTheftState();
}
function endTheft(){
theftActive=false;
if(theftTickTimer){clearInterval(theftTickTimer);theftTickTimer=null;}
clearTheftState();
var banner=document.getElementById("theft-banner");
if(banner)banner.remove();
var popup=document.createElement("div");
popup.className="achievement-popup";
popup.style.background="linear-gradient(135deg,#4a0000,#b71c1c)";
popup.style.color="#fff";
popup.textContent="🚨 Кража закончилась. Всего украдено: "+formatNumber(theftTotalLost)+" монет";
document.body.appendChild(popup);
setTimeout(function(){popup.remove();},6000);
theftTotalLost=0;
updateUI();
saveGame();
}
function updateTheftBanner(){
var t=document.getElementById("theft-timer-txt");
var l=document.getElementById("theft-lost-txt");
if(t){
var m=Math.floor(theftTimer/60);
var s=theftTimer%60;
t.textContent=m+":"+(s<10?"0":"")+s;
}
if(l)l.textContent=formatNumber(theftTotalLost);
}
function showTheftLossPopup(amount){
var popup=document.createElement("div");
popup.className="achievement-popup";
popup.style.background="linear-gradient(135deg,#4a0000,#b71c1c)";
popup.style.color="#fff";
popup.style.top="60px";
popup.style.left="auto";
popup.style.right="20px";
popup.style.transform="none";
popup.textContent="🚨 −"+formatNumber(amount);
document.body.appendChild(popup);
setTimeout(function(){popup.remove();},2500);
}
function updateTheft(){
var inTime=isTheftTime();
if(inTime&&!theftActive){
var key=getTheftKey();
if(key!==lastTheftKey){
lastTheftKey=key;
startTheft();
}
}
if(!inTime&&theftActive)endTheft();
}
function restoreTheftIfNeeded(){
if(theftRestored)return;
theftRestored=true;
loadTheftState();
}

// === ПРОМОКОДЫ ===
var PROMOS={
"BLOOD":{reward:function(){shards+=10;return "🌑 +10 кровавых осколков!";}},
"CRYSTAL":{reward:function(){addCrystals(20);return "💎 +20 кристаллов!";}},
"GOLD2024":{reward:function(){coins+=100000;totalEarned+=100000;return "💰 +100 000 монет!";}},
"SECRET":{reward:function(){skins.ruby.owned=true;saveSkins();renderSkins();return "🔴 Открыт скин «Рубиновый»!";}},
"ARTEM":{reward:function(){addCrystals(50);shards+=5;return "💎 +50 кристаллов и 🌑 +5 осколков!";}},
"#GULAU":{reward:function(){startGulau();return "🔥 #Gulau активирован! ×5 тапов на 15 минут!";}},
"CHEST":{reward:function(){resetChestCooldown();return "🎁 Сундук снова доступен!";}},
"#PAHAN":{reward:function(){unlockPahan();return "🔥 Автокликер от Pahi разблокирован! Смотри в Настройках.";}},
"COINS":{reward:function(){coins+=1000000;totalEarned+=1000000;return "💰 +1 000 000 монет!";}},
"MONEY":{reward:function(){coins+=100000000;totalEarned+=100000000;return "💰 +100 000 000 монет!";}},
"GOLD":{reward:function(){coins+=1000000000;totalEarned+=1000000000;return "💰 +1 000 000 000 монет!";}},
"GEMS":{reward:function(){addCrystals(25);return "💎 +25 кристаллов!";}},
"DIAMOND":{reward:function(){addCrystals(50);return "💎 +50 кристаллов!";}},
"BLOOD2":{reward:function(){shards+=15;return "🌑 +15 кровавых осколков!";}},
"SHARDS":{reward:function(){shards+=30;return "🌑 +30 кровавых осколков!";}},
"LEGEND":{reward:function(){coins+=10000000;totalEarned+=10000000;addCrystals(10);shards+=5;return "🏆 +10M монет, +10 💎, +5 🌑!";}},
"SMILE":{reward:function(){smileSkinUnlocked=true;smileSkinActive=true;renderSmileSkins();updateDepositSideButton();var modal=document.getElementById("modal-deposit");if(modal&&!modal.classList.contains("hidden"))renderDeposit();return "🎭 Скин смайлика вклада открыт и активирован!";}},
"#GENNADII":{reward:function(){skins.gennadii.owned=true;saveSkins();renderSkins();return "🔥 Открыт эксклюзивный скин кнопки «GENNADII»!";}},
"KROCHLUPIC":{reward:function(){var amount=3.5e27;coins+=amount;totalEarned+=amount;return "💰 +3.5 Oc монет!";}},
"SUPERKROCH":{reward:function(){var amount=4.5e30;coins+=amount;totalEarned+=amount;return "💰 +4.5 No монет!";}}};
function activatePromo(){
var input=document.getElementById("promo-input"),result=document.getElementById("promo-result");if(!input||!result)return;
var code=input.value.trim().toUpperCase();result.className="";
if(!code){result.textContent="Введите код.";result.classList.add("error");return;}
if(usedPromos[code]){result.textContent="Этот код уже использован.";result.classList.add("error");return;}
if(!PROMOS[code]){result.textContent="Неверный код.";result.classList.add("error");return;}
var text=PROMOS[code].reward();usedPromos[code]=true;result.textContent=text;result.classList.add("success");input.value="";
playSound("achievement");updateUI();renderSkins();saveGame();}

// === PAHAN ===
function unlockPahan(){pahanUnlocked=true;updatePahanButton();saveGame();}
function updatePahanButton(){var btn=document.getElementById("pahan-btn");if(!btn)return;if(!pahanUnlocked)btn.classList.add("hidden");else btn.classList.remove("hidden");}
function activatePahan(){
if(!pahanUnlocked)return;if(pahanActive)return;
pahanActive=true;pahanTimer=PAHAN_DURATION;
var btn=document.getElementById("pahan-btn");if(btn){btn.classList.add("hidden");btn.disabled=true;}
playSound("achievement");
var popup=document.createElement("div");popup.className="achievement-popup";popup.textContent="🔥 Автокликер от Pahi запущен на 10 секунд!";
document.body.appendChild(popup);setTimeout(function(){popup.remove();},3000);
if(pahanTickInterval)clearInterval(pahanTickInterval);
pahanTickInterval=setInterval(function(){if(!pahanActive)return;coins+=PAHAN_REWARD_PER_TAP;totalEarned+=PAHAN_REWARD_PER_TAP;totalTaps+=1;addQuestProgress("taps",1);addQuestProgress("earn",PAHAN_REWARD_PER_TAP);updateUI();},500);
if(pahanTimerInterval)clearInterval(pahanTimerInterval);
pahanTimerInterval=setInterval(function(){if(!pahanActive){clearInterval(pahanTimerInterval);pahanTimerInterval=null;return;}pahanTimer--;
if(pahanTimer<=0){clearInterval(pahanTimerInterval);pahanTimerInterval=null;stopPahan();}},1000);}
function stopPahan(){
pahanActive=false;pahanTimer=0;
if(pahanTickInterval){clearInterval(pahanTickInterval);pahanTickInterval=null;}
if(pahanTimerInterval){clearInterval(pahanTimerInterval);pahanTimerInterval=null;}
pahanUnlocked=false;updatePahanButton();
var popup=document.createElement("div");popup.className="achievement-popup";popup.textContent="⏸️ Pahan остановлен. Автокликер использован.";
document.body.appendChild(popup);setTimeout(function(){popup.remove();},2500);
saveGame();}

// === ЛОГО-СЕКРЕТ ===
function setupLogoSecret(){
var logo=document.getElementById("logo");if(!logo)return;
logo.onclick=function(){
if(Date.now()<logoCooldown)return;logoClicks++;
if(logoClickTimer)clearTimeout(logoClickTimer);
logoClickTimer=setTimeout(function(){logoClicks=0;},1500);
if(logoClicks>=7){logoClicks=0;logoCooldown=Date.now()+10*60*1000;shards+=5;addCrystals(1);
logo.style.transition="transform 0.3s, color 0.3s";logo.style.transform="scale(1.2)";logo.style.color="#ff1744";
setTimeout(function(){logo.style.transform="scale(1)";logo.style.color="";},400);
var popup=document.createElement("div");popup.className="achievement-popup";popup.textContent="🌑 Секрет активирован! +5 осколков, +1 кристалл";
document.body.appendChild(popup);setTimeout(function(){popup.remove();},3000);
playSound("achievement");updateUI();saveGame();}};}

// === КЛИКЕР 67 ===
var SECRET_TAPS_NEEDED=6767,SECRET_ACTIVATION_COST=67000000000000000000;
function setupAdvancedButton(){
var btn=document.getElementById("advanced-btn");if(!btn)return;
btn.onclick=function(){
var sure=confirm("⚠️ Уверены, что хотите это видеть?");if(!sure)return;
var reallySure=confirm("⚠️⚠️ Точно?");if(!reallySure)return;openSecretMenu();};}
function openSecretMenu(){
var modal=document.getElementById("modal-secret");if(!modal)return;
var sm=document.getElementById("modal-settings");if(sm)sm.classList.add("hidden");
updateSecretUI();modal.classList.remove("hidden");syncScrollLock();}
function updateSecretUI(){
var locked=document.getElementById("secret-locked"),unlockedEl=document.getElementById("secret-unlocked"),tapsEl=document.getElementById("secret-taps"),progressEl=document.getElementById("secret-progress"),toggleBtn=document.getElementById("secret-toggle"),statusEl=document.getElementById("secret-status");
if(!locked||!unlockedEl)return;
if(secretUnlocked){locked.style.display="none";unlockedEl.style.display="block";
if(secretAutoClicker){toggleBtn.textContent="🔥 Активировать ещё (67 Qa)";toggleBtn.classList.remove("secret-on");toggleBtn.classList.add("secret-off");toggleBtn.disabled=true;
var m=Math.floor(secretAutoClickerTimer/60);var s=secretAutoClickerTimer%60;
statusEl.textContent="🔥 Автокликер активен — 67 кликов/сек. Осталось: "+m+":"+(s<10?"0":"")+s;statusEl.style.color="#4caf50";}
else{toggleBtn.textContent="🔥 Активировать (67 Qa)";toggleBtn.classList.remove("secret-off");toggleBtn.classList.add("secret-on");
toggleBtn.disabled=coins<SECRET_ACTIVATION_COST;statusEl.textContent="Разблокирован. Активация: 67 Qa за 30 минут.";statusEl.style.color="#aaa";}}
else{locked.style.display="block";unlockedEl.style.display="none";
if(tapsEl)tapsEl.textContent=formatNumber(totalTaps);
var percent=Math.min(100,(totalTaps/SECRET_TAPS_NEEDED)*100);
if(progressEl)progressEl.style.width=percent+"%";}}
function tryUnlockSecret(){
if(secretUnlocked)return;
if(totalTaps<SECRET_TAPS_NEEDED){var left=SECRET_TAPS_NEEDED-totalTaps;alert("❌ Ещё рано!\nНужно сделать "+formatNumber(SECRET_TAPS_NEEDED)+" тапов.\nОсталось: "+formatNumber(left));return;}
secretUnlocked=true;playSound("achievement");
var popup=document.createElement("div");popup.className="achievement-popup";popup.textContent="🔥 Кликер 67 разблокирован!";
document.body.appendChild(popup);setTimeout(function(){popup.remove();},4000);
updateSecretUI();saveGame();}
function activateSecretAutoClicker(){
if(!secretUnlocked)return;if(secretAutoClicker)return;
if(coins<SECRET_ACTIVATION_COST){alert("❌ Недостаточно монет!\nНужно: 67 Qa\nУ вас: "+formatNumber(coins));return;}
coins-=SECRET_ACTIVATION_COST;secretAutoClicker=true;secretAutoClickerTimer=30*60;
startSecretAutoClicker();playSound("achievement");updateSecretUI();updateUI();saveGame();}
function startSecretAutoClicker(){
if(secretClickerInterval)return;
secretClickerInterval=setInterval(function(){
if(!checkTapLimit())return;
var value=getClickValue();var add=value*2;coins+=add;totalEarned+=add;
var tapsToAdd=gulauActive?10:2;totalTaps+=tapsToAdd;
if(bloodMoonActive&&Math.random()<0.02)shards+=1;
updateUI();},30);}
function stopSecretAutoClicker(){
if(secretClickerInterval){clearInterval(secretClickerInterval);secretClickerInterval=null;}
secretAutoClicker=false;secretAutoClickerTimer=0;}

// === УТИЛИТЫ ===
function formatTime(seconds){
if(seconds<60)return seconds+" с";
if(seconds<3600)return Math.floor(seconds/60)+" мин";
var h=Math.floor(seconds/3600);var m=Math.floor((seconds%3600)/60);return h+" ч "+m+" мин";}
function getCPS(){
var cps=0;
for(var id in upgrades){if(upgrades[id].effect==="auto"){cps+=upgrades[id].count*upgrades[id].amount;}}
var moonBonus=bloodMoonActive?2:1;
return cps*goldenMultiplier*moonBonus*eventMultiplier*crystalBoostMultiplier*getItemBonus();}
function getClickValue(){
var base=coinsPerClick+getCPS()*0.05+globalUpgrades.superClicker.count;
var moonBonus=bloodMoonActive?2:1;
return base*goldenMultiplier*moonBonus*eventMultiplier*crystalBoostMultiplier*getItemBonus();}

// === ЗОЛОТАЯ МОНЕТКА ===
function spawnGoldenCoin(){
if(!settings.showGolden)return;if(document.getElementById("golden-coin"))return;
var coin=document.createElement("div");coin.id="golden-coin";coin.textContent="🪙";
coin.style.left=Math.random()*(window.innerWidth-80)+"px";coin.style.top=Math.random()*(window.innerHeight-80)+"px";
coin.onclick=function(){goldenMultiplier=7;goldenTimer=30;var text="🌟 x7 доход на 30 секунд!";
if(Math.random()<0.2){addCrystals(1);text="🌟 x7 доход + 💎 1 кристалл!";}
var banner=document.createElement("div");banner.id="golden-bonus";banner.textContent=text;
document.body.appendChild(banner);playSound("ui");coin.remove();addQuestProgress("golden",1);updateUI();saveGame();};
document.body.appendChild(coin);
setTimeout(function(){if(coin.parentNode)coin.remove();},8000);}

// === ЭФФЕКТЫ ===
function showFloatPlus(x,y,amount){
if(!settings.showFloat)return;
var el=document.createElement("div");
el.className="float-plus";
if(amount<1000)el.classList.add("color-small");
else if(amount<1000000)el.classList.add("color-medium");
else if(amount<1000000000)el.classList.add("color-large");
else el.classList.add("color-huge");
el.textContent="+"+formatNumber(amount);
el.style.left=x+"px";el.style.top=y+"px";
document.body.appendChild(el);
setTimeout(function(){el.remove();},800);
}
function spawnTapParticles(x,y){
var now=Date.now();
if(window.__lastParticleTime&&now-window.__lastParticleTime<250)return;
window.__lastParticleTime=now;
var count=3+Math.floor(Math.random()*2);
for(var i=0;i<count;i++){
var p=document.createElement("div");
p.className="tap-particle";p.textContent="⭐";
var angle=(Math.PI*2/count)*i+(Math.random()*0.6-0.3);
var dist=40+Math.random()*35;
p.style.setProperty("--dx",(Math.cos(angle)*dist)+"px");
p.style.setProperty("--dy",(Math.sin(angle)*dist)+"px");
p.style.setProperty("--rot",(Math.random()*720-360)+"deg");
p.style.left=x+"px";p.style.top=y+"px";
p.style.fontSize=(10+Math.random()*6)+"px";
document.body.appendChild(p);
setTimeout(function(){p.remove();},600);
}
}
function pulseCounter(){
var el=document.getElementById("counter");
if(!el)return;
var nowPulse=Date.now();
if(window.__pulseCooldown&&nowPulse-window.__pulseCooldown<200&&nowPulse>=window.__pulseCooldown)return;
window.__pulseCooldown=nowPulse;
el.classList.remove("pulse");void el.offsetWidth;el.classList.add("pulse");
setTimeout(function(){el.classList.remove("pulse");},200);
}
function setCoinsAnimated(newValue){
var el=document.getElementById("coins");if(!el)return;
var current=lastDisplayedCoins;
if(newValue<=current){el.textContent=formatNumber(newValue);lastDisplayedCoins=newValue;return;}
var diff=newValue-current;
if(diff<50){el.textContent=formatNumber(newValue);lastDisplayedCoins=newValue;return;}
var steps=Math.min(12,Math.max(3,Math.floor(diff/500)+3));
var step=0;var startValue=current;
if(window.__coinsAnimInterval){clearInterval(window.__coinsAnimInterval);window.__coinsAnimInterval=null;}
window.__coinsAnimInterval=setInterval(function(){
step++;
if(step>=steps){
el.textContent=formatNumber(newValue);
lastDisplayedCoins=newValue;
clearInterval(window.__coinsAnimInterval);
window.__coinsAnimInterval=null;
return;
}
var v=startValue+(diff*(step/steps));
el.textContent=formatNumber(v);
lastDisplayedCoins=v;
},50);
}
function showShardDrop(x,y){
var el=document.createElement("div");el.className="shard-drop";el.textContent="🌑 +1 осколок!";
el.style.left=x+"px";el.style.top=y+"px";document.body.appendChild(el);
setTimeout(function(){el.remove();},1500);}

// === ДОСТИЖЕНИЯ ===
var achFilter="all";
function renderAchievements(){
var list=document.getElementById("achievements-list");if(!list)return;list.innerHTML="";
var counts={bronze:0,silver:0,gold:0,none:0,ub:0,us:0,ug:0,un:0};
achievements.forEach(function(a){
var tier=a.tier||"none";
var totalKey=tier==="bronze"?"bronze":tier==="silver"?"silver":tier==="gold"?"gold":"none";
counts[totalKey]++;
if(unlocked[a.id]){
var uKey=tier==="bronze"?"ub":tier==="silver"?"us":tier==="gold"?"ug":"un";
counts[uKey]++;
}
});
var summary=document.createElement("div");
summary.className="ach-summary";
summary.innerHTML='<div class="ach-sum-item bronze">🥉 Бронза: <b>'+counts.ub+' / '+counts.bronze+'</b></div>'+
'<div class="ach-sum-item silver">🥈 Серебро: <b>'+counts.us+' / '+counts.silver+'</b></div>'+
'<div class="ach-sum-item gold">🥇 Золото: <b>'+counts.ug+' / '+counts.gold+'</b></div>';
list.appendChild(summary);
achievements.forEach(function(a){
if(achFilter!=="all"&&(a.tier||"none")!==achFilter)return;
var div=document.createElement("div");
var classes="achievement";
if(unlocked[a.id])classes+=" unlocked";
if(a.tier)classes+=" tier-"+a.tier;
div.className=classes;
var tierBadge=a.tier==="gold"?"🥇":a.tier==="silver"?"🥈":a.tier==="bronze"?"🥉":"";
var reward=a.tier==="gold"?5:a.tier==="silver"?3:1;
div.innerHTML='<div class="icon">'+a.icon+'</div>'+'<div class="info">'+'<div class="title">'+(tierBadge?tierBadge+" ":"")+a.title+'</div>'+'<div class="desc">'+a.desc+' · +'+reward+' 💎</div>'+'</div>';
list.appendChild(div);});
}
function setupAchFilters(){
var btns=document.querySelectorAll(".ach-filter");
btns.forEach(function(btn){
btn.onclick=function(){
btns.forEach(function(b){b.classList.remove("active");});
btn.classList.add("active");
achFilter=btn.dataset.tier||"all";
renderAchievements();
};
});
}
function checkAchievements(){
achievements.forEach(function(a){
if(!unlocked[a.id]&&a.check()){
unlocked[a.id]=true;
var reward=a.tier==="gold"?5:a.tier==="silver"?3:1;
addCrystals(reward);
showAchievementPopup(a,reward);
saveGame();
}});
}
function showAchievementPopup(a,reward){
var tierIcon=a.tier==="gold"?"🥇":a.tier==="silver"?"🥈":a.tier==="bronze"?"🥉":"";
var popup=document.createElement("div");
popup.className="achievement-popup";
popup.textContent=(tierIcon?tierIcon+" ":"")+a.icon+" "+a.title+" (+"+reward+" 💎)";
document.body.appendChild(popup);
playSound("achievement");
setTimeout(function(){popup.remove();},2500);}

// === МАГАЗИН ===
function renderShop(){
var list=document.getElementById("shop-list");if(!list)return;list.innerHTML="";
for(var id in upgrades){var up=upgrades[id];var div=document.createElement("div");div.className="item";
var isMax=up.count>=UPGRADE_MAX_LEVEL;
var btnHtml=isMax
?'<button class="buy" data-id="'+id+'" disabled style="background:#4caf50;color:#fff">✓ Максимум</button>'
:'<button class="buy" data-id="'+id+'">Купить: <span id="cost-'+id+'">'+formatNumber(up.cost)+'</span></button>';
div.innerHTML='<div class="info">'+'<div class="name">'+up.name+'</div>'+'<div class="desc">'+up.desc+'</div>'+'</div>'+'<div class="right">'+'<div class="owned">Куплено: <span id="owned-'+id+'">0</span> / '+UPGRADE_MAX_LEVEL+'</div>'+btnHtml+'</div>';
list.appendChild(div);}
document.querySelectorAll(".buy[data-id]").forEach(function(btn){btn.onclick=function(){
var id=btn.dataset.id;var up=upgrades[id];if(!up)return;
if(up.count>=UPGRADE_MAX_LEVEL)return;
if(coins>=up.cost){coins-=up.cost;up.count++;up.cost=Math.floor(up.baseCost*Math.pow(UPGRADE_COST_MULT,up.count));
if(up.effect==="click")coinsPerClick+=up.amount;
addQuestProgress("upgrades",1);playSound("ui");updateUI();checkRewardTab();saveGame();}};});}

// === ЛИЧНЫЙ РЕКОРД ===
function checkPersonalRecord(){
var now=Date.now();
if(now-lastRecordCheck<3000)return;
lastRecordCheck=now;
if(coins>personalBestCoins){
personalBestCoins=coins;
saveGame();
}
}

// === UI ===
function updateUI(){
setCoinsAnimated(coins);
document.getElementById("cps").textContent=formatNumber(getCPS())+(goldenMultiplier>1?" (x7!)":"");
document.getElementById("crystals").textContent=crystals;
var shardsEl=document.getElementById("shards");if(shardsEl)shardsEl.textContent=shards;
var ib=document.getElementById("item-bonus");if(ib)ib.textContent="+"+Math.round((getItemBonus()-1)*100)+"%";
var now=Date.now();
if(now-lastShopUpdate>500||now<lastShopUpdate){
lastShopUpdate=now;
for(var id in upgrades){var up=upgrades[id];
var owned=document.getElementById("owned-"+id),cost=document.getElementById("cost-"+id);
if(owned)owned.textContent=up.count;if(cost)cost.textContent=formatNumber(up.cost);
var btn=document.querySelector('.buy[data-id="'+id+'"]');
if(btn){
if(up.count>=UPGRADE_MAX_LEVEL){btn.disabled=true;btn.textContent="✓ Максимум";btn.style.background="#4caf50";btn.style.color="#fff";}
else{btn.disabled=coins<up.cost;}
}}
updateGlobalShopUI();
}
var secretModal=document.getElementById("modal-secret");if(secretModal&&!secretModal.classList.contains("hidden"))updateSecretUI();
var itemsModal=document.getElementById("modal-items");
if(itemsModal&&!itemsModal.classList.contains("hidden")){
var shardsEl2=document.getElementById("items-shards"),crystalsEl2=document.getElementById("items-crystals");
if(shardsEl2)shardsEl2.textContent=shards;if(crystalsEl2)crystalsEl2.textContent=crystals;}
checkNotesUnlock();
}

// === СТАТИСТИКА ===
function updateStats(){
document.getElementById("stat-coins").textContent=formatNumber(coins);
document.getElementById("stat-earned").textContent=formatNumber(totalEarned);
document.getElementById("stat-taps").textContent=formatNumber(totalTaps);
document.getElementById("stat-cps").textContent=formatNumber(getCPS());
document.getElementById("stat-per-click").textContent=formatNumber(getClickValue());
document.getElementById("stat-crystals").textContent=crystals;
var statShards=document.getElementById("stat-shards");if(statShards)statShards.textContent=shards;
var statTime=document.getElementById("stat-time");if(statTime)statTime.textContent=formatTime(totalPlayTime);
var achCount=0;for(var id in unlocked){if(unlocked[id])achCount++;}
document.getElementById("stat-ach").textContent=achCount;
var totalEl=document.getElementById("stat-ach-total");if(totalEl)totalEl.textContent=achievements.length;
var recEl=document.getElementById("stat-record");if(recEl)recEl.textContent=formatNumber(personalBestCoins);}

// === ПЕЧЕНЬКА ===
function getTodayKeyFortune(){
var d=new Date();
return d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate();
}
function updateFortuneButton(){
var btn=document.getElementById("fortune-btn");if(!btn)return;
var last=localStorage.getItem(FORTUNE_KEY)||"";
var today=getTodayKeyFortune();
if(last===today){btn.disabled=true;btn.textContent="🥠 До завтра";}
else{btn.disabled=false;btn.textContent="🥠 Что сегодня?";}
}
function showFortune(){
var btn=document.getElementById("fortune-btn");if(!btn||btn.disabled)return;
var last=localStorage.getItem(FORTUNE_KEY)||"";
var today=getTodayKeyFortune();
if(last===today)return;
localStorage.setItem(FORTUNE_KEY,today);
var text=FORTUNES[Math.floor(Math.random()*FORTUNES.length)];
var popup=document.createElement("div");
popup.className="fortune-popup";
popup.innerHTML='<div class="fortune-emoji">🥠</div>'+'<div class="fortune-label">Печенька говорит:</div>'+'<div class="fortune-text">«'+text+'»</div>'+'<button class="fortune-close">Спасибо, печенька!</button>';
document.body.appendChild(popup);
playSound("ui");
popup.querySelector(".fortune-close").onclick=function(){popup.remove();};
setTimeout(function(){if(popup.parentNode)popup.remove();},30000);
updateFortuneButton();
}

// === ТАП ===
document.getElementById("click-btn").onclick=function(e){
if(!checkTapLimit())return;
var cd=getGeneratorCooldownMs();
var now=Date.now();
if(now-lastClickTime<cd)return;
lastClickTime=now;
document.getElementById("click-btn").classList.remove("tap-ready");
var value=getClickValue();coins+=value;totalEarned+=value;
var tapsToAdd=gulauActive?5:1;totalTaps+=tapsToAdd;addQuestProgress("taps",tapsToAdd);
var rect=e.target.getBoundingClientRect();
var x=rect.left+rect.width/2+(Math.random()*40-20);var y=rect.top+rect.height/2;
showFloatPlus(x,y,value);
spawnTapParticles(x,y);
pulseCounter();
if(bloodMoonActive&&Math.random()<0.01){shards+=1;showShardDrop(x,y);}
playSound("click");
if(window.__coinsAnimInterval){clearInterval(window.__coinsAnimInterval);window.__coinsAnimInterval=null;}
lastDisplayedCoins=coins;
document.getElementById("coins").textContent=formatNumber(coins);
document.getElementById("cps").textContent=formatNumber(getCPS())+(goldenMultiplier>1?" (x7!)":"");
resetAlarmTimer();
};

// === ОБРАБОТЧИКИ КНОПОК ===
var fortuneBtn=document.getElementById("fortune-btn");
if(fortuneBtn){fortuneBtn.onclick=function(){playSound("ui");showFortune();};}
var depositSideBtn=document.getElementById("deposit-side-btn");
if(depositSideBtn){depositSideBtn.onclick=function(){playSound("ui");renderDeposit();document.getElementById("modal-deposit").classList.remove("hidden");syncScrollLock();updateDepositSideButton();};}
var generatorBtn=document.getElementById("generator-btn");
if(generatorBtn){generatorBtn.onclick=function(){playSound("ui");renderGenerator();document.getElementById("modal-generator").classList.remove("hidden");syncScrollLock();};}

// === СУНДУК ===
var CHEST_COOLDOWN=60*60*1000;
function resetChestCooldown(){try{localStorage.removeItem("lastChest");}catch(e){}updateChestButton();}
function updateChestButton(){
var btn=document.getElementById("chest-btn");if(!btn)return;
var last=parseInt(localStorage.getItem("lastChest")||"0");var left=CHEST_COOLDOWN-(Date.now()-last);
if(left<=0){btn.disabled=false;btn.textContent="🎁 Сундук";}
else{btn.disabled=true;var mins=Math.floor(left/60000);var secs=Math.floor((left%60000)/1000);btn.textContent="🎁 "+mins+"м "+secs+"с";}}
function getChestRewards(){
var cps=getCPS();
var coinsReward=Math.max(500,Math.floor(cps*1800));
var crystalsReward=5+Math.floor(Math.random()*11);
var shardsReward=15+Math.floor(Math.random()*26);
var boosterRoll=Math.floor(Math.random()*3);
var boosterIds=["boost2","boost3","boost5"];
var booster=boosterIds[boosterRoll];
return {coins:coinsReward,crystals:crystalsReward,shards:shardsReward,booster:booster};}
var chestBtn=document.getElementById("chest-btn");
if(chestBtn){chestBtn.onclick=function(){
var last=parseInt(localStorage.getItem("lastChest")||"0");if(Date.now()-last<CHEST_COOLDOWN)return;
var r=getChestRewards();
openChestAnimation(r.crystals,r.coins,r.shards,r.booster,function(){
addCrystals(r.crystals);coins+=r.coins;totalEarned+=r.coins;shards+=r.shards;
if(r.booster)addBoosterToStorage(r.booster);
chestsOpened++;
localStorage.setItem("lastChest",Date.now().toString());addQuestProgress("chest",1);
updateUI();updateChestButton();checkAchievements();saveGame();});};}

// === КОЛЕСО ===
var wheelBtn=document.getElementById("wheel-btn");
if(wheelBtn){wheelBtn.onclick=function(){playSound("ui");openWheel();};}
var wheelCloseBtn=document.getElementById("wheel-close");
if(wheelCloseBtn){wheelCloseBtn.onclick=function(){playSound("ui");closeWheel();};}
var wheelFreeBtn=document.getElementById("wheel-spin-free");
if(wheelFreeBtn){wheelFreeBtn.onclick=function(){spinWheel(true);};}
var wheelPaidBtn=document.getElementById("wheel-spin-paid");
if(wheelPaidBtn){wheelPaidBtn.onclick=function(){spinWheel(false);};}

// === АНИМАЦИЯ СУНДУКА ===
function openChestAnimation(crystalsReward,coinsReward,shardsReward,boosterReward,onCollect){
var overlay=document.getElementById("chest-overlay"),scene=document.getElementById("chest-scene"),rewards=document.getElementById("chest-rewards"),collectBtn=document.getElementById("chest-collect");
if(!overlay||!scene||!rewards||!collectBtn){onCollect();return;}
overlay.classList.remove("hidden");syncScrollLock();
scene.classList.remove("shaking","opened");rewards.innerHTML="";collectBtn.classList.add("hidden");collectBtn.onclick=null;
playSound("chest");
setTimeout(function(){scene.classList.add("shaking");
setTimeout(function(){scene.classList.remove("shaking");
var flash=document.createElement("div");flash.className="chest-flash";document.body.appendChild(flash);setTimeout(function(){flash.remove();},400);
scene.classList.add("opened");
var rewardHtml="";
rewardHtml+='<div class="chest-reward-item">💎 +'+crystalsReward+'</div>';
rewardHtml+='<div class="chest-reward-item delay-1">💰 +'+formatNumber(coinsReward)+'</div>';
rewardHtml+='<div class="chest-reward-item delay-2">🌑 +'+shardsReward+'</div>';
if(boosterReward&&BOOSTERS[boosterReward]){
rewardHtml+='<div class="chest-reward-item delay-3">⚡ Бустер ×'+BOOSTERS[boosterReward].mult+'!</div>';
}
rewards.innerHTML=rewardHtml;
setTimeout(function(){collectBtn.classList.remove("hidden");collectBtn.onclick=function(){collectBtn.onclick=null;overlay.classList.add("hidden");syncScrollLock();onCollect();};},2200);},1500);},500);}

// === ВКЛАДКИ ===
document.querySelectorAll(".tab-btn").forEach(function(btn){btn.onclick=function(){
playSound("ui");var tab=btn.dataset.tab;var modal=document.getElementById("modal-"+tab);
if(modal){if(tab==="stats")updateStats();if(tab==="skins"){renderSkins();renderEmojiSkins();renderBackgrounds();renderSmileSkins();}if(tab==="achievements")renderAchievements();if(tab==="items"){renderItems();renderCrystalShop();}if(tab==="leaders"){updateLeaderboardName();loadLeaderboard();}if(tab==="quests")renderQuests();if(tab==="note")renderNoteList();if(tab==="boosters")renderBoosters();modal.classList.remove("hidden");syncScrollLock();}};});
document.querySelectorAll(".modal-close").forEach(function(btn){btn.onclick=function(){playSound("ui");var id=btn.dataset.close;var el=document.getElementById(id);if(el)el.classList.add("hidden");syncScrollLock();};});
document.querySelectorAll(".modal").forEach(function(modal){modal.onclick=function(e){if(e.target===modal){modal.classList.add("hidden");syncScrollLock();}};});

// === ПЕРЕКЛЮЧАТЕЛЬ МАГАЗИНА ===
document.querySelectorAll(".items-tab").forEach(function(btn){
btn.onclick=function(){
document.querySelectorAll(".items-tab").forEach(function(b){b.classList.remove("active");});
btn.classList.add("active");
var tab=btn.dataset.itab;
var shopList=document.getElementById("shop-list");
var globalList=document.getElementById("global-shop-list");
if(tab==="upgrades"){shopList.style.display="";globalList.style.display="none";}
else{shopList.style.display="none";globalList.style.display="";renderGlobalShop();}
};
});

// === НАСТРОЙКИ ===
var optFloat=document.getElementById("opt-float"),optGolden=document.getElementById("opt-golden"),optDaily=document.getElementById("opt-daily"),optSound=document.getElementById("opt-sound"),optMusic=document.getElementById("opt-music");
if(optFloat)optFloat.onchange=function(){settings.showFloat=this.checked;saveSettings();};
if(optGolden)optGolden.onchange=function(){settings.showGolden=this.checked;saveSettings();};
if(optDaily)optDaily.onchange=function(){settings.showDaily=this.checked;saveSettings();};
if(optSound)optSound.onchange=function(){settings.sound=this.checked;saveSettings();};
if(optMusic)optMusic.onchange=function(){settings.music=this.checked;saveSettings();if(settings.music)playMusic();else stopMusic();};
var promoBtn=document.getElementById("promo-btn");if(promoBtn)promoBtn.onclick=activatePromo;
var promoInput=document.getElementById("promo-input");if(promoInput)promoInput.addEventListener("keydown",function(e){if(e.key==="Enter")activatePromo();});
var exportBtn=document.getElementById("export-btn");if(exportBtn)exportBtn.onclick=exportSave;
var copyBtn=document.getElementById("copy-btn");if(copyBtn)copyBtn.onclick=copyExport;
var exportClose=document.getElementById("export-close");if(exportClose)exportClose.onclick=function(){var box=document.getElementById("export-box");if(box)box.classList.add("hidden");};
var importBtn=document.getElementById("import-btn");if(importBtn)importBtn.onclick=function(){var box=document.getElementById("import-box");if(box)box.classList.toggle("hidden");};
var importLoad=document.getElementById("import-load");if(importLoad)importLoad.onclick=importSave;
var importCancel=document.getElementById("import-cancel");if(importCancel)importCancel.onclick=function(){var box=document.getElementById("import-box");if(box)box.classList.add("hidden");};
var rewardClaimBtn=document.getElementById("reward-claim");if(rewardClaimBtn)rewardClaimBtn.onclick=claimReward;
var leaderSubmitBtn=document.getElementById("leader-submit");if(leaderSubmitBtn)leaderSubmitBtn.onclick=submitLeaderboardScore;
var secretUnlockBtn=document.getElementById("secret-unlock");if(secretUnlockBtn)secretUnlockBtn.onclick=tryUnlockSecret;
var secretToggleBtn=document.getElementById("secret-toggle");if(secretToggleBtn)secretToggleBtn.onclick=activateSecretAutoClicker;

// === ИНИЦИАЛИЗАЦИЯ ===
setupAdvancedButton();
setupProfileSave();
setupTutorial();
setupNoteBack();
setupAchFilters();

var profileBtn=document.getElementById("profile-side-btn");
if(profileBtn){profileBtn.onclick=function(){playSound("ui");showProfileModal();};}
var pahanBtn=document.getElementById("pahan-btn");
if(pahanBtn){pahanBtn.onclick=function(){playSound("ui");activatePahan();};}
updatePahanButton();

// === СБРОС ===
function setupResetButton(){
var btn=document.getElementById("settings-reset");if(!btn)return;
var step=0;var timer=null;
btn.onclick=function(e){
e.preventDefault();e.stopPropagation();step++;
if(step===1){btn.textContent="⚠️ Нажмите ещё раз (1/2)";btn.style.background="#ff5722";
if(timer)clearTimeout(timer);timer=setTimeout(function(){step=0;btn.textContent="Сбросить весь прогресс";btn.style.background="#b33a3a";},3000);return;}
if(step===2){clearTimeout(timer);btn.textContent="🗑️ Удаляю...";btn.style.background="#8a0000";
try{window.__resetting=true;
coins=0;coinsPerClick=1;totalEarned=0;totalTaps=0;totalPlayTime=0;crystals=0;goldenMultiplier=1;goldenTimer=0;
shards=0;bloodMoonActive=false;bloodMoonTimer=0;
eventMultiplier=1;eventTimer=0;eventName="";currentEventKey="";
crystalBoostMultiplier=1;crystalBoostTimer=0;crystalBoostName="";
unlocked={};ownedItems={};chestsOpened=0;personalBestCoins=0;
secretUnlocked=false;secretAutoClicker=false;secretAutoClickerTimer=0;
depositUnlocked=false;depositLevel=0;generatorLevel=1;generatorTimer=GENERATOR_DURATION;
lastDepositTimeKey="";
smileSkinUnlocked=false;smileSkinActive=false;
gulauActive=false;gulauTimer=0;
bossActive=false;bossHP=150;bossTimeLeft=45;bossRewardClaimed=false;
rewardClaimed=false;rewardTabShown=false;noteShown=false;note1Shown=false;note2Shown=false;note3Shown=false;
notesUnlocked={};
pahanUnlocked=false;pahanActive=false;pahanTimer=0;
quests=[];questsDate="";questsClaimed=0;questProgress={};
theftActive=false;theftTimer=0;theftTotalLost=0;lastTheftKey="";
wheelFreeUsed=false;wheelPaidUsed=false;wheelLastResetDay="";
activeBg="base";
for(var bid in BOOSTERS){BOOSTERS[bid].storage=0;}
for(var bgid in BACKGROUNDS){BACKGROUNDS[bgid].owned=(bgid==="base");}
for(var esid in EMOJI_SKINS){EMOJI_SKINS[esid].owned=false;}
activeEmojiSkin=null;
if(bossTimerInterval){clearInterval(bossTimerInterval);bossTimerInterval=null;}
if(pahanTickInterval){clearInterval(pahanTickInterval);pahanTickInterval=null;}
if(pahanTimerInterval){clearInterval(pahanTimerInterval);pahanTimerInterval=null;}
if(theftTickTimer){clearInterval(theftTickTimer);theftTickTimer=null;}
stopSecretAutoClicker();
for(var id in upgrades){upgrades[id].count=0;upgrades[id].cost=upgrades[id].baseCost;}
for(var gid in globalUpgrades){globalUpgrades[gid].count=0;globalUpgrades[gid].cost=globalUpgrades[gid].baseCost;}
for(var sid in skins){skins[sid].owned=(sid==="gold");}
activeSkin="gold";
applyBackground();
try{localStorage.removeItem(SAVE_KEY);localStorage.removeItem("lastDaily");localStorage.removeItem("dailyStreak");localStorage.removeItem("clicker-settings");localStorage.removeItem("clicker-skins");localStorage.removeItem("lastChest");localStorage.removeItem("lastEventKey");localStorage.removeItem(FORTUNE_KEY);localStorage.removeItem("clicker-theft-state");}catch(err){}
setTimeout(function(){alert("✅ Прогресс полностью сброшен! Страница перезагрузится.");location.reload();},300);
}catch(err){alert("❌ Ошибка: "+err.message);btn.textContent="Сбросить весь прогресс";btn.style.background="#b33a3a";step=0;window.__resetting=false;}}};}

// === СТРАНИЦЫ ===
var currentPage=1,totalPages=2;
function showPage(n){if(n<1)n=totalPages;if(n>totalPages)n=1;currentPage=n;
document.querySelectorAll(".page").forEach(function(page,i){if(i+1===n)page.classList.add("page-active");else page.classList.remove("page-active");});
document.querySelectorAll(".page-dot").forEach(function(dot){if(parseInt(dot.dataset.page)===n)dot.classList.add("active");else dot.classList.remove("active");});
if(bgCanvas)resizeBgCanvas();
window.scrollTo({top:0,behavior:"smooth"});}
function nextPage(){showPage(currentPage+1);}
function prevPage(){showPage(currentPage-1);}
var pagePrev=document.getElementById("page-prev"),pageNext=document.getElementById("page-next");
if(pagePrev)pagePrev.onclick=prevPage;
if(pageNext)pageNext.onclick=nextPage;
document.querySelectorAll(".page-dot").forEach(function(dot){dot.onclick=function(){var n=parseInt(dot.dataset.page);if(n)showPage(n);};});

// === СВАЙПЫ (passive: true — не блокирует скролл!) ===
var touchStartX=0,touchEndX=0,touchStartY=0,touchEndY=0;
document.addEventListener("touchstart",function(e){touchStartX=e.changedTouches[0].screenX;touchStartY=e.changedTouches[0].screenY;},{passive:true});
document.addEventListener("touchend",function(e){
touchEndX=e.changedTouches[0].screenX;touchEndY=e.changedTouches[0].screenY;
var dx=touchEndX-touchStartX;var dy=touchEndY-touchStartY;
if(Math.abs(dx)>60&&Math.abs(dx)>Math.abs(dy)*1.5){
if(document.querySelector(".modal:not(.hidden)"))return;
if(dx<0)nextPage();else prevPage();
}
},{passive:true});
document.addEventListener("keydown",function(e){if(e.key==="ArrowLeft")prevPage();if(e.key==="ArrowRight")nextPage();});
window.addEventListener("resize",resizeBgCanvas);

// === ИНТЕРВАЛЫ ===
setInterval(function(){var income=getCPS();coins+=income;totalEarned+=income;if(income>0)addQuestProgress("earn",income);updateUI();checkAchievements();checkRewardTab();checkNoteTab();checkPersonalRecord();},1000);
setInterval(function(){totalPlayTime++;checkQuestsUpdate();},1000);
setInterval(updateEvent,1000);
setInterval(updateBloodMoon,1000);
setInterval(updateTheft,1000);
setInterval(updateChestButton,1000);
setInterval(updateDepositHunger,1000);
setInterval(updateCrystalBoostTimer,1000);
setInterval(updateGeneratorTimer,1000);
setInterval(checkDepositTimeTick,5000);
setInterval(function(){if(gulauActive){gulauTimer--;if(gulauTimer<=0)endGulau();else updateGulauTimer();}},1000);
setInterval(function(){
if(secretAutoClicker&&secretAutoClickerTimer>0){secretAutoClickerTimer--;
if(secretAutoClickerTimer<=0){secretAutoClickerTimer=0;stopSecretAutoClicker();
var popup=document.createElement("div");popup.className="achievement-popup";popup.textContent="⏸️ Кликер 67 остановлен.";
document.body.appendChild(popup);setTimeout(function(){popup.remove();},4000);updateSecretUI();saveGame();}
else{var modal=document.getElementById("modal-secret");if(modal&&!modal.classList.contains("hidden"))updateSecretUI();}}},1000);
setInterval(saveGame,5000);
window.addEventListener("beforeunload",saveGame);
setInterval(function(){if(Math.random()<0.7)spawnGoldenCoin();},60000);
setInterval(function(){if(goldenTimer>0){goldenTimer--;if(goldenTimer===0){goldenMultiplier=1;var b=document.getElementById("golden-bonus");if(b)b.remove();}}},1000);

// === СТАРТ ===
initFirebase();
initSounds();
loadSettings();
loadSkins();
loadProfile();
ensureProfileId();
loadGame();
restoreTheftIfNeeded();
if(!quests||quests.length===0)generateQuests();
else checkQuestsUpdate();
renderShop();
renderGlobalShop();
applySkin();
applyBackground();
startBgAnimation();
updateEvent();
updateBloodMoon();
updateUI();
renderAchievements();
updateChestButton();
updateFortuneButton();
checkAchievements();
setupLogoSecret();
setupResetButton();
setupBossSecret();
setupAlarm();
checkRewardTab();
checkNoteTab();
updateDepositSideButton();
updatePahanButton();
updateBoostBanner();
updateGeneratorButton();
renderSmileSkins();
renderEmojiSkins();
renderBackgrounds();
renderNoteList();
startCooldownUI();

// === ПРОФИЛЬ И ОБУЧЕНИЕ ===
if(!hasProfile()){
setTimeout(function(){showProfileModal();},800);
}else{
updateLeaderboardName();
try{
var tutorialDone=localStorage.getItem(TUTORIAL_DONE_KEY);
if(!tutorialDone){setTimeout(function(){startTutorial();},1200);}
}catch(e){setTimeout(function(){startTutorial();},1200);}
}

// === SERVICE WORKER ===
if("serviceWorker" in navigator){window.addEventListener("load",function(){navigator.serviceWorker.register("service-worker.js").catch(function(e){console.warn("Service Worker не зарегистрирован:",e);});});}
