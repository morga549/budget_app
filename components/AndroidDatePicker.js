import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, DatePickerAndroid, Alert} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default class AndroidDatePicker extends Component {

    constructor(){
        super();
        this.state = {
            date: new Date(),
        };
    }

    componentWillMount() {
        this.props.onUpdate(this.formatDateYYYYMMDD(this.state.date));
    }

    getDateStr = (date) => {
        const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const getOrdinalString = (number) => {
            let oneDecimal = number % 10;
            let twoDecimals = number % 100;
            if(oneDecimal == 1 && twoDecimals != 11) {
                return number + 'st';
            } 
            if(oneDecimal == 2 && twoDecimals != 12) {
                return number + 'nd';
            }
            if(oneDecimal == 3 && twoDecimals != 13){
                return number + 'rd';
            }
            return number + 'th';
        };
        return weekDays[date.getDay()] + ', ' + months[date.getMonth()] + ' ' + getOrdinalString(date.getDate()) + ' ' + date.getFullYear();
    }

    formatDateYYYYMMDD = (date) => {
        let month = date.getMonth() > 8 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1);
        return date.getFullYear() + '-' + month + '-' + date.getDate();
    }

    editDate = async () => {
        try {
            let date = new Date(this.state.date);
            const { action, year, month, day, } = await
                DatePickerAndroid.open({
                    date: date,
                    minDate: new Date(date.getFullYear(), date.getMonth(), 1),
                    maxDate: new Date(date.getFullYear(), date.getMonth() + 1, 0),
                });
            if(action !== DatePickerAndroid.dismissedAction) {
                let date = new Date(year, month, day);
                this.setState({date: date});
                this.props.onUpdate(this.formatDateYYYYMMDD(this.state.date));
            }

        } catch({code, message}) {
            console.warn(message);
        }
    }
    
    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity onPress={this.editDate}>
                    <Text style={{
                        fontSize: 16,
                        marginRight: 2
                    }}>{this.getDateStr(this.state.date)}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.editDate}>
                    <Ionicons
                        name='md-calendar'
                        size={30}
                    >
                    </Ionicons>
                </TouchableOpacity>
           </View>    
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 10,
    }, 
    headerText: {
        fontSize: 16,
    }
});