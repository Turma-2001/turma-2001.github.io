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
  const themeText = document.querySelector(".next-theme-name") as HTMLParagraphElement
  const checkbox = document.querySelector("#darkmode-checkbox") as HTMLInputElement

  const themeChangeLabelLookup = {
    dark: "Tema claro",
    light: "Tema escuro",
  }

  const switchTheme = (e: Event) => {
    const newTheme = (e.target as HTMLInputElement)?.checked ? "dark" : "light"

    document.documentElement.setAttribute("saved-theme", newTheme)

    localStorage.setItem("theme", newTheme)

    emitThemeChangeEvent(newTheme)

    themeText.innerText = themeChangeLabelLookup[newTheme]
  }

  const themeChange = (e: MediaQueryListEvent) => {
    const newTheme = e.matches ? "dark" : "light"
    document.documentElement.setAttribute("saved-theme", newTheme)

    localStorage.setItem("theme", newTheme)

    toggleSwitch.checked = e.matches

    emitThemeChangeEvent(newTheme)
  }

  // Darkmode toggle
  const toggleSwitch = document.querySelector("#darkmode-checkbox") as HTMLInputElement

  toggleSwitch.removeEventListener("change", switchTheme)
  toggleSwitch.addEventListener("change", switchTheme)

  if (currentTheme === "dark") {
    toggleSwitch.checked = true
  }

  themeText.innerText = themeChangeLabelLookup[currentTheme as "light" | "dark"]

  const colorSchemeMediaQuery = window.matchMedia("(prefers-color-scheme: dark)")

  colorSchemeMediaQuery.removeEventListener("change", themeChange)
  colorSchemeMediaQuery.addEventListener("change", themeChange)
})