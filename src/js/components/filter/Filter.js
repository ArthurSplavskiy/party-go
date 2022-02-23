import { isTarget, _slideToggle, bodyLockToggle, bodyLockStatus } from '../../core/utils/functions.js'

export default class Filter {
    constructor(options) {
        this.filterRoot = options.root

        this.state = []
        
        this.init()
    }

    /*
        * Static fields
    */
    activeSpollerClass = '_spoller-active'
    activeFilterClass = '_open'
    checketClass = '_checket'
    
    /*
        * Init
    */
    init () {
        this.desktopFilter = this.filterRoot.querySelector('[data-desktop-filter]')
        this.desktopFilterOutput = this.desktopFilter.querySelector('[data-filter-output]')
        this.desktopFilterOutputContainer = this.desktopFilterOutput.querySelector('[data-filter-output-container]')
        this.mobileFilter = this.filterRoot.querySelector('[data-mobile-filter]')
        this.mobileSort = this.filterRoot.querySelector('[data-mobile-sort]')

        //this.filterClose = this.filterRoot.querySelector('[data-filter-close]')

        this.addEventListeners()
        this.onResize()
        this.domCalculate()
    }


    /*
        * Functions
    */
    setOffset (element) {
        this.desktopFilterOutput.style.marginTop = `${element.offsetHeight}px`
    }
    removeOffset () {
        this.desktopFilterOutput.style.marginTop = ''
    }
    domCalculate () {
        if(this.$filterSpoller) {
            this.setOffset(this.$filterSpoller.nextElementSibling)
        }
    }
    setState (element) {
        if(this.state.length > 0) {
            this.state.forEach(item => {
                if(item !== element) {
                    this.state.push(element)
                } else {
                    this.state.pop(element)
                }
            })
        } else {
            this.state.push(element)
        }
        
        console.log('setState')
    }
    removeState (elementId) {
        this.state.filter(el => el.id !== el.elementId)
    }
    renderState () {
        this.state.forEach(el => {
            this.desktopFilterOutputContainer.insertAdjacentHTML('beforeend', `
                <div class="filter-output__button" data-filter-item>
                    <span>${el.name}</span>
                    <button class="filter-output__close" data-filter-remove>
                        <img src="img/interface/spoller-close.svg" alt="Party Go">
                    </button>
                </div>
            `)
        })
    }
    renderStateInGroup () {
        this.state.forEach(el => {
            this.desktopFilterOutputContainer.innerHHTML =  `
                <div class="filter-output__button" data-filter-item>
                    <span>${el.name}</span>
                    <button class="filter-output__close" data-filter-remove>
                        <img src="img/interface/spoller-close.svg" alt="Party Go">
                    </button>
                </div>
            `
        })
    }

    /*
        * Handlers
    */
    onClick (e) {
        const targetElement = e.target

        // * set offset filter output
        this.$filterSpoller = isTarget(targetElement, '[data-spoller]')
        if (this.$filterSpoller && this.$filterSpoller.classList.contains(this.activeSpollerClass)) {
            //this.setOffset(86)
            this.setOffset(this.$filterSpoller.nextElementSibling)
        } else if (!document.querySelector(`.${this.activeSpollerClass}`)) {
            this.removeOffset()
        }



        // * open mobile filter
        this.mobileFilterBtn = isTarget(targetElement, '[data-mobile-filter-btn]')
        this.mobileSortBtn = isTarget(targetElement, '[data-mobile-sort-btn]')
        if(this.mobileFilterBtn && this.mobileFilter) {
            this.mobileFilter.classList.add(`${this.activeFilterClass}`)
            if(bodyLockStatus) {
                bodyLockToggle(0)
            }
        }
        if(this.mobileSortBtn && this.mobileSort) {
            this.mobileSort.classList.add(`${this.activeFilterClass}`)
            if(bodyLockStatus) {
                bodyLockToggle(0)
            }
        }
        // * close mobile filter
        this.mobileFilterClose = isTarget(targetElement, '[data-filter-close]')
        if(this.mobileFilterClose) {
            this.mobileFilter.classList.remove(`${this.activeFilterClass}`)
            this.mobileSort.classList.remove(`${this.activeFilterClass}`)
            if(bodyLockStatus) {
                bodyLockToggle(0)
            }
        }



        // * filter checkbox
        this.filterCheckbox = isTarget(targetElement, '[data-filter-checkbox]')
        if(this.filterCheckbox) {
            this.activeCheckbox = this.filterCheckbox.querySelector('input[type="checkbox"]:checked')
            this.activeCheckboxGroup = this.filterCheckbox.closest('[data-filter-inputs]')
            this.ckeckboxesInGroup = this.activeCheckboxGroup.querySelectorAll('input[type="checkbox"]')

            if( this.activeCheckbox && !this.filterCheckbox.classList.contains(`${this.checketClass}`) ) {
                // * remove
                this.ckeckboxesInGroup.forEach(ckeckbox => {
                    ckeckbox.closest('[data-filter-checkbox]').classList.remove(`${this.checketClass}`)
                    ckeckbox.checked = false
                })

                // * add
                this.filterCheckbox.classList.add(`${this.checketClass}`)
                this.activeCheckbox.checked = true
                

                if(this.activeCheckbox.checked) {
                    const filterItem = {}
                    filterItem.id = this.activeCheckbox.dataset.id
                    filterItem.name = this.activeCheckbox.dataset.value 
    
                    this.setState(filterItem)
                    this.renderState(filterItem)
                } else {
                    this.removeState(filterItem.id)
                }

                console.log(this.state)
            } else {
                this.filterCheckbox.classList.remove(`${this.checketClass}`)
            }
        }



        // * close filter body
        this.spollerClose = isTarget(targetElement, '[data-spoller-close]')
        if(this.spollerClose) {
            this.activeSpollerBody = this.spollerClose.closest('[data-spoller-body]')
            this.activeSpoller = this.activeSpollerBody.previousElementSibling

            if(this.activeSpoller) {
                this.activeSpoller.classList.remove(this.activeSpollerClass)
                this.removeOffset()
                _slideToggle(this.activeSpollerBody, 0)
            }
        }


        // * filter remove
        const filterRemoveBtn = isTarget(targetElement, '[data-filter-remove]')
        if(filterRemoveBtn) {
            const filterItem = filterRemoveBtn.closest('[data-filter-item]')
            this.removeState(filterItem.dataset.id)
        }
    }

    onResize () {
        this.domCalculate()
    }

    /*
        * Events
    */
    addEventListeners () {
        this.filterRoot.addEventListener('click', this.onClick.bind(this))
        window.addEventListener('resize', this.onResize.bind(this))
    }
    removeEventListeners () {
    }
}