const establishments = [
  {
    type: 'Theater',
    id: 'T',
    timeToBuild: 5,
    earning: 1500,
    landPerParcel: 2
  },
  {
    type: 'Pub',
    id: 'P',
    timeToBuild: 4,
    earning: 1000,
    landPerParcel: 1
  },
  {
    type: 'Commercial Park',
    id: 'C',
    timeToBuild: 10,
    earning: 2000,
    landPerParcel: 3
  }
]

function maxProfit(timeLimit) {
    const { profit, solutions } = maxProfitEstablishments(timeLimit);
    console.log(`Earnings: \$${profit}`);
    console.log('Solutions');
    if(profit === 0) {
        console.log('No establishments can be profitably built within the given time limit.');
        return;
    }
    solutions.map(solution => {
        console.log(establishments.reduce((acc, establishment) => {
            return acc + `${establishment.id} : ${solution.filter(value => value === establishment.id).length || 0} `
        }, '').trim())
    })
}


function maxProfitEstablishments(timeLimit) {
    let totalProfit = 0;
    let solutions = [[]]
    for(let i = 0; i < establishments.length; i++) {
        const establishment = establishments[i];
        if(timeLimit >= establishment.timeToBuild) {
            const profit = (timeLimit - establishment.timeToBuild) * establishment.earning;
            const {profit: remainingProfit, solutions: modifiedSolutions} 
                = maxProfitEstablishments(timeLimit - establishment.timeToBuild);
            const totalEstablishmentProfit = profit + remainingProfit;
            let updatedSolution = modifiedSolutions.length ? modifiedSolutions.map(solution => [establishment.id, ...solution]) : [[establishment.id]]
            if(totalEstablishmentProfit > totalProfit) {
                totalProfit = totalEstablishmentProfit;
                solutions = updatedSolution;
            }else if(totalEstablishmentProfit === totalProfit) {
                solutions.push(...updatedSolution)
            }
        }
    }
    return { profit: totalProfit, solutions };
}

const testCases = [7,8,13,49,5,1,4,14,18]

testCases.map((time, index) => {
    console.log(`Test case ${index+1}`);
    console.log(`Time Unit: ${time}`);
    maxProfit(time);
})