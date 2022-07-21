import { SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { styles, windowHeight } from '../styles';
import { deleteDate } from '../utils/storage';

export default function Details({ navigation, route }) {
  const item = route.params.item;
  const time = route.params.time;
  const expense = route.params.expense;

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
          <TouchableOpacity style={[styles.detailsButton, {backgroundColor: '#d96a13'}]} onPress={async () => {
            await deleteDate(time);
            navigation.goBack();
          }}>
            <Text style={styles.detailsButtonText}>
              删除
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.detailsButton, {backgroundColor: '#8c5350'}]}>
            <Text style={styles.detailsButtonText}>
              编辑
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  )
}
