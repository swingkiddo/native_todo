import React, { useState, useEffect } from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { Button } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome'
import TodoListModal from './Modals/TodoListModal'
import TodoList from './TodoList'

import TodoService from './Services/TodoService'
const todoService = new TodoService()

import { ITodoList } from './Interfaces/TodoInterfaces'


const Todos = () => {
    const [todoLists, setTodoLists] = useState<ITodoList[]>([])
    const [showModal, setShowModal] = useState(false)
    const [summary, setSummary] = useState(0)
    const [completed, setCompleted] = useState(0)


    useEffect(() => {
      todoService.getTodoLists()
      .then(response => {
          setTodoLists(response.todoLists)
          setSummary(response.common.todos)
          setCompleted(response.common.completed)
      })
    }, [])

    const handleDeleteTodoList = (pk: number) => {
        todoService.deleteTodoList(pk)
        .then(() => {
            const updatedTodoLists = todoLists.filter((list: ITodoList) => {
                return list.pk !== pk
            })
            setTodoLists(updatedTodoLists)
        })
    }


    todoLists.map((list) => {
        if (list.todos.length > 0 && list.todos.every((todo) =>  todo.completed )) {
            handleDeleteTodoList(list.pk)
        }
    })


    return (
        <View style={styles.container}>

            <View style={styles.panel}>
                <Text>
                    { completed } / { summary }
                </Text>

                <Button
                onPress={() => {
                    setShowModal(true)
                }}
                type="clear"
                icon={
                    <Icon 
                      name="plus"
                      color="red"
                      size={26}
                    />
                    }
                />
            </View>

            {
                todoLists.map(list => 
                    <TodoList 
                        todoList={list} 
                    />
                )
            }


            <TodoListModal 
                showModal={showModal} 
                setShowModal={setShowModal}
            />

        </View>
    )
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative',
        height: '80%'
    },
    panel: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: 16
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0
    }
})

export default Todos