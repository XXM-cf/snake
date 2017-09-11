  var Btn = document.getElementsByClassName("Btn");
  var aTd = document.getElementsByTagName("td"); //所有的格子
  var oTb = document.getElementsByTagName("table")[0];
  var rows = oTb.rows;
  var cells = oTb.cells;
  var num; //食物的横坐标
  var num2; //食物的纵坐标
  var timer = null;
  var speed = 1000;
  var Dri = 0;
  var w = 9; //蛇的初始位置
  var h = 9;
  var p = 0;
  var lastsnake = [];
  var bigSnake = [
      [9, 9],
  ];
  var op = document.getElementById("optation");
  var snake = oTb.rows[w].cells[h];
  snake.style.background = '#CD5C5C';
  snake.style.borderRadius = 5 + 'px';
  if (w <= 0 || w >= 19 || h <= 0 || h >= 19) {
      alert("游戏结束");

  }

  function getRandomColor() {
      return '#' + (function (color) {
          return (color += '0123456789abcdef' [Math.floor(Math.random() * 16)]) && (color.length ==
                  6) ?
              color : arguments.callee(color);
      })('');
  }

  function snakeColor() { //蛇身的颜色需要设置
      for (i = 0; i < aTd.length; i++) {
          aTd[i].style.background = "";
      }
      var str = getRandomColor();
      food = oTb.rows[num].cells[num2];
      food.style.background = str;
      food.style.borderRadius = 20 + 'px';
      for (var i = 0; i < bigSnake.length; i++) {
          rows[bigSnake[i][0]].cells[bigSnake[i][1]].style.backgroundColor = "#00FFFF";
      }
  }
  ////////////////////////////////////////////////
  //键盘监听
  document.onkeydown = keyDown;

  function keyDown(e) {
      var e = event || window.event || arguments.callee.caller.arguments[0];
      if (e && e.keyCode == 37) {
          if (Dri != 3) //禁止掉头
              Dri = 1;

      } else if (e && e.keyCode == 38) {
          if (Dri != 4)
              Dri = 2;

      } else if (e && e.keyCode == 39) {
          if (Dri != 1)
              Dri = 3;

      } else if (e && e.keyCode == 40) {
          if (Dri != 2)
              Dri = 4;
      }
  }
  timer = setInterval(function () {
      diraction(Dri);
  }, 200);

  function diraction(d) {
      switch (d) {
          case 1: //左
              move(0, -1);
              break;
          case 2: //上
              move(-1, 0);
              break;
          case 3: //有
              move(0, 1);
              break;
          case 4: //下
              move(1, 0);
              break;
      }
  }

  function move(a, b) {
      getfood();
      //继续走
      bigSnake.unshift([w, h]);
      snake.style.background = "none";
      lastsnake[0] = bigSnake[bigSnake.length - 1][0];
      lastsnake[1] = bigSnake[bigSnake.length - 1][1];
      bigSnake.pop();
      w += a;
      h += b; //前进
      bigSnake.shift();
      bigSnake.unshift([w, h]);
      //动态存入蛇头的位置
      snakeColor();
      snake = oTb.rows[w].cells[h];
      snake.style.background = '#CD5C5C';
      snake.style.borderRadius = 4 + 'px';
  }
  friut(); //生成一个食物
  function getfood() {
      if (w == num && h == num2) {
          food.style.borderRadius = 0 + 'px';
          friut();
          p++; //得分
          op.innerHTML = "您的得分为：" + p * 10;
          if (Dri == 1) {
              w1 = w;
              h1 = h + 1;
          } else if (Dri == 2) {
              w1 = w + 1;
              h1 = h;

          } else if (Dri == 3) {
              w1 = w;
              h1 = h - 1;

          } else if (Dri == 4) {
              w1 = w - 1;
              h1 = h;
          }
          bigSnake.push([lastsnake[0], lastsnake[1]]);
      }
  }
  //生成随机食物
  function friut() {
      var str = getRandomColor();
      num = Math.floor(Math.random() * 19); //食物的横坐标
      num2 = Math.floor(Math.random() * 19); //食物的纵坐标
      food = oTb.rows[num].cells[num2];
      food.style.background = str;
      food.style.borderRadius = 20 + 'px';

  }