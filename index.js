let store = {}
let listeners = {}
let tempListeners = {}

module.exports.set = function set(path, data) {
    if (typeof path !== 'string') {
        throw new TypeError('path type error!')
    }
    
    if (path[0] === '?') {
        let tmp = path.slice(1, path.length)
        if (Array.isArray(tempListeners[tmp])) {
            tempListeners[tmp].forEach(value => {
                if (value.async) {
                    setTimeout(()=> value.fn(data), 0)
                } else {
                    value.fn(data)
                }
            })
        }
    } else {
        let [, ...tmp] = path.split('/')
        tmp.reduce((parent, value, index) => {
            if (!parent[value]) {
                if (index === tmp.length - 1) {
                    parent[value] = data
                } else {
                    return parent[value] = {}
                }
            } else {
                if (index === tmp.length - 1) {
                    parent[value] = data
                } else {
                    return parent[value]
                }
            }
        }, store)

        if (Array.isArray(listeners[path])) {
            listeners[path].forEach(value => {
                if (value.async) {
                    setTimeout(() => value.fn(data), 0)
                } else {
                    value.fn(data)
                }
            })
        }
    }
}

module.exports.get = function get(path) {
    if (typeof path !== 'string') {
        throw new TypeError('path type error!')
    }

    let [, ...tmp] = path.split('/')
    return tmp.reduce((parent, value, index) => {
        if (index === tmp.length - 1) {
            return parent
        } else {
            return parent[value]
        }
    }, store)
}

module.exports.add = function add(path, fn, async = false) {
    if (!Array.isArray(listeners[path])) {
        listeners[path] = []
    }

    let value = { fn, async }
    listeners[path].push(value)
    return value
}

module.exports.remove = function remove(path, value) {
    if (!Array.isArray(listeners[path])) {
        throw new Error('remove failed!')
    }

    listeners[path] = listeners[path].filter(v => v !== value)
}