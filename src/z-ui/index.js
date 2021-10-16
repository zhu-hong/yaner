import ZNav from './nav/index.vue'
import ZHeader from './header/index.vue'

export const Nav = {}
Nav.install = (Vue) => Vue.component(ZNav.name, ZNav)

export const Header = {}
Header.install = (Vue) => Vue.component(ZHeader.name, ZHeader)