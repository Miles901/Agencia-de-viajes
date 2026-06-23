# Mis Gastos RD — App móvil

App móvil en **React Native (Expo)** conectada al backend C#.

## Configuración

```bash
cp .env.example .env
```

En un dispositivo físico, usa la IP de tu computadora:

```
EXPO_PUBLIC_API_URL=http://192.168.1.10:5000
```

## Ejecutar

```bash
npm install
npx expo start
```

- **Android:** presiona `a` o escanea el QR con Expo Go
- **iOS:** presiona `i` o escanea con la cámara (Expo Go)

## Funciones

- Registro e inicio de sesión
- Listado de gastos en RD$
- Resumen total y del mes
- Agregar y eliminar gastos (mantén presionado un gasto)
