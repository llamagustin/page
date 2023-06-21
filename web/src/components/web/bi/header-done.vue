<template>
  <div class="header-done-container">
    <div class="header-done-parent">
      <div class="header-done-frame203">
        <div class="header-done-frame112">
          <img
            alt="nft119181"
            src="/assets/images/nft119181-y0dk-200h.png"
            class="header-done-nft11"
          />
          <span class="header-done-text"><span>{{$t('walletNft')}}</span></span>
          <div data-role="BurgerMenu" class="header-done-burger-menu">
            <svg viewBox="0 0 1024 1024" class="header-done-icon">
              <path
                d="M128 554.667h768c23.552 0 42.667-19.115 42.667-42.667s-19.115-42.667-42.667-42.667h-768c-23.552 0-42.667 19.115-42.667 42.667s19.115 42.667 42.667 42.667zM128 298.667h768c23.552 0 42.667-19.115 42.667-42.667s-19.115-42.667-42.667-42.667h-768c-23.552 0-42.667 19.115-42.667 42.667s19.115 42.667 42.667 42.667zM128 810.667h768c23.552 0 42.667-19.115 42.667-42.667s-19.115-42.667-42.667-42.667h-768c-23.552 0-42.667 19.115-42.667 42.667s19.115 42.667 42.667 42.667z"
              ></path>
            </svg>
          </div>
        </div>
        <div class="header-done-frame118">
          <span class="header-done-text02"><span>{{$t('walletHome')}}</span></span>
          <span class="header-done-text04"><span>{{$t('walletMarket')}}</span></span>
          <span class="header-done-text06"><span>{{$t('walletArtist')}}</span></span>
          <span class="header-done-text08"><span>{{$t('walletCommunity')}}</span></span>
          <span class="header-done-text10"><span>{{$t('walletWallet')}}</span></span>
        </div>
        <div class="header-done-frame119">
          <span class="header-done-text12"><span>{{$t('walletLogin')}}</span></span>
          <div class="header-done-frame117">
            <span class="header-done-text14"><span>{{$t('walletSignup')}}</span></span>
          </div>
        </div>
      </div>
      <div class="header-done-container1">
        <div class="header-done-left">
          <div class="header-done-title">
            <span class="header-done-text16">{{ $t('walletTitle') }}</span>
          </div>
          <div class="header-done-container2">
            <span class="header-done-text17">
              <span>{{ $t('walletDescription') }}</span>
            </span>
          </div>
          <div class="header-done-container3">
            <div class="header-done-frame109">
              <span class="header-done-text19"><span>{{$t('walletExplore')}}</span></span>
            </div>
            <div class="header-done-frame204">
              <img
                alt="play119181"
                src="/assets/images/play119181-mh5q.svg"
                class="header-done-play11"
              />
            </div>
            <span class="header-done-text21"><span>{{$t('walletWatch')}}</span></span>
          </div>
          <div class="header-done-frame197">
            <div class="header-done-frame114 ml-2">
              <span class="header-done-text23"><span>{{$t('walletActive0')}}</span></span>
              <span class="header-done-text25"><span>{{$t('walletActiveText0')}}</span></span>
            </div>
            
            <div class="header-done-frame115 ml-2">
              <span class="header-done-text27"><span>{{$t('walletActive1')}}</span></span>
              <span class="header-done-text29"><span>{{$t('walletActiveText1')}}</span></span>
            </div>
            <div class="header-done-frame116">
              <span class="header-done-text31"><span>{{$t('walletActive2')}}</span></span>
              <span class="header-done-text33"><span>{{$t('walletActiveText2')}}</span></span>
            </div>
          </div>
        </div>
        <div class="header-done-right">
          <div class="header-done-container4">
            <img
              :alt="image113_alt"
              :src="image113_src"
              class="header-done-image113"
            />
            <img
              :alt="Rectangle115_alt"
              :src="Rectangle115_src"
              class="header-done-rectangle115"
            />
            <img
              :alt="Rectangle112_alt"
              :src="Rectangle112_src"
              class="header-done-rectangle112"
            />
          </div>
          <div class="header-done-container5">
            <img
              :alt="Rectangle111_alt"
              :src="Rectangle111_src"
              class="header-done-rectangle111"
            />
            <img
              :alt="Rectangle114_alt"
              :src="Rectangle114_src"
              class="header-done-rectangle114"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HeaderDone',
  props: {
    Rectangle114_alt: {
      type: String,
      default: 'Rectangle1149183',
    },
    Rectangle115_src: {
      type: String,
      default: '/assets/images/rectangle1159183-t6gd-200h.png',
    },
    Rectangle112_alt: {
      type: String,
      default: 'Rectangle1129183',
    },
    text: {
      type: String,
      default: 'Buy and Sell Digital Art, NFT Collection',
    },
    image113_src: {
      type: String,
      default: '/assets/images/image1139183-frjk-200h.png',
    },
    image113_alt: {
      type: String,
      default: 'image1139183',
    },
    Rectangle111_src: {
      type: String,
      default: '/assets/images/rectangle1119183-4a3r-500h.png',
    },
    Rectangle111_alt: {
      type: String,
      default: 'Rectangle1119183',
    },
    Rectangle114_src: {
      type: String,
      default: '/assets/images/rectangle1149183-tw0a-200w.png',
    },
    Rectangle112_src: {
      type: String,
      default: '/assets/images/rectangle1129183-11zr-300h.png',
    },
    Rectangle115_alt: {
      type: String,
      default: 'Rectangle1159183',
    },
  },
}
</script>

<style scoped>
.header-done-container {
  width: 100%;
  height: auto;
  display: flex;
  position: relative;
  align-items: flex-start;
  flex-direction: column;
}
.header-done-parent {
  gap: var(--dl-space-space-fourunits);
  width: 100%;
  margin: 0 auto;
  display: flex;
  max-width: 1200px;
  align-items: center;
  padding-top: var(--dl-space-space-fourunits);
  padding-left: var(--dl-space-space-fourunits);
  padding-right: var(--dl-space-space-fourunits);
  flex-direction: column;
  padding-bottom: var(--dl-space-space-fourunits);
}
.header-done-frame203 {
  width: 100%;
  height: auto;
  display: flex;
  position: relative;
  align-items: center;
  border-color: transparent;
  justify-content: space-between;
}
.header-done-frame112 {
  gap: var(--dl-space-space-unit);
  display: flex;
  align-items: center;
  border-color: transparent;
  justify-content: center;
}
.header-done-nft11 {
  width: 32px;
  height: 32px;
  border-color: transparent;
}
.header-done-text {
  color: rgba(255, 255, 255, 1);
  height: auto;
  font-size: 24px;
  align-self: auto;
  font-style: Bold;
  text-align: left;
  font-family: Ruda;
  font-weight: 700;
  line-height: normal;
  font-stretch: normal;
  text-decoration: none;
}
.header-done-burger-menu {
  display: none;
}
.header-done-icon {
  width: var(--dl-size-size-xsmall);
  height: var(--dl-size-size-xsmall);
  display: flex;
}
.header-done-frame118 {
  gap: var(--dl-space-space-twounits);
  display: flex;
  align-items: flex-start;
  margin-left: var(--dl-space-space-sixunits);
  border-color: transparent;
}
.header-done-text02 {
  color: rgba(255, 255, 255, 1);
  height: auto;
  font-size: 16px;
  align-self: auto;
  font-style: Regular;
  text-align: left;
  font-family: Open Sans;
  font-weight: 400;
  line-height: normal;
  font-stretch: normal;
  text-decoration: none;
}
.header-done-text04 {
  color: rgba(255, 255, 255, 1);
  height: auto;
  font-size: 16px;
  align-self: auto;
  font-style: Regular;
  text-align: left;
  font-family: Open Sans;
  font-weight: 400;
  line-height: normal;
  font-stretch: normal;
  text-decoration: none;
}
.header-done-text06 {
  color: rgba(255, 255, 255, 1);
  height: auto;
  font-size: 16px;
  align-self: auto;
  font-style: Regular;
  text-align: left;
  font-family: Open Sans;
  font-weight: 400;
  line-height: normal;
  font-stretch: normal;
  text-decoration: none;
}
.header-done-text08 {
  color: rgba(255, 255, 255, 1);
  height: auto;
  font-size: 16px;
  align-self: auto;
  font-style: Regular;
  text-align: left;
  font-family: Open Sans;
  font-weight: 400;
  line-height: normal;
  font-stretch: normal;
  text-decoration: none;
}
.header-done-text10 {
  color: rgba(255, 255, 255, 1);
  height: auto;
  font-size: 16px;
  align-self: auto;
  font-style: Regular;
  text-align: left;
  font-family: Open Sans;
  font-weight: 400;
  line-height: normal;
  font-stretch: normal;
  text-decoration: none;
}
.header-done-frame119 {
  gap: var(--dl-space-space-twounits);
  display: flex;
  align-items: center;
  border-color: transparent;
  justify-content: center;
}
.header-done-text12 {
  color: rgba(255, 255, 255, 1);
  height: auto;
  font-size: 16px;
  align-self: auto;
  font-style: Regular;
  text-align: left;
  font-family: Open Sans;
  font-weight: 400;
  line-height: normal;
  font-stretch: normal;
  text-decoration: none;
}
.header-done-frame117 {
  display: flex;
  padding: 12px 24px;
  align-items: center;
  border-color: transparent;
  border-radius: 4px;
  justify-content: center;
  background-image: linear-gradient(145deg, rgba(201, 34, 227, 0.4000000059604645) 0%, rgba(153, 30, 234, 0.4000000059604645) 52%, rgba(73, 23, 246, 0.4000000059604645) 100%);
}
.header-done-text14 {
  color: rgba(255, 255, 255, 1);
  height: auto;
  font-size: 16px;
  align-self: auto;
  font-style: Regular;
  text-align: left;
  font-family: Open Sans;
  font-weight: 400;
  line-height: 16px;
  font-stretch: normal;
  text-decoration: none;
}
.header-done-container1 {
  width: 100%;
  display: flex;
  position: relative;
  align-items: flex-start;
  flex-direction: row;
}
.header-done-left {
  gap: var(--dl-space-space-fourunits);
  width: 100%;
  height: auto;
  display: flex;
  padding: 0;
  align-self: auto;
  box-sizing: border-box;
  align-items: flex-start;
  flex-shrink: 1;
  border-color: transparent;
  border-style: none;
  border-width: 0;
  margin-right: 0;
  border-radius: 0px 0px 0px 0px;
  margin-bottom: 0;
  flex-direction: column;
  justify-content: flex-start;
  background-color: transparent;
}
.header-done-title {
  width: 442px;
  display: flex;
  align-items: flex-start;
  flex-direction: row;
  justify-content: flex-start;
}
.header-done-text16 {
  color: rgba(255, 255, 255, 1);
  width: auto;
  height: auto;
  font-size: 56px;
  align-self: auto;
  font-style: SemiBold;
  text-align: left;
  font-family: Open Sans;
  font-weight: 600;
  line-height: normal;
  font-stretch: normal;
  margin-right: 0;
  margin-bottom: 0;
  text-decoration: none;
}
.header-done-container2 {
  width: 442px;
  height: 48px;
  display: flex;
  align-items: flex-start;
  flex-direction: row;
  justify-content: flex-start;
}
.header-done-text17 {
  color: rgba(214, 214, 214, 1);
  width: 442px;
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
.header-done-container3 {
  gap: var(--dl-space-space-unit);
  width: auto;
  height: auto;
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: flex-start;
}
.header-done-frame109 {
  display: flex;
  padding: 16px 32px;
  align-items: center;
  border-color: transparent;
  border-radius: 4px;
  justify-content: center;
  background-image: linear-gradient(145deg, rgba(201, 34, 227, 0.4000000059604645) 0%, rgba(153, 30, 234, 0.4000000059604645) 52%, rgba(73, 23, 246, 0.4000000059604645) 100%);
}
.header-done-text19 {
  color: rgba(255, 255, 255, 1);
  height: auto;
  font-size: 16px;
  align-self: auto;
  font-style: SemiBold;
  text-align: left;
  font-family: Open Sans;
  font-weight: 600;
  line-height: normal;
  font-stretch: normal;
  text-decoration: none;
}
.header-done-frame204 {
  width: auto;
  height: auto;
  display: flex;
  align-items: center;
  padding-top: 16px;
  border-color: linear-gradient(145deg, rgba(201, 34, 227, 0.4000000059604645) 0%, rgba(153, 30, 234, 0.4000000059604645) 52%, rgba(73, 23, 246, 0.4000000059604645) 100%);
  border-width: 1px;
  padding-left: 16px;
  border-radius: 50px;
  padding-right: 16px;
  padding-bottom: 16px;
  justify-content: center;
  background-image: linear-gradient(145deg, rgba(201, 34, 227, 0.4000000059604645) 0%, rgba(153, 30, 234, 0.4000000059604645) 52%, rgba(73, 23, 246, 0.4000000059604645) 100%);
}
.header-done-play11 {
  width: 16px;
  height: 16px;
  z-index: 1;
}
.header-done-text21 {
  color: rgba(255, 255, 255, 1);
  height: auto;
  font-size: 16px;
  align-self: auto;
  font-style: Regular;
  text-align: left;
  font-family: Open Sans;
  font-weight: 400;
  line-height: normal;
  font-stretch: normal;
  text-decoration: none;
}
.header-done-frame197 {
  gap: var(--dl-space-space-threeunits);
  display: flex;
  padding: 24px 47px;
  align-items: flex-start;
  border-color: transparent;
  flex-direction: row;
  background-color: rgba(255, 255, 255, 0.12999999523162842);
}
.header-done-frame114 {
  display: flex;
  align-items: center;
  border-color: transparent;
  flex-direction: column;
}
.header-done-text23 {
  color: rgba(255, 255, 255, 1);
  height: auto;
  font-size: 36px;
  align-self: auto;
  font-style: Bold;
  text-align: left;
  font-family: Ruda;
  font-weight: 700;
  line-height: 40px;
  font-stretch: normal;
  text-decoration: none;
}
.header-done-text25 {
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
  text-decoration: none;
}
.header-done-frame115 {
  display: flex;
  align-items: center;
  border-color: transparent;
  flex-direction: column;
  justify-content: center;
}
.header-done-text27 {
  color: rgba(255, 255, 255, 1);
  height: auto;
  font-size: 36px;
  align-self: auto;
  font-style: Bold;
  text-align: left;
  font-family: Ruda;
  font-weight: 700;
  line-height: 40px;
  font-stretch: normal;
  text-decoration: none;
}
.header-done-text29 {
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
  text-decoration: none;
}
.header-done-frame116 {
  display: flex;
  align-items: center;
  border-color: transparent;
  flex-direction: column;
  justify-content: center;
}
.header-done-text31 {
  color: rgba(255, 255, 255, 1);
  height: auto;
  font-size: 36px;
  align-self: auto;
  font-style: Bold;
  text-align: left;
  font-family: Ruda;
  font-weight: 700;
  line-height: 40px;
  font-stretch: normal;
  text-decoration: none;
}
.header-done-text33 {
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
  text-decoration: none;
}
.header-done-right {
  display: flex;
  align-items: flex-start;
  flex-direction: column;
}
.header-done-container4 {
  gap: 100px;
  width: auto;
  display: flex;
  align-items: flex-start;
  flex-direction: row;
}
.header-done-image113 {
  width: 140px;
  height: 140px;
  border-color: transparent;
  border-radius: 8px;
}
.header-done-rectangle115 {
  width: 72px;
  height: 72px;
  border-color: transparent;
  border-radius: 8px;
}
.header-done-rectangle112 {
  width: auto;
  height: 248px;
  z-index: 1;
  margin-top: 50px;
  border-color: transparent;
  border-radius: 8px;
  margin-bottom: -70px;
}
.header-done-container5 {
  gap: var(--dl-space-space-fourunits);
  display: flex;
  align-items: center;
  flex-direction: row;
}
.header-done-rectangle111 {
  width: 499px;
  height: 493px;
  border-color: transparent;
  border-radius: 8px;
}
.header-done-rectangle114 {
  width: 130px;
  height: 130px;
  margin-top: 100px;
  border-color: transparent;
  border-radius: 8px;
}
@media(max-width: 1200px) {
  .header-done-left {
    width: auto;
    z-index: 1;
  }
  .header-done-right {
    max-width: 100%;
    margin-left: -120px;
  }
  .header-done-image113 {
    width: auto;
    height: auto;
  }
  .header-done-rectangle115 {
    width: auto;
    height: auto;
  }
  .header-done-rectangle112 {
    height: auto;
  }
  .header-done-container5 {
    gap: var(--dl-space-space-twounits);
    max-width: 100%;
  }
  .header-done-rectangle111 {
    width: auto;
    height: auto;
  }
  .header-done-rectangle114 {
    width: auto;
    height: auto;
  }
}
@media(max-width: 991px) {
  .header-done-frame203 {
    width: 100%;
  }
  .header-done-burger-menu {
    display: flex;
  }
  .header-done-icon {
    fill: #ffffff;
  }
  .header-done-frame118 {
    display: none;
    margin-left: 0px;
  }
  .header-done-right {
    max-width: 100%;
    margin-left: -200px;
  }
  .header-done-rectangle111 {
    max-width: 100%;
  }
}
@media(max-width: 767px) {
  .header-done-burger-menu {
    display: flex;
    align-items: center;
    margin-right: 16px;
    justify-content: center;
  }
}
@media(max-width: 479px) {
  .header-done-parent {
    gap: var(--dl-space-space-fourunits);
    padding-top: var(--dl-space-space-twounits);
    padding-left: var(--dl-space-space-oneandhalfunits);
    padding-right: var(--dl-space-space-oneandhalfunits);
    padding-bottom: var(--dl-space-space-twounits);
  }
  .header-done-frame203 {
    gap: var(--dl-space-space-unit);
    width: auto;
    flex-wrap: wrap;
    justify-content: center;
  }
  .header-done-frame118 {
    margin-left: 0px;
  }
  .header-done-container1 {
    gap: var(--dl-space-space-threeunits);
    flex-direction: column;
  }
  .header-done-title {
    width: auto;
  }
  .header-done-text16 {
    font-size: 40px;
  }
  .header-done-container2 {
    width: auto;
    height: auto;
  }
  .header-done-text17 {
    width: auto;
  }
  .header-done-frame197 {
    padding-left: var(--dl-space-space-oneandhalfunits);
    padding-right: var(--dl-space-space-oneandhalfunits);
  }
  .header-done-right {
    gap: var(--dl-space-space-oneandhalfunits);
    position: relative;
    margin-left: 0px;
  }
  .header-done-container4 {
    gap: var(--dl-space-space-unit);
    width: 100%;
    height: auto;
    flex-direction: column;
  }
  .header-done-rectangle115 {
    margin-left: 300px;
  }
  .header-done-rectangle112 {
    width: auto;
    margin-top: 0px;
    margin-left: var(--dl-space-space-sixunits);
    margin-bottom: 0px;
  }
  .header-done-container5 {
    flex-direction: column;
  }
  .header-done-rectangle114 {
    margin-top: 0px;
  }
}
</style>
