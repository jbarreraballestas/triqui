let aval = [null, null, null, null, null, null, null, null, null];
let count = 0;
let finish = false;

console.log([
  [0,1,2],
  [3,4,5],
  [6,7,8],
]);

function play(pos, i) {
  if(!finish){
    i.innerHTML = 'o';
    i.disabled = true;
    aval[pos] = 'o';
    count++;
    setTimeout(check,500);
    setTimeout(machine,501);
  }
}
function machine() {
  if (count < aval.length && !finish) {
    let m;
    do {
      m = Math.floor(Math.random() * 9);
    } while (aval[m] != null);
    let b = document.querySelector(`#game :nth-child(${m + 1})`);
    b.innerHTML = 'x';
    b.disabled = true;
    aval[m] = 'x';
    count++;
    setTimeout(check,200);
  }
}

function check() {
  finish = win('o') || win('x');
  if (win('o')) {
    message = 'User Win';
  } else
  if (win('x')) {
    message = 'Machine Win';
  }else 
  if(count == aval.length) {
    finish = true;
    message = "Draw";
  }
  if (finish) {
    if (confirm(message+"\nPlay again?")) {
      location.reload();
    }  
    let again = document.createElement('a');
    again.href = "/";
    again.innerHTML = "Play again";
    document.querySelector('body').appendChild(again);
  }
}

function win(played) {
  return ((aval[0] == played && aval[1] == played && aval[2] == played) ||(aval[3] == played && aval[4] == played && aval[5] == played) ||(aval[6] == played && aval[7] == played && aval[8] == played) ||(aval[0] == played && aval[3] == played && aval[6] == played) ||(aval[1] == played && aval[4] == played && aval[7] == played) ||(aval[2] == played && aval[5] == played && aval[8] == played) ||(aval[0] == played && aval[4] == played && aval[8] == played) ||(aval[2] == played && aval[4] == played && aval[6] == played));
}