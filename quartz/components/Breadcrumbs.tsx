import { QuartzComponentConstructor, QuartzComponentProps } from "./types"
import breadcrumbsStyle from "./styles/breadcrumbs.scss"
import { FullSlug, SimpleSlug, resolveRelative } from "../util/path"
import { QuartzPluginData } from "../plugins/vfile"
import { classNames } from "../util/lang"

type CrumbData = {
  icon?: string
  displayName: string
  path: string
}

interface BreadcrumbOptions {
  /**
   * Name of first crumb
   */
  rootName: string
  /**
   * Whether to look up frontmatter title for folders (could cause performance problems with big vaults)
   */
  resolveFrontmatterTitle: boolean
  /**
   * Whether to display breadcrumbs on root `index.md`
   */
  hideOnRoot: boolean
  /**
   * Whether to display the current page in the breadcrumbs.
   */
  showCurrentPage: boolean
}

const defaultOptions: BreadcrumbOptions = {
  rootName: "Página Inicial",
  resolveFrontmatterTitle: true,
  hideOnRoot: true,
  showCurrentPage: true,
}

function formatCrumb(displayName: string, baseSlug: FullSlug, currentSlug: SimpleSlug): CrumbData {
  return {
    displayName: displayName.replaceAll("-", " "),
    path: resolveRelative(baseSlug, currentSlug),
  }
}

export default ((opts?: Partial<BreadcrumbOptions>) => {
  // Merge options with defaults
  const options: BreadcrumbOptions = { ...defaultOptions, ...opts }

  // computed index of folder name to its associated file data
  let folderIndex: Map<string, QuartzPluginData> | undefined

  function Breadcrumbs({ fileData, allFiles, displayClass }: QuartzComponentProps) {
    // Hide crumbs on root if enabled
    if (options.hideOnRoot && fileData.slug === "index") {
      return <></>
    }

    // Format entry for root element
    const firstEntry = formatCrumb(options.rootName, fileData.slug!, "/" as SimpleSlug)

    firstEntry.icon = "bx bxs-home"

    const crumbs: CrumbData[] = [firstEntry]

    if (!folderIndex && options.resolveFrontmatterTitle) {
      folderIndex = new Map()
      // construct the index for the first time
      for (const file of allFiles) {
        if (file.slug?.endsWith("index")) {
          const folderParts = file.slug?.split("/")
          // 2nd last to exclude the /index
          const folderName = folderParts?.at(-2)
          if (folderName) {
            folderIndex.set(folderName, file)
          }
        }
      }
    }

    // Split slug into hierarchy/parts
    const slugParts = fileData.slug?.split("/")
    if (slugParts) {
      // full path until current part
      let currentPath = ""
      for (let i = 0; i < slugParts.length - 1; i++) {
        let curPathSegment = slugParts[i]

        // Try to resolve frontmatter folder title
        const currentFile = folderIndex?.get(curPathSegment)
        if (currentFile) {
          const title = currentFile.frontmatter!.title
          if (title !== "index") {
            curPathSegment = title
          }
        }

        // Add current slug to full path
        currentPath += slugParts[i] + "/"

        // Format and add current crumb
        const crumb = formatCrumb(curPathSegment, fileData.slug!, currentPath as SimpleSlug)
        crumbs.push(crumb)
      }

      // Add current file to crumb (can directly use frontmatter title)
      if (options.showCurrentPage && slugParts.at(-1) !== "index") {
        crumbs.push({
          displayName: fileData.frontmatter!.title,
          path: "",
        })
      }
    }

    return (
      <nav class={classNames(displayClass, "breadcrumb-container")} aria-label="breadcrumbs">
        {crumbs.map((crumb, index) => (
          <div class="breadcrumb-element">
            {crumb.icon && (<i class={`crumb-icon ${crumb.icon}`}></i>)}
            <a href={crumb.path}>{crumb.displayName}</a>
            {index !== crumbs.length - 1 && <i class="separator bx bxs-chevron-right"></i>}
          </div>
        ))}
      </nav>
    )
  }

  Breadcrumbs.css = breadcrumbsStyle
  return Breadcrumbs
}) satisfies QuartzComponentConstructor
