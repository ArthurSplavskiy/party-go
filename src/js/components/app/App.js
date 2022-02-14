import { isTarget, removeClasses, _slideUp } from '../../core/utils/functions.js'

export default class App {
    constructor () {
        this.scrollIsViewElements = document.querySelectorAll('[data-is-view]') ?? null
        
        this.init()
    }
    
    init () {
        this.onResize()
        this.domCalculate()
        this.addEventListeners()
        this.scrollAnimation()
    }



    /*
        * Prepare
    */
    domCalculate () {
    }
    splitTextContent () {
    }



    /*
        * Animation
    */
    scrollAnimation () {

    }



    /*
        * Handlers
    */
    onResize () {
        this.domCalculate()
    }
    onClick (e) {
        const targetElement = e.target

        /*
            * Anchor
        */
        if (targetElement.closest('[data-anchor]')) {
            gotoBlock(targetElement.getAttribute("href"))
			e.preventDefault();
		}
        /*  
            * Sublist open
        */
        // const $sublist = isTarget(targetElement, '[data-subtrigger]')
        // if ($sublist && !$sublist.classList.contains('_active')) {
        //     removeClasses('[data-subtrigger]', '_active')
        //     $sublist.classList.add('_active')
        // } else {
        //     removeClasses('[data-subtrigger]', '_active')
        // }
        /*  
            * Header Spollers
        */
        const $targetHeaderSpoller = isTarget(targetElement, '.header [data-spoller]')
        if(!$targetHeaderSpoller) {
            removeClasses('.header [data-spoller]', '_spoller-active')
            _slideUp('.header [data-spoller] + *', 500);
        }
        /*  
            * Menu Spollers
        */
        const $targetMenuSpoller = isTarget(targetElement, '.page-menu [data-spoller]')
        if(!$targetMenuSpoller) {
            removeClasses('.page-menu [data-spoller]', '_spoller-active')
            _slideUp('.page-menu [data-spoller] + *', 500);
        }
    }
   


    /*
        * Events
    */
    addEventListeners () {
        document.addEventListener('click', this.onClick.bind(this))
        window.addEventListener('resize', this.onResize.bind(this))
    }
    removeEventListeners () {
    }
}

