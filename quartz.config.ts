import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

const config: QuartzConfig = {
  configuration: {
    pageTitle: "Turma 2001",
    enableSPA: true,
    enablePopovers: true,
    locale: "pt-BR",
    analytics: {
      provider: "plausible",
    },
    baseUrl: "turma-2001.github.io",
    ignorePatterns: ["private", "templates", ".obsidian"],
    defaultDateType: "created",
    theme: {
      typography: {
        header: "PT Sans",
        body: "PT Serif",
        code: "PT Mono",
      },
      colors: {
        lightMode: {
          light: "#fbf9f9",
          lightgray: "#e7e7e7",
          gray: "#878585",
          darkgray: "#575454",
          dark: "#272323",
          secondary: "#7278c0",
          tertiary: "#1f2ed1",
          highlight: "rgba(143, 159, 169, 0.15)",
        },
        darkMode: {
          light: "#060404",
          lightgray: "#0a0a0a",
          gray: "#5e5e5e",
          darkgray: "#acacac",
          dark: "#d2d2d2",
          secondary: "#8e96f0",
          tertiary: "#1f2ed1",
          highlight: "rgba(143, 159, 169, 0.15)",
        },
      },
    },
  },
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.TableOfContents(),
      Plugin.CreatedModifiedDate({
        // you can add 'git' here for last modified from Git
        // if you do rely on git for dates, ensure defaultDateType is 'modified'
        priority: ["frontmatter", "filesystem"],
      }),
      Plugin.Latex({ renderEngine: "katex" }),
      Plugin.SyntaxHighlighting(),
      Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: true }),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.CrawlLinks({ markdownLinkResolution: "shortest" }),
      Plugin.Description(),
    ],
    filters: [Plugin.RemoveDrafts()],
    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ComponentResources({
        fontOrigin: "googleFonts",
      }),
      Plugin.ContentPage(),
      Plugin.FolderPage(),
      Plugin.TagPage(),
      Plugin.ContentIndex({
        enableSiteMap: true,
        enableRSS: true,
      }),
      Plugin.Assets(),
      Plugin.Static(),
      Plugin.NotFoundPage(),
    ],
  },
}

export default config
