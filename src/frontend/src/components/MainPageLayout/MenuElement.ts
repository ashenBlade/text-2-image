export default interface MenuElement {
    name: string
    defaultValue?: string
    onSelect: (value: string) => void
    items: {
        name: string
        value: string
    }[]
}