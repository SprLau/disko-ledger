import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import Item from '../components/Item';
import { styles } from '../styles';
import { useState } from 'react';
import { fetchAll, fetchAllRaw, useAsyncResult } from '../utils/storage';
import Divider from 'react-native-divider';
import ExportDataButton from '../components/ExportDataButton';
import UploadDataButton from '../components/UploadDataButton';

function UnitCheckBox(props) {
  return (
    <TouchableOpacity style={[styles.unitCheckBox, {backgroundColor: props.bgColor}]} onPress={props.onPress}>
      <Text style={[styles.unitCheckBoxLabel, {
        color: props.bgColor === 'transparent' ? 'black' : 'white',
        fontWeight: props.bgColor === 'transparent' ? '200' : 'bold',
      }]}>
        {props.label}
      </Text>
    </TouchableOpacity>
  )
}

function calculatePeriodSum(set) {
  let res = 0;
  for (const item of set) {
    res += parseFloat(item['_E']);
  }
  return res;
}

function makeClusters(content, unit) {
  let res = new Map();
  if (unit === '_DAY') {
    for (let i = 0; i < content.length; ++i) {
      let tMonth = (new Date(content[i]['_T']).getMonth() + 1).toString() + '/' + new Date(content[i]['_T']).getFullYear().toString();
      if (res.get(tMonth) !== undefined) {
        const temSet = res.get(tMonth);
        temSet.push(content[i]);
        res.set(tMonth, temSet);
      } else {
        res.set(tMonth, [content[i]]);
      }
    }
  } else {
    for (let i = 0; i < content.length; ++i) {
      let tYear = (new Date(content[i]['_T']).getFullYear()).toString();
      if (res.get(tYear) !== undefined) {
        const temSet = res.get(tYear);
        temSet.push(content[i]);
        res.set(tYear, temSet);
      } else {
        res.set(tYear, [content[i]]);
      }
    }
  }

  let resSet = [];
  let cnt = 0;
  for (const clusterKey of res.keys()) {
    const thisCluster = res.get(clusterKey);
    const sumOfCluster = calculatePeriodSum(thisCluster);
    resSet.push(<Divider key={++cnt} borderColor="grey" color="grey">{clusterKey}  ¥{sumOfCluster}</Divider>)
    for (const item of thisCluster) {
      resSet.push(<Item key={++cnt} time={item['_T']} item={item['_M']} expense={item['_E']} />)
    }
  }

  return resSet;
}

export default function ViewAll() {
  const content = useAsyncResult(fetchAll, []);
  const rawData = useAsyncResult(fetchAllRaw, []);
  const monthAsUnit = '_DAY';
  const yearAsUnit = '_MONTH';
  const [unit, setUnit] = useState(monthAsUnit);

  return (
    <View style={styles.viewAllContainer}>
      <View style={{
        marginTop: 15,
        flexDirection: 'row'
      }}>
        <UnitCheckBox label={'每年'} bgColor={unit === yearAsUnit ? '#FFCCD4' : 'transparent'} onPress={() => {
          setUnit(yearAsUnit)
        }} />
        <UploadDataButton />
        <ExportDataButton content={rawData} />
        <UnitCheckBox label={'每月'} bgColor={unit === monthAsUnit ? '#FFCCD4' : 'transparent'} onPress={() => {
          setUnit(monthAsUnit)
        }} />
      </View>

      <ScrollView>
        {makeClusters(content, unit)}
      </ScrollView>

    </View>
  )
}
