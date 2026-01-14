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

    document.getElementById('submitBtn').onclick = () => {
        const curStep = document.querySelector('input[name="step"]:checked').value;

        if(0 && document.querySelectorAll('#aBoard .active[data-dir]:not([data-dir=""])').length < state.stage){
            alert('방향을 선택하지 않은 타일 있습니다.');
            return;
        }

        document.querySelectorAll('#aBoard .active').forEach((activeCell) => {
            const dir = activeCell.dataset.dir;

            const curRow = activeCell.dataset.row;
            const curCol = activeCell.dataset.col;
            if(dir === 'up'){
                document.querySelector(`#aBoard [data-row="${getArr(state.constValue.numArr, +curRow - +curStep)}"][data-col="${curCol}"]`).classList.add('moved');
            }else if(dir === 'right'){
                document.querySelector(`#aBoard [data-row="${curRow}"][data-col="${getArr(state.constValue.numArr, +curCol + +curStep)}"]`).classList.add('moved');
            }else if(dir === 'down'){
                document.querySelector(`#aBoard [data-row="${getArr(state.constValue.numArr, +curRow + +curStep)}"][data-col="${curCol}"]`).classList.add('moved');
            }else if(dir === 'left'){
                document.querySelector(`#aBoard [data-row="${curRow}"][data-col="${getArr(state.constValue.numArr, +curCol - +curStep)}"]`).classList.add('moved');
            }
        })

        let matched = true;
        const step2Cells = document.querySelectorAll('#step2 .sign');

        for(let i = 0; i < step2Cells.length; i++){
            const activeCell = step2Cells[i];
            const curRow = activeCell.dataset.row;
            const curCol = activeCell.dataset.col;
            const targetCell = document.querySelector(`#aBoard .moved[data-row="${curRow}"][data-col="${curCol}"]`);

            if(!targetCell){
                matched = false;
                break;
            }
        }

        alert(matched ? '성공' : '실패');
        window.location.reload();
    }
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
}
function cellUI(cells){
    cells.forEach(n => {
        document.querySelector(`#step1 [data-row="${n.rowIdx}"][data-col="${n.colIdx}"]`).classList.add('sign');
        document.querySelector(`#aBoard [data-row="${n.rowIdx}"][data-col="${n.colIdx}"]`).classList.add('active');

        if(n.rc === 'row'){
            document.querySelector(`#step2 [data-row="${getArr(state.constValue.numArr, n.rowIdx + (state.totalStep * n.step))}"][data-col="${n.colIdx}"]`).classList.add('sign');
        }else if(n.rc === 'col'){
            document.querySelector(`#step2 [data-row="${n.rowIdx}"][data-col="${getArr(state.constValue.numArr, n.colIdx + (state.totalStep * n.step))}"]`).classList.add('sign');
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
