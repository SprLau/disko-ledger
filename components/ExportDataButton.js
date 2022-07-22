import { TouchableOpacity } from 'react-native';
import { styles, windowWidth } from '../styles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Toast from 'react-native-toast-message';
import * as Clipboard from 'expo-clipboard';

export default function ExportDataButton(props) {
  return (
    <TouchableOpacity style={[styles.exportDataButton, {marginLeft: 2}]} onPress={async () => {
      await Clipboard.setStringAsync(props.content.toString());
      Toast.show({
        type: 'success',
        text1: '导出成功！',
        text2: '全部数据内容已经复制到手机剪贴板，请至别处粘贴保存。'
      })
    }}>
      <Ionicons name={'download'} color={'white'} size={windowWidth / 20} />
    </TouchableOpacity>
  )
}
