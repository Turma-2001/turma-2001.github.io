import { QuartzTransformerPlugin } from "../types"
import { VFile } from "vfile"
import remarkDirective from "remark-directive"
import { CONTINUE, Test, VisitorResult, visit } from "unist-util-visit"
import { Node, Root } from "mdast"
import { Html } from "mdast-util-to-hast/lib/handlers/html"

type HomeworksOptions = {}

const defaultOptions: HomeworksOptions = {}

const HomeworkTransformerPlugin = () => ((tree: Root, file: VFile) => {
    visit<Root, Test>(tree, 'leafDirective', (node: Node, index: number | undefined, parent) => {
        if (!parent)
            return CONTINUE

        if (!index)
            return CONTINUE

        let leafNode = node as Node & { name: string }

        if (leafNode.name != 'active-homeworks')
            return CONTINUE

        parent.children[index] = {
            type: 'html',
            value: '<active-homeworks></active-homeworks>'
        } as Html
    })
})

export const Homeworks: QuartzTransformerPlugin<Partial<HomeworksOptions> | undefined> = (userOpts) => {
    const opts = {
        ...defaultOptions,
        ...userOpts
    }

    return {
        name: 'Homeworks',

        markdownPlugins() {
            return [remarkDirective, HomeworkTransformerPlugin]
        }
    }
}