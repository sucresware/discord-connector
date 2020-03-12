<template>
  <div class="container h-100">
    <div class="row align-items-center justify-content-center h-100">
      <div class="col-10 col-sm-8 col-md-6 col-lg-5">
        <div v-show="!loading.loading">
          <div
            v-show="page == 1"
            :class="{
            'animated': true,
            'fadeInRight': transition.inbound == 1,
            'fadeOutLeft': transition.outbound == 1,
          }"
          >
            <div class="row align-items-center">
              <div class="col-auto">
                <img
                  src="@/assets/img/discord-connector.png"
                  class="img-fluid"
                  style="width: 80px;"
                />
              </div>
              <div class="col">
                <h1 class="h5 mb-0">Connecteur 4sucres-Discord</h1>
                <span class="text-muted">{{ config.version }}</span>
                <br />
                <div class="mt-3">
                  <button class="btn btn-primary btn-sm" @click="gotoPage(2)">
                    Ah oui oui
                    <font-awesome-icon icon="angle-right" />
                  </button>
                </div>
              </div>
            </div>

            <div class="mb-5"></div>
          </div>
        </div>
        <div
          v-show="page == 2"
          :class="{
            'animated': true,
            'fadeInRight': transition.inbound == 2,
            'fadeOutLeft': transition.outbound == 2,
          }"
        >
          <p>
            <strong>Avant de commencer, je te rappelle que :</strong>
          </p>
          <ul>
            <li>Cette application peut être considérée comme un selfbot, ce qui enfreint les conditions d'utilisation de Discord.</li>
            <li>4sucres.org ne peut pas être tenu responsable d'une mauvaise utilisation du connecteur.</li>
          </ul>
          <div class="text-right">
            <button class="btn btn-primary" @click="gotoPage(3)">
              Je prends la main
              <font-awesome-icon icon="angle-right" />
            </button>
          </div>
        </div>
        <div
          v-show="page == 3"
          :class="{
            'animated': true,
            'fadeInRight': transition.inbound == 3,
            'fadeOutLeft': transition.outbound == 3,
          }"
        >
          <p>
            <strong>Connexion aux services :</strong>
          </p>

          <div class="card mb-3 shadow">
            <div class="card-body">
              <div class="row align-items-center">
                <div class="col-auto pr-0">
                  <font-awesome-layers class="fa-2x">
                    <font-awesome-icon
                      icon="circle"
                      :class="{
                      'text-success': accounts.fourSucres.connected,
                      'text-info': accounts.fourSucres.connecting,
                      'text-danger': accounts.fourSucres.hasError,
                      'text-primary': true,
                      }"
                    />
                    <font-awesome-icon
                      icon="check"
                      style="color: white;"
                      transform="shrink-6"
                      v-if="accounts.fourSucres.connected"
                    />
                    <font-awesome-icon
                      icon="sync"
                      style="color: white;"
                      transform="shrink-6"
                      v-if="accounts.fourSucres.connecting"
                      spin
                    />
                    <font-awesome-icon
                      icon="times"
                      style="color: white;"
                      transform="shrink-6"
                      v-if="accounts.fourSucres.hasError"
                    />
                  </font-awesome-layers>
                </div>
                <div class="col">
                  <div class="mb-2">
                    <strong
                      :class="{
                  'text-success': accounts.fourSucres.connected,
                  'text-danger': accounts.fourSucres.hasError
                }"
                    >4sucres.org</strong>
                  </div>
                  <input
                    v-model="accounts.fourSucres.token"
                    class="form-control input-darker"
                    placeholder="oGyw2AaPwiwO9FBIPEiBNNuYTPJvmNCClpyariSf"
                    type="text"
                    :disabled="accounts.fourSucres.connecting || accounts.fourSucres.connected "
                  />

                  <div
                    class="p-1 text-danger"
                    v-show="accounts.fourSucres.hasError"
                  >{{ accounts.fourSucres.hasError }}</div>
                </div>
              </div>
            </div>
            <hr class="m-0" />
            <div class="card-body">
              <div class="row align-items-center">
                <div class="col-auto pr-0">
                  <font-awesome-layers class="fa-2x">
                    <font-awesome-icon
                      icon="circle"
                      :class="{
                      'text-success': accounts.discord.connected,
                      'text-info': accounts.discord.connecting,
                      'text-danger': accounts.discord.hasError,
                      'text-primary': true,
                      }"
                    />
                    <font-awesome-icon
                      icon="check"
                      style="color: white;"
                      transform="shrink-6"
                      v-if="accounts.discord.connected"
                    />
                    <font-awesome-icon
                      icon="sync"
                      style="color: white;"
                      transform="shrink-6"
                      v-if="accounts.discord.connecting"
                      spin
                    />
                    <font-awesome-icon
                      icon="times"
                      style="color: white;"
                      transform="shrink-6"
                      v-if="accounts.discord.hasError"
                    />
                  </font-awesome-layers>
                </div>
                <div class="col">
                  <div class="mb-2">
                    <strong
                      :class="{
                  'text-success': accounts.discord.connected,
                  'text-danger': accounts.discord.hasError
                }"
                    >Discord</strong>
                  </div>
                  <input
                    v-model="accounts.discord.token"
                    class="form-control input-darker mb-2"
                    placeholder="NNuYTPJvmNCClpyariSfoGyw2AaPwiwO9FBIPEiB"
                    type="text"
                    :disabled="accounts.discord.connecting || accounts.discord.connected"
                  />
                  <div
                    class="p-1 text-danger"
                    v-show="accounts.discord.hasError"
                  >{{ accounts.discord.hasError }}</div>
                </div>
              </div>
            </div>
          </div>
          <div class="text-right">
            <button class="btn btn-primary" @click="connect()">
              Valider
              <font-awesome-icon icon="check" />
            </button>
          </div>
        </div>
        <div
          v-show="page == 4"
          :class="{
            'animated': true,
            'fadeInRight': transition.inbound == 4,
            'fadeOutLeft': transition.outbound == 4,
          }"
        >
          <div class="text-left">
            <div class="mb-5 mx-auto" style="width: 350px">
              <FourSucresLogo />
            </div>
            <div class="row align-items-center">
              <div class="col-auto">
                <font-awesome-icon icon="sync" spin size="2x" />
              </div>
              <div class="col">
                <h1 class="h5 mb-0">Échanges en cours</h1>
                <div class="mt-1">
                  <p v-html="loading.status"></p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          v-show="page == 5"
          :class="{
            'animated': true,
            'fadeInRight': transition.inbound == 5,
            'fadeOutLeft': transition.outbound == 5,
          }"
        >
          <div class="text-left">
            <div class="mb-5 mx-auto" style="width: 350px">
              <FourSucresLogo />
            </div>
            <div class="row align-items-center">
              <div class="col-auto">
                <font-awesome-icon icon="check" size="2x" />
              </div>
              <div class="col">
                <h1 class="h5 mb-0 text-success">Synchronisation terminée !</h1>
                <div class="mt-1">Retourne sur 4sucres pour profiter de tes emojis !</div>
              </div>
            </div>
          </div>
        </div>
        <div
          v-show="page == 6"
          :class="{
            'animated': true,
            'fadeInRight': transition.inbound == 5,
            'fadeOutLeft': transition.outbound == 5,
          }"
        >
          <div class="text-left">
            <div class="mb-5 mx-auto" style="width: 350px">
              <FourSucresLogo />
            </div>
            <div class="row align-items-center">
              <div class="col-auto">
                <font-awesome-icon icon="times" size="2x" />
              </div>
              <div class="col">
                <h1 class="h5 mb-0 text-danger">Erreur !</h1>
                <div class="mt-1">Une erreur de synchronisation s'est produite. Réessaie plus tard.</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import FourSucresLogo from "@/assets/svg/4sucres_alt.svg";
const axios = require("axios");
const Discord = require("discord.js");
const client = new Discord.Client();

export default {
  name: "landing-page",
  data() {
    return {
      transition: {
        inbound: null,
        outbound: null
      },
      page: 0,
      loading: {
        loading: false,
        status: null
      },
      accounts: {
        fourSucres: {
          token: null,
          connecting: false,
          connected: false,
          hasError: false
        },
        discord: {
          token: null,
          connecting: false,
          connected: false,
          hasError: false
        }
      }
    };
  },
  components: {
    FourSucresLogo
  },
  methods: {
    gotoPage(page) {
      let vm = this;
      let nextPage = page;

      vm.transition.outbound = vm.page;
      vm.transition.inbound = nextPage;
      setTimeout(() => {
        vm.transition.outbound = null;
        vm.page = nextPage;
        setTimeout(() => {
          vm.transition.inbound = null;
        }, 300);
      }, 300);
    },
    connect() {
      let vm = this;

      if (!this.accounts.fourSucres.connected) {
        this.accounts.fourSucres.connecting = true;
        this.accounts.fourSucres.connected = false;
        this.accounts.fourSucres.hasError = false;
        axios.defaults.headers.common["Content-Type"] =
          "application/x-www-form-urlencoded";
        axios.defaults.headers.common["Accept"] = "application/json";
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${this.accounts.fourSucres.token}`;
        axios.defaults.baseURL = "https://" + this.config.server + "/api/v1/";

        axios
          .get("@me")
          .then(function(response) {
            vm.accounts.fourSucres.connecting = false;
            vm.accounts.fourSucres.connected = true;
            console.log(response);
            if (vm.accounts.discord.connected) {
              vm.gotoPage(4);
              vm.dump();
            }
          })
          .catch(function() {
            vm.accounts.fourSucres.connecting = false;
            vm.accounts.fourSucres.hasError =
              "Oh putain j'me suis dit oulaaa !";
          });
      }

      if (!this.accounts.discord.connected) {
        this.accounts.discord.connecting = true;

        client
          .login(this.accounts.discord.token)
          .then(response => {
            vm.accounts.discord.connecting = false;
            vm.accounts.discord.connected = true;
            vm.accounts.discord.hasError = false;
            if (vm.accounts.fourSucres.connected) {
              vm.gotoPage(4);
              vm.dump();
            }
            console.log(response);
          })
          .catch(error => {
            vm.accounts.discord.connecting = false;
            vm.accounts.discord.connected = false;
            vm.accounts.discord.hasError = "Oh putain j'me suis dit oulaaa !";
          });
      }
    },
    async dump() {
      for (const guild of client.guilds) {
        this.loading.status = "Serveur : " + guild[1].name;
        try {
          await axios({
            url: "discord-guilds",
            method: "post",
            data: {
              id: guild[0],
              icon: guild[1].icon,
              name: guild[1].name
            }
          });
        } catch (error) {
          console.log(error);
          this.gotoPage(6);
        }

        let postEmojis = [];

        for (const emoji of guild[1].emojis) {
          postEmojis.push({
            id: emoji[0],
            name: emoji[1].name,
            animated: emoji[1].animated,
            deleted: emoji[1].deleted,
          });
        }

        if (postEmojis.length) {
          this.loading.status = "Serveur : " + guild[1].name;

          try {
              await axios({
                url: "discord-emojis",
                method: "post",
                data: {
                  guild_id: guild[0],
                  emojis: postEmojis
                }
              });
            } catch (error) {
              console.log(error);
              this.gotoPage(6);
            }
          }
      }

      this.gotoPage(5);
    }
  },
  mounted() {
    this.gotoPage(1);
  }
};
</script>

<style lang="scss">
@import url("https://rsms.me/inter/inter.css");

@supports (font-variation-settings: normal) {
  html {
    font-family: "Inter var", sans-serif;
  }
}

html,
body,
#app,
.h-100 {
  font-family: "Inter", sans-serif;
  height: 100%;
  overflow-x: hidden;
}

$body-bg: #232832;
$body-color: #d8dee9;

$font-family-sans-serif: "Inter", sans-serif;

$line-height-base: 1.4;
$font-size-base: 0.9rem;
$primary: #5e81ac;
$light: #ffffff;
$card-border-width: 1px;
$card-default-border: rgba(0, 0, 0, 0);
$card-cap-bg: $body-bg;
$border-color: #dcddde;
$blue: #81a1c1;
$red: #bf616a;
$indigo: #6574cd;
$purple: #b48ead;
$pink: #f66d9b;
$orange: #d08770;
$yellow: #ebcb8b;
$green: #a3be8c;
$teal: #4dc0b5;
$cyan: #6cb2eb;
$gray: #fbfbfc;
$dark: #3b4252;
$darker: #2e3440;

@import "~bootstrap/scss/bootstrap";

.input-darker {
  color: #fff;
  background-color: $darker;
  border-color: lighten($darker, 10%);

  &:focus {
    color: #fff;
    background-color: $darker;
    border-color: lighten($darker, 10%);
  }

  &:disabled,
  &[readonly] {
    background-color: darken($darker, 5%);
    color: darken(#fff, 10%);
    opacity: 1;
  }
}

.card {
  background-color: $darker;
  border-color: lighten($darker, 10%);
}

.card-body {
  background-color: #3b4252;
}

.floating-foursucres {
  * {
    transform: translate(0, 0);
  }

  @for $i from 1 through 8 {
    $duration: (random(1000) + 3000);

    .sq-#{$i} {
      animation: float-#{$i} #{$duration}ms ease-in-out infinite;
    }
  }

  $duration: (random(1000) + 3000);

  .logo-four {
    animation: float-logo #{$duration}ms ease-in-out infinite;
  }

  $duration: (random(1000) + 3000);

  .logo-sucres {
    animation: float-logo #{$duration}ms ease-in-out infinite;
  }
}

@for $i from 1 through 8 {
  @keyframes float-#{$i} {
    0% {
      transform: translate(0, 0);
    }

    50% {
      transform: translate(0, -70px);
    }

    100% {
      transform: translate(0, 0);
    }
  }
}

@keyframes float-logo {
  0% {
    transform: translate(0, 0);
  }

  50% {
    transform: translate(0, -50px);
  }

  100% {
    transform: translate(0, 0);
  }
}

$animationDuration: 0.3s;

@import "~vue2-animate/src/sass/vue2-animate.scss";
</style>
