import { Pressable, ScrollView, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { styles, windowHeight, windowWidth } from '../styles';
import { useState } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MyImage from '../components/MyImage';
import { storeData } from '../utils/storage';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function AddItem() {
  const [expense, setExpense] = useState();
  const [mark, setMark] = useState();

  return (
    <ScrollView contentContainerStyle={[styles.mainContainer]}>
      <Pressable style={{height: 100, marginTop: 40, marginBottom: 20, opacity: 0.5}} onPress={() => {
        Toast.show({
          type: 'info',
          text1: 'Meow~',
          text2: 'Sprinvia Inc. made this for DISKO the fluff :)'
        })
      }}>
        <MyImage src={require('../assets/cat-logo.png')} />
      </Pressable>
      <View style={[styles.formControlUniversal, {alignSelf: 'center'}]}>
        <View style={{justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center'}}>
          <View style={{paddingBottom: 10, paddingRight: 5}}>
            <Ionicons name={'logo-yen'} color={'grey'} size={50} />
          </View>
          <TextInput
            style={[styles.inputUniversal, {height: windowHeight / 12, width: windowWidth / 1.3 - 55}, {fontSize: 40, textAlign: 'center', fontWeight: 'bold', color: 'black', fontFamily: 'Electrolize'}]}
            value={expense}
            onChangeText={(d) => {
              setExpense(d);
            }}
            keyboardType="numeric"
          />
        </View>
      </View>
      <View style={[styles.formControlUniversal, {alignSelf: 'center'}]}>
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
        if (expense === '' || expense === undefined) {
          Toast.show({
            type: 'error',
            text1: '错误！',
            text2: '必须输入费用！'
          })
          return
        }

        if (mark === '' || mark === undefined) {
          Toast.show({
            type: 'error',
            text1: '错误！',
            text2: '必须输入用途！'
          })
          return
        }

        const current = new Date();
        const timeAsKey = current.toLocaleString();
        await storeData(timeAsKey, {
          _T: timeAsKey,
          _E: expense,
          _M: mark
        });
        Toast.show({
          type: 'success',
          text1: '添加成功！',
          text2: '花销: ' + expense.toString() + '    用途: ' + mark.toString(),
        })
        setExpense('');
        setMark('');
      }}>
        <Text style={styles.submitButtonText}>
          记上这一笔
        </Text>
      </TouchableOpacity>
    </ScrollView>
  )
}
