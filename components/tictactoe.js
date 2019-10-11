import React, {Component} from 'react';
import { StyleSheet, View, TouchableOpacity, Image, ImageBackground} from 'react-native';
import swal from 'sweetalert';
import Buttons from './button'


export default class TicTacToe extends Component{


constructor(props){
  super(props)

  this.state = {
   gameState : [
    [0,0,0],
    [0,0,0],
    [0,0,0]
   ],
   currentPlayer: 1,
   changePlayers : false
  }

} 


componentDidMount(){
 this.startGame();
}
   
startGame = () => {
 this.setState({gameState:
   [ 
     [0,0,0],
     [0,0,0],
     [0,0,0]
   ]
  })
}
restartGame = () => {
  this.startGame();
  this.setState({changePlayers: false})
}


whoWon = () =>{
  const matchTiles = 3
  let arr = this.state.gameState;
  let sum;

  //chekaer row
  for(let i = 0; i< matchTiles; i++){
    sum = arr[i][0] + arr[i][1] + arr[i][2]
    if(sum === 3){
      return 1
    } else if(sum === -3){
      return -1
    } 
  }
  //chekear colums 
  for(let i = 0; i< matchTiles; i++){
    sum = arr[0][i] + arr[1][i] + arr[2][i]
    if(sum === 3){
      return 1
    } else if(sum === -3){
      return -1
    }
  }

  sum = arr[0][0] + arr[1][1] + arr[2][2]
  if(sum === 3){
    return 1;
  } else if(sum === -3){
    return -1;
  }
  
  sum = arr[2][0] + arr[1][1] + arr[0][2]
  if(sum === 3){
    return 1
  } else if(sum === -3){
    return -1
  }
  //sin ganador
  return 0
}
noWinner = () =>{
  const allTiles = 3;
  let arr = this.state.gameState;

  for(let i = 0; i< allTiles; i++){
    for(let x = 0; x < allTiles; x++){
      if(arr[i][x] === 0){
        return false
      } 
    }
  }
  return swal('Oh! Try again')
}
 
onTilePress =(row, col) => {
  //no cambiar tile que ya fue presionada
  let value = this.state.gameState[row][col];
  if(value != 0){return;}

  //el current player
  let currentPlayer = this.state.currentPlayer;

//presionar el tile correcto
  let correctTile = this.state.gameState.slice();
  correctTile[row][col] = currentPlayer;
  this.setState({gameState: correctTile})

//cambiar de jugador
  let otherPlayer = (currentPlayer === 1) ? -1 : 1;
  this.setState({currentPlayer: otherPlayer})
  
// ganador 
  let winner = this.whoWon();
  if (winner === 1){
    swal("Bad Bunny won!")
    this.restartGame()
    // this.setState({currentPlayer: 0})
    
  }
  if(winner === -1){
    swal("J Balvin won!")
    this.restartGame()
    // this.setState({currentPlayer: 0})
    
  }else if(winner === 0){
   this.noWinner()
  }
console.log(winner)
}

//mostrar las imagenes que corresponden a cada jugador
renderImages = (row,col) =>{ 
  let value = this.state.gameState[row][col];
  if(this.state.changePlayers === true){
    switch(value){
      case 1: return <Image source={require('../img/bb(1).png')} style={styles.images}/>;
      case -1: return <Image source={require("../img/jb(1).png")} style={styles.images}/>;
      default: return <View/>
    }
  }else (this.state.changePlayers === false)
  switch(value){
    case 1: return <Image source={require('../img/bb.png')} style={styles.images}/>;
    case -1: return <Image source={require("../img/jb.png")} style={styles.images}/>;
    default: return <View/>
  }
}

changeThePlayers= () =>{
  // this.setState({changePlayers: true})
  let keepIt = this.state.changePlayers
  let changeIt = (keepIt === false) ? true : false;
  this.setState({changePlayers: changeIt})
}



  render(){ 
  return (
  
    <ImageBackground style={styles.container} source={require('../img/stars.jpg')}>
         
      <Image source={require('../img/title.png')} style={styles.title}></Image>
      <View style={{padding:'20px'}}></View>

    <View style={{flexDirection:'row'}}> 
      <TouchableOpacity onPress={() => this.onTilePress(0,0)} style={[styles.tile, {borderLeftWidth: 0, borderTopWidth:0}]}>
        {this.renderImages(0,0)}
      </TouchableOpacity>
      <TouchableOpacity onPress={() => this.onTilePress(0,1)} style={[styles.tile, {borderTopWidth: 0}]}>
        {this.renderImages(0,1)}
      </TouchableOpacity>
      <TouchableOpacity onPress={() => this.onTilePress(0,2)} style={[styles.tile, {borderTopWidth: 0, borderRightWidth:0}]}>
      {this.renderImages(0,2)}
      </TouchableOpacity>
    </View>

    <View style={{flexDirection:'row'}}> 
      <TouchableOpacity onPress={() => this.onTilePress(1,0)} style={[styles.tile, {borderLeftWidth: 0}]}>
      {this.renderImages(1,0)}
      </TouchableOpacity>
      <TouchableOpacity onPress={() => this.onTilePress(1,1)} style={[styles.tile, {}]}>
      {this.renderImages(1,1)}
      </TouchableOpacity>
      <TouchableOpacity onPress={() => this.onTilePress(1,2)} style={[styles.tile, {borderRightWidth:0}]}>
      {this.renderImages(1,2)}
      </TouchableOpacity>
    </View>

    <View style={{flexDirection:'row'}}> 
      <TouchableOpacity onPress={() => this.onTilePress(2,0)} style={[styles.tile, {borderBottomWidth: 0, borderLeftWidth:0}]}>
      {this.renderImages(2,0)}
      </TouchableOpacity>
      <TouchableOpacity onPress={() => this.onTilePress(2,1)} style={[styles.tile, {borderBottomWidth: 0}]}>
      {this.renderImages(2,1)}
      </TouchableOpacity>
      <TouchableOpacity onPress={() => this.onTilePress(2,2)} style={[styles.tile, {borderBottomWidth: 0, borderRightWidth:0}]}>
      {this.renderImages(2,2)}
      </TouchableOpacity>
    </View>

<View style={{flexDirection:'row', paddingTop:30}}>
  <Buttons onPress={this.restartGame} source={require('../img/refre(1).png')} ></Buttons>
  <View style={{padding:10}}></View>
  <Buttons onPress={this.changeThePlayers} source={require('../img/change.png')}></Buttons>

</View>
    </ImageBackground >
    // </View>
  );
}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: '#151D34'
  },

  tile: {
    borderWidth: 8,
    backgroundColor: 'transparent',
    width: '120px',
    height: '120px',
    borderBottomColor: '#C02D2B',
    borderLeftColor: '#def241',
    borderRightColor: '#def241',
    borderTopColor: '#C02D2B',
  },

  images:{
    width:100,
    height:100,
  },
 
  title:{
    width:300,
    height: 50,
    marginTop: -20
  },

 
});