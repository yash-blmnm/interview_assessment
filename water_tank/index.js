// function computeWaterStored(heights) {
//     let left = heights.findIndex(height => height > 0);
//     let right = getRightMaxIndex(heights, left+1, left);
    
//     let totalVolume = 0;
//     const totalWidth = heights.length;

//     while (right > -1 && right <= totalWidth - 1) {
//       let minHeight = Math.min(heights[left], heights[right]);
//       let volume = heights.slice(left + 1, right).reduce((acc, height) => acc + (minHeight - height), 0);
//       totalVolume += volume;
//       left = right;
//       right = getRightMaxIndex(heights, left+1, left);
//     }
//     return totalVolume;
// }

// function getRightMaxIndex(heights, right, left) {
//     let maxRightIndex = right;
//     for (let i = right + 1; i < heights.length; i++) {
//         if (heights[i] > heights[left]) {
//             return i;
//         }
//         if (heights[i] > heights[maxRightIndex]) {
//             maxRightIndex = i;
//         }
//     }
//     return maxRightIndex;
// }


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


document.addEventListener('DOMContentLoaded', () => {
    console.log('Document ready');
    drawWaterTank();
});

function drawWaterTank() {
    const container = document.getElementById('water-tank');
    const outputContainer = document.getElementById('output');
    const waterTankInput = [0,4,0,0,0,6,0,6,4,0];
    const [totalVolume, waterLevels] = computeWaterLevel(waterTankInput);
    // const waterTankInputCopy = [...waterTankInput]
    const maxHeight = Math.max(...waterTankInput);
    const maxWidth = waterTankInput.length;
    let tableContent = '';
    for(let i = 0; i < maxWidth; i++) {
        tableContent += '<div class="water-tank-column">'
        for(let j = 0; j < maxHeight; j++) {
            let className = 'water-tank-cell';
            if(j - (waterLevels[i] + waterTankInput[i]) < 0){
                className = `${className} water`
            }
            if(j - waterTankInput[i] < 0){
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
    outputContainer.innerHTML = `${totalVolume} Units`
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