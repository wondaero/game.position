const state = {
    constValue: {
        totalCell: 24,
        numArr: [0, 1, 2, 3, 4],
        rc: ['row', 'col'],
        step: [-1, 1],
        dir: ['up', 'right', 'down', 'left']
    },
    stage: 8,
    targetCells: [],
    totalStep: 0
}

bindEvent();
setGame(state.stage);

function bindEvent(){
    document.querySelectorAll('#aBoard > div').forEach(btn => {
        btn.onclick = () => {
            if(!btn.classList.contains('active')) return;
            if(!btn.dataset.dir){
                btn.dataset.dir = state.constValue.dir[0];
            }else{
                btn.dataset.dir = state.constValue.dir[(state.constValue.dir.indexOf(btn.dataset.dir) + 1) % state.constValue.dir.length]
            }
        }
    })
}

function setGame(stage){
    state.stage = stage;
    state.totalStep = getRandomInt(1, 7);

    //qq
    getRandomCell(stage);
    cellUI(state.targetCells);
}

function getRandomCell(cnt){
    state.targetCells = getRandomInt(0, state.constValue.totalCell, cnt).map(n => ({
        value: n,
        rowIdx: parseInt(n / 5),
        colIdx: n % 5,
        rc: state.constValue.rc[getRandomInt(0, 1)],
        step: state.constValue.step[getRandomInt(0, 1)],
    }));
    console.log(state.targetCells);
}
function cellUI(cells){
    cells.forEach(n => {
        document.querySelector(`#step1 [data-rows="${n.rowIdx}"][data-cols="${n.colIdx}"]`).classList.add('sign');
        document.querySelector(`#aBoard [data-rows="${n.rowIdx}"][data-cols="${n.colIdx}"]`).classList.add('active');

        if(n.rc === 'row'){
            document.querySelector(`#step2 [data-rows="${getArr(state.constValue.numArr, n.rowIdx + (state.totalStep * n.step))}"][data-cols="${n.colIdx}"]`).classList.add('sign');
        }else if(n.rc === 'col'){
            document.querySelector(`#step2 [data-rows="${n.rowIdx}"][data-cols="${getArr(state.constValue.numArr, n.colIdx + (state.totalStep * n.step))}"]`).classList.add('sign');
        }
    })
}

function getArr(arr, idx) {
    const absIdx = Math.abs(idx);
    const maxIdx = arr.length - 1;

    // 배열 범위 내
    if (absIdx <= maxIdx) {
        return arr[absIdx];
    }
    
    // 주기 계산
    const quotient = Math.floor((absIdx - arr.length) / maxIdx);
    const remainder = (absIdx - arr.length) % maxIdx;
    
    // 짝수 주기: 역방향 (마지막 제외)
    // 홀수 주기: 정방향 (첫번째 제외)
    if (quotient % 2 === 0) {
        return arr[maxIdx - 1 - remainder];
    } else {
        return arr[remainder + 1];
    }
}
