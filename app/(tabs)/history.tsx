import { StyleSheet, View, Text } from 'react-native';

export default function History() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Histórico</Text>
      </View>
      
      <View style={styles.content}>
        <Text style={styles.subtitle}>Conteúdo do histórico</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#1B3274',
    height: 200,
    width: '100%',
    paddingLeft: 10,
    justifyContent: 'flex-end',
    paddingBottom: 20,
  },
  headerText: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  subtitle: {
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
    marginTop: 20,
  },
}); 