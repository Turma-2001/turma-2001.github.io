import { FullSlug, joinSegments, pathToRoot } from "../util/path"
import { QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"

function PageTitle({ fileData, cfg, displayClass }: QuartzComponentProps) {
  const title = cfg?.pageTitle ?? "Untitled Quartz"
  const rootDir = pathToRoot(fileData.slug!)

  return (
    <h1 class={classNames(displayClass, "page-title")}>
      <svg class='page-icon' viewBox="0 0 206 252" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 0H188.44L193.443 63.182H186.402C185.537 50.706 183.437 41.1947 180.102 34.648C176.767 27.9773 172.197 23.16 166.391 20.196C160.586 17.2317 151.384 15.7495 138.784 15.7495H52.9974L129.519 113.951L42.4354 216.781H137.857C155.151 216.781 168.368 214.001 177.508 208.443C186.649 202.884 193.505 191.273 198.075 173.609L205.116 175.276L194.37 251.243H0.0100021V244.573L96.729 130.433L0.0100021 6.6631L0 0Z" />
      </svg>

      <a href={rootDir}>{title}</a>
    </h1>
  )
}

PageTitle.css = `
.page-title {
  display: flex;
  align-items: center;

  margin: 0;
}

.page-title a {
  color: var(--darkgray);
}

.page-icon {
  margin-right: 12px;
  border-radius: 0;

  width: 1.4rem;
  height: 1.4rem;

  fill: var(--darkgray);
}
`

export default (() => PageTitle) satisfies QuartzComponentConstructor
