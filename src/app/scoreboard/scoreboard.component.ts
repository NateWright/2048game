import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { GameLogicService } from '../game-logic.service';

@Component({
  selector: 'app-scoreboard',
  templateUrl: './scoreboard.component.html',
  styleUrls: ['./scoreboard.component.css']
})
export class ScoreboardComponent implements OnInit, OnDestroy {

  score: number = 0;
  sub: Subscription;

  constructor(private game: GameLogicService) {
    this.sub = this.game.scoreUpdate.subscribe(
      (score) => {
        this.score = score;
      }
    );
  }

  ngOnInit(): void {
    this.score = this.game.score;
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}
