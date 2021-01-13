import React from 'react'
import { View, StyleSheet } from 'react-native'

import Todos from '../Todo/Todos'


const Content = () => {
    return (
        <View style={styles.content}>
            <Todos />
        </View>
    )
}

const styles = StyleSheet.create({
    content: {
        flex: 1,
        padding: '16px',
        minHeight: '100%'
    }
})

export default Content