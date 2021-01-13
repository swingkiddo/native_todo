import React from 'react'
import { View, StyleSheet, Text} from 'react-native'
import { Button } from 'react-native-elements'
import Icon from 'react-native-vector-icons/Entypo'


const Nav = () => {
    return (
        <View style={styles.nav}>
            <Text style={styles.progress}>

            </Text>

            <Button
                onPress={() => console.log("BRUUUH")}
                type="clear"
                icon={
                    <Icon 
                      name="menu"
                      color="white"
                      size={26}
                    />
                }
            />
        </View>
    )
}

const styles = StyleSheet.create({
    nav: {
        padding: '16px',
        height: '10vh',
        backgroundColor: 'red',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    button: {
        height: '15px'
    },
    progress: {
        color: '#fff'
    }
})

export default Nav