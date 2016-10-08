# universe-js

## A library for managing front-end data

## Usage

```javascript
import { add, remove, set, get } from 'universe-js'

add('/hello/world', function(data) {
    console.log('sync1:'data)             
})
let id = add('/hello/world', function(data) {
    console.log('sync2:'data)             
})

// async
add('/hello/world', function(data) {
    console.log('async:'data)  
}, true)


set('/hello/world', 'universe-js')       // 'sync1: universe-js' and 'sync2:universe-js'
console.log(get('/hello/world'))         // 'universe-js'

remove('/hello/world', id) 
set('/hello/world', 'new')               // 'sync1: universe-js'

```

## LICENSE

#### MIT


