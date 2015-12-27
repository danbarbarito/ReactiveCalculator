/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';


var DEFAULT_OPERATION_STATE = [
    {type: "Add", result: "Two valid values not entered"},
    {type: "Subtract", result: "Two valid values not entered"},
    {type: "Multiply", result: "Two valid values not entered"},
    {type: "Divide", result: "Two valid values not entered"},
    {type: "Percent", result: "Two valid values not entered"}    
]

var React = require('react-native');
var {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    ListView,
    TextInput,
    TouchableNativeFeedback,    
} = React;

var ReactiveCalculator = React.createClass({
    getInitialState: function() {
        return {
            operations: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2,
            }).cloneWithRows(
                DEFAULT_OPERATION_STATE
            ),
            input_1: "",
            input_2: "",
        };
    },
    setOperations: function() {
        if (this.twoInputsValid()) {
            var add_result = Number(this.state.input_1) + Number(this.state.input_2)
            var subtract_result = Number(this.state.input_1) - Number(this.state.input_2)
            var mult_result = Number(this.state.input_1) * Number(this.state.input_2)
            var divide_result = Number(this.state.input_1) / Number(this.state.input_2)            
            this.setState({
                operations: this.state.operations.cloneWithRows(
                    [
                        {type: "Add", result: add_result},
                        {type: "Subtract", result: subtract_result},
                        {type: "Multiply", result: mult_result},
                        {type: "Divide", result: divide_result},
                        {type: "Percent", result: divide_result * 100 + "%"}
                    ]
                )
            })            
        } else {
        this.setState({
            operations: this.state.operations.cloneWithRows(
                DEFAULT_OPERATION_STATE
            )
        })            
        }        
    },
    
    render: function() {
        return (
            <View>            
            <View style={{flexDirection: 'row', height: 80, padding: 20}}>
            <View style={{backgroundColor: 'blue', borderColor: "black", borderWidth: 1, flex: 0.3}}>
            <Text style={styles.title}>Reactive</Text>
            </View>            
            <View style={{backgroundColor: 'white', borderColor: "black", borderWidth: 1, flex: 0.5}}>
            <Text style={styles.title}>Calculator</Text>
            </View>
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
            <Text style={{textAlign: 'center'}}>
            Enter Two Numbers
            </Text>
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
            <TextInput
            style={{height: 40, width: 150, borderColor: 'gray', borderWidth: 1}}
                   onChangeText={(input_1) => this.onInput1Change(input_1)}
            value={this.state.input_1} 
            placeholder='ie: 15'
            />
            <TextInput
            style={{height: 40, width: 150, borderColor: 'gray', borderWidth: 1}}
            onChangeText={(input_2) => this.onInput2Change(input_2)}
            value={this.state.input_2}
            placeholder='ie: 32'            
            />
            </View>
            <TouchableNativeFeedback
            onPress={this.onSwap}
            background={TouchableNativeFeedback.SelectableBackground()}>
            <View style={{flexDirection: 'row', height: 20, marginBottom: 15, backgroundColor: 'blue', justifyContent: "center"}}>
            <Text style={{textAlign: "center", color: "white"}}>Swap</Text>
            </View>
            </TouchableNativeFeedback>             
            <TouchableNativeFeedback
            onPress={this.onClear}
            background={TouchableNativeFeedback.SelectableBackground()}>
            <View style={{flexDirection: 'row', height: 20, backgroundColor: 'grey', justifyContent: "center"}}>
            <Text style={{textAlign: "center", color: "white"}}>Clear</Text>
            </View>
            </TouchableNativeFeedback>            
            <ListView dataSource={this.state.operations} renderRow={this.renderOperation} style={styles.listView} />
            </View>
        );
    },
    renderOperation: function(operation) {
        return (
            <View>
            <Text style={styles.operation_type}>
            {operation.type}
            </Text>
            <Text style={styles.operation_result}>
            {operation.result}
            </Text>            
            </View>
        );
    },
    twoInputsValid: function() {
        if ((this.state.input_1 != "") && (this.state.input_2 != "")) {
            if ((isNaN(this.state.input_1) == false) && (isNaN(this.state.input_2) == false)) {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    },
    onInput1Change: function(text) {
        this.setState(
        {input_1 : text}
        )
        this.setOperations()
    },
    onInput2Change: function(text) {
        this.setState(
        {input_2 : text}
        )
        this.setOperations()        
    },
    onClear: function () {
        this.setState(
        {
            input_1 : "",
            input_2 : ""
        }
        )
        this.setOperations()
    },
    onSwap: function () {
        var temp = this.state.input_1
        this.setState(
        {
            input_1 : this.state.input_2,
            input_2 : temp
        }
        )
        this.setOperations()
    }    
});

var styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'red'
    },
    title: {
        fontSize: 25,
        textAlign: 'center',
        color: "black"
    },
    operation_type: {
        fontSize: 19,
        textAlign: 'center',
        color: "black"
    },
    operation_result: {
        fontSize: 14,
        textAlign: 'center',
        color: "black"
    },        
    listView: {
        paddingTop: 20,
        backgroundColor: '#F5FCFF',
    },
});

AppRegistry.registerComponent('ReactiveCalculator', () => ReactiveCalculator);
