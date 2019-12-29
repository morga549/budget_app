import React, { Component } from 'react';
import { TextInput, View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import accounting from 'accounting';

class DecimalCurrencyInput extends Component {

    
    state = {
        value: "",
    };
    
    
    convertToDecimal = (input) => {
        return accounting.formatMoney(parseFloat(input)/100);
    }

    focus() {
        this.ref.focus();
    }

    update(value) {
        this.props.onUpdate(value);
    }

    render() {
        return (
            <View>
                <TextInput
                    style={styles.invisible}
                    onChangeText={
                        (text) => {
                            this.setState({value: text});
                            this.update(parseFloat(text)/100);
                        }
                    }
                    ref={ref => this.ref = ref}
                    keyboardType='numeric'
                    position='absolute'
                >
                </TextInput>
                <TouchableOpacity
                    style={styles.touchable}
                    onPress={() => this.focus()}
                >
                    <Text style={styles.text}>{this.convertToDecimal(this.state.value)}</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    text: {
        fontSize: 16,
        marginLeft: 6,
    }, 
    invisible: {
        opacity: 100,
        width: 0,
        height: 0
    },
    
});

export default DecimalCurrencyInput;