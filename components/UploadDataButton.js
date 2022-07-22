import { ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { styles, windowHeight, windowWidth } from '../styles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Toast from 'react-native-toast-message';
import Modal from 'react-native-modal';
import { useState } from 'react';
import { storeData } from '../utils/storage';
import { useNavigation } from '@react-navigation/native';

async function upload(input) {
  let l = 0, r = 0;
  for (let i = 0; i < input.length; ++i) {
    if (input[i] === '{') {
      l = i
      while (input[i] !== '}')
        ++i
      r = ++i
      const t = JSON.parse(input.substr(l, r - l))
      await storeData(t['_T'], {
        _T: t['_T'],
        _E: t['_E'],
        _M: t['_M']
      })
    }
  }
}

export default function UploadDataButton() {
  const [showModal, setShowModal] = useState(false);
  const [input, setInput] = useState('');
  const navi = useNavigation();

  return (
    <>
      <Modal style={styles.modal} isVisible={showModal}>
        <ScrollView contentContainerStyle={{alignItems: 'center', paddingTop: windowHeight / 5}}>
          <View style={styles.modalInputLabelContainer}>
            <Text style={styles.modalInputLabel}>
              JSON上传
            </Text>
          </View>
          <TextInput
            multiline
            placeholder={'数据格式为: \n{\"_T\":\"7/22/2022, 4:50:38 PM\",\"_E\":\"3\",\"_M\":\"猫粮\"},\n{\"_T\":\"7/22/2022, 4:50:33 PM\",\"_E\":\"1\",\"_M\":\"驱虫\"}\n其中日期请严格按照示例书写！'}
            value={input}
            onChangeText={(d) => {
              setInput(d);
            }}
            style={[styles.modalInput, {width: windowWidth / 1.4, height: windowHeight / 2.4, fontSize: 15}]} />
          <View style={{
            justifyContent: 'space-between',
            flexDirection: 'row'
          }}>
            <TouchableOpacity style={[styles.modalButton, {backgroundColor: 'red'}]} onPress={() => {
              setShowModal(false);
            }}>
              <Text style={styles.modalButtonText}>
                取消
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.modalButton, {backgroundColor: 'green'}]} onPress={async () => {
              await upload(input)
              Toast.show({
                type: 'success',
                text1: '导入成功！',
                text2: '全部数据内容已经导入至本地数据库。'
              })
              setShowModal(false);
              setInput('');
              navi.navigate('添加');
            }}>
              <Text style={styles.modalButtonText}>
                确认
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </Modal>
      <TouchableOpacity style={[styles.exportDataButton, {paddingLeft: 0, backgroundColor: '#6bfffd', marginRight: 2}]} onPress={() => {
        setShowModal(true);
      }}>
        <Ionicons name={'rocket'} color={'white'} size={windowWidth / 20} />
      </TouchableOpacity>
    </>
  )
}
