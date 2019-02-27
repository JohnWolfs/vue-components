import './dom.css'

const Dom = {
    fixed: (pageEle) => {
        var ele

        if (pageEle) ele = (typeof(pageEle) === 'string') ? document.querySelector(pageEle) : pageEle
        else ele = document.body.children[0]

        ele.classList.add('fixed-page')
        document.documentElement.style.height = '100%'
        document.body.style.height = '100%'
    },
    relative: (pageEle) => {
        var ele

        if (pageEle) ele = (typeof(pageEle) === 'string') ? document.querySelector(pageEle) : pageEle
        else ele = document.body.children[0]

        ele.classList.remove('fixed-page')
        document.documentElement.style.height = ''
        document.body.style.height = ''
    }
}

export default Dom