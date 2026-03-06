# Mood Tracker App

## Sobre mí
Desarrolladora frontend con 10 años de experiencia en React, nueva en React Native.
Explícame las particularidades de RN pero no conceptos básicos de React.

## Stack
- Expo (managed workflow)
- TypeScript
- React Navigation (bottom tabs + stack)
- NativeWind para estilos

## La app
Mood tracker con 5 pantallas: Home, Log, Calendar, Add Emotion, Stats.
Almacenamiento local (sin backend por ahora).

## Convenciones
- Componentes funcionales siempre
- Un componente por archivo
- estilos en un fichero aparte
- Nombrar archivos en PascalCase
- Custom hooks para lógica de negocio, fuera de los componentes
- Comentarios y código en inglés
- Limita el número de comentarios, solo los imprescindibles
- **Todos los textos visibles al usuario deben añadirse siempre a ambos archivos de traducción** (`i18n/locales/en.json` y `i18n/locales/es.json`). Nunca hardcodear strings en los componentes.

## Lo que NO quiero
- Over-engineering para una app de este tamaño
- Librerías innecesarias, justifica cada dependencia nueva que añadas