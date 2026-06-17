document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('input');
    if(!input.value.length) {
        input.value = "0,4,0,0,0,6,0,6,4,0"
    }
    const runButton = document.getElementById('run-btn');
    const resetButton = document.getElementById('reset-btn');
    const errorMessage = document.getElementById('error-message');

    input.addEventListener('input', handleInputChange);
    runButton.addEventListener('click', handleRun);
    resetButton.addEventListener('click', handleReset);
    
    function handleInputChange() {
        validateInput(input.value);
    }

    function handleRun() {
        const isValid = validateInput(input.value);

        if (!isValid) {
            return;
        }

        const heights = parseInput(input.value);
        const [totalVolume, waterLevels] = computeWaterLevel(heights);
        drawWaterTank(heights, waterLevels);
        drawOutputWaterTank(totalVolume, waterLevels)
    }

    function handleReset() {
        input.value = "0,4,0,0,0,6,0,6,4,0"
        handleRun()
    }

    function validateInput(value) {
        const trimmedValue = value.trim();

        if (!trimmedValue) {
            errorMessage.textContent = 'Input is required';
            return false;
        }

        try {
            const heights = parseInput(trimmedValue);

            if (heights.some(height => height < 0)) {
                errorMessage.textContent = 'Heights cannot be negative';
                return false;
            }

            errorMessage.textContent = '';
            return true;
        } catch {
            errorMessage.textContent =
                'Please enter comma separated numbers (e.g. 0,4,0,0,6)';
            return false;
        }
    }

    function parseInput(value) {
        return value
            .split(',')
            .map(item => {
                const num = Number(item.trim());

                if (Number.isNaN(num)) {
                    throw new Error('Invalid number');
                }

                return num;
            });
    }

    if(input.value) {
        handleRun()
    }
});

function drawWaterTank(heights, waterLevels) {
    const container = document.getElementById('water-tank');
    const maxHeight = Math.max(...heights);
    const maxWidth = heights.length;
    let tableContent = '';
    // Building the water tank using flec columns-reverse
    for(let i = 0; i < maxWidth; i++) {
        tableContent += '<div class="water-tank-column">'
        for(let j = 0; j < (maxHeight + 2); j++) {
            let className = 'water-tank-cell';
            // Total filled height = block height + trapped water height
            if(j - (waterLevels[i] + heights[i]) < 0){
                className = `${className} water`
            }
            if(j - heights[i] < 0){
                className = `${className} block`
            }
            tableContent += `<div class="${className}"></div>`
        }
        tableContent += '</div>'
    }

    // for(let i = 0; i < maxHeight; i++){
    //     tableContent += '<tr>'
    //     for(let j = 0; j < maxWidth; j++){
    //         let className = "water-tank-cell"
    //         if(i - waterTankInput[i] > 0){
    //             className = `${className} block`;
    //         }
    //         tableContent += `<td class="${className}"></td>`

    //     }
    //     tableContent += '</tr>'
    // }
    // // let tableContent = '';
    // tableContent += '</tbody>';
    container.innerHTML = tableContent;
}

function drawOutputWaterTank(totalVolume, waterLevels) {
    const outputContainer = document.getElementById('output');
    outputContainer.innerHTML = `${totalVolume} Units`;
    const container = document.getElementById('water-tank-output');
    const maxHeight = Math.max(...waterLevels);
    const maxWidth = waterLevels.length;
    let tableContent = '';
    for(let i = 0; i < maxWidth; i++) {
        tableContent += '<div class="water-tank-column">'
        for(let j = 0; j < (maxHeight + 2); j++) {
            let className = 'water-tank-cell';
            if(j - waterLevels[i] < 0){
                className = `${className} water`
            }
            tableContent += `<div class="${className}"></div>`
        }
        tableContent += '</div>'
    }
    container.innerHTML = tableContent;
}


function computeWaterLevel(heights) {
    let left = heights.findIndex(h => h > 0);
    let right = heights.findLastIndex(h => h > 0);
    let maxLeft = heights[left];
    let maxRight = heights[right];
    let totalVolume = 0;
    let waterLevels = new Array(heights.length).fill(0);

    while(left < right) {
        if(heights[left] <= heights[right]) {
            if(heights[left] > maxLeft) {
                maxLeft = heights[left]
            }else {
                waterLevels[left] = maxLeft - heights[left];
                totalVolume += waterLevels[left];
            }
            left++;
        }else {
            if(heights[right] > maxRight) {
                maxRight = heights[right]
            }else {
                waterLevels[right] = maxRight - heights[right];
                totalVolume += waterLevels[right];
            }
            right--;
        }
    }
    return [totalVolume, waterLevels];
}

// const testCaseInputs =[
//     [0,4,0,0,0,6,0,6,4,0], //Expected 18
//     [], // Expected 0
//     [0], // Expected 0
//     [4,4,4,4], // Expected 0
//     [2,1,2], // Expected 1
//     [5, 0, 0, 0, 5], // Expected 15
//     [5, 1, 2, 1, 5], // Expected 11
//     [3, 0, 2, 0, 4], // Expected 7
//     [4, 2, 0, 3, 2, 5], // Expected 9
//     [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1] // Expected 6
// ]

// testCaseInputs.map((heights, index) => {
//     console.log(`Test Case ${index+1}`)
//     console.log(`Input : [${heights}]`)
//     console.log(`Output : ${computeWaterStored(heights)} Units`);
// })