import { SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { styles, windowHeight, windowWidth } from '../styles';
import { deleteDate, editData } from '../utils/storage';
import { useState } from 'react';
import Modal from "react-native-modal";
import Ionicons from 'react-native-vector-icons/Ionicons';
import AwesomeAlert from 'react-native-awesome-alerts';

export default function Details({ navigation, route }) {
  const item = route.params.item;
  const time = route.params.time;
  const expense = route.params.expense;

  const [showModal, setShowModal] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [editExpense, setEditExpense] = useState(expense);
  const [editItem, setEditItem] = useState(item);

  return (
    <View style={[styles.detailsMainContainer]}>
      <SafeAreaView>
        <ScrollView contentContainerStyle={{
          alignItems: 'center',
        }}>
          <View style={[styles.detailsContainer, {backgroundColor: 'yellow'}]}>
            <Text style={styles.detailsItem}>
              {item}
            </Text>
          </View>
          <View style={[styles.detailsContainer, {backgroundColor: 'white', paddingVertical: 50}]}>
            <Text style={styles.detailsExpense}>
              ¥{expense}
            </Text>
          </View>
          <View style={[styles.detailsContainer, {backgroundColor: '#001a9a'}]}>
            <Text style={styles.detailsTime}>
              {time}
            </Text>
          </View>
        </ScrollView>
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginVertical: 20,
        }}>
          <TouchableOpacity style={[styles.detailsButton, {backgroundColor: '#d96a13'}]} onPress={() => {
            setShowAlert(true);
          }}>
            <Text style={styles.detailsButtonText}>
              删除
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.detailsButton, {backgroundColor: '#8c5350'}]} onPress={() => {
            setShowModal(true);
          }}>
            <Text style={styles.detailsButtonText}>
              编辑
            </Text>
          </TouchableOpacity>
        </View>
        <Modal style={styles.modal} isVisible={showModal}>
          <ScrollView contentContainerStyle={{alignItems: 'center', paddingTop: windowHeight / 5}}>
            <View style={styles.modalInputLabelContainer}>
              <Text style={styles.modalInputLabel}>
                开销
              </Text>
            </View>
            <View style={{
              flexDirection: 'row'
            }}>
              <Ionicons name={'logo-yen'} color={'#dedede'} size={50} style={{marginTop: 8}} />
              <TextInput
                value={editExpense}
                onChangeText={(d) => {
                  setEditExpense(d);
                }}
                style={[styles.modalInput, {width: windowWidth / 1.4 - 50, fontSize: 40, fontFamily: 'Electrolize'}]} />
            </View>
            <View style={styles.modalInputLabelContainer}>
              <Text style={styles.modalInputLabel}>
                用途
              </Text>
            </View>
            <TextInput
              value={editItem}
              onChangeText={(d) => {
                setEditItem(d);
              }}
              multiline
              style={[styles.modalInput, {fontSize: 28, height: 160, padding: 20}]}  />
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
                await editData(time, {
                  _T: time,
                  _E: editExpense,
                  _M: editItem
                })
                navigation.goBack();
              }}>
                <Text style={styles.modalButtonText}>
                  确认
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </Modal>
        <AwesomeAlert
          show={showAlert}
          title="要删除吗？"
          closeOnTouchOutside={false}
          showCancelButton={true}
          showConfirmButton={true}
          cancelText="取消"
          confirmText="确认"
          onCancelPressed={() => {
            setShowAlert(false);
          }}
          onConfirmPressed={async () => {
            await deleteDate(time);
            navigation.goBack();
          }}
          titleStyle={{
            fontSize: 25
          }}
          cancelButtonTextStyle={{
            fontSize: 20
          }}
          confirmButtonTextStyle={{
            fontSize: 20
          }}
        />
      </SafeAreaView>
    </View>
  )
}
