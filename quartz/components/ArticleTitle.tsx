import { QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"

function ArticleTitle({ fileData, displayClass }: QuartzComponentProps) {
  const title = fileData.frontmatter?.title
  const banner = fileData.frontmatter?.banner

  return <>
    {banner ? (
      <div class="banner">
        <img src={banner} class="banner-img"></img>
        {title ? (
          <div class="banner-title">
            <h1 class={classNames(displayClass, "article-title")}>{title}</h1>
          </div>
        ) : null}
      </div>
    ) : (title ? (<h1 class={classNames(displayClass, "article-title")}>{title}</h1>) : null)
    }
  </>
}

ArticleTitle.css = `
.banner {
  margin-top: 8px;
  position: relative;
  height: 300px;
  max-height: 400px;
  border-radius: 12px;
  overflow: hidden;

  .banner-img {
    position: absolute;

    margin: 0;
    padding: 0;

    height: 100%;
    width: 100%;

    object-fit: cover;
  }

  .banner-title {
    box-sizing: border-box;

    position: absolute;
    background: linear-gradient(0, rgba(0, 0, 0, 0.3), transparent);

    top: 100%;
    left: 0;
    transform: translateY(-100%);

    padding: 30px;
    width: 100%;

    .article-title {
      color: white;
    }
  }
}

.article-title {
  margin: 1rem 0 0;
}
`

export default (() => ArticleTitle) satisfies QuartzComponentConstructor
