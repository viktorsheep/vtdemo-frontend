import Components from "unplugin-vue-components/vite";
import { NaiveUiResolver } from "unplugin-vue-components/resolvers";

export default defineNuxtConfig({
  css: ["~/assets/css/fonts.css", "~/assets/css/overwrite.scss"],

  devtools: { enabled: false },

  devServer: {
    host: 'localhost',
    port: 3001,
    url: "http://localhost:3001"
  },

  ssr: false,

  vite: {
    plugins: [
      Components({
        dts: true,
        resolvers: [NaiveUiResolver()],
      }),
    ],

    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "@/assets/style/global.scss" as *;',
        },
      },
    },

  },
  router: {
    options: {
      hashMode: true
    }
  },
  app: {
    head: {
      title: "Venture Tool",
      htmlAttrs: {
        lang: "en",
      },
      meta: [
        { name: "viewport", content: "width=device-width, initial-scale=1" },
      ],
      script: [],
      link: [],
      style: [],
    },
    pageTransition: false,
    layoutTransition: false,
  },

  modules: ["@pinia/nuxt"],

  imports: {
    dirs: ["./stores"],
  },

  pinia: {
    // autoImports: ["defineStore", "acceptHMRUpdate"],
  },

  typescript: {
    tsConfig: {
      compilerOptions: {
        verbatimModuleSyntax: false
      }
    }
  },

  runtimeConfig: {
    public: {
      publicBase: 'http://localhost:8000/api/v1/',
      publicBaseUnslashed: 'http://localhost:8000/api/v1',

      baseRootURL: 'http://localhost:8000/',
      baseRootURLUnslashed: 'http://localhost:8000',
    }
  }
});
