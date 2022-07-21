import {Pressable, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import { windowWidth } from '../styles';

export default function Item(props) {
  const navi = useNavigation();
  const [showOpt, setShowOpt] = useState(false);
  const cancelRef = React.useRef(null);
  const onClose = () => {
    setShowOpt(false);
  };
  return (
    // <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 1}}
    //                 colors={makeRandomColor()}
    //                 style={[styles.touchArea, styles.touchAreaMargin]}>
    <TouchableOpacity
      style={[styles.touchArea, styles.touchAreaMargin]}
      onPress={() => {
        navi.push('详细信息', {
          time: props.time,
          item: props.item,
          expense: props.expense
        });
      }}
      onLongPress={() => {
        setShowOpt(true);
      }}
    >
      <Info time={new Date(props.time).getDate().toString()} item={short(props.item.toString(), 20)} expense={short(props.expense.toString(), 35)} />
    </TouchableOpacity>
    // </LinearGradient>
  );
}

function short(str, fontSize) {
  let containEnter = false;
  const split = str.split('\n');
  if (str.split('\n').length > 1) {
    containEnter = true;
  }
  const maxLength = Math.floor(windowWidth / 1.8 / fontSize * (6 / 7));
  return (split[0].length > maxLength ? split[0].substr(0, maxLength) + (containEnter ? '' : '...') : split[0]) + (containEnter ? '...' : '');
}

function Info(props) {
  return (
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
      <View style={{
        width: windowWidth / 6,
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <Text style={{fontWeight: '100', fontSize: 55}}>
          {props.time}
        </Text>
      </View>
      <View style={{width: 2, height: 80, backgroundColor: '#f2f2f2', marginHorizontal: 15}}>
      </View>
      <View style={{
        width: windowWidth / 1.8,
        paddingHorizontal: 10
      }}>
        <Text style={{fontWeight: '200', fontSize: 20}}>
          {props.item}
        </Text>
        <Text style={{fontWeight: 'bold', fontSize: 35, fontFamily: 'Electrolize'}}>
          {'¥' + props.expense}
        </Text>
      </View>
    </View>
  )
}

const colors = [
  '#0eff96',
  '#c1ff5d',
  '#fffb77',
  '#fffaaf',
  '#08d2ff',
  '#ff7cf4',
  '#ffb69d',
  '#fffb89',
  '#f8b7bb',
  '#9acbff',
  '#1effff',
  '#fffba3',
  '#ddc8ff',
];

function makeRandomColor() {
  const index = Math.floor(Math.random() * colors.length);
  let index2 = Math.floor(Math.random() * colors.length);
  const index3 = Math.floor(Math.random() * colors.length);
  while (index2 === index || index2 === index3) {
    index2 = Math.floor(Math.random() * colors.length);
  }
  return [colors[index], colors[index2], colors[index3]];
}

const styles = StyleSheet.create(
  {
    touchArea: {
      height: 100,
      width: windowWidth / 1.1,
      borderRadius: 10,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'white'
    },

    touchAreaMargin: {
      marginTop: 15,
      marginBottom: 1
    },
  }
);
