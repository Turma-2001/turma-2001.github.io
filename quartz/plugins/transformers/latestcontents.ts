import { QuartzTransformerPlugin } from "../types"
import { VFile } from "vfile"
import remarkDirective from "remark-directive"
import { CONTINUE, Test, VisitorResult, visit } from "unist-util-visit"
import { Node, Root } from "mdast"
import { Html } from "mdast-util-to-hast/lib/handlers/html"

type LatestContentsOptions = {}

const defaultOptions: LatestContentsOptions = {}

const LatestContentTransformerPlugin = () => ((tree: Root, file: VFile) => {
    visit<Root, Test>(tree, 'leafDirective', (node: Node, index: number | undefined, parent) => {
        if (!parent)
            return CONTINUE

        if (!index)
            return CONTINUE

        let leafNode = node as Node & { name: string }

        if (leafNode.name != 'latest-contents')
            return CONTINUE

        parent.children[index] = {
            type: 'html',
            value: '<latest-contents></latest-contents>'
        } as Html
    })
})

export const LatestContents: QuartzTransformerPlugin<Partial<LatestContentsOptions> | undefined> = (userOpts) => {
    const opts = {
        ...defaultOptions,
        ...userOpts
    }

    return {
        name: 'LatestContents',

        markdownPlugins() {
            return [remarkDirective, LatestContentTransformerPlugin]
        }
    }
}