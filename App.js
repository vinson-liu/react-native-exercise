/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';

import {
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';

const Form = ({submitEntry}) => {
  const isDarkMode = useColorScheme() === 'dark';
  const textColor = {
    color: isDarkMode ? '#F3F3F3' : '#222',
  };
  const [text, setText] = useState('');
  const submit = () => {
    if (!text) {
      return;
    }
    if (submitEntry(text)) {
      setText('');
    } else {
      alert('Item already exists');
    }
  };
  return (
    <View style={styles.form}>
      <Text style={[styles.heading, textColor]}>Create a Todo List</Text>
      <TextInput
        style={[styles.border, styles.input, textColor]}
        onChangeText={setText}
        onSubmitEditing={submit}
        value={text}
        placeholder="What do you want to do?"
        maxLength={50}
      />
    </View>
  );
};

const Item = ({text, isDone, setIsDone, delItem, index}) => {
  const isDarkMode = useColorScheme() === 'dark';
  const textStyle = {
    color: isDarkMode ? '#F3F3F3' : '#222',
    textDecorationLine: isDone ? 'line-through' : 'none',
  };
  return (
    <View style={[styles.border, styles.itemRow]}>
      <Switch onValueChange={value => setIsDone(value, index)} value={isDone} />
      <Text style={[styles.itemText, textStyle]}>{text}</Text>
      <TouchableOpacity style={styles.delButton} onPress={() => delItem(index)}>
        <Text style={styles.delButtonText}>X</Text>
      </TouchableOpacity>
    </View>
  );
};

const TodoList = ({list, setIsDone, delItem}) => {
  const isDarkMode = useColorScheme() === 'dark';
  const textColor = {
    color: isDarkMode ? '#F3F3F3' : '#222',
  };
  const renderItem = ({item, index}) => {
    return (
      <Item
        text={item.text}
        isDone={item.isDone}
        setIsDone={setIsDone}
        delItem={delItem}
        index={index}
      />
    );
  };
  return (
    <View style={styles.flexCommon}>
      <Text style={[styles.heading, textColor]}>Todo Items</Text>
      <FlatList data={list} renderItem={renderItem} />
    </View>
  );
};

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? '#222' : '#F3F3F3',
  };

  const [list, setList] = useState([]);

  const submitEntry = entry => {
    if (list.some(item => item.text === entry && !item.isDone)) {
      return false;
    }
    setList(curList => [...curList, {text: entry, isDone: false}]);
    return true;
  };

  const setIsDone = (isDone, index) => {
    setList(curList => {
      return curList.map((item, idx) => {
        if (index === idx) {
          return {...item, isDone};
        }
        return item;
      });
    });
  };

  const delItem = index => {
    setList(curList => {
      return curList.filter((_, idx) => idx !== index);
    });
  };

  return (
    <SafeAreaView style={[styles.flexCommon, backgroundStyle]}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <View style={styles.container}>
        <Form submitEntry={submitEntry} />
        <TodoList list={list} setIsDone={setIsDone} delItem={delItem} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  flexCommon: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 20,
  },
  heading: {
    marginBottom: 10,
    fontSize: 28,
    fontWeight: '600',
  },
  border: {
    borderWidth: 1,
    borderColor: 'lightgray',
    borderRadius: 6,
  },
  form: {
    marginBottom: 30,
  },
  input: {
    height: 50,
    paddingHorizontal: 10,
    fontSize: 18,
  },
  itemRow: {
    height: 50,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemText: {
    flex: 1,
    fontSize: 16,
    paddingHorizontal: 10,
  },
  delButton: {
    width: 30,
    alignSelf: 'stretch',
    backgroundColor: 'lightgray',
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
  },
  delButtonText: {
    fontSize: 18,
    lineHeight: 50,
    textAlign: 'center',
  },
});

export default App;
