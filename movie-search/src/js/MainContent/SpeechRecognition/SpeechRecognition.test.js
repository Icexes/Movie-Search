import createSpeechRecognition from './SpeechRecognition'

describe('SpeechRecognition.createSpeechRecognition', () => {
    it('Should be a Function', () => {
        expect(createSpeechRecognition).toBeInstanceOf(Function);
    })
});