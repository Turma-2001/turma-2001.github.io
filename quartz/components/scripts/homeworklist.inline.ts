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
    const homeworks: HomeworkEntry[] = []

    for (const [slug, fileData] of Object.entries(index)) {
        if ((fileData.type ?? '') != 'homework' || !fileData.deadline)
            continue

        let currentDate = new Date()
        let deadlineDate = new Date(fileData.deadline * 1000)

        let daysUntilDeadline = deadlineDate.getDay() - currentDate.getDay()

        if (daysUntilDeadline < 0 || (daysUntilDeadline == 0 && currentDate.getHours() > 12)) {
            continue
        }

        let text = `Entrega ${daysToStringMapping[daysUntilDeadline as 0 | 1 | 2] ?? `em ${daysUntilDeadline} dias`}`

        homeworks.push({
            name: fileData.title,
            subject: fileData.subject ?? 'Sem assunto associado',
            deadlineEnd: text,
            url: slug,
            daysUntilDeadline
        })
    }

    homeworks.sort((a, b) => a.daysUntilDeadline - b.daysUntilDeadline)

    return homeworks
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

        titleContainer.classList.add('title')

        titleNode.textContent = 'Lista de Atividades'
        iconNode.classList.add('bx', 'bxs-hourglass-top')

        titleContainer.appendChild(iconNode)
        titleContainer.appendChild(titleNode)

        baseElement.appendChild(titleContainer)

        baseElement.classList.add('active-homeworks', 'homework-list')

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