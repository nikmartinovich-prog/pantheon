const players = [
  { number: 10, name: "Мартинович Николай Николаевич", shortName: "Николай Мартинович", role: "Доигровщик / центральный", group: "Доигровщики", height: 182, photo: "martinovich.jpg", badge: "Капитан" },
  { number: 13, name: "Сечкин Виталий Алексеевич", shortName: "Виталий Сечкин", role: "Доигровщик", group: "Доигровщики", height: 189, photo: "sechkin.jpg", badge: "Вице-капитан" },
  { number: 9, name: "Садиков Павел Александрович", shortName: "Павел Садиков", role: "Либеро", group: "Либеро", height: 176, photo: "sadikov.jpg" },
  { number: 11, name: "Узор Дмитрий Александрович", shortName: "Дмитрий Узор", role: "Доигровщик", group: "Доигровщики", height: 182, photo: "uzor.jpg" },
  { number: 69, name: "Гуральник Роман Игоревич", shortName: "Роман Гуральник", role: "Доигровщик", group: "Доигровщики", height: 173, photo: "guralnik.jpg" },
  { number: 5, name: "Брагин Владислав Владимирович", shortName: "Владислав Брагин", role: "Доигровщик", group: "Доигровщики", height: 174, photo: "bragin.jpg" },
  { number: 12, name: "Ложенко Павел Андреевич", shortName: "Павел Ложенко", role: "Центральный блокирующий", group: "Центральные", height: 190, photo: "lozhenko.jpg" },
  { number: 17, name: "Лукоянов Владислав Александрович", shortName: "Владислав Лукоянов", role: "Центральный блокирующий", group: "Центральные", height: 180, photo: "lukoianov.jpg" },
  { number: 92, name: "Коптин Дмитрий Сергеевич", shortName: "Дмитрий Коптин", role: "Диагональный", group: "Диагональные", height: 190, photo: "koptin.jpg" },
  { number: 7, name: "Михайлов Илья Андреевич", shortName: "Илья Михайлов", role: "Связующий", group: "Связующие", height: 180, photo: "mikhailov.jpg" },
];

const matches = [
  { opponent: "Армагедец", score: "3 : 2", competition: "Кубок", stage: "Финал", result: "win" },
  { opponent: "Ладога", score: "3 : 0", competition: "Кубок", stage: "1/2 финала", result: "win" },
  { opponent: "Виллози", score: "3 : 1", competition: "Кубок", stage: "1/4 финала", result: "win" },
  { opponent: "Next Gen", score: "3 : 0", competition: "Кубок", stage: "3 тур", result: "win" },
  { opponent: "Длань", score: "3 : 0", competition: "Кубок", stage: "2 тур", result: "win" },
  { opponent: "SkyNet", score: "3 : 0", competition: "Кубок", stage: "1 тур", result: "win" },
  { opponent: "VOLLEYART 3", score: "2 : 3", competition: "Лига", stage: "2 круг", result: "loss" },
  { opponent: "ANTIFIRE", score: "3 : 1", competition: "Лига", stage: "2 круг", result: "win" },
  { opponent: "Дом молодёжи Атлант", score: "3 : 0", competition: "Лига", stage: "2 круг", result: "win" },
  { opponent: "На easy", score: "2 : 3", competition: "Лига", stage: "2 круг", result: "loss" },
  { opponent: "Valencia Spike", score: "3 : 0", competition: "Лига", stage: "2 круг", result: "win" },
  { opponent: "Дикари", score: "3 : 2", competition: "Лига", stage: "2 круг", result: "win" },
  { opponent: "VolleySert", score: "0 : 3", competition: "Лига", stage: "2 круг", result: "loss" },
  { opponent: "Next Gen", score: "3 : 0", competition: "Лига", stage: "2 круг", result: "win" },
  { opponent: "Газпром ЦПС", score: "3 : 2", competition: "Лига", stage: "2 круг", result: "win" },
  { opponent: "Надежда М", score: "3 : 1", competition: "Лига", stage: "2 круг", result: "win" },
  { opponent: "ЛУЧ", score: "3 : 0", competition: "Лига", stage: "2 круг", result: "win" },
];

let selectedRole = "Все";
let selectedResult = "all";
let showAllResults = false;

const playerGrid = document.querySelector("#player-grid");
const matchList = document.querySelector("#match-list");
const showMoreButton = document.querySelector("#show-more-results");

function renderPlayers() {
  const visible = selectedRole === "Все" ? players : players.filter((player) => player.group === selectedRole);
  playerGrid.innerHTML = visible.map((player) => `
    <article class="player-card">
      <div class="player-photo">
        <img src="assets/players/${player.photo}" alt="${player.name}">
        <span class="player-number">${String(player.number).padStart(2, "0")}</span>
        ${player.badge ? `<span class="captain-badge">${player.badge}</span>` : ""}
      </div>
      <div class="player-info"><h3>${player.shortName}</h3><p>${player.role}</p><span>${player.height} см</span></div>
    </article>
  `).join("");
}

function renderMatches() {
  const filtered = selectedResult === "all" ? matches : matches.filter((match) => match.result === selectedResult);
  const visible = showAllResults ? filtered : filtered.slice(0, 6);
  matchList.innerHTML = visible.map((match) => `
    <article class="match-row">
      <div class="result-badge ${match.result}">${match.result === "win" ? "П" : "ПР"}</div>
      <div class="competition"><strong>${match.competition}</strong><span>${match.stage}</span></div>
      <div class="teams"><span>PANTHEON</span><span>${match.opponent}</span></div>
      <strong class="score">${match.score}</strong>
    </article>
  `).join("");

  showMoreButton.hidden = filtered.length <= 6;
  showMoreButton.innerHTML = showAllResults
    ? "Свернуть результаты <span>↑</span>"
    : `Показать все матчи (${filtered.length}) <span>↓</span>`;
}

document.querySelectorAll("[data-role-filter]").forEach((button) => {
  button.addEventListener("click", () => {
    selectedRole = button.dataset.roleFilter;
    document.querySelectorAll("[data-role-filter]").forEach((item) => item.classList.toggle("active", item === button));
    renderPlayers();
  });
});

document.querySelectorAll("[data-result-filter]").forEach((button) => {
  button.addEventListener("click", () => {
    selectedResult = button.dataset.resultFilter;
    showAllResults = false;
    document.querySelectorAll("[data-result-filter]").forEach((item) => item.classList.toggle("active", item === button));
    renderMatches();
  });
});

showMoreButton.addEventListener("click", () => {
  showAllResults = !showAllResults;
  renderMatches();
});

renderPlayers();
renderMatches();
