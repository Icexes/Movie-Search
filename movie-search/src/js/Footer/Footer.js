export default function createFooter() {
    const footer = document.createElement('footer');
    footer.classList.add('footer');
    const wrapper = document.createElement('div');
    const footerWrapper = document.createElement('div');
    footerWrapper.classList.add('footer__wrapper');
    wrapper.classList.add('wrapper');
    const rsSchool = document.createElement('a');
    rsSchool.classList.add('footer__rsschool-icon');
    rsSchool.href = 'https://rs.school/'
    const github = document.createElement('a');
    github.classList.add('footer__github-icon');
    github.href = 'https://github.com/Icexes';
    footerWrapper.append(rsSchool,github);
    wrapper.append(footerWrapper);
    footer.append(wrapper);
    document.body.append(footer);
}