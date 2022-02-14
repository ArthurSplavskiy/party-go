export default class ScrollObserver {
    constructor (element = null, animationIn = null, animationOut = null, options = {}) {
        this.element = element
        this.animationIn = animationIn
        this.animationOut = animationOut
        this.options = options // 1.0 - (100% element scroll) 0.9 - 90%(100% element scroll)

        this.createObserver()
    }

    createObserver () {

        this.observer = new window.IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    if(this.animationIn !== null) {
                        this.animationIn(entry.target)
                    }
                    //console.log(entry.target)
                } else {
                    if(this.animationOut !== null) {
                        this.animationOut(entry.target)
                    }
                    //console.log('observer out')
                }
            })
        }, this.options)

        if(this.element instanceof NodeList) {
            this.element.forEach(el => {
                this.observer.observe(el)
            })
        } else if(this.element instanceof Array) {
            Array.from(this.element).forEach(el => {
                this.observer.observe(el)
            })
        }
        else {
            this.observer.observe(this.element)
        }
        
    }
    
}

// * DOC 
// import ScrollObserver from './classes/ScrollObserver.js'
// new ScrollObserver(this.scrollIsViewElements, this.isView, null, options)