import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { GameLogicService } from 'src/app/game-logic.service';

@Component({
  selector: 'app-board-piece',
  templateUrl: './board-piece.component.html',
  styleUrls: ['./board-piece.component.css']
})
export class BoardPieceComponent implements OnInit {
  @Input() id!: number;
  value: number = 0;
  sub?: Subscription;

  constructor(private game: GameLogicService) {
  }

  ngOnInit(): void {
    this.value = this.game.board[this.id];
  }

  textSize(){
    if(this.value < 100){
      return 'text-3xl';
    }
    if(this.value < 1000){
      return 'text-lg';
    }
    return 'text-base ';
  }

  color() {
    return 'bg-'+this.value;
  }

}
