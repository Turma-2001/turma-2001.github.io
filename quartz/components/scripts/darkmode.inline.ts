const userPref = window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark"
const currentTheme = localStorage.getItem("theme") ?? userPref
document.documentElement.setAttribute("saved-theme", currentTheme)

const emitThemeChangeEvent = (theme: "light" | "dark") => {
  const event: CustomEventMap["themechange"] = new CustomEvent("themechange", {
    detail: { theme },
  })

  document.dispatchEvent(event)
}

document.addEventListener("nav", () => {
  const themeChangeLabelLookup = {
    dark: "Tema claro",
    light: "Tema escuro"
  }

  const userPref = window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark"
  const currentTheme = (localStorage.getItem("theme") ?? userPref) as 'light' | 'dark'

  const themeText = document.querySelector(".next-theme-name") as HTMLParagraphElement
  const clickableArea = document.querySelector(".darkmode") as HTMLDivElement
  
  const switchTheme = (e: any) => {
    const userPref = window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark"
    const currentTheme = (localStorage.getItem("theme") ?? userPref) as 'light' | 'dark'

    const newTheme = currentTheme == "dark" ? "light" : "dark"

    document.documentElement.setAttribute("saved-theme", newTheme)
    localStorage.setItem("theme", newTheme)

    emitThemeChangeEvent(newTheme)

    themeText.innerText = themeChangeLabelLookup[newTheme]
  }

  // Darkmode toggle
  clickableArea.removeEventListener("click", switchTheme)
  clickableArea.addEventListener("click", switchTheme)

  themeText.innerText = themeChangeLabelLookup[currentTheme]

  // Listen for changes in prefers-color-scheme
  const colorSchemeMediaQuery = window.matchMedia("(prefers-color-scheme: dark)")

  colorSchemeMediaQuery.addEventListener("change", (e) => {
    const newTheme = e.matches ? "dark" : "light"

    document.documentElement.setAttribute("saved-theme", newTheme)
    localStorage.setItem("theme", newTheme)

    themeText.innerText = themeChangeLabelLookup[currentTheme]

    emitThemeChangeEvent(newTheme)
  })
})
