// screens/HomeScreen.tsx
import React, { useState } from 'react';
import { View, Text, Button, FlatList, TextInput, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Agenda } from 'react-native-calendars';

type RootStackParamList = {
  Home: undefined;
  Profile: undefined;
};

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

type Props = {
  navigation: HomeScreenNavigationProp;
};

type Task = {
  id: string;
  title: string;
  description: string;
  date: string;
};

type TaskItem = {
  name: string;
  description: string;
};

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState({ title: '', description: '', date: '' });

  const addTask = () => {
    if (newTask.title && newTask.date) {
      const task: Task = {
        id: Math.random().toString(),
        title: newTask.title,
        description: newTask.description,
        date: newTask.date,
      };
      setTasks([...tasks, task]);
      setNewTask({ title: '', description: '', date: '' });
    }
  };

  const renderTask = ({ item }: { item: Task }) => (
    <View style={styles.taskItem}>
      <Text style={styles.taskTitle}>{item.title}</Text>
      <Text>{item.description}</Text>
      <Text>{item.date}</Text>
    </View>
  );

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Time Management App</Text>
      <TextInput
        style={styles.input}
        placeholder="Task Title"
        value={newTask.title}
        onChangeText={(text) => setNewTask({ ...newTask, title: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Task Description"
        value={newTask.description}
        onChangeText={(text) => setNewTask({ ...newTask, description: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Task Date (YYYY-MM-DD)"
        value={newTask.date}
        onChangeText={(text) => setNewTask({ ...newTask, date: text })}
      />
      <Button title="Add Task" onPress={addTask} />

      <FlatList
        data={tasks}
        renderItem={renderTask}
        keyExtractor={(item) => item.id}
      />

      {/* Calendar View */}
      <Agenda
        items={tasks.reduce((acc, task) => {
          acc[task.date] = [{ name: task.title, description: task.description }];
          return acc;
        }, {} as Record<string, TaskItem[]>)}
        renderItem={(item: TaskItem) => (
          <View style={styles.taskItem}>
            <Text style={styles.taskTitle}>{item.name}</Text>
            <Text>{item.description}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
    width: '80%',
  },
  taskItem: {
    backgroundColor: '#f9f9f9',
    padding: 10,
    marginVertical: 8,
    borderRadius: 5,
  },
  taskTitle: {
    fontWeight: 'bold',
  },
});

export default HomeScreen;
