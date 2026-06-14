function computeWaterStored(heights) {
    let left = heights.findIndex(height => height > 0);
    let right = getRightMaxIndex(heights, left+1, left);
    
    let totalVolume = 0;
    const totalWidth = heights.length;

    while (right > -1 && right <= totalWidth - 1) {
      let minHeight = Math.min(heights[left], heights[right]);
      let volume = heights.slice(left + 1, right).reduce((acc, height) => acc + (minHeight - height), 0);
      totalVolume += volume;
      left = right;
      right = getRightMaxIndex(heights, left+1, left);
    }
    return totalVolume;
}

function getRightMaxIndex(heights, right, left) {
    let maxRightIndex = right;
    for (let i = right + 1; i < heights.length; i++) {
        if (heights[i] > heights[left]) {
            return i;
        }
        if (heights[i] > heights[maxRightIndex]) {
            maxRightIndex = i;
        }
    }
    return maxRightIndex;
}


const waterTankVolume = computeWaterStored([0,4,0,0,0,6,0,6,4,0]);
console.log(`1. Output: ${waterTankVolume} Units`); // Expected: 18

const waterTankVolume1 = computeWaterStored([5, 0, 0, 0, 5]);
console.log(`2. Output: ${waterTankVolume1} Units`); // Expected: 15

const waterTankVolume2 = computeWaterStored([5, 1, 2, 1, 5]);
console.log(`3. Output: ${waterTankVolume2} Units`); // Expected: 11

const waterTankVolume3 = computeWaterStored([3, 0, 2, 0, 4]);
console.log(`4. Output: ${waterTankVolume3} Units`); // Expected: 7

const waterTankVolume4 = computeWaterStored([4, 2, 0, 3, 2, 5]);
console.log(`5. Output: ${waterTankVolume4} Units`); // Expected: 9

const waterTankVolume5 = computeWaterStored([0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]);
console.log(`6. Output: ${waterTankVolume5} Units`); // Expected: 6