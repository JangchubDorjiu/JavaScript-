function bubbleSort(array) {
    for(let i = array.length - 1; i > 0; i--){
        for(let j = 0; j < i; j++) {
            if(array[j] > array[j + 1]){
                let temp = array[j]
                array[j] = array[j + 1]
                array[j+1] = temp
            }
        }
    }
    return array;
}

const result = bubbleSort([2, 3, 5, 2, 9]);
console.log(result);
//hsg


// 3, 4, 7, 1, 2, 8

function numberSort(numbers){
    numbers.sort();
    for(let i= 0; i <= numbers.length; i++){
        console.log(numbers);
    }
}
numberSort([3, 4, 7, 1, 2, 8]);
 