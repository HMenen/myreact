"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
// export const Hello = (props: HelloProps) => (
//   <h1>Hello from {props.compiler} and {props.framework}!</h1>
// );
var Hello = /** @class */ (function (_super) {
    __extends(Hello, _super);
    function Hello() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Hello.prototype.demo1 = function () {
        console.log("This is my warning message");
    };
    Hello.prototype.printLabel = function (labelledObj) {
        console.log(labelledObj.label);
    };
    Hello.prototype.render = function () {
        var isDone = true;
        var num = 10;
        var name = 'string';
        var list1 = [1, 2, 3];
        var list2 = [1, 2, 3];
        var Color;
        (function (Color) {
            Color[Color["Red"] = 1] = "Red";
            Color[Color["Green"] = 2] = "Green";
            Color[Color["Blue"] = 3] = "Blue";
        })(Color || (Color = {}));
        ;
        var colorName = Color[1];
        console.log(colorName); // 显示'Green'因为上面代码里它的值是2
        var notSure = 4;
        notSure = "maybe a string instead";
        notSure = false; // okay, definitely a boolean
        var list3 = [1, true, "free"];
        var someValue = "this is a string";
        var strLength = someValue.length;
        var _a = { a: 1, b: 2 }, number1 = _a.a, number2 = _a.b;
        var _b = { a: 1, b: 2 }, a = _b.a, b = _b.b;
        var p1 = { x: 1, y: 2 };
        var myObj = { size: 10, label: "Size 10 Object" };
        this.printLabel(myObj);
        var mySearch;
        mySearch = function (source, subString) {
            var result = source.search(subString);
            return result > -1;
        };
        var myArray;
        myArray = ["Bob", "Fred"];
        var myStr = myArray[0];
        var Clock = /** @class */ (function () {
            function Clock(h, m) {
            }
            Clock.prototype.setTime = function (d) {
                this.currentTime = d;
            };
            return Clock;
        }());
        var add1 = function (x, y) { return x + y; };
        add1(3);
        function add2(x) {
            var y = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                y[_i - 1] = arguments[_i];
            }
            return x + y.join(',');
        }
        console.log(add2(3, 4, 5, 6, 7));
        var deck = {
            suits: ["hearts", "spades", "clubs", "diamonds"],
            cards: Array(52),
            createCardPicker: function () {
                var _this = this;
                return function () {
                    var pickedCard = Math.floor(Math.random() * 52);
                    var pickedSuit = Math.floor(pickedCard / 13);
                    return { suit: _this.suits[pickedSuit], card: pickedCard % 13 };
                };
            }
        };
        var cardPicker = deck.createCardPicker();
        var pickedCard = cardPicker();
        //范行
        function identity(arg) {
            return arg;
        }
        var output1 = identity('myString');
        var output2 = identity('myString');
        var myIdentity = identity;
        // let tom: [string, number] = ['Tom', 25];
        var Direction;
        (function (Direction) {
            Direction[Direction["Up"] = 1] = "Up";
            Direction[Direction["Down"] = 2] = "Down";
            Direction[Direction["Left"] = 3] = "Left";
            Direction[Direction["Right"] = 4] = "Right";
        })(Direction || (Direction = {}));
        function padLeft(value, padding) {
            // ...
        }
        var indentedString = padLeft("Hello world", '121212'); // errors during compilation
        function isNumber(x) {
            return typeof x === "number";
        }
        return (React.createElement(React.Fragment, null,
            React.createElement("h5", null,
                this.props.compiler,
                " and ",
                this.props.framework,
                "!")));
    };
    return Hello;
}(React.Component));
exports.Hello = Hello;
//# sourceMappingURL=Hello.js.map