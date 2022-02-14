import * as functions from "./core/utils/functions.js"
import * as forms from "./core/forms/forms.js"
import * as scroll from "./core/scroll/scroll.js"
//import './core/scroll/lazyload.js'

import './core/utils/inline-svg.js'
//import "./core/utils/sliders.js"
//import "./core/utils/popups.js"
//import "./core/utils/tippy.js"
//import "./core/forms/select.js"
//import "./core/forms/nouislider.js"
//import './core/scroll/simplebar.js'

import App from './components/app/App.js'

import "../scss/style.scss"


/* 
    * GLOBAL VARIABLES
*/
const $html = document.documentElement

/*
    * INIT CORE ELEMENTS
*/
functions.spollers()
functions.menuOpen()
functions.menuClose('[data-menu-close]')
//functions.tabsAdaptive()
forms.formFieldsInit()
forms.formSubmit(true)
//scroll.windowScroll() // => pin header
//functions.isWebp()
//functions.addTouchClass()
//functions.addLoadedClass()
//functions.fullVHfix()
//functions.tabs()
//forms.formQuantity()
//forms.formViewpass()
//forms.formRating()
// scroll.scrollWatcher(false)
// scroll.pageNavigation()

/*
    * INIT COMPONENTS
*/
window.addEventListener('load', event => {
    setTimeout(function () {
        $html.classList.add('loaded')
        new App()
    }, 0)
})

