import React from 'react';
import { Text, View, StyleSheet, Alert } from 'react-native';
import { TouchableNativeFeedback } from 'react-native-gesture-handler';

export function ProgressTracker(props) {

    const onPress = () => {
        props.onPress(props.title)
    }

    return (
        <TouchableNativeFeedback
            onPress={onPress}
        >
            <View style={styles.container}>
                <Text style={styles.title}>{props.title} ({(100 * ( 1 - (props.budgetted - props.spent)/props.budgetted)).toFixed(0)}%)</Text>
                <View style={styles.outer}>
                    <View style={this.getProgressVisibleStyle(props.spent, props.budgetted)}> 
                        {getSpentText(props.spent)}
                    </View>
                    <View style={this.getProgressTransparentStyle(props.spent, props.budgetted)}>
                        {getBudgettedMinusSpentText(props.spent, props.budgetted)}
                    </View>
                </View>
            </View>
        </TouchableNativeFeedback>
    )
}

getSpentText = (spent) => {
    if(spent > 0) {
        return <Text style={styles.dollarText}>${spent}</Text>
    } else {
        return null;
    }
}

getBudgettedMinusSpentText = (spent, budgetted) => {
    if(budgetted - spent >= 5) {
        return <Text style={styles.dollarText}>${budgetted-spent}</Text>
    } else {
        return null;
    }
}

getProgressVisibleStyle = (spent, budgetted) => {
    return {
        height: 65,
        margin: 1,
        marginLeft: 2,
        flex: 1 - (budgetted - spent)/budgetted || 0.01, 
        backgroundColor: '#bc89dd',
        alignItems: 'center',
        justifyContent: 'center',
    }
}

getProgressTransparentStyle = (spent, budgetted) => {
    return {
        backgroundColor: 'rgba(52, 52, 52, 0)',
        flex: (budgetted - spent)/budgetted,
        height: 65,
        margin: 1,
        marginLeft: 2,
        alignItems: 'center',
        justifyContent: 'center',
    }
}

const styles = StyleSheet.create({
    container: {
    },
    title: {
        fontSize: 20,
        marginLeft: 20,
        marginBottom: 2
    },
    text: {
        alignSelf: 'center',
        fontSize: 20,
    },
    outer: {
        height: 75, 
        marginHorizontal: 20,
        alignSelf: 'center',
        flexDirection: 'row',
        borderWidth: 3,
        borderColor: 'black',
        justifyContent: 'center',
        alignItems: 'center'
    },
});
