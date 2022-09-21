const intervals = require('../utils/intervals');
const voice = require('../utils/voice');

const spawnTimers = [20, 28, 36, 44, 52, 60];
const spawnCounters = [14, 12, 9, 7, 5, 4];

class War {
  constructor(connection) {
    this.timer = 1;
    this.counter = 1;
    this.countersCompleted = 0;
    this.interval = null;
    this.connection = connection;
  }

  cleanUpTask() {
    intervals.stopInterval(this.interval);
    voice.destroyConnection(this.connection);
  }

  startRespawnInterval() {
    this.interval = intervals.startInterval(() => {
      this.checkRespawnWave();
    }, 1000);
  }

  checkRespawnWave() {
    if (this.countersCompleted >= 3) {
      if (this.timer === spawnTimers[this.countersCompleted] - 20) {
        voice.playFile('./resources/twenty_seconds.mp3');
      }

      if (this.timer === spawnTimers[this.countersCompleted] - 10) {
        voice.playFile('./resources/ten_seconds.mp3');
      }

      if (this.timer === spawnTimers[this.countersCompleted] - 5) {
        voice.playFile('./resources/five_seconds.mp3');
      }
    }

    if (this.timer === spawnTimers[this.countersCompleted]) {
      if (this.counter === spawnCounters[this.countersCompleted]) {
        this.countersCompleted++;
        this.counter = 0;
      }

      console.log(
        `Wave hit at ${new Date().toLocaleString()}: params: countersCompleted=${
          this.countersCompleted
        }, timer=${this.timer}`
      );

      voice.playFile('./resources/respawning_now.mp3');

      this.counter++;
      this.timer = 0;
    }

    if (!spawnTimers[this.countersCompleted]) {
      this.cleanUpTask();
    } else {
      this.timer++;
    }
  }
}

module.exports = War;
