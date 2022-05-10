/**
 * @author Ramprasath R <ramprasath25@gmail.com>
 */
import React from 'react';
import { View, Text, TextInput, StyleSheet, Alert } from 'react-native';
import Chips from './chips';
import SelectDropdown from 'react-native-select-dropdown'

class ReactChipsInput extends React.Component {
    constructor(props) {
        super(props);
        this.myRef = React.createRef();
        this.state = {
            isFocused: false,
            chips: (props.initialChips) ? props.initialChips : [],
            inputText: ''
        }
    }
    UNSAFE_componentWillReceiveProps(nextProps) {
        this.setState({
            chips: (nextProps.initialChips) ? nextProps.initialChips : []
        });
    }
    handleFocus = () => { this.setState({ isFocused: true }) }
    handleChangeText = (text) => { this.setState({ inputText: text }) }
    removeChip = (index,editEnable) => {
       if(editEnable){
        const newArray = [...this.state.chips]
        newArray.splice(index, 1);
        this.setState({
            chips: newArray
        }, () => this.props.onChangeChips && this.props.onChangeChips(this.state.chips));
        if (this.props.alertRequired) Alert.alert('', 'Removed Successfully')
       }
    }
    handleBlur = () => {
        if (this.state.inputText !== '' && this.state.chips.indexOf(this.state.inputText) === -1) {
            this.setState({
                chips: [...this.state.chips, this.state.inputText],
                inputText: "",
                isFocused: false
            }, () => this.props.onChangeChips && this.props.onChangeChips(this.state.chips));
            if (this.props.alertRequired) Alert.alert('', 'Added Successfully');
        } else {
            this.setState({
                inputText: "",
                isFocused: false
            }, () => this.props.onChangeChips && this.props.onChangeChips(this.state.chips))
            if (this.props.alertRequired) Alert.alert('Added Successfully', 'Chip Element already present');
        }
    }

    handleOnSelect = (selectedItem) => {
        const chips = this.state.chips
        chips.push(selectedItem)
        this.setState({
            chips: chips,
            inputText: "",
            isFocused: false
        }, () => {
            this.props.onChangeChips && this.props.onChangeChips(this.state.chips)// Only contains one property!
            this.myRef.current.reset()
        });
    }
    render() {
        const { label, chipStyle, inputStyle, labelStyle, labelOnBlur,editEnable,defaultText,chipsData } = this.props;
        const inputLabel = (label) ? label : 'Enter your text'
        const { isFocused, inputText } = this.state;
        const defaultLabel = {
            position: 'absolute',
            left: 5,
            top: !isFocused ? 12 : 1
        }
        const defaultLabelTextStyle = {}
        if(isFocused) {
            defaultLabelTextStyle['fontSize'] = 14;
            defaultLabelTextStyle['color'] = '#000'
        } else {
            defaultLabelTextStyle['fontSize'] = 20;
            defaultLabelTextStyle['color'] = '#aaa';
        }
        let labelTextStyle = (!isFocused) ? labelStyle : labelOnBlur;
        const chips = this.state.chips.map((item, index) => (
            <Chips
                key={index}
                value={item}
                chipStyle={chipStyle}
                onPress={() => this.removeChip(index,editEnable)} />
        ));
        return (
            <View>
                {editEnable ? <View style={{ paddingTop: 18, marginTop: 15 }}>
                <SelectDropdown
                    data={chipsData}
                    defaultButtonText={defaultText}
                    ref={this.myRef}
                    onSelect={(selectedItem, index) => {
                        this.handleOnSelect(selectedItem)
                    }}
                    buttonTextAfterSelection={(selectedItem, index) => {
                        // text represented after item is selected
                        // if data array is an array of objects then return selectedItem.property to render after item is selected
                        return selectedItem.name
                    }}
                    rowTextForSelection={(item, index) => {
                        // text represented for each item in dropdown
                        // if data array is an array of objects then return item.property to represent item in dropdown
                        return item.name
                    }}
                />
                </View> : <View></View>}
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center' }}>
                    {chips}
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    textInput: {
        height: 32,
        fontSize: 20,
        padding: 7,
        color: '#000'
    }
});

export default ReactChipsInput;