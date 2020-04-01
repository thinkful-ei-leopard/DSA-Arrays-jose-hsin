const Memory = require('./memory')
const memoryInstance = new Memory
console.log(memoryInstance)



class Array {
    constructor() {
        this.length = 0
        this._capacity = 0
        this.ptr = memoryInstance.allocate(this.length)
    }

    push(value) {
        if(this.length >= this._capacity) {
            this._resize((this.length + 1) * Array.SIZE_RATIO)
        }

        memoryInstance.set(this.ptr + this.length, value)
        this.length++
    }

    _resize(size) {
        const oldPtr = this.ptr
        this.ptr = memoryInstance.allocate(size)
        if (this.ptr === null) {
            throw new Error('out of memory')
        }

        memoryInstance.copy(this.ptr, oldPtr, this.length)
        memoryInstance.free(oldPtr)
        this._capacity = size
    }

    get(index) {
        if(index < 0 || index >= this.length) {
            throw new Error('index erro')
        }
        return memoryInstance.get(this.ptr + index)
    }

    pop() {
        if (this.length == 0) {
            throw new Error('Index error');
        }
        const value = memoryInstance.get(this.ptr + this.length - 1);
        this.length--;
        return value;
    }

    insert(index, value) {
        if (index < 0 || index >= this.length) {
            throw new Error('Index error');
        }

        if (this.length >= this._capacity) {
            this._resize((this.length + 1) * Array.SIZE_RATIO);
        }

        memoryInstance.copy(this.ptr + index + 1, this.ptr + index, this.length - index);
        memoryInstance.set(this.ptr + index, value);
        this.length++;
    }

}

Array.SIZE_RATIO = 3


function main() {
    Array.SIZE_RATIO = 3

    let arr = new Array
    arr.push(3)
    arr.push(4)
    arr.push(5)
    arr.push(6)
    arr.push(7)
    console.log(arr)
}

function main2() {
    Array.SIZE_RATIO = 3

    let arr2 = new Array

    arr2.push(10)
    console.log(arr2)
}

// main()
// main2()



// drill 5
function urlify(string) {
    return encodeURI(string)
}

// console.log(urlify('www.thinkful.com /tauh ida parv een'))

function reducer(array) {
    let newArr = []

    for(let i = 0; i <= array.length; i++) {
        if(array[i] >= 5) {
            newArr.push(array[i])
        }
    }

    return newArr
}

// console.log(reducer([1,10,7,6,4,3]))