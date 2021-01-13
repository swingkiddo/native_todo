export interface TodoModalProps {
    showModal: boolean,
    setShowModal(value: boolean): void
}

export interface ITodoItem {
    pk: number,
    description: string,
    completed: boolean
  }

export interface ITodoList {
    pk: number,
    name: string,
    todos: ITodoItem[]
}
