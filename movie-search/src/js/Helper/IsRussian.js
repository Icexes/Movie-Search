export default function isRussian (text) {
    return /[а-яА-Я]+/g.test(text);
}