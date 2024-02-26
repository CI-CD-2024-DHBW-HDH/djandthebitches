import { Player, Game, Outcome, Field, isFull, won, newBoard, getBlanks, invertPlayer, isPlayer, Mode } from './src/logic/game';

describe('Game Logic Tests', () => {
  // Test cases for Player class
  describe('Player Class', () => {
    it('should initialize with a score of 0', () => {
      const player = new Player(Field.PLAYER1);
      expect(player.score).toBe(0);
    });

    it('should correctly identify whether the player is human', () => {
      const humanPlayer = new Player(Field.PLAYER1);
      expect(humanPlayer.isHuman()).toBe(true); // Human player has no bot move

      const botPlayer = new Player(Field.PLAYER2);
      botPlayer.botMove = () => 0; // Assign a bot move
      expect(botPlayer.isHuman()).toBe(false); // Bot player has a bot move
    });

    it('should return a move if a bot move is assigned', () => {
      const player = new Player(Field.PLAYER1);
      player.botMove = () => 0; // Assign a bot move
      const move = player.move(newBoard());
      expect(move).toBe(0); // Bot move should be returned
    });
  });

  // Test cases for Game class
  describe('Game Class', () => {
    it('should initialize with correct default values', () => {
      const game = new Game();
      expect(game.mode).toBe(Mode.EASY);
      expect(game.player.score).toBe(0);
      expect(game.enemy.score).toBe(0);
    });

    it('should correctly add win to player scores', () => {
      const game = new Game();
      game.addWin(Field.PLAYER1);
      expect(game.player.score).toBe(1); // Player 1 wins, their score should increase
      expect(game.enemy.score).toBe(0);
      
      game.addWin(Field.PLAYER2);
      expect(game.player.score).toBe(1);
      expect(game.enemy.score).toBe(1); // Player 2 wins, their score should increase
    });

    it('should correctly switch sides', () => {
      const game = new Game();
      const initialPlayerMove = game.player.botMove;
      const initialPlayerScore = game.player.score;
      const initialEnemyMove = game.enemy.botMove;
      const initialEnemyScore = game.enemy.score;
      
      game.switchSides();

      expect(game.player.botMove).toBe(initialEnemyMove);
      expect(game.player.score).toBe(initialEnemyScore);
      expect(game.enemy.botMove).toBe(initialPlayerMove);
      expect(game.enemy.score).toBe(initialPlayerScore);
    });

    it('should correctly update mode', () => {
      const game = new Game();
      const newMode = Mode.HARD;

      game.updateMode(newMode);
      expect(game.mode).toBe(newMode);

      // Check if bot moves are updated accordingly
      const initialPlayerBotMove = game.player.botMove;
      const initialEnemyBotMove = game.enemy.botMove;

      game.updateMode(Mode.MEDIUM);
      expect(game.player.botMove).not.toBe(initialPlayerBotMove);
      expect(game.enemy.botMove).not.toBe(initialEnemyBotMove);
    });
  });

  // Test cases for Outcome class
  describe('Outcome Class', () => {
    it('should correctly determine if game is a draw', () => {
      const drawBoard: Field[] = [
        Field.PLAYER1, Field.PLAYER2, Field.PLAYER1,
        Field.PLAYER2, Field.PLAYER2, Field.PLAYER1,
        Field.PLAYER1, Field.PLAYER1, Field.PLAYER2,
      ];
      const drawOutcome = new Outcome(drawBoard);
      expect(drawOutcome.isDraw()).toBe(true);

      const notDrawBoard: Field[] = [
        Field.PLAYER1, Field.PLAYER2, Field.PLAYER1,
        Field.PLAYER2, Field.PLAYER2, Field.PLAYER1,
        Field.PLAYER1, Field.PLAYER1, Field.EMPTY,
      ];
      const notDrawOutcome = new Outcome(notDrawBoard);
      expect(notDrawOutcome.isDraw()).toBe(false);
    });
  });

  // Test cases for utility functions
  describe('Utility Functions', () => {
    it('should correctly determine if the board is full', () => {
      const fullBoard: Field[] = [
        Field.PLAYER1, Field.PLAYER2, Field.PLAYER1,
        Field.PLAYER2, Field.PLAYER2, Field.PLAYER1,
        Field.PLAYER1, Field.PLAYER1, Field.PLAYER2,
      ];
      expect(isFull(fullBoard)).toBe(true);

      const notFullBoard: Field[] = [
        Field.PLAYER1, Field.PLAYER2, Field.PLAYER1,
        Field.PLAYER2, Field.PLAYER2, Field.PLAYER1,
        Field.PLAYER1, Field.PLAYER1, Field.EMPTY,
      ];
      expect(isFull(notFullBoard)).toBe(false);
    });

    it('should correctly determine the winner of the game', () => {
      const player1WinsBoard: Field[] = [
        Field.PLAYER1, Field.PLAYER1, Field.PLAYER1,
        Field.PLAYER2, Field.PLAYER2, Field.EMPTY,
        Field.EMPTY, Field.EMPTY, Field.PLAYER2,
      ];
      expect(won(player1WinsBoard)).toBe(Field.PLAYER1);

      const player2WinsBoard: Field[] = [
        Field.PLAYER1, Field.PLAYER1, Field.EMPTY,
        Field.PLAYER2, Field.PLAYER2, Field.PLAYER2,
        Field.PLAYER1, Field.EMPTY, Field.PLAYER1,
      ];
      expect(won(player2WinsBoard)).toBe(Field.PLAYER2);

      const noWinnerBoard: Field[] = [
        Field.PLAYER1, Field.PLAYER2, Field.PLAYER1,
        Field.PLAYER2, Field.PLAYER2, Field.PLAYER1,
        Field.PLAYER1, Field.PLAYER1, Field.EMPTY,
      ];
      expect(won(noWinnerBoard)).toBe(Field.EMPTY);
    });

    it('should correctly initialize a new board', () => {
      const board = newBoard();
      expect(board.length).toBe(9);
      expect(board.every(field => field === Field.EMPTY)).toBe(true);
    });

    it('should correctly get blank spots on the board', () => {
      const board: Field[] = [
        Field.PLAYER1, Field.PLAYER2, Field.PLAYER1,
        Field.EMPTY, Field.EMPTY, Field.PLAYER2,
        Field.EMPTY, Field.PLAYER1, Field.EMPTY,
      ];
      const blanks = getBlanks(board);
      expect(blanks).toEqual([3, 4, 6, 8]);
    });

    it('should correctly invert player', () => {
      expect(invertPlayer(Field.PLAYER1)).toBe(Field.PLAYER2);
      expect(invertPlayer(Field.PLAYER2)).toBe(Field.PLAYER1);
      expect(invertPlayer(Field.EMPTY)).toBe(Field.EMPTY);
    });

    it('should correctly determine if a field is a player field', () => {
      expect(isPlayer(Field.PLAYER1)).toBe(true);
      expect(isPlayer(Field.PLAYER2)).toBe(true);});});});
