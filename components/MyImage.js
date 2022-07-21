import { Image, StyleSheet } from 'react-native';

export default function MyImage(props) {
  const styles = StyleSheet.create({
    image: {
      width: props.width,
      flex: 1,
      resizeMode: 'contain',
    }
  })

  return (
    <Image style={styles.image} source={props.src} />
  )
}
