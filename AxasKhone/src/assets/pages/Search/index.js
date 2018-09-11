import { createStackNavigator } from 'react-navigation';

import Main from './Main';
import Search from './Search';

const SearchStack = createStackNavigator(
  {
    Search: { screen: Search },
    Main: { screen: Main }
  },
  {
    navigationOptions: {
      tabBarVisible: false
    }
  }
);

SearchStack.navigationOptions = ({ navigation }) => {
  return {
    tabBarVisible: navigation.state.index === 0
  };
};
export default SearchStack;
