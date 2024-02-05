import { QuartzTransformerPlugin } from "../types"
import { VFile } from "vfile"
import remarkDirective from "remark-directive"
import { CONTINUE, Test, VisitorResult, visit } from "unist-util-visit"
import { Node, Root } from "mdast"
import { Html } from "mdast-util-to-hast/lib/handlers/html"

const SVGScalerTransformerPlugin = () => ((tree: Root, file: VFile) => {
    visit<Root, Test>(tree, 'html', (node: Node, index: number | undefined, parent) => {
        // TODO: fix this shit

        if (!parent)
            return CONTINUE

        if (!index)
            return CONTINUE

        let htmlNode = node as Html & { name: string }
        let htmlCode = htmlNode.value

        if (!htmlCode.includes("<svg")) {
            return CONTINUE
        }

        let widthPattern = /width="(.*?)"/g
        let heightPattern = /height="(.*?)"/g

        let xPattern = /x="(.*?)"/g
        let yPattern = /y="(.*?)"/g

        let widthResult = widthPattern.exec(htmlCode)
        let heightResult = heightPattern.exec(htmlCode)

        let xResult = xPattern.exec(htmlCode)
        let yResult = yPattern.exec(htmlCode)

        let x = 0, y = 0, width = 0, height = 0;

        if (xResult && parseFloat(xResult[1]) != 0) {
            x = parseFloat(xResult[1]);
        }

        if (xResult && parseFloat(xResult[1]) != 0) {
            x = parseFloat(xResult[1]);
        }

        if (yResult && parseFloat(yResult[1]) != 0) {
            y = parseFloat(yResult[1]);
        }

        if (widthResult && parseFloat(widthResult[1]) != 0) {
            width = parseFloat(widthResult[1]);
        }

        if (heightResult && parseFloat(heightResult[1]) != 0) {
            height = parseFloat(heightResult[1]);
        }

        if (width == 0 && height == 0 && x == 0 && y == 0)
            return CONTINUE;

        let viewBoxPropValue = `${x} ${y} ${width} ${height}`;

        let finalOutput = htmlCode
            .replaceAll(widthPattern, '')
            .replaceAll(heightPattern, '')
            .replaceAll(xPattern, '')
            .replaceAll(yPattern, '')
            .replaceAll(/width:.*?;/g, '')  // CSS selectors
            .replaceAll(/height:.*?;/g, '') // CSS selectors
            .replaceAll("\n", ' ')
            .replace('>', ` viewBox="${viewBoxPropValue}">`);

        htmlNode.value = finalOutput

        parent.children[index] = htmlNode as Html
    })
})

export const SVGScaler: QuartzTransformerPlugin<undefined> = (userOpts) => {
    return {
        name: 'Homeworks',

        markdownPlugins() {
            return [remarkDirective, SVGScalerTransformerPlugin]
        }
    }
}