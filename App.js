import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import axios from 'axios';

export default function App() {
  const [habits, setHabits] = useState([]);

  useEffect(() => {
    const fetchHabits = async () => {
      try {
        const response = await axios.get('http://localhost:3000/habitslist'); // Corrected endpoint
        setHabits(response.data);
      } catch (error) {
        console.error("Error fetching habits:", error);
      }
    };

    fetchHabits();
  }, []);

  const renderHabit = ({ item }) => (
    <Text>{item.title}</Text> // Use a unique key from the habit item (e.g., _id)
  );

  return (
    <View style={styles.container}>
      <Text>My Habits</Text>
      <FlatList
        data={habits}
        renderItem={renderHabit}
        keyExtractor={item => item._id} // Ensure you have a unique key for each item
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});