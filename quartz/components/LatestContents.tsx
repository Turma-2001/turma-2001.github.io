import { QuartzComponentConstructor, QuartzComponentProps } from "./types"
// @ts-ignore
import latestContentsScript from './scripts/latestcontents.inline'
import latestContentsCSS from './styles/latestcontents.scss'

export default (() => {
    function LatestContents() {
        return <></> // nothing.
    }

    LatestContents.beforeDOMLoaded = latestContentsScript
    LatestContents.css = latestContentsCSS

    return LatestContents
}) satisfies QuartzComponentConstructor
