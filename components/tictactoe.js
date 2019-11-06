import React, { useState } from 'react';
import { StyleSheet, View, ImageBackground, Image, TouchableOpacity, Alert } from 'react-native';
export default function App() {

  const [gameState, setGameState] = useState([
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
  ]);
  const [currentPlayer, setCurrentPlayer] = useState(1);
  const [changePlayer, setChangePlayer] = useState(false)

  const reStartGame = () => {
    setGameState([
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0]
    ])
    setCurrentPlayer(1)
    setChangePlayer(false)
  }

  const whoWon = () => {
    const matchTiles = 3
    let sum;

    //chekaer row
    for (let i = 0; i < matchTiles; i++) {
      sum = gameState[i][0] + gameState[i][1] + gameState[i][2]
      if (sum === 3) {
        return 1
      } else if (sum === -3) {
        return -1
      }
    }
    //chekear colums 
    for (let i = 0; i < matchTiles; i++) {
      sum = gameState[0][i] + gameState[1][i] + gameState[2][i]
      if (sum === 3) {
        return 1
      } else if (sum === -3) {
        return -1
      }
    }

    sum = gameState[0][0] + gameState[1][1] + gameState[2][2]
    if (sum === 3) {
      return 1;
    } else if (sum === -3) {
      return -1;
    }

    sum = gameState[2][0] + gameState[1][1] + gameState[0][2]
    if (sum === 3) {
      return 1
    } else if (sum === -3) {
      return -1
    }
    //sin ganador
    return 0
  }

  const noWinner = () => {
    const allTiles = 3;

    for (let i = 0; i < allTiles; i++) {
      for (let x = 0; x < allTiles; x++) {
        if (gameState[i][x] === 0) {
          return false
        }
      }
    }
    return Alert.alert('Oh! Try again')
    reStartGame()
  }

  const onTilePress = (row, col) => {
    //no cambiar tile que ya fue presionada
    let value = gameState[row][col];
    if (value != 0) { return; }

    console.log('value:', value)
    //el current player


    //presionar el tile correcto
    let correctTile = gameState.slice();
    correctTile[row][col] = currentPlayer;
    setGameState(correctTile)

    //cambiar de jugador
    let otherPlayer = (currentPlayer === 1) ? -1 : 1;
    setCurrentPlayer(otherPlayer)

    // ganador 
    let winner = whoWon();
    if (winner === 1) {
      Alert.alert("¡Bad Bunny wons!")
      reStartGame()
      // this.setState({currentPlayer: 0})

    }
    if (winner === -1) {
      
      Alert.alert('¡J Balvin wons!')
      reStartGame()
      // this.setState({currentPlayer: 0})

    } else if (winner === 0) {
      noWinner()
    
    console.log('winner:', winner)
  }
}

  const renderImages = (row, col) => {
    let value = gameState[row][col]; 
    if (changePlayer === false) {
      switch (value) {
        case 1: return <Image source={require('../img/bb.png')} style={styles.images} />;
        case -1: return <Image source={require('../img/jb.png')} style={styles.images} />;
        default: return <View />
      }
    } else (changePlayer === true)
    switch (value) {
      case 1: return <Image source={require('../img/bb(1).png')} style={styles.images} />;
      case -1: return <Image source={require("../img/jb(1).png")} style={styles.images} />;
      default: return <View />
    }
  }


  const changeThePlayers = () => {
    // this.setState({changePlayers: true})

    let changeIt = (changePlayer === false) ? true : false;
    setChangePlayer(changeIt)
  }


  return (

    <ImageBackground style={styles.container} source={require('../img/stars.jpg')}>
    <View style={{ marginTop: 50 }}></View>
      <Image source={require('../img/title.png')} style={styles.title}></Image>
      <View style={{ marginBottom: 30 }}></View>

      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity onPress={() => onTilePress(0, 0)} style={[styles.tile, { borderLeftWidth: 0, borderTopWidth: 0 }]}>
          {renderImages(0, 0)}
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onTilePress(0, 1)} style={[styles.tile, { borderTopWidth: 0 }]}>
          {renderImages(0, 1)}
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onTilePress(0, 2)} style={[styles.tile, { borderTopWidth: 0, borderRightWidth: 0 }]}>
          {renderImages(0, 2)}
        </TouchableOpacity>
      </View>

      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity onPress={() => onTilePress(1, 0)} style={[styles.tile, { borderLeftWidth: 0 }]}>
          {renderImages(1, 0)}
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onTilePress(1, 1)} style={[styles.tile, {}]}>
          {renderImages(1, 1)}
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onTilePress(1, 2)} style={[styles.tile, { borderRightWidth: 0 }]}>
          {renderImages(1, 2)}
        </TouchableOpacity>
      </View>

      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity onPress={() => onTilePress(2, 0)} style={[styles.tile, { borderBottomWidth: 0, borderLeftWidth: 0 }]}>
          {renderImages(2, 0)}
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onTilePress(2, 1)} style={[styles.tile, { borderBottomWidth: 0 }]}>
          {renderImages(2, 1)}
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onTilePress(2, 2)} style={[styles.tile, { borderBottomWidth: 0, borderRightWidth: 0 }]}>
          {renderImages(2, 2)}
        </TouchableOpacity>
      </View>

      <View style={styles.buttons}>
        <TouchableOpacity style={styles.BackgroundBtn} onPress={() => reStartGame()} >
          <Image style={styles.btnImage} source={require('../img/refre(1).png')} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.BackgroundBtn} onPress={() => changeThePlayers()} >
          <Image style={styles.btnImage} source={require('../img/change.png')} />
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tile: {
    borderWidth: 8,
    backgroundColor: 'transparent',
    width: 110,
    height: 110,
    borderBottomColor: '#C02D2B',
    borderLeftColor: '#def241',
    borderRightColor: '#def241',
    borderTopColor: '#C02D2B',
  },
  images: {
    width: 90,
    height: 90,
  },
  title: {
    width: 300,
    height: 50,
  },
  buttons: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: 'row',
    marginTop:-20,
    marginBottom: -20
  },
  btnImage: {
    width: 35,
    height: 35,

  },
  BackgroundBtn: {
    backgroundColor: "#21B3B6",
    padding: 20,
    borderRadius: 50,
    marginLeft: 10

  }
});