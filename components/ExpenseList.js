import React from 'react';
import { Text, View, StyleSheet, SectionList } from 'react-native';
import { TouchableNativeFeedback } from 'react-native-gesture-handler';

export default function ExpenseList(props) {
    
    return (
        <View style={styles.container}>
            <SectionList
                sections={props.data}
                renderSectionHeader={ () => (
                    <View style={{height: 0.5, width: '100%', backgroundColor: '#C8C8C8'}}/>
                )}                
                renderItem={ ({item}) =>  
                    { 
                        return <ExpenseItem 
                                    amount={item.amount}
                                    date={item.date}
                                    description={item.description}
                                >
                                </ExpenseItem>
                    }
                }
                keyExtractor={ (item) => item.description }
            />
        </View>
    )
}

ExpenseItem = (props) => {
    return (
        <View style={styles.itemContainer}>
            <View style={styles.itemDate}>
                <Text >{props.date.substring(5)}</Text>
            </View>
            <View style={styles.itemDescription}>
                <Text >{props.description}</Text>
            </View>
            <View style={styles.itemAmount}>
                <Text >{props.amount.toFixed(2)}</Text>
            </View>
        </View>   
    )
}


const styles = StyleSheet.create({
    container: {
    },
    listHeader: {
        fontSize: 20,
    },
    itemContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 5
    },
    itemDate: {
        flex: 0.6,
        alignItems: 'flex-start'
    },
    itemDescription: {
        flex: 2,
        alignItems: 'flex-start'
    },
    itemAmount: {
        flex: 1,
        alignItems: 'flex-end'
    },
    header: {
        fontSize: 12,
        alignSelf: 'center'
    }
});
