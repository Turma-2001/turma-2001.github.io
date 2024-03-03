type IndexEntryType = 'homework' | 'subject'
type IndexEntry = {
    title: string
    content: string
    description?: string
    subject?: string
    type?: IndexEntryType
    assessement?: number
    date?: number
    deadline?: number
}
type ContentIndex = { [key: string]: IndexEntry }
type HomeworkEntry = {
    name: string
    url: string
    deadlineEnd: string
    subject: string
    daysUntilDeadline: number
}

const fetchHomeworks = async () => {
    const daysToStringMapping = {
        0: 'hoje',
        1: 'amanhã',
        2: 'depois de amanhã'
    }

    const index = await fetchData
    const currentTime = new Date()


    return Object.entries(index).filter(([_, { deadline, type }]) => type == 'homework' && deadline != undefined)
        .map(([path, { title, subject, deadline }]) => {
            let difference = (deadline! * 1000) - Date.now()

            if (difference < 0)
                return

            let daysUntilDeadline = Math.ceil(difference / (86400 * 1000))

            if (daysUntilDeadline == 1 && currentTime.getUTCHours() > 12)
                return

            let text = `Entrega ${daysToStringMapping[daysUntilDeadline as 0 | 1 | 2] ??
                       `em ${daysUntilDeadline == 13 ? '12 + 1' : daysUntilDeadline} dias`}`

            return {
                name: title,
                subject: subject ?? 'Sem assunto associado',
                deadlineEnd: text,
                url: path,
                daysUntilDeadline
            } as HomeworkEntry
        })
        .filter(a => a != null)
        .sort((a, b) => a!.daysUntilDeadline - b!.daysUntilDeadline) as HomeworkEntry[]
}

const createHomeworkElement = (entry: HomeworkEntry): HTMLLIElement => {
    let node = document.createElement('li')
    let metadataContainerNode = document.createElement('div')
    let titleNode = document.createElement('p')
    let subjectNode = document.createElement('p')
    let deadlineNode = document.createElement('p')

    node.classList.add('homework-item')

    metadataContainerNode.classList.add('metadata')

    titleNode.classList.add('title')
    subjectNode.classList.add('subject')

    deadlineNode.classList.add('deadline')

    titleNode.textContent = entry.name
    subjectNode.textContent = `Assunto: ${entry.subject}`

    deadlineNode.textContent = entry.deadlineEnd

    metadataContainerNode.appendChild(subjectNode)
    metadataContainerNode.appendChild(deadlineNode)

    node.appendChild(titleNode)
    node.appendChild(metadataContainerNode)

    node.addEventListener('click', () => {
        window.location = <Location><unknown>entry.url
    })

    return node
}

class ActiveHomeworksComponent extends HTMLElement {

    constructor() {
        super()
    }

    async connectedCallback() {
        let homeworksPromise = fetchHomeworks()
        let baseElement = document.createElement('ul')
        let titleContainer = document.createElement('div')
        let titleNode = document.createElement('h1')
        let iconNode = document.createElement('i')

        baseElement.classList.add('active-homeworks', 'homework-list')

        titleContainer.classList.add('title')

        titleNode.textContent = 'Lista de Atividades'
        iconNode.classList.add('bx', 'bxs-hourglass-top')

        titleContainer.appendChild(iconNode)
        titleContainer.appendChild(titleNode)

        baseElement.appendChild(titleContainer)

        this.appendChild(baseElement)

        const homeworks = await homeworksPromise

        if (homeworks.length == 0) {
            let noHomeworkAvailable = document.createElement('p')

            noHomeworkAvailable.textContent = 'Sem atividades a fazer, graças a deus.'
            noHomeworkAvailable.classList.add('no-homework')

            baseElement.appendChild(noHomeworkAvailable)
        }

        for (const entry of homeworks) {
            let element = createHomeworkElement(entry)

            baseElement.appendChild(element)
        }
    }

}

window.customElements.define('active-homeworks', ActiveHomeworksComponent)
