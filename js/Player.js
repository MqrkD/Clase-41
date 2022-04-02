class Player {
    constructor() {
      this.name = null;
      this.index = null;
      this.positionX = 0;
      this.positionY = 0;

      //Aa TA) Agregamos la propiedad de la posición del jugador
      // También se agrega el campo en nuestra DB de firebase.
      this.rank = 0;

      //Ab TA) Define el combustible y la vida del auto en 185 
      this.fuel = 185;
      this.life = 185;
      this.score = 0;
    }
  
    addPlayer() {
      var playerIndex = "players/player" + this.index;
  
      if (this.index === 1) {
        this.positionX = width / 2 - 100;
      } else {
        this.positionX = width / 2 + 100;
      }
  
      database.ref(playerIndex).set({
        name: this.name,
        positionX: this.positionX,
        positionY: this.positionY,
        rank: this.rank,
        score: this.score
      });
    }
  
    getDistance() {
      var playerDistanceRef = database.ref("players/player" + this.index);
      playerDistanceRef.on("value", data => {
        var data = data.val();
        this.positionX = data.positionX;
        this.positionY = data.positionY;
      });
    }
  
    getCount() {
      var playerCountRef = database.ref("playerCount");
      playerCountRef.on("value", data => {
        playerCount = data.val();
      });
    }
  
    updateCount(count) {
      database.ref("/").update({
        playerCount: count
      });
    }
  
    update() {
      var playerIndex = "players/player" + this.index;
      database.ref(playerIndex).update({
        positionX: this.positionX,
        positionY: this.positionY,
        rank: this.rank,
        score: this.score
      });
    }
  
    static getPlayersInfo() {
      var playerInfoRef = database.ref("players");
      playerInfoRef.on("value", data => {
        allPlayers = data.val();
      });
    }
   //Ba Ta) Lee el valor del campo CarsAtEnd de la base de datos. 
    getCarsAtEnd() {
      database.ref("carsAtEnd").on("value", data => {
        this.rank = data.val();
      });
    }
  //Bb TA) Función static actualiza el campo CarsAtEnd con el número de autos que han terminado la carrera 
    static updateCarsAtEnd(rank) {
      database.ref("/").update({
        carsAtEnd: rank
      });
    }
  }
  