import { Dimensions, StyleSheet } from 'react-native';

export const windowWidth = Dimensions.get('window').width;
export const windowHeight = Dimensions.get('window').height;

export const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },

  formTitle: {
    fontWeight: '100',
    fontSize: 50,
    marginVertical: (windowWidth / 1.2 - windowWidth / 1.3) / 2
  },

  formControlUniversal: {
    marginTop: 10,
    borderRadius: 15,
    width: windowWidth / 1.1,
    alignItems: 'center',
  },

  inputUniversal: {
    height: 50,
    width: windowWidth / 1.3,
    borderRadius: 30,
    borderWidth: 1,
    backgroundColor: 'white',
    marginBottom: (windowWidth / 1.2 - windowWidth / 1.3) / 2
  },

  submitButton: {
    marginVertical: 10,
    width: windowWidth / 1.3,
    borderRadius: 30,
    height: 80,
    backgroundColor: 'tomato',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center'
  },

  submitButtonText: {
    fontSize: 30,
    fontWeight: '200',
    color: 'white'
  },

  viewAllContainer: {
    alignItems: 'center',
    flex: 1
  },

  unitCheckBox: {
    marginHorizontal: (windowWidth / 1.1 - 3 * windowWidth / 3.6) / 2,
    marginVertical: 5,
    width: windowWidth / 3,
    height: 40,
    borderRadius: 10,
    borderWidth: 3,
    borderColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },

  unitCheckBoxLabel: {
    fontSize: 20,
    fontWeight: '200',
  },

  detailsMainContainer: {
    flex: 1,
    backgroundColor: '#F2F2F2',
    alignItems: 'center',
  },

  detailsContainer: {
    padding: 20,
    marginTop: 20,
    borderRadius: 30,
    width: windowWidth / 1.25,
    alignItems: 'center',
  },

  detailsItem: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 30,
  },

  detailsExpense: {
    fontFamily: 'Electrolize',
    fontSize: 70,
  },

  detailsTime: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },

  detailsButton: {
    width: windowWidth / 1.25 / 2.4,
    height: 50,
    borderRadius: 30,
    marginHorizontal: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },

  detailsButtonText: {
    fontSize: 22,
    color: 'white',
    fontWeight: 'bold'
  },

  modal: {
    alignItems: 'center'
  },

  modalInputLabelContainer: {
    marginBottom: 10,
    height: 45,
    width: windowWidth / 1.4,
    backgroundColor: '#003c6c',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
  },

  modalInputLabel: {
    color: 'white',
    fontSize: 25,
    fontWeight: '300',
  },

  modalInput: {
    padding: 10,
    height: 70,
    width: windowWidth / 1.4,
    marginBottom: 20,
    borderWidth: 4,
    borderRadius: 15,
    backgroundColor: 'white'
  },

  modalButton: {
    width: windowWidth / 1.4 / 2.3,
    height: 50,
    borderRadius: 30,
    marginHorizontal: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },

  modalButtonText: {
    fontSize: 22,
    color: 'white',
    fontWeight: '300'
  },
})
