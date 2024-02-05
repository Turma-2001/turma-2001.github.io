import { QuartzComponentConstructor, QuartzComponentProps } from "../types"

function NotFound({}: QuartzComponentProps) {
  return (
    <article class="popover-hint">
      <h1>Conteúdo não encontrado</h1>
      <p>O conteúdo que você está procurando não foi encontrado, se ele é um link de algum outro arquivo, por favor,
        avise os administradores do website para resolver.</p>
      <a href={"/"}>Voltar a página inicial</a>
    </article>
  )
}

export default (() => NotFound) satisfies QuartzComponentConstructor
