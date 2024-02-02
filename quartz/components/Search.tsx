import { QuartzComponentConstructor, QuartzComponentProps } from "./types"
import style from "./styles/search.scss"
// @ts-ignore
import script from "./scripts/search.inline"
import { classNames } from "../util/lang"

export interface PesquisarOptions {
  enablePreview: boolean
}

const defaultOptions: PesquisarOptions = {
  enablePreview: true,
}

export default ((userOpts?: Partial<PesquisarOptions>) => {
  function Pesquisar({ displayClass }: QuartzComponentProps) {
    const opts = { ...defaultOptions, ...userOpts }

    return (
      <div class={classNames(displayClass, "search")}>
        <div id="search-icon">
          <svg
            tabIndex={0}
            aria-labelledby="title desc"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 19.9 19.7"
          >
            <title id="title">Pesquisar</title>
            <desc id="desc">Pesquisar</desc>
            <g class="search-path" fill="none">
              <path stroke-linecap="square" d="M18.5 18.3l-5.4-5.4" />
              <circle cx="8" cy="8" r="7" />
            </g>
          </svg>

          <div></div>
          <p class='desktop-only'>Pesquisar</p>
        </div>
        <div id="search-container">
          <div id="search-space">
            <input
              autocomplete="off"
              id="search-bar"
              name="search"
              type="text"
              aria-label="Pesquisar algo"
              placeholder="Pesquisar algo"
            />
            <div id="search-layout" data-preview={opts.enablePreview}></div>
          </div>
        </div>
      </div>
    )
  }

  Pesquisar.afterDOMLoaded = script
  Pesquisar.css = style

  return Pesquisar
}) satisfies QuartzComponentConstructor