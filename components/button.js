import React, {Component} from 'react';
import {TouchableOpacity, View, StyleSheet, Image} from 'react-native';

export default class Buttons extends Component {
   
    render() {
        return ( 
            <View style={styles.container}>
              
               <TouchableOpacity style={styles.BackgroundBtn}
               
                  onPress={this.props.onPress} > 

                <Image style={styles.btnImage} source={this.props.source}/> 

               </TouchableOpacity> 

            </View>
            

        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        width:'10%'
      
    },

    btnImage:{
        width:50,
        height: 50,
       
    },

    BackgroundBtn: {
        backgroundColor: "#21B3B6",
        padding: 20,
        borderRadius: 50,
       
    }
})