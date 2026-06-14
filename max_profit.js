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

function maxProfit(establishments, timeLimit) {
    const { profit, solutions } = maxProfitEstablishments(establishments, timeLimit, []);
    console.log('Earnings: ', profit);
    console.log('Solutions:');
    if(profit === 0) {
        console.log('No establishments can be profitably built within the given time limit.');
        return;
    }
    solutions.map(solution => {
        console.log(establishments.reduce((acc, establishment) => {
            return acc + `${establishment.id} : ${solution.filter(value => value === establishment.id).length || 0}` + '\t'
        }, '').trim())
    })
}


function maxProfitEstablishments(establishments, timeLimit, solutions) {
    let remainingTime = timeLimit;
    let totalProfit = 0;
    for(let i = 0; i < establishments.length; i++) {
        const establishment = establishments[i];
        if(remainingTime >= establishment.timeToBuild) {
            const profit = (remainingTime - establishment.timeToBuild) * establishment.earning;
            const {profit: remainingProfit, solutions: modifiedSolutions} 
                = remainingTime > 0 ? maxProfitEstablishments(establishments, remainingTime - establishment.timeToBuild, []) : 0;
            const totalEstablishmentProfit = profit + remainingProfit;
            if(totalEstablishmentProfit > totalProfit) {
                totalProfit = totalEstablishmentProfit;
                const updatedSolution = modifiedSolutions.length ? modifiedSolutions.map(solution => [establishment.id, ...solution]) :[ [establishment.id]];
                solutions = updatedSolution;
            }else if(totalEstablishmentProfit === totalProfit) {
                const updatedSolution = modifiedSolutions.length ? modifiedSolutions.map(solution => [establishment.id, ...solution]) : [establishment.id];
                solutions.push(updatedSolution)
            }
        }
    }
    return { profit: totalProfit, solutions };
}

maxProfit(establishments, 1);

maxProfit(establishments, 4);

maxProfit(establishments, 7);

maxProfit(establishments, 8);

maxProfit(establishments, 13);

maxProfit(establishments, 30)


