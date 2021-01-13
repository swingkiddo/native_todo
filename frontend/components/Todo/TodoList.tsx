import React, { useState, useRef } from 'react'
import { 
    View, 
    Text,
    StyleSheet,
    Animated,
    TouchableWithoutFeedback,
    Easing
} from 'react-native'
import { Button } from 'react-native-elements'
import  Icon  from 'react-native-vector-icons/AntDesign'

import TodoModal from './Modals/TodoModal'
import TodoItem from './TodoItem'
import { ITodoList, ITodoItem } from '../Todo/Interfaces/TodoInterfaces'



interface Props {
    todoList: ITodoList
}

const TodoList = (props: Props) => {
    const [showTodoModal, setShowTodoModal] = useState(false)
    const [openList, setOpenList] = useState(false)
    const [listSectionHeight, setListSectionHeight] = useState(0)
    const animatedController = useRef(new Animated.Value(0)).current
    const list = props.todoList

    const listHeight = animatedController.interpolate({
        inputRange: [0, 1],
        outputRange: [0, listSectionHeight]
    })
    
    const arrowAngle = animatedController.interpolate({
        inputRange: [0, 1],
        outputRange: ['0rad', `${Math.PI}rad`]
    })

    const toggleList = () => {
        Animated.timing(animatedController, {
            duration: 300,
            toValue: openList ? 0 : 1,
            easing: Easing.bezier(0.4, 0.0, 0.2, 1),
            useNativeDriver: true
        }).start()
        setOpenList(!openList)
    }

    return (
        <View style={styles.listWrapper}>
            <TouchableWithoutFeedback onPress={() => toggleList()}>
                <View style={styles.listTitle}>
                    <Text>{list.name}</Text>
                    <Animated.View style={{ transform: [{rotateZ: arrowAngle}] }}>
                        <Icon name="down" />
                    </Animated.View>
                </View>

            </TouchableWithoutFeedback>
            <Animated.View style={[styles.listBackground, {height: listHeight}]}>
                <View 
                    style={styles.listContainer}
                    onLayout={event => 
                        setListSectionHeight(event.nativeEvent.layout.height)}
                >
                    {
                        list.todos.map(todo => <TodoItem todo={todo} />)
                    }

                    <Button 
                        title="Добавить задачу"
                        type="clear"
                        onPress={() => setShowTodoModal(true)}
                    />
                </View>
            </Animated.View>

            <TodoModal 
                showModal={showTodoModal}
                setShowModal={setShowTodoModal}
                todoListPK={list.pk}
            />

        </View>
    )
}

const styles = StyleSheet.create({
    listWrapper: {
        marginBottom: 10
    },
    listTitle: {
        padding: '1rem',
        backgroundColor: '#EFEFEF',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    listContainer: {
        position: 'absolute',
        bottom: 0,
        padding: '1rem',
        width: '100%',

    },
    listBackground: {
        overflow: 'hidden',
        backgroundColor: '#fafafa',
    }
})

export default TodoList