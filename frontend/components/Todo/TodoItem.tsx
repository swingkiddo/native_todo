import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import Icon from 'react-native-vector-icons/Feather'

import { ITodoItem } from './Interfaces/TodoInterfaces'

import TodoService from './Services/TodoService'
const todoService = new TodoService()

interface Props {
    todo: ITodoItem
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    text: {
        flex: 1,
    }
})

const TodoItem = (props: Props) => {
    const todo = props.todo

    return (
        <View style={styles.container}>
            <Icon 
                name={todo.completed ? "check-circle" : "circle"}
                size={20}
                onPress={() => {
                    todoService.updateTodo(todo.pk, {"completed": !todo.completed})
                    window.location.reload()

                }}
                style={{ marginRight: 5 }}
            />

            <View style={styles.text}>
                <Text style={{ fontSize: 16}}>
                    {todo.description}
                </Text>
            </View>
        </View>
    )
}

export default TodoItem