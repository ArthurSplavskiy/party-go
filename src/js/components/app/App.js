import { isTarget, removeClasses, _slideUp } from '../../core/utils/functions.js'
import { gotoBlock } from '../../core/scroll/gotoblock.js'
import { isView } from './app.functions.js'
import MovingTiters from '../../core/classes/MovingTiters.js'
import ScrollObserver from '../../core/classes/ScrollObserver.js'

export default class App {
    constructor () {
        this.scrollElements = document.querySelectorAll('[data-scroll]') ?? null
        
        this.init()
    }
    
    init () {
        this.onResize()
        this.domCalculate()
        this.addEventListeners()
        this.scrollAnimation()

        new MovingTiters({
            dom: '.titers'
        })
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
        if(this.scrollElements.length > 0) {
            const options = {
                threshold: 0
            }

            this.scrollElements.forEach(item =>  item.getAttribute('data-scroll') ? options.threshold = item.getAttribute('data-scroll') : null)
            
            new ScrollObserver(this.scrollElements, isView, null, options)
        }
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
        const $anchorLink = isTarget(targetElement, '[data-anchor]')
        if ($anchorLink) {
            gotoBlock($anchorLink.getAttribute("href"))
			e.preventDefault();
		}

        /*  
            * Header Spollers
        */
        const $targetHeaderSpoller = isTarget(targetElement, '.header [data-spoller]')
        if (!$targetHeaderSpoller) {
            removeClasses('.header [data-spoller]', '_spoller-active')
            _slideUp('.header [data-spoller] + *', 500);
        }

        /*  
            * Menu Spollers
        */
        const $targetMenuSpoller = isTarget(targetElement, '.page-menu [data-spoller]')
        if (!$targetMenuSpoller) {
            removeClasses('.page-menu [data-spoller]', '_spoller-active')
            _slideUp('.page-menu [data-spoller] + *', 500);
        }

        /*  
            * Intro Animation
        */
        const $introItem = isTarget(targetElement, '[data-intro-item]')
        if ($introItem) {
            const introTransition = 1400
            const $introComponent = $introItem.closest('[data-intro]')
            const $introItems = $introComponent.querySelectorAll('[data-intro-item]')

            if(!$introComponent.classList.contains('_hold')) {

                // * TOGGLE ACTIVE STATE
                // if($introItem.classList.contains('_active')) {
                //     $introItem.classList.remove('_active')
                //     $introItems.forEach(item => {
                //         if(!item.classList.contains('_active')) {
                //             item.classList.remove('_reduced')
                //         }
                //     })
                // } else {
                //     $introItems.forEach(item => item.classList.remove('_active', '_reduced'))
                //     $introItem.classList.add('_active')
                //     $introItems.forEach(item => {
                //         if(!item.classList.contains('_active')) {
                //             item.classList.add('_reduced')
                //         }
                //     })
                // }

                $introItems.forEach(item => item.classList.remove('_active', '_reduced'))
                $introItem.classList.add('_active')
                $introItems.forEach(item => {
                    if(!item.classList.contains('_active')) {
                        item.classList.add('_reduced')
                    }
                })
                
                $introComponent.classList.add('_hold')
            }

            setTimeout(() => $introComponent.classList.remove('_hold'), introTransition)
        }

        /*  
            * Favorite toggle
        */
        const $favoriteIcon = isTarget(targetElement, '[data-favorite]')
        if ($favoriteIcon) {
            $favoriteIcon.classList.toggle('_active')
        }

        /*  
            * Video play
        */
        const $videoComponent = isTarget(targetElement, '[data-video]')
        if ($videoComponent) {
            const $videoElement = $videoComponent.querySelector('[data-src]')
            const $videoCover = $videoComponent.querySelector('[data-video-cover]')

            if ($videoElement.paused && !$videoElement.hasAttribute('src')) {
                $videoCover.hidden = true
                $videoElement.src = $videoElement.dataset.src
                $videoElement.play()
            }
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

