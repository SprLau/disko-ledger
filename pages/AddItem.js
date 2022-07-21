import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { styles, windowHeight, windowWidth } from '../styles';
import { useState } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MyImage from '../components/MyImage';
import { storeData } from '../utils/storage';

export default function AddItem() {
  const [expense, setExpense] = useState();
  const [mark, setMark] = useState();

  return (
    <View style={[styles.mainContainer]}>
      <View>
        <View style={{height: 100, marginTop: 40, marginBottom: 20, opacity: 0.5}}>
          <MyImage src={require('../assets/cat-logo.png')} />
        </View>
        <View style={[styles.formControlUniversal]}>
          <View style={{justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center'}}>
            <View style={{paddingBottom: 10, paddingRight: 5}}>
              <Ionicons name={'logo-yen'} color={'grey'} size={50} />
            </View>
            <TextInput
              style={[styles.inputUniversal, {height: windowHeight / 12, width: windowWidth / 1.3 - 55}, {fontSize: 50, textAlign: 'center', fontWeight: 'bold', color: 'black', fontFamily: 'Electrolize'}]}
              value={expense}
              onChangeText={(d) => {
                setExpense(d);
              }}
              keyboardType="numeric"
            />
          </View>
        </View>
        <View style={[styles.formControlUniversal]}>
          <TextInput
            multiline
            style={[styles.inputUniversal, {height: windowHeight / 4, borderRadius: 0, padding: 20, borderColor: 'white'}, {fontSize: 30}]}
            value={mark}
            onChangeText={(d) => {
              setMark(d);
            }}
          />
        </View>
        <TouchableOpacity style={styles.submitButton} onPress={async () => {
          const current = new Date();
          const timeAsKey = current.toLocaleString();
          await storeData(timeAsKey, {
            _T: timeAsKey,
            _E: expense,
            _M: mark
          });
          setExpense('');
          setMark('');
        }}>
          <Text style={styles.submitButtonText}>
            记上这一笔
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}
