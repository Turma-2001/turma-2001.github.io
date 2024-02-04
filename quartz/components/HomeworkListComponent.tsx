import { QuartzComponentConstructor, QuartzComponentProps } from "./types"
// @ts-ignore
import homeworkListScript from './scripts/homeworklist.inline'
import homeworkListCSS from './styles/homeworklist.scss'

export default (() => {
    function HomeworkList() {
        return <></> // nothing.
    }

    HomeworkList.beforeDOMLoaded = homeworkListScript
    HomeworkList.css = homeworkListCSS

    return HomeworkList
}) satisfies QuartzComponentConstructor
