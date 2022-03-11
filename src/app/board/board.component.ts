import { Component, HostListener, OnInit } from '@angular/core';
import { GameLogicService } from '../game-logic.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  equals = (a:number[], b:number[]) =>
  a.length === b.length &&
  a.every((v, i) => v === b[i]);

  constructor(private game: GameLogicService) { }

  ngOnInit(): void {
  }

  pieces(){
    return this.game.board;
  }

  @HostListener('window:keyup', ['$event']) upEvent(event: KeyboardEvent){
    const capture = Object.assign([], this.game.board);

    switch (event.key) {
      case "Down": // IE/Edge specific value
      case "ArrowDown":
        this.game.onDown();
        break;
      case "Up": // IE/Edge specific value
      case "ArrowUp":
        this.game.onUp();
        break;
      case "Left": // IE/Edge specific value
      case "ArrowLeft":
        this.game.onLeft();
        break;
      case "Right": // IE/Edge specific value
      case "ArrowRight":
        this.game.onRight();
        break;
      default:
        return; // Quit when this doesn't handle the key event.
    }

    // this.game.logBoard();
    if(this.game.checkGameOver()){
      alert('game over');
      this.game.startGame();
    } else if(!this.equals(capture, this.game.board)){
      this.game.generateRandom();
    }
    
  }

}
