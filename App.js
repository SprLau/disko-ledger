import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AddItem from './pages/AddItem';
import ViewAll from './pages/ViewAll';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useFonts } from 'expo-font';
import Details from './pages/Details';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

export default function App() {
  const [loaded] = useFonts({
    Electrolize: require('./assets/font/Electrolize-Regular.ttf'),
  });

  if (!loaded) {
    return null;
  }

  const Tab = createBottomTabNavigator();
  const Stack = createNativeStackNavigator();

  function BottomTab() {
    return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color }) => {
            let iconName;
            if (route.name === '添加') {
              iconName = focused
                ? 'add-circle'
                : 'add-circle-outline';
            } else if (route.name === '浏览') {
              iconName = focused ? 'wallet' : 'wallet';
            }

            return <Ionicons name={iconName} color={color} size={30} />;
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',})}>
        <Tab.Screen name="添加" component={AddItem} />
        <Tab.Screen name="浏览" component={ViewAll} />
      </Tab.Navigator>
    )
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='tab' component={BottomTab} options={{
          headerShown: false
        }} />
        <Stack.Screen name='详细信息' component={Details} options={{
          headerShown: false
        }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
