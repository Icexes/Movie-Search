
export default function createHeader() {

    const header = document.createElement('header');
    const wrapper = document.createElement('div');
    wrapper.classList.add('wrapper');
    const headerWrap = document.createElement('div');
    headerWrap.classList.add('header__wrap');
    const logo = document.createElement('h1');
    logo.textContent = "Movie Search";
    headerWrap.append(logo);
    wrapper.append(headerWrap);
    header.append(wrapper);
    document.body.append(header);
    return header;
}
