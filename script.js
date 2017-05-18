//========== The Prototype Pattern
// Creates objects based on a template of an existing object.
// Objects delegating to other objects.
var vehicle = {
  make: '<Enter Vehicle Make>',
  model: '<Enter Model>',
  year: '<Enter Year>',
  plate: 000,
  color: '<Enter Color>',
  summary: function summary() {
    return `
      Make: ${this.make}
      Model: ${this.model}
      Year: ${this.year}
      Plate: ${this.plate}
      Color: ${this.color}
    `
  }
}
// 'vehicle' is the prototype for 'yourCar'
// 'yourCar' can delegate to 'vehicles' properties
var mazdaMX5 = Object.create(vehicle);
mazdaMX5.make = 'Mazda';
mazdaMX5.model = 'MX5';
mazdaMX5.year = 2017;
mazdaMX5.plate = 'AAA 123';
mazdaMX5.color = 'Ceramic Metallic';
console.log( mazdaMX5.summary() );

var fordMustang = Object.create(vehicle);
// fordMustang.make = 'Ford';
fordMustang.model = 'Mustang';
fordMustang.year = 2018;
fordMustang.plate = 'BBB 321';
fordMustang.color = 'Grey';
console.log( fordMustang.summary() );




//========== The Constructor Pattern
// Imitates the use of classes from other languages. JS has no classes. The 'new' keyword creates a link to a function's prototype. The 'this' keyword will refer to the new object if the 'class' isn't explicitly returning a value.
function Car(model, year, miles) {
  this.model = model;
  this.year = year;
  this.miles = miles;
}

Car.prototype.toString = function() {
  return `${this.model} has done ${this.miles} miles`;
}

var camry = new Car('Toyota Camry', 2000, 100000);
var corolla = new Car('Toyota Corolla', 2002, 80000);




//========== The Module Pattern
// Encapsulates private data. Wraps public and private data while preventing any leakage of private data into the global scope. Public data has closure over private data.
var namespace = (function(){
  var privateVar = 0;
  var privateMethod = function(foo) {
    console.log(foo);
  };

  return {
    publicVar: 'foo', // public variable
    publicFunction(bar) { // public function utilizing private contents
      privateVar++;
      privateMethod(bar)
    }
  }
})();





//========== The Singleton Pattern
// Limits the number of instances of a particular object to just one.
var mySingleton = (function(){
  // Instance stores a reference to the Singleton
  var instance;

  function init() { // Singleton
    // Private methods and variables
    var privateVariable = "Private Variable";
    var privateRandomNumber = Math.random();
    function privateMethod() {
      console.log('Private method');
    }

    return { // Public methods and variables
      publicMethod() {
        console.log('Public method');
      },
      publicProperty: 'Public property',
      getRandomNumber() {
        return privateRandomNumber;
      }
    };
  } // end init()

  return {
    // Get the Singleton instance if one exists or create one if it doesn't
    getInstance() {
      if (!instance) {
        instance = init();
      }
      return instance;
    }
  };
})();

var singleA = mySingleton.getInstance();
var singleB = mySingleton.getInstance();
console.log( singleA.getRandomNumber() === singleB.getRandomNumber() );
