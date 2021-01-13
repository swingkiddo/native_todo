import React, { useState } from 'react'
import { View, StyleSheet } from 'react-native'
import { Modal, Portal, Button, Provider, TextInput} from 'react-native-paper'

import TodoService from '../Services/TodoService'
const todoService = new TodoService()

interface Props {
    showModal: boolean,
    setShowModal(v: boolean): void,
    todoListPK: number
}

const TodoModal = (props: Props) => {
    const [task, setTask] = useState('')

    const addTodo = (data: {}) => {
        todoService.addTodo(data)
        .then(_ => alert("Задача добавлена"))
        .catch(error => alert(error))
        .finally(() => {
            props.setShowModal(false)
            window.location.reload()
        })
    }

    return (
        <Provider>
            <Portal>
                <Modal
                    contentContainerStyle={styles.container}
                    visible={props.showModal}
                    onDismiss={() => props.setShowModal(false)}
                >

                    <TextInput 
                        label="Задача"
                        value={task}
                        onChangeText={text => setTask(text)}
                        mode="flat"
                    />

                    <View style={styles.buttonWrapper}>
                        <Button
                            mode="outlined"
                            onPress={() => addTodo({"description": task, "todoList": props.todoListPK})}
                            style={{marginTop: '8px', maxWidth: '50%'}}
                        >
                            Добавить
                        </Button>
                    </View>

                </Modal>
            </Portal>
        </Provider>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: 'white'
    },
    buttonWrapper: {
        flexDirection: 'row',
        justifyContent: 'flex-end'
    }
})

export default TodoModal