import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';

export default function TarefaItem({ item, onPress }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.leftRow}>
        <View style={styles.checkboxMock}>
          <Text style={styles.checkDot}>✓</Text>
        </View>
        <Text style={styles.text} numberOfLines={1}>{item.nome}</Text>
      </View>
      <Text style={styles.arrow}>➔</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 6,
    elevation: 1,
  },
  leftRow: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  checkboxMock: { width: 22, height: 22, borderRadius: 7, borderWidth: 2, borderColor: '#6366F1', justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  checkDot: { fontSize: 11, color: '#6366F1', fontWeight: '900' },
  text: { flex: 1, fontSize: 16, color: '#1F2937', fontWeight: '600' },
  arrow: { fontSize: 14, color: '#9CA3AF', paddingLeft: 8 },
});