import React, { useState } from 'react'
import { View, StyleSheet } from 'react-native'
import { Modal, Portal, Button, Provider, TextInput } from 'react-native-paper'

import { TodoModalProps } from '../Interfaces/TodoInterfaces'
import TodoService from '../Services/TodoService'
const todoService = new TodoService()



const TodoModal = (props: TodoModalProps) => {
    const [name, setName] = useState('')

    const addTodoList = (data: {}) => {
        todoService.addTodoList(data)
        .then(_ => alert("Список добавлен "))
        .catch(error => alert(error))
        .finally(() => {
            props.setShowModal(false);
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
                        label="Наименование списка"
                        value={name}
                        onChangeText={text => setName(text)}
                        mode="flat"
                    />

                    <View style={styles.buttonWrapper}>
                        <Button
                            mode="outlined"
                            onPress={() => addTodoList({"name": name})}
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