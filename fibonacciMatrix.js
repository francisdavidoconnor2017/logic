function fibonacciMatrix(n) {

//This function takes an integer input from the command line and outputs an matrix of the resulting fibonacci sequence in a fibonacci spiral
//Numbers get very big very quickly!

  
    // Create an empty NxN matrix
    let matrix = Array.from({ length: n }, () => Array(n).fill(0));

    // Generate the reverse Fibonacci sequence
    let fibonacciNumbers = [1, 0];
    while (fibonacciNumbers.length < n * n) {
        let nextNumber = fibonacciNumbers[fibonacciNumbers.length - 1] + fibonacciNumbers[fibonacciNumbers.length - 2];
        fibonacciNumbers.push(nextNumber);
    }
    fibonacciNumbers.reverse();

    let idx = 0;

    let rowStart = 0, rowEnd = n - 1, colStart = 0, colEnd = n - 1;

    while (rowStart <= rowEnd && colStart <= colEnd) {
        // Fill top row
        for (let i = colStart; i <= colEnd; i++) {
            matrix[rowStart][i] = fibonacciNumbers[idx++];
        }
        rowStart++;

        // Fill right-most column
        for (let i = rowStart; i <= rowEnd; i++) {
            matrix[i][colEnd] = fibonacciNumbers[idx++];
        }
        colEnd--;

        // Fill bottom row in reverse
        if (rowStart <= rowEnd) {
            for (let i = colEnd; i >= colStart; i--) {
                matrix[rowEnd][i] = fibonacciNumbers[idx++];
            }
            rowEnd--;
        }

        // Fill left-most column in reverse
        if (colStart <= colEnd) {
            for (let i = rowEnd; i >= rowStart; i--) {
                matrix[i][colStart] = fibonacciNumbers[idx++];
            }
            colStart++;
        }
    }

    return matrix;
}

function printMatrix(matrix) {
    // Find the maximum width needed by finding the largest number's length
    let maxWidth = Math.max(...matrix.flat()).toString().length;

    for (let row of matrix) {
        let formattedRow = row.map(num => {
            let strNum = num.toString();
            // Add spaces in front of the number to align it
            return ' '.repeat(maxWidth - strNum.length) + strNum;
        });
        console.log('[' + formattedRow.join(', ') + ']');
    }
}

if (process.argv.length < 3) {
    console.error('Please provide a value for n as a command-line argument.');
    process.exit(1);
}

const n = parseInt(process.argv[2], 10);

if (isNaN(n) || n <= 0) {
    console.error('Please provide a valid positive integer for n.');
    process.exit(1);
}

const result = fibonacciMatrix(n);
printMatrix(result);
