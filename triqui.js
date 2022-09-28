let aval = [null, null, null, null, null, null, null, null, null];
let count = 0;
let mcount = 0;
let finish = false;
var level;
let last;
let m;

console.log([
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
]);

function play(pos, i) {
  if (!finish) {
    last = pos;
    i.innerHTML = 'o';
    i.disabled = true;
    aval[pos] = 'o';
    count++;
    check();
    machine();
  }
}

function playL1() {
  mcount++;

  if (m == undefined) {
    for (let index = 0; index < aval.length; index++) {
      const element = aval[index];
      if (element == 'o' && aval[index + 1] == null && (index+1)<aval.length) {
        return index + 1;
      }
    }
  } else {
    pl1 = blockCols();
    if (pl1 == undefined) {
      console.log(pl1);
      pl1 = blockRows();
    }
    if (pl1 != undefined) {
      return pl1;
    }
  }
  if (aval[4]==null) {
    return 4;
  } 
  return Math.floor(Math.random() * 9);
}

function blockCols() {
  c1 = [aval[0],aval[3],aval[6]];
  c2 = [aval[1],aval[4],aval[7]];
  c3 = [aval[2],aval[5],aval[8]];
  if (c1.filter(x => x=='o').length == 2 && c1.filter(x => x=='x').length == 0) {
    console.log(c1.indexOf(null)*3);
    return c1.indexOf(null)*3;
  }
  if (c2.filter(x => x=='o').length == 2 && c2.filter(x => x=='x').length == 0) {
    console.log((c2.indexOf(null)*3)+1);
    return (c2.indexOf(null)*3)+1;
  }
  if (c3.filter(x => x=='o').length == 2 && c3.filter(x => x=='x').length == 0) {
    console.log((c3.indexOf(null)*3)+2);
    return (c3.indexOf(null)*3)+2;
  }
  return undefined;
}
function blockRows() {
  r1 = [aval[0],aval[1],aval[2]];
  r2 = [aval[3],aval[4],aval[5]];
  r3 = [aval[6],aval[7],aval[8]];
  if (r1.filter(x => x=='o').length == 2 && r1.filter(x => x=='x').length == 0) {
    console.log(r1.indexOf(null));
    return r1.indexOf(null);
  }
  if (r2.filter(x => x=='o').length == 2 && r2.filter(x => x=='x').length == 0) {
    console.log(r2.indexOf(null)+3);
    return r2.indexOf(null)+3;
  }
  if (r3.filter(x => x=='o').length == 2 && r3.filter(x => x=='x').length == 0) {
    console.log(r3.indexOf(null)+6);
    return r3.indexOf(null)+6;
  }
  return undefined;
}

function machine() {
  if (count < aval.length && !finish) {
    do {
      if (level == 0) {
        m = Math.floor(Math.random() * 9);
      } else if(level == 1){
        m = playL1(m);
      }
    } while (aval[m] != null);
    // console.log(m);
    let b = document.querySelector(`#game :nth-child(${m + 1})`);
    b.innerHTML = 'x';
    b.disabled = true;
    aval[m] = 'x';
    count++;
    mcount++;
    setTimeout(check, 200);
  }
}

function check() {
  finish = win('o') || win('x');
  if (win('o')) {
    message = 'User Win';
  } else
    if (win('x')) {
      message = 'Machine Win';
    } else
      if (count == aval.length) {
        finish = true;
        message = "Draw";
      }
  if (finish) {
    if (confirm(message + "\nPlay again?")) {
      location.reload();
    }
    let again = document.createElement('a');
    again.href = "/";
    again.innerHTML = "Play again";
    document.querySelector('body').appendChild(again);
  }
}

function win(played) {
  return ((aval[0] == played && aval[1] == played && aval[2] == played) || (aval[3] == played && aval[4] == played && aval[5] == played) || (aval[6] == played && aval[7] == played && aval[8] == played) || (aval[0] == played && aval[3] == played && aval[6] == played) || (aval[1] == played && aval[4] == played && aval[7] == played) || (aval[2] == played && aval[5] == played && aval[8] == played) || (aval[0] == played && aval[4] == played && aval[8] == played) || (aval[2] == played && aval[4] == played && aval[6] == played));
}