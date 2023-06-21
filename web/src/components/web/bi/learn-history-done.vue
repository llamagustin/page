<template>
  <div class="learn-history-done-container">
    <div class="learn-history-done-group375">
      <div class="learn-history-done-container1">
        <div class="learn-history-done-container2">
          <span class="learn-history-done-text"><span>{{$t('walletLearn')}}</span></span>
          <span class="learn-history-done-text02">
            <span>{{$t('walletLearnDesc')}}</span>
          </span>
        </div>
        <div class="learn-history-done-group373">
          <img
            alt="imagesG7dVpFHMtransformed19183"
            src="/assets/images/imagesg7dvpfhmtransformed19183-9iw4-400w.png"
            class="learn-history-done-images-g7d-vp-f-mtransformed1"
          />
          <div class="learn-history-done-container3">
            <img
              alt="Rectangle919183"
              src="/assets/images/rectangle919183-s7bl-200h.png"
              class="learn-history-done-rectangle91"
            />
            <div class="learn-history-done-container4">
              <span class="learn-history-done-text04"><span>12K+</span></span>
              <span class="learn-history-done-text06"><span>Statue</span></span>
            </div>
          </div>
        </div>
      </div>
      <div class="learn-history-done-container5">
        <div>
          <div class="learn-history-done-container6">
            <span class="learn-history-done-text08"><span>{{$t('walletScreen')}}</span></span>
          </div>
          <img
            alt="Arrow89183"
            src="/assets/images/arrow89183-1mvf.svg"
            class="learn-history-done-arrow8"
          />
        </div>
        <div>
          <img
            alt="Rectangle939183"
            src="/assets/images/rectangle939183-ngac-200h.png"
            class="learn-history-done-rectangle93"
          />
          <div class="learn-history-done-frame260">
            <img
              :alt="Frame_alt1"
              :src="Frame_src1"
              class="learn-history-done-frame"
            />
            <span class="learn-history-done-text10">
              <span>{{$t('walletMetadrive')}}</span>
            </span>
          </div>
        </div>
        <div class="learn-history-done-frame3">
          <img
            :alt="Rectangle94_alt"
            :src="Rectangle94_src"
            class="learn-history-done-rectangle94"
          />
          <div class="learn-history-done-frame2601">
            <img
              :alt="Frame_alt2"
              :src="Frame_src2"
              class="learn-history-done-frame1"
            />
            <span class="learn-history-done-text12">
              <span>{{$t('walletCloudAr')}}</span>
            </span>
          </div>
        </div>
        <div class="learn-history-done-frame4">
          <img
            alt="Rectangle929183"
            src="/assets/images/rectangle929183-mdd-200h.png"
            class="learn-history-done-rectangle92"
          />
          <div class="learn-history-done-frame2602">
            <img
              :alt="Frame_alt"
              :src="Frame_src"
              class="learn-history-done-frame2"
            />
            <span class="learn-history-done-text14">
              <span>{{$t('wallethub2H')}}</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LearnHistoryDone',
  props: {
    Frame_alt: {
      type: String,
      default: 'Frame9317',
    },
    Rectangle94_alt: {
      type: String,
      default: 'Rectangle949183',
    },
    Frame_alt1: {
      type: String,
      default: 'Frame9317',
    },
    Frame_src: {
      type: String,
      default: '/assets/images/frame9317-1x3.svg',
    },
    Frame_alt2: {
      type: String,
      default: 'Frame9317',
    },
    Rectangle94_src: {
      type: String,
      default: '/assets/images/rectangle949183-6d9-200h.png',
    },
    Frame_src1: {
      type: String,
      default: '/assets/images/frame9317-1x3.svg',
    },
    Frame_src2: {
      type: String,
      default: '/assets/images/frame9317-1x3.svg',
    },
  },
}
</script>

<style scoped>
.learn-history-done-container {
  width: 100%;
  height: auto;
  display: flex;
  position: relative;
  align-items: center;
  flex-direction: column;
}
.learn-history-done-group375 {
  gap: var(--dl-space-space-twounits);
  width: auto;
  height: auto;
  display: flex;
  position: relative;
  align-self: auto;
  box-sizing: border-box;
  align-items: flex-start;
  flex-shrink: 1;
  padding-top: var(--dl-space-space-threeunits);
  border-color: transparent;
  border-style: none;
  border-width: 0;
  margin-right: 0;
  padding-left: var(--dl-space-space-oneandhalfunits);
  border-radius: 0px 0px 0px 0px;
  margin-bottom: 0;
  padding-right: var(--dl-space-space-oneandhalfunits);
  flex-direction: row;
  padding-bottom: var(--dl-space-space-threeunits);
  justify-content: center;
  background-color: transparent;
}
.learn-history-done-container1 {
  gap: var(--dl-space-space-twounits);
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  justify-content: flex-start;
}
.learn-history-done-container2 {
  width: 100%;
  height: auto;
  display: flex;
  align-items: flex-start;
  flex-direction: row;
  justify-content: space-between;
}
.learn-history-done-text {
  color: rgba(255, 255, 255, 1);
  height: auto;
  font-size: 32px;
  align-self: auto;
  font-style: SemiBold;
  text-align: left;
  font-family: Ruda;
  font-weight: 600;
  line-height: normal;
  font-stretch: normal;
  text-decoration: none;
}
.learn-history-done-text02 {
  color: rgba(214, 214, 214, 1);
  width: 291px;
  height: auto;
  font-size: 16px;
  align-self: auto;
  font-style: Regular;
  text-align: left;
  font-family: Open Sans;
  font-weight: 400;
  line-height: 150%;
  font-stretch: normal;
  text-decoration: none;
}
.learn-history-done-group373 {
  width: 614px;
  height: 400px;
  display: flex;
  padding: 0;
  box-sizing: border-box;
  align-items: center;
  flex-shrink: 1;
  border-color: transparent;
  border-style: none;
  border-width: 0;
  border-radius: 0px 0px 0px 0px;
  flex-direction: row;
  justify-content: center;
  background-color: transparent;
  background-image: linear-gradient(148deg, rgba(198, 34, 228, 0.4000000059604645) 0%, rgba(109, 26, 241, 0.4000000059604645) 100%);
}
.learn-history-done-images-g7d-vp-f-mtransformed1 {
  width: 379px;
  height: 393px;
  border-color: transparent;
}
.learn-history-done-container3 {
  width: 176px;
  height: 160px;
  display: flex;
  position: relative;
  align-items: center;
  flex-direction: row;
  justify-content: center;
}
.learn-history-done-rectangle91 {
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  position: absolute;
  border-color: transparent;
  border-radius: 80px 0 0 80px;
}
.learn-history-done-container4 {
  display: flex;
  padding: var(--dl-space-space-unit);
  transform: rotate(-45deg);
  align-items: center;
  border-color: var(--dl-color-gray-black);
  border-width: 1px;
  margin-right: var(--dl-space-space-twounits);
  border-radius: 50px;
  flex-direction: column;
  justify-content: center;
}
.learn-history-done-text04 {
  color: rgba(214, 214, 214, 1);
  height: auto;
  font-size: 20px;
  align-self: auto;
  font-style: SemiBold;
  text-align: left;
  font-family: Open Sans;
  font-weight: 600;
  line-height: normal;
  font-stretch: normal;
  margin-right: 0;
  margin-bottom: 2px;
  text-decoration: none;
}
.learn-history-done-text06 {
  color: rgba(214, 214, 214, 1);
  height: auto;
  font-size: 14px;
  align-self: auto;
  font-style: Regular;
  text-align: left;
  font-family: Open Sans;
  font-weight: 400;
  line-height: normal;
  font-stretch: normal;
  margin-right: 0;
  margin-bottom: 0;
  text-decoration: none;
}
.learn-history-done-container5 {
  width: 574px;
  height: 531px;
  display: grid;
  align-items: flex-start;
  flex-direction: row;
  justify-content: flex-start;
  grid-template-columns: 1fr 1fr;
}
.learn-history-done-frame1 {
  gap: var(--dl-space-space-unit);
  display: flex;
  margin-top: var(--dl-space-space-oneandhalfunits);
  align-items: center;
  border-color: transparent;
  border-style: solid;
  border-width: 1px;
  border-radius: 4px;
  flex-direction: column;
  justify-content: center;
}
.learn-history-done-container6 {
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
}
.learn-history-done-text08 {
  color: rgba(255, 255, 255, 1);
  height: auto;
  margin: var(--dl-space-space-unit);
  font-size: 18px;
  align-self: auto;
  font-style: Regular;
  text-align: left;
  font-family: Open Sans;
  font-weight: 400;
  line-height: 20px;
  font-stretch: normal;
  text-decoration: none;
}
.learn-history-done-arrow8 {
  width: auto;
  height: auto;
}
.learn-history-done-frame2 {
  gap: var(--dl-space-space-twounits);
  display: flex;
  padding: var(--dl-space-space-unit);
  align-items: center;
  border-color: transparent;
  flex-direction: column;
  justify-content: center;
}
.learn-history-done-rectangle93 {
  width: auto;
  height: auto;
  position: relative;
  border-color: transparent;
  margin-bottom: 0px;
}
.learn-history-done-frame260 {
  display: flex;
  position: relative;
  align-items: center;
  border-color: transparent;
}
.learn-history-done-frame {
  width: 25px;
  height: 24px;
  position: relative;
  margin-right: 12px;
}
.learn-history-done-text10 {
  color: rgba(214, 214, 214, 1);
  height: auto;
  font-size: 16px;
  align-self: auto;
  font-style: Regular;
  text-align: left;
  font-family: Open Sans;
  font-weight: 400;
  line-height: normal;
  font-stretch: normal;
  margin-right: 0;
  margin-bottom: 0;
  text-decoration: none;
}
.learn-history-done-frame3 {
  gap: var(--dl-space-space-twounits);
  display: flex;
  padding: var(--dl-space-space-unit);
  align-items: center;
  border-color: transparent;
  flex-direction: column;
  justify-content: center;
}
.learn-history-done-rectangle94 {
  width: auto;
  height: auto;
  position: relative;
  border-color: transparent;
}
.learn-history-done-frame2601 {
  display: flex;
  position: relative;
  align-items: center;
  border-color: transparent;
}
.learn-history-done-frame1 {
  width: 25px;
  height: 24px;
  position: relative;
  margin-right: 12px;
}
.learn-history-done-text12 {
  color: rgba(214, 214, 214, 1);
  height: auto;
  font-size: 16px;
  align-self: auto;
  font-style: Regular;
  text-align: left;
  font-family: Open Sans;
  font-weight: 400;
  line-height: normal;
  font-stretch: normal;
  margin-right: 0;
  margin-bottom: 0;
  text-decoration: none;
}
.learn-history-done-frame4 {
  gap: var(--dl-space-space-twounits);
  display: flex;
  padding: var(--dl-space-space-unit);
  align-items: center;
  border-color: transparent;
  flex-direction: column;
  justify-content: center;
}
.learn-history-done-rectangle92 {
  width: auto;
  height: auto;
  position: relative;
  border-color: transparent;
  margin-bottom: 0px;
}
.learn-history-done-frame2602 {
  display: flex;
  position: relative;
  align-items: center;
  border-color: transparent;
}
.learn-history-done-frame2 {
  width: 25px;
  height: 24px;
  position: relative;
  margin-right: 12px;
}
.learn-history-done-text14 {
  color: rgba(214, 214, 214, 1);
  height: auto;
  font-size: 16px;
  align-self: auto;
  font-style: Regular;
  text-align: left;
  font-family: Open Sans;
  font-weight: 400;
  line-height: normal;
  font-stretch: normal;
  margin-right: 0;
  margin-bottom: 0;
  text-decoration: none;
}
@media(max-width: 1200px) {
  .learn-history-done-container1 {
    width: auto;
    min-width: 491px;
  }
  .learn-history-done-group373 {
    width: auto;
    height: auto;
  }
  .learn-history-done-images-g7d-vp-f-mtransformed1 {
    width: auto;
    height: auto;
    max-width: 100%;
    min-width: 214px;
  }
  .learn-history-done-rectangle91 {
    width: 100%;
    height: 100%;
  }
  .learn-history-done-container5 {
    width: auto;
    height: auto;
  }
  .learn-history-done-rectangle93 {
    width: auto;
    height: auto;
  }
  .learn-history-done-rectangle94 {
    width: auto;
    height: auto;
  }
}
@media(max-width: 991px) {
  .learn-history-done-group375 {
    flex-direction: column;
  }
  .learn-history-done-container5 {
    width: auto;
    height: auto;
  }
  .learn-history-done-rectangle93 {
    max-width: 100%;
  }
  .learn-history-done-rectangle94 {
    max-width: 100%;
  }
  .learn-history-done-rectangle92 {
    max-width: 100%;
  }
}
@media(max-width: 479px) {
  .learn-history-done-group375 {
    width: 100%;
  }
  .learn-history-done-container1 {
    min-width: auto;
  }
  .learn-history-done-group373 {
    width: auto;
  }
  .learn-history-done-images-g7d-vp-f-mtransformed1 {
    width: 282px;
    height: 279px;
    max-width: 100%;
    min-width: auto;
  }
  .learn-history-done-container3 {
    width: 81px;
    height: 69px;
  }
  .learn-history-done-rectangle91 {
    width: 100%;
    height: 100%;
  }
  .learn-history-done-container4 {
    padding: 0px;
  }
  .learn-history-done-text04 {
    font-size: 15px;
  }
  .learn-history-done-text06 {
    font-size: 10px;
  }
  .learn-history-done-container5 {
    grid-gap: 8px;
  }
  .learn-history-done-frame2 {
    padding: 0px;
  }
  .learn-history-done-rectangle93 {
    max-width: 100%;
  }
  .learn-history-done-frame3 {
    padding: 0px;
  }
  .learn-history-done-rectangle94 {
    width: auto;
    max-width: 100%;
  }
  .learn-history-done-frame4 {
    padding: 0px;
  }
  .learn-history-done-rectangle92 {
    max-width: 100%;
  }
}
</style>
