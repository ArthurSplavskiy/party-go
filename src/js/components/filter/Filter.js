import { isTarget, removeClasses, _slideUp } from '../../core/utils/functions.js'

export default class Filter {
    constructor(options) {
        this.filterRoot = options.root
        
        this.init()
    }

    // static fields
    activeSpollerClass = '_spoller-active'
    
    init () {
        this.desktopFilter = this.filterRoot.querySelector('[data-filter-desktop]')
        this.desktopFilterOutput = this.desktopFilter.querySelector('[data-filter-output]')
        this.addEventListeners()
    }

    setOffset (value) {
        this.desktopFilterOutput.style.marginTop = `${value}px`
    }
    removeOffset () {
        this.desktopFilterOutput.style.marginTop = ''
    }

    /*
        * Handlers
    */
    onClick (e) {
        const targetElement = e.target

        /*  
            * set offset filter output
        */
        const $filterSpoller = isTarget(targetElement, '[data-spoller]')
        if ($filterSpoller && $filterSpoller.classList.contains(this.activeSpollerClass)) {
            this.$spollerBodyActive = $filterSpoller.nextElementSibling

            this.setOffset(86)
            this.setOffset(this.$spollerBodyActive.offsetHeight)
            // setTimeout(() => {
            //     this.setOffset(this.$spollerBodyActive.offsetHeight)
            // }, 500)
        } else {
            this.removeOffset()
        }
    }

    /*
        * Events
    */
    addEventListeners () {
        this.filterRoot.addEventListener('click', this.onClick.bind(this))

        // this.filterRoot.addEventListener('transitionend', () => {
        //     console.log('dd')
        // })
    }
    removeEventListeners () {
    }
}