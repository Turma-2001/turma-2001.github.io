import { formatDate, getDate } from "./Date"
import { QuartzComponentConstructor, QuartzComponentProps } from "./types"
import readingTime from "reading-time"
import { classNames } from "../util/lang"
import { FullSlug, pathToRoot } from "../util/path"

interface ContentMetaOptions {
  /**
   * Whether to display reading time
   */
  showReadingTime: boolean
}

const defaultOptions: ContentMetaOptions = {
  showReadingTime: true,
}

export default ((opts?: Partial<ContentMetaOptions>) => {
  // Merge options with defaults
  const options: ContentMetaOptions = { ...defaultOptions, ...opts }
  function ContentMetadata({ cfg, fileData, displayClass }: QuartzComponentProps) {
    const text = fileData.text
    const rootDir = pathToRoot((fileData.slug ?? '/') as FullSlug)

    if (text) {
      const segments: string[] = []

      if (fileData.dates) {
        segments.push(formatDate(getDate(cfg, fileData)!, cfg.locale))
      }

      // Display reading time if enabled
      if (options.showReadingTime) {
        const { minutes } = readingTime(text)
        segments.push(`aprox. ${Math.ceil(minutes)} min. de leitura`)
      }

      return <div class='content-meta-base'>
        <p class={classNames(displayClass, "content-meta")}>{segments.join(", ")}</p>
      </div>
    } else {
      return null
    }
  }

  ContentMetadata.css = `
  .content-meta {
    margin: 4px 0;
    color: var(--gray);
  }
  
  .content-meta-base {
    display: flex;
    align-items: center;
    justify-content: space-between;

    padding: 0 8px;

    .back {
      display: flex;
      align-items: center;
      justify-content: center;

      .bx {
        font-size: 18px;
      }

      .text {
        margin: 0 8px;
        font-size: 15px;
      }
    }
  }
  `
  return ContentMetadata
}) satisfies QuartzComponentConstructor
