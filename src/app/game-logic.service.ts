import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GameLogicService {

  board: number[] = new Array(16).fill(0);
  score: number = 0;
  scoreUpdate = new EventEmitter<number>();

  constructor() { 
    this.startGame();
  }

  logBoard() {
    console.log(this.board[0] + ' ' + this.board[1] + ' ' + this.board[2] + ' ' + this.board[3]);
    console.log(this.board[4] + ' ' + this.board[5] + ' ' + this.board[6] + ' ' + this.board[7]);
    console.log(this.board[8] + ' ' + this.board[9] + ' ' + this.board[10] + ' ' + this.board[11]);
    console.log(this.board[12] + ' ' + this.board[13] + ' ' + this.board[14] + ' ' + this.board[15]);
  }
  startGame(){
    this.board = new Array(16).fill(0);
    this.generateRandom();
    this.generateRandom();
    this.scoreUpdate.next(this.score);
  }

  private evaluate(cond: boolean, index: number, curr: number) {
    if (cond) {
      if (this.board[index]) {
        if (this.board[index] === this.board[curr]) {
          this.board[index] += this.board[curr];
          this.score += this.board[index];
          this.board[curr] = 0;

        }
      } else {
        this.board[index] = this.board[curr];
        this.board[curr] = 0;
      }
    }
    this.scoreUpdate.next(this.score);
  }

  shiftLeft(){
    for(let i = 0; i < 4; i++){
      for(let j = 0; j < 4; j++){
        let row = i*4;
        if(j-1 >= 0){
          if(!this.board[row + j-1]){
            this.board[row + j-1] = this.board[row + j];
            this.board[row + j] = 0;
          }
        }
      }
    }
  }

  onLeft() {
    this.shiftLeft();
    for(let i = 0; i < 4; i++){
      for(let j = 0; j < 4; j++){
        let row = i*4;
        this.evaluate(j - 1 >= 0, row + j - 1, row + j);
        this.shiftLeft();
      }
    }
  }

  shiftRight(){
    for(let i = 0; i < 4; i++){
      for(let j = 3; j>=0; j--){
        let row = i*4;
        if(j+1 < 4){
          if(!this.board[row + j+1]){
            this.board[row + j+1] = this.board[row + j];
            this.board[row + j] = 0;
          }
        }
      }
    }
  }

  onRight() {
    this.shiftRight();
    for(let i = 0; i < 4; i++){
      for(let j = 3; j>=0; j--){
        let row = i*4;
        this.evaluate(j+1 < 4, row + j+1, row + j);
        this.shiftRight();
      }
    }
  }

  shiftUp(){
    for(let j = 0; j < 4; j++){
      for(let i = 0; i < 4; i++){
        let col = i * 4;
        if(col-4 >= 0){
          if(!this.board[col-4 + j]){
            this.board[col-4+j] = this.board[col+j];
            this.board[col + j] = 0;
          }
        }
      }
    }
  }


  //i = col
  //j = row
  onUp() {
    this.shiftUp();
    for(let j = 0; j < 4; j++){
      for(let i = 0; i < 4; i++){
        let col = i * 4;
        this.evaluate(col-4 >= 0, col-4 + j, col + j);
        this.shiftUp();
      }
    }
  }

  shiftDown(){
    for(let j = 0; j < 4; j++){
      for(let i = 3; i >= 0; i--){
        let col = i * 4;
        if(col+4 < 16){
          if(!this.board[col+4 + j]){
            this.board[col+4+j] = this.board[col+j];
            this.board[col + j] = 0;
          }
        }
      }
    }
  }

  onDown() {
    this.shiftDown();
    for(let j = 0; j < 4; j++){
      for(let i = 3; i >= 0; i--){
        let col = i * 4;
        this.evaluate(col+4 < 16, col+4 + j, col + j);
        this.shiftDown();
      }
    }
  }

  generateRandom() {
    let newNum = 0;
    if(Math.random() > 0.75){
      newNum = 4;
    } else {
      newNum = 2;
    }

    while(true){
      let i = Math.floor(Math.random() * 16);
      if(!this.board[i]){
        this.board[i] = newNum;
        return;
      }
    }
  }

  test(){
    let i = 1;
    let j = 3;
    console.log((i-1)*4 + j);
    console.log(i*4 + j-1);
    console.log(i*4 + j);
    console.log(i*4 + j+1);
    console.log((i+1)*4 + j);
  }

  checkGameOver(): boolean {
    for(let i = 0; i < 4; i++){
      for(let j = 0; j < 4; j++){
        const curr = this.board[i*4 +j]
        if(!curr){
          return false;
        }
        if((i-1)*4 + j >= 0 && this.board[(i-1)*4 + j] === curr){
          return false;
        }
        if((i+1)*4 + j < 16 && this.board[(i-1)*4 + j] === curr){
          return false;
        }
        if(j > 0 && i*4 + j-1 >= 0 && this.board[i*4 + j-1] === curr){
          return false;
        }
        if(j < 3 && i*4 + j+1 < 16 && this.board[i*4 + j+1] === curr){
          return false;
        }
      }
    }

    return true;
  }
}
