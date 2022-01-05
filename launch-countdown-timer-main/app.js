const templateCard = document.querySelector(".counter__card__template");
const launchCounter = document.querySelector(".launch__counter");

class Counter {
  constructor(
    counterArgs,
    templateEl,
    launchCounterEl,
    parentCounterEl = null
  ) {
    this.counterArgs = counterArgs;
    this.launchCounterEl = launchCounterEl;
    this.parentCounterEl = parentCounterEl;
    this.counterCardEl = document.importNode(templateEl.content, true);
  }

  render() {
    const counterCard = this.counterCardEl;
    const card = counterCard.querySelector("div");
    card.classList.add(`counter-${this.counterArgs.name}`);

    const cardTitle = counterCard.querySelector(".counter__card-title");
    cardTitle.textContent = this.counterArgs.value;

    const counterName = counterCard.querySelector(".counter__name");
    counterName.textContent = this.counterArgs.name;

    this.launchCounterEl.append(counterCard);
    this.updateValue();
  }

  updateValue() {
    setInterval(() => {
      const cardTitle = document.querySelector(
        `.counter-${this.counterArgs.name} .counter__card-title`
      );
      if (this.counterArgs.value === 0) {
        if (
          this.parentCounterEl !== null &&
          this.parentCounterEl.counterArgs.value === 0
        ) {
          cardTitle.textContent = 0;
          this.counterArgs.delay = 0;
          return;
        }
        this.counterArgs.value = this.counterArgs.resetValue;
        cardTitle.textContent = this.counterArgs.value;
      } else {
        --this.counterArgs.value;
        cardTitle.textContent = this.counterArgs.value;
      }
    }, this.counterArgs.delay);
  }
}

class CounterArgs {
  constructor(name, value, resetValue, delay) {
    this.name = name;
    this.value = value;
    this.resetValue = resetValue;
    this.delay = delay;
  }
}

const daysArg = new CounterArgs("Days", 8, 0, 86400000);
const hourArg = new CounterArgs("Hours", 23, 24, 3600000);
const minuteArg = new CounterArgs("Minutes", 55, 59, 60000);
const secondsArg = new CounterArgs("Seconds", 41, 59, 1000);

const daysCounter = new Counter(daysArg, templateCard, launchCounter);
daysCounter.render();

const hoursCounter = new Counter(
  hourArg,
  templateCard,
  launchCounter,
  daysCounter
);
hoursCounter.render();

const minutesCounter = new Counter(
  minuteArg,
  templateCard,
  launchCounter,
  hoursCounter
);
minutesCounter.render();

const secondsCounter = new Counter(
  secondsArg,
  templateCard,
  launchCounter,
  minutesCounter
);
secondsCounter.render();
