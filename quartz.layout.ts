import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"
import GitHubIcon from "./quartz/components/icons/GitHubIcon"

// components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [],
  footer: Component.Footer({
    links: {
      "GitHub": {
        url: "https://github.com/Turma-2001/biblioteca",
        icon: GitHubIcon
      }
    },
  }),
}

// components for pages that display a single page (e.g. a single note)
export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
    Component.LatestContents(),
    Component.HomeworkList(),
    Component.Breadcrumbs(),
    Component.TagList(),
    Component.ArticleTitle(),
    Component.ContentMeta(),
  ],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Search(),
    Component.Darkmode(),
    Component.DesktopOnly(Component.Explorer({ title: "Assuntos e artigos" })),
  ],
  right: [
    Component.Graph(),
    Component.DesktopOnly(Component.TableOfContents()),
  ],
}

// components for pages that display lists of pages  (e.g. tags or folders)
export const defaultListPageLayout: PageLayout = {
  beforeBody: [
    Component.Breadcrumbs(),
    Component.TagList(),
    Component.ArticleTitle(),
    Component.ContentMeta()
  ],

  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Search(),
    Component.Darkmode(),
    Component.DesktopOnly(Component.Explorer({ title: "Assuntos e artigos" })),
  ],
  right: [
  ],
}
