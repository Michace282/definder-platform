<template>
  <div class="fund-page__calculator">
    <div class="calculator">
      <h2 class="calculator__title">Investor Calculator</h2>
      <img
        src="/images/sources/investor-calculator.png"
        alt="Investor Calculator"
        class="calculator__image"
      />
      <form class="calculator__form">
        <label for="amount" class="calculator__form__label">Amount</label>
        <input
          v-model="amount"
          id="amount"
          type="text"
          name="amount"
          value="50000"
          class="calculator__form__input"
          @keyup="recalcReward"
        />

        <label for="time" class="calculator__form__label">Time</label>
        <select
          id="time"
          v-model="time"
          name="time"
          class="calculator__form__select"
          @change="recalcReward"
        >
          <option value="1">1 Year</option>
          <option value="2" selected>2 Years</option>
          <option value="3">3 Years</option>
        </select>
      </form>
      <div class="calculator__details">
        <div class="calculator__details__respective">
          <span>Respective % Volume</span>
          <span class="calculator__details__detail__value"
            >{{ volumePercent }}%</span
          >
        </div>
        <div class="calculator__details__detail">
          <span>Annual Volume Multiplier</span>
          <span class="calculator__details__detail__value"
            >{{ parseInt(volumeMul * 100) }}%</span
          >
        </div>
        <div class="calculator__details__detail">
          <span>Annual Time Multiplier</span>
          <span class="calculator__details__detail__value"
            >{{ parseInt(timeMul * 100) }}%</span
          >
        </div>
        <!--
        <div class="calculator__details__detail">
          <span>Additional Vote Power</span>
          <span class="calculator__details__detail__value">2700</span>
        </div>-->
      </div>

      <div class="calculator__rewards">
        <span>Estimated Rewards:</span>
        <span class="calculator__rewards-value">~{{ rewardPercent }}%</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'InvestorCalculator',
  methods: {
    recalcReward() {
      console.log('recalcReward(ee)')
      const volume = parseInt(this.amount)
      console.log('vol:', volume, this.time)
      const totalVolume = 21548097

      // Reward=base level% *(1+Volume Multiplier%+Time Multiplier%)
      const baseLevel = 7.45
      this.timeMul = 1
      this.volumeMul = 1
      this.volumePercent = parseFloat((100 * volume) / totalVolume).toFixed(2)
      if ((100 * volume) / totalVolume < 1) {
        this.volumeMul = 1
      } else if ((100 * volume) / totalVolume < 3) {
        this.volumeMul = 1.05
      } else {
        this.volumeMul = 1.1
      }
      if (this.time === '1') {
        this.timeMul = 1
      } else if (this.time === '2') {
        this.timeMul = 1.05
      } else if (this.time === '3') {
        this.timeMul = 1.1
      }
      console.log('timeMul=', this.timeMul, 'volumeMul=', this.volumeMul)
      this.rewardPercent = parseFloat(
        baseLevel * (1 + this.volumeMul + this.timeMul - 2)
      ).toFixed(2)
      console.log('rewardPercent:', this.rewardPercent)
    },
  },
  mounted() {
    this.recalcReward()
  },
  data() {
    return {
      time: 1,
      timeMul: 1,
      volumeMul: 1,
      volumePercent: '',
      rewardPercent: '',
      amount: 50000,
    }
  },
}
</script>

<style lang="scss" scoped>
.calculator {
  background: #fff;
  padding: 20px;
  border-radius: 10px;
  text-align: center;

  &__title {
    font-size: 26px;
    font-weight: 500;
    line-height: 32.81px;
    text-align: left;
  }

  &__image {
    max-width: 100%;
    width: 250px;
  }

  &__form {
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    &__label {
      margin-bottom: 10px;
      font-size: 26px;
      font-weight: 600;
      line-height: 30.47px;
      text-align: left;
    }

    &__input,
    &__select {
      margin-bottom: 20px;
      padding: 10px;
      width: 100%;
      max-width: 250px;
      border: 1px solid #e0e0e0;
      font-size: 18px;
      font-weight: 400;
      line-height: 22px;
      text-align: left;
      background-color: #ffffff33;
    }
  }
  &__details {
    position: relative;
    font-size: 12px;
    font-weight: 500;
    line-height: 16px;
    text-align: left;
    width: 100%;
    max-width: 250px;
    margin-bottom: 10px;
    padding-bottom: 5px;

    &::after {
      content: '';
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 1px;
      background: linear-gradient(
        90deg,
        #b7e93b 0%,
        #3bd7e6 50.47%,
        #0000ff 103.1%
      );
    }

    &__detail {
      display: flex;
      justify-content: space-between;
      margin-bottom: 10px;
      font-weight: 500;
      margin-left: 5px;
      &__value {
        font-weight: 600;
      }
    }
    &__respective {
      display: flex;
      justify-content: space-between;
      margin-bottom: 10px;
      font-size: 16px;
      font-weight: 500;
      line-height: 16px;
      text-align: left;
      width: 100%;
      max-width: 250px;
      margin-bottom: 20px;
      &__value {
        font-weight: 600;
      }
    }
  }

  &__rewards {
    margin-left: -20px;
    font-size: 18px;
    font-weight: 600;

    &-value {
      color: #000;
      font-size: 17px;
      font-weight: 700;
      margin-left: 20px;
    }
  }
}
</style>
