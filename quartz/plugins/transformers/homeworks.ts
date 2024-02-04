import { QuartzTransformerPlugin } from "../types"
import { VFile } from "vfile"
import remarkDirective from "remark-directive"
import { VisitorResult, visit } from "unist-util-visit"
import { Root } from "mdast"

type HomeworksOptions = {}

const defaultOptions: HomeworksOptions = {}

const HomeworkTransformerPlugin = () => ((tree: Root, file: VFile) => {
    visit(tree, (node) => {
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