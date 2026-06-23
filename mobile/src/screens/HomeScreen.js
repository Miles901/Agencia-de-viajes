import { useCallback, useEffect, useState } from 'react'
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native'
import { api } from '../api'
import { useAuth } from '../AuthContext'
import { CATEGORIES, formatCurrency, formatDate, getCategory, todayISO } from '../constants'

export default function HomeScreen() {
  const { user, logout } = useAuth()
  const [expenses, setExpenses] = useState([])
  const [summary, setSummary] = useState(null)
  const [loading, setLoading] = useState(true)
  const [modalVisible, setModalVisible] = useState(false)
  const [form, setForm] = useState({
    description: '',
    amount: '',
    category: 'comida',
    date: todayISO(),
  })

  const refresh = useCallback(async () => {
    setLoading(true)
    try {
      const [list, stats] = await Promise.all([api.getExpenses(), api.getSummary()])
      setExpenses(list)
      setSummary(stats)
    } catch (err) {
      Alert.alert('Error', err.message)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    refresh()
  }, [refresh])

  const handleAdd = async () => {
    const amount = parseFloat(form.amount)
    if (!form.description.trim() || !amount || amount <= 0) {
      Alert.alert('Datos incompletos', 'Completa descripción e importe válido.')
      return
    }

    try {
      await api.createExpense({
        description: form.description.trim(),
        amount,
        category: form.category,
        date: form.date,
      })
      setModalVisible(false)
      setForm({ description: '', amount: '', category: 'comida', date: todayISO() })
      await refresh()
    } catch (err) {
      Alert.alert('Error', err.message)
    }
  }

  const handleDelete = (item) => {
    Alert.alert('Eliminar gasto', `¿Eliminar "${item.description}"?`, [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Eliminar',
        style: 'destructive',
        onPress: async () => {
          await api.deleteExpense(item.id)
          await refresh()
        },
      },
    ])
  }

  const renderItem = ({ item }) => {
    const cat = getCategory(item.category)
    return (
      <Pressable style={styles.expenseItem} onLongPress={() => handleDelete(item)}>
        <View style={[styles.expenseIcon, { backgroundColor: `${cat.color}22` }]}>
          <Text>{cat.icon}</Text>
        </View>
        <View style={styles.expenseInfo}>
          <Text style={styles.expenseDesc}>{item.description}</Text>
          <Text style={styles.expenseMeta}>{cat.label} · {formatDate(item.date)}</Text>
        </View>
        <Text style={styles.expenseAmount}>{formatCurrency(item.amount)}</Text>
      </Pressable>
    )
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.header}>
          <View>
            <Text style={styles.eyebrow}>RD$ · {user?.fullName}</Text>
            <Text style={styles.title}>Mis Gastos</Text>
          </View>
          <Pressable onPress={logout}>
            <Text style={styles.logout}>Salir</Text>
          </Pressable>
        </View>

        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>Total</Text>
            <Text style={styles.statValue}>{formatCurrency(summary?.total ?? 0)}</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>Este mes</Text>
            <Text style={styles.statValue}>{formatCurrency(summary?.monthTotal ?? 0)}</Text>
          </View>
        </View>

        {loading ? (
          <ActivityIndicator color="#22c55e" style={{ marginTop: 24 }} />
        ) : (
          <FlatList
            data={expenses}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            scrollEnabled={false}
            ListEmptyComponent={
              <Text style={styles.empty}>Sin gastos. Toca + para agregar uno.</Text>
            }
          />
        )}
      </ScrollView>

      <Pressable style={styles.fab} onPress={() => setModalVisible(true)}>
        <Text style={styles.fabText}>+</Text>
      </Pressable>

      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Nuevo gasto</Text>
            <TextInput
              style={styles.input}
              placeholder="Descripción"
              placeholderTextColor="#6b7a90"
              value={form.description}
              onChangeText={(v) => setForm({ ...form, description: v })}
            />
            <TextInput
              style={styles.input}
              placeholder="Importe RD$"
              placeholderTextColor="#6b7a90"
              keyboardType="decimal-pad"
              value={form.amount}
              onChangeText={(v) => setForm({ ...form, amount: v })}
            />
            <Text style={styles.label}>Categoría</Text>
            <View style={styles.chips}>
              {CATEGORIES.map((cat) => (
                <Pressable
                  key={cat.id}
                  style={[styles.chip, form.category === cat.id && styles.chipActive]}
                  onPress={() => setForm({ ...form, category: cat.id })}
                >
                  <Text style={styles.chipText}>{cat.icon} {cat.label}</Text>
                </Pressable>
              ))}
            </View>
            <View style={styles.modalActions}>
              <Pressable style={styles.secondaryBtn} onPress={() => setModalVisible(false)}>
                <Text style={styles.secondaryBtnText}>Cancelar</Text>
              </Pressable>
              <Pressable style={styles.primaryBtn} onPress={handleAdd}>
                <Text style={styles.primaryBtnText}>Guardar</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0c0f14' },
  scroll: { padding: 20, paddingBottom: 100 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 },
  eyebrow: { color: '#22c55e', fontSize: 12, fontWeight: '600', marginBottom: 4 },
  title: { color: '#f0f4f8', fontSize: 28, fontWeight: '700' },
  logout: { color: '#8b9cb3', marginTop: 8 },
  statsRow: { flexDirection: 'row', gap: 12, marginBottom: 20 },
  statCard: {
    flex: 1,
    backgroundColor: '#1a222d',
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  statLabel: { color: '#8b9cb3', fontSize: 12, marginBottom: 4 },
  statValue: { color: '#f0f4f8', fontSize: 18, fontWeight: '700' },
  expenseItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#141a22',
    borderRadius: 12,
    padding: 12,
    marginBottom: 8,
    gap: 10,
  },
  expenseIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  expenseInfo: { flex: 1 },
  expenseDesc: { color: '#f0f4f8', fontWeight: '600' },
  expenseMeta: { color: '#8b9cb3', fontSize: 12, marginTop: 2 },
  expenseAmount: { color: '#f0f4f8', fontWeight: '700' },
  empty: { color: '#8b9cb3', textAlign: 'center', marginTop: 24 },
  fab: {
    position: 'absolute',
    right: 24,
    bottom: 32,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#22c55e',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
  },
  fabText: { color: '#052e16', fontSize: 28, fontWeight: '700', marginTop: -2 },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'flex-end',
  },
  modalCard: {
    backgroundColor: '#1a222d',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: '85%',
  },
  modalTitle: { color: '#f0f4f8', fontSize: 20, fontWeight: '700', marginBottom: 16 },
  input: {
    backgroundColor: '#141a22',
    borderColor: 'rgba(255,255,255,0.08)',
    borderWidth: 1,
    borderRadius: 12,
    color: '#f0f4f8',
    padding: 14,
    marginBottom: 12,
  },
  label: { color: '#8b9cb3', marginBottom: 8 },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 16 },
  chip: {
    backgroundColor: '#141a22',
    borderRadius: 99,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  chipActive: {
    borderColor: '#22c55e',
    backgroundColor: 'rgba(34,197,94,0.15)',
  },
  chipText: { color: '#f0f4f8', fontSize: 12 },
  modalActions: { flexDirection: 'row', gap: 12 },
  secondaryBtn: {
    flex: 1,
    borderRadius: 12,
    padding: 14,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  secondaryBtnText: { color: '#8b9cb3' },
  primaryBtn: {
    flex: 1,
    borderRadius: 12,
    padding: 14,
    alignItems: 'center',
    backgroundColor: '#22c55e',
  },
  primaryBtnText: { color: '#052e16', fontWeight: '700' },
})
