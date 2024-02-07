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
    const rootDir = pathToRoot((fileData.slug ?? "/") as FullSlug)

    if (text) {
      const segments: string[] = []

      if (fileData.dates) {
        segments.push(formatDate(new Date(1000 * (fileData.frontmatter?.date ?? (Date.now() / 1000))), cfg.locale))
      }

      // Display reading time if enabled
      if (options.showReadingTime) {
        const { minutes } = readingTime(text)
        segments.push(`aprox. ${Math.ceil(minutes)} min. de leitura`)
      }

      const { assessement, deadline, type, subject, date } = fileData.frontmatter ?? {}

      const typeToDisplayTextMapping = {
        subject: 'Assunto',
        homework: 'Atividade'
      }

      type TypeDisplayMapping = 'subject' | 'homework'
      type ContentInfoProps = {
        icon?: string
        text?: string
        value?: string
      }

      const ContentInfo = ({ icon, text, value }: ContentInfoProps) => (
        <tr class='content-info-row'>
          <td class='content-info-text'>
            <i class={`bx ${icon}`}></i>
            <p class='text'>{text}</p>
          </td>
          <td class='content-info-value'>
            {value}
          </td>
        </tr>
      )

      let typeName = typeToDisplayTextMapping[type as TypeDisplayMapping]

      return <div class="content-meta-base">
        <p class={classNames(displayClass, "content-meta")}>{segments.join(", ")}</p>
        {(assessement || type || subject || date) && (
          <table class='content-info'>
            <tbody>
              {assessement && <ContentInfo icon='bxs-bookmark-plus' text='Avaliação' value={`${assessement}° avaliação`} />}
              {type && (<ContentInfo icon='bx-book' text='Tipo de conteúdo' value={typeName} />)}
              {subject && (<ContentInfo icon='bxs-pencil' text='Assunto' value={subject} />)}
              {date && (<ContentInfo icon='bxs-calendar' text='Dia da aula' value={formatDate(new Date(date * 1000), cfg.locale)} />)}
              {deadline && (<ContentInfo icon='bxs-skull' text='Data de entrega' value={formatDate(new Date(deadline * 1000), cfg.locale)} />)}
            </tbody>
          </table>
        )}
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
    flex-direction: column;

    padding: 0 8px;
    margin-bottom: 8px;

    .content-info {
      background: var(--lightgray);
      border-radius: 8px;

      font-family: var(--headerFont);
      text-align: right;

      .content-info-text {
        display: flex;
        align-items: center;

        p {
          margin: 0 0 0 8px;
          font-weight: 700;
        }
      }

      .content-info-value {
        color: var(--gray);
      }
    }
  }
  `
  return ContentMetadata
}) satisfies QuartzComponentConstructor
