import React, {Component} from 'react';
import {StyleSheet,View,TouchableOpacity,Image,ImageBackground} from 'react-native';

export default class TicTacToe extends Component {

    render() {
        return ( 
            <ImageBackground style = {styles.container}source = {require('../img/stars.jpg')} >

            <Image source = {require('../img/title.png')}style = {styles.title} > </Image> 
            <View style = {{padding: '20px'}} > </View> 
            
            </ImageBackground>

        )
    }
}
const styles = StyleSheet.create({

    title:{
        width:300,
        height: 50,
        marginTop: -50
      },
    
});