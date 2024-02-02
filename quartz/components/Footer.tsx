import { QuartzComponentConstructor, QuartzComponentProps } from "./types"
import style from "./styles/footer.scss"
import { version } from "../../package.json"
import { JSX } from "preact/jsx-runtime";

interface Link {
  url: string;
  icon: () => JSX.Element;
}

interface Options {
  links: Record<string, Partial<Link>>
}

export default ((opts?: Options) => {
  function Footer({ displayClass }: QuartzComponentProps) {
    const year = new Date().getFullYear()
    const links = opts?.links ?? []
    return (
      <footer class={`${displayClass ?? ""}`}>
        <hr />
        <ul className='links'>
          {Object.entries(links).map(([text, link]) => (
            <li className='link'>
              <div class='icon'>{link?.icon?.()}</div>
              <a href={link.url}>{text}</a>
            </li>
          ))}
        </ul>
      </footer>
    )
  }

  Footer.css = style
  return Footer
}) satisfies QuartzComponentConstructor
