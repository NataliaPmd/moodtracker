import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  videoView: {
    ...StyleSheet.absoluteFillObject,
  },
  buttonContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  button: {
    width: 300,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonPressed: {
    opacity: 0.8,
  },
  buttonText: {
    fontFamily: 'AmaticSC_700Bold',
    fontSize: 28,
    color: '#88566C',
  },
});
