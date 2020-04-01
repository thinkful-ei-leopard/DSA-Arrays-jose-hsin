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
    let newString = ''

    for(let i = 0; i < string.length; i++) {
        if(string[i] === ' ') {
            newString += '%20'
        } else {
        newString += string[i]
        }
    }

    return newString
}

console.log(urlify('www.thinkful.com /tauh ida parv een'))

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


// drill 7
function maxSum(array) {
    return array.reduce((a, b) => a+b)
}

// console.log(maxSum([4,6,-3,5,-2,1]))

// drill 8
function merge(array1, array2) {
    return [...array1, ...array2].sort((a, b) => a-b)
}

// console.log(merge([1, 3, 6, 8, 11], [2, 3, 5, 8, 9, 10]))


//drill 9
// O(n^2)

function replaceString(string, chars) {
    let newString = string

    for(let i = 0; i < string.length; i++) {
        for(let j = 0; j < chars.length; j++) {
            if(string[i] === chars[j]) {
                newString = newString.replace(string[i], '')
            }
        }
    }
    return newString
}

// console.log(replaceString('Battle of the Vowels: Hawaii vs. Grozny', 'aeiou'))


// drill 10
function product(array) {
    let newArr = []
    let sum = 0

    for(let i = 0; i < array.length; i++) {
        sum = array.reduce((a, b) => a*b) / array[i]
        newArr.push(sum)
    }

    return newArr
}

// console.log(product([1, 3, 9, 4]))