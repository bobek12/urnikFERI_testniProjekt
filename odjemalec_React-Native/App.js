import React from 'react';
import { StyleSheet, Text, View, ScrollView, TextInput, Button, Alert, Modal, TouchableHighlight } from 'react-native';
import Zaposleni from './components/Zaposleni';
import ZaposleniPodrobnosti from './components/ZaposleniPodrobnosti';

export default class App extends React.Component {
  state = {
    podatki: [],
    ime: '',
    priimek: '',
    naziv: '',
    elektronska_posta: '',
    govorilne_ure: '',
    showZaposleni: false,
    showTextInputs: false,
    modalVisible: false,
    data: ''
  }

  ToglePersonHandler = () => {
    const show = this.state.showZaposleni;
    this.setState({ showZaposleni: !show });
    this.setState({ showTextInputs: false });

    fetch('http://10.0.2.2:3000/zaposleni')
      .then(response => response.json()).then(data => {
        const newPolje = data.map(z => {
          return {
            id: z.id, ime: z.ime, priimek: z.priimek,
          }
        })
        const polje = [...newPolje];
        this.setState({ podatki: polje });
      }).catch(error => {
        console.log(error);
      })
  }

  PrikaziPodrobnosti = (index) => {
    console.log(index);

    fetch('http://10.0.2.2:3000/zaposleni/' + index)
      .then(response => response.json()).then(data => {
        this.setState({ data: data });
        this.setState({ modalVisible: true })
      }).catch(error => {
        console.log(error);
      })
  }

  ToggleDodajZaposlenegaHandler = () => {

    const objektZaposlen = {
      ime: this.state.ime, priimek: this.state.priimek, naziv: this.state.naziv, elektronska_posta: this.state.elektronska_posta, govorilne_ure: this.state.govorilne_ure, prostor_id: 1
    }

    //TODO: odjemalec preverjanje input podatkov

    fetch('http://10.0.2.2:3000/zaposleni', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(objektZaposlen)
    })
      .then(response => response.json())
      .then(data => {
        Alert.alert(
          'Zaposleni',
          data.sporocilo,
          [{ text: 'Ok', onPress: () => console.log('OK Pressed') }],
          { cancelable: false }
        )
      })
      .catch(error => {
        console.log('Napaka: ', error);
      });
  }

  TogleTextImput = () => {
    const show = this.state.showTextInputs;
    this.setState({ showTextInputs: !show });
    this.setState({ showZaposleni: false });
  }


  render() {
    let zaposleni = null;

    if (this.state.showZaposleni === true) {
      zaposleni = (
        this.state.podatki.map(z =>
          <View>
            <Zaposleni
              key={z.id}
              ime={z.ime}
              priimek={z.priimek} />

            <View style={styles.buttonManjsi}>
              <Button
                textStyle={styles.textStyle}
                title="Podrobnosti"
                onPress={() => this.PrikaziPodrobnosti(z.id)}
                color="silver">
              </Button>

              <Modal
                animationType="slide"
                transparent={false}
                visible={this.state.modalVisible}
                onRequestClose={() => {
                  alert('Modal has been closed.');
                }}>
                <View style={{ marginTop: 22 }}>
                  <View>
                    <View style={styles.bottom}>
                      <ZaposleniPodrobnosti
                        ime={this.state.data.ime}
                        priimek={this.state.data.priimek}
                        naziv={this.state.data.naziv}
                        elektronska_posta={this.state.data.elektronska_posta}
                        govorilne_ure={this.state.data.govorilne_ure}
                      />
                    </View>
                    <Button
                      title="Zapri"
                      onPress={() => {
                        this.setState({ modalVisible: false });
                      }}>
                      <Text>Zapri okno</Text>
                    </Button>
                  </View>
                </View>
              </Modal>
            </View>
          </View >
        ));
    }

    let dodajZaposleni = null

    if (this.state.showTextInputs === true) {
      dodajZaposleni = (
        <View style={styles.formStyle}>

          <TextInput
            style={styles.textInputStyle}
            placeholder={"Vpišite ime"}
            onChangeText={(text) => this.setState({ ime: text })}
            value={this.state.text}
          />
          <TextInput
            placeholder={"Vpišite priimek"}
            style={styles.textInputStyle}
            onChangeText={(text) => this.setState({ priimek: text })}
            value={this.state.text}
          />
          <TextInput
            placeholder={"Vpišite naziv"}
            style={styles.textInputStyle}
            onChangeText={(text) => this.setState({ naziv: text })}
            value={this.state.text}
          />

          <TextInput
            placeholder={"Vpišite e-naslov"}
            style={styles.textInputStyle}
            onChangeText={(text) => this.setState({ elektronska_posta: text })}
            value={this.state.text}
          />
          <TextInput
            placeholder={"Vpišite govorilne ure"}
            style={styles.textInputStyle}
            onChangeText={(text) => this.setState({ govorilne_ure: text })}
            value={this.state.text}
          />
          <View style={styles.buttonManjsi}>
            <Button
              style={styles.buttonShrani} textStyle={styles.textStyle}
              title="Shrani"
              onPress={this.ToggleDodajZaposlenegaHandler}
              color="#ef6967">
            </Button>
          </View>
        </View>
      );
    }

    return (
      <ScrollView>
        <View>
          <Button
            style={styles.buttonStyle2} textStyle={styles.textStyle}
            title="Seznam zaposlenih"
            onPress={this.ToglePersonHandler}>
          </Button>
          <Button
            style={styles.buttonStyle3} textStyle={styles.textStyle}
            title="dodaj zaposlenega"
            onPress={this.TogleTextImput}
            color="#3B3747">
          </Button>
          {zaposleni}
          {dodajZaposleni}
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'silver',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonStyle2: {
    borderColor: '#c0392b',
    backgroundColor: '#e74c3c'
  },
  buttonStyle3: {
    borderColor: '#16a085',
    backgroundColor: '#ef6967',
    marginTop: 10,
    marginLeft: 20,
  },
  textStyle: {
    color: 'white'
  },
  textInputStyle: {
    height: 40,
    marginTop: 5
  },
  buttonShrani: {
    backgroundColor: 'red',
  },
  formStyle: {
    paddingTop: 20
  },
  buttonManjsi: {
    margin: 15
  },
  bottom: {
    marginBottom: 450
  }
});
