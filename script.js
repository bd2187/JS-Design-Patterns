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
fordMustang.make = 'Ford';
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





//========== The Observer Pattern
// A subject maintains a list of objects (observers) which it depends on. The subject notifies the observers of any state changes. The subject facilitates the addition and subtraction of observers.

var Subject = function() {
  let observers = [];
  return {
    subscribeObserver(observer) {
      observers.push(observer);
    },
    unsubscribeObserver(observer) {
      var index = observers.indexOf(observer);
      if (index > -1) {
        observers.splice(index, 1);
      }
    },
    notifyObserver(observer) {
      var index = observers.indexOf(observer);
      if (index > -1) {
        observers[index].notify(index);
      }
    },
    notifyAllObservers() {
      observers.forEach(function(observer){
        return observer.notify()
      });
    }
  }
}

var Observer = function(number) {
  return {
    notify() {
      console.log(`Observer ${number} is notified!`);
    }
  }
}

var subject = new Subject();

var observer1 = new Observer(1);
var observer2 = new Observer(2);
var observer3 = new Observer(3);

subject.subscribeObserver(observer1);
subject.subscribeObserver(observer2);

subject.notifyObserver(observer1);
subject.unsubscribeObserver(observer1);

subject.notifyAllObservers();





//========== The Mediator Pattern
// Exposes a unified interface through which the different parts of a system may communicate.
// Mediator: an object that coordinates interactions between multiple objects.
// Think of air traffic control system.
var mediatior = {};

var orgChart = {
  addNewEmployee() {
    // getEmployeeDetail provides a view that users interact with
    var employeeDetail = this.getEmployeeDetail();

    // when the employee detail is complete, the mediator (the 'orgchart' object) decides what should happen next
    employeeDetail.on('complete', function(employee){
      // set up additional objects that have additional events, which are used
      // by the mediator to do additional things
      var managerSelector = this.selectManager(employee);
      managerSelector.on('save', function(employee){
        employee.save();
      });
    });
  }
}





//========== The Command Pattern
// Provides us a means to separate the responsibilities of issuing commands from anything executing commands, delegating this responsibility to different objects instead.
// Command objects allow for loosely coupled systems by separating the objects that issue a request from the objects that actually process the request.

var carManager = {
  requestInfo(model, id) { // request information
    return `The information for ${model} with ID ${id} is foobar`;
  },
  buyVehicle(model, id){ // purchase the car
    return `You have successfully purchase Item ${id}, a ${model}`;
  },
  arrangeViewing(model, id) { // arrange a viewing
    return `You have successfully booked a viewing of ${model} (${id})`;
  }
}

carManager.execute = function(...args) {
  var [fn, arg1, arg2] = args;
  return carManager[fn].apply(carManager, [arg1, arg2]);
};

console.log( carManager.execute( "arrangeViewing", "Ferrari", "14523" ) );
console.log( carManager.execute( "requestInfo", "Ford Mondeo", "54323" ) );
console.log( carManager.execute( "buyVehicle", "Ford Escort", "34232" ) );





//========== The Facade Pattern
// Facade defines a higher-level interface that makes the subsystem easier to use/read.
// Exposes only what is necessary and presents a cleaner and easy-to-use interface.
var mod = (function(){
  var _private = {
    i: 5,
    get() {
      console.log(`current value: ${this.i}`);
    },
    set(val) {
      this.i = val;
    },
    run() {
      console.log('running');
    },
    jump() {
      console.log('jumping');
    }
  };

  return {
    facade(args) {
      _private.set(args.val);
      _private.get();
      if (args.run) {
        _private.run();
      }
    }
  };
})();
// This interface hides the complex functionality above ^^
mod.facade( {run: true, val: 10} );





//========== The Factory Pattern
// Define an interface for creating an object, but let subclasses decide which class to instantiate. Factory Method lets a class defer instantiation to subclasses.
const Car2 = {
  doors(doors){
    return doors || 4;
  },
  state(state){
    return state || 'brand new';
  },
  color(color){
    return color || 'silver';
  }
}

const Truck2 = {
  state(state){
    return state || 'used';
  },
  wheelSize(wheelSize){
    return wheelSize || 'large';
  },
  color(color){
    return color || 'blue';
  }
}

// defines new cars
function Car(options) {
  // defaults
  this.doors = options.doors || 4;
  this.state = options.state || 'brand new';
  this.color = options.color || 'silver';
}

// defines new trucks
function Truck(options) {
  this.state = options.state || 'used';
  this.wheelSize = options.wheelsize || 'large';
  this.color = options.color || 'blue';
}

function VehicleFactory() {};
// Define the prototypes and utilities for this factory
VehicleFactory.prototype.vehicleClass = Car;

// Factory method for creating new Vehicle instances
VehicleFactory.prototype.createVehicle = function(options) {
  switch(options.vehicleType) {
    case "car":
      this.vehicleClass = Car;
      break;
    case "truck":
      this.vehicleClass = Truck;
      break;
  }
  // defaults to VehicleFactory.prototype.vehicleClass (Car)
  return new this.vehicleClass(options);
};

// Create an instance of our factory that makes cars
var carFactory = new VehicleFactory();
var car = carFactory.createVehicle({
            vehicleType: "car",
            color: "yellow",
            doors: 6
});

// Test to confirm our car was created using the vehicleClass/prototype Car
console.log(car instanceof Car);
console.log(car);

var movingTruck = carFactory.createVehicle({
                    vehicleType: "truck",
                    state: "like new",
                    color: "red",
                    wheelSize: "small"
});

// // Test to confirm our truck was created with the vehicleClass/prototype Truck
console.log( movingTruck instanceof Truck );
console.log(movingTruck);

function TruckFactory() {};
TruckFactory.prototype = new VehicleFactory();
TruckFactory.prototype.vehicleClass = Truck;
var truckFactory = new TruckFactory();

var myBigTruck = truckFactory.createVehicle({
                  state: "omg.. so bad.",
                  color: "pink",
                  wheelSize: "so big"
});
console.log( myBigTruck instanceof Truck );
console.log( myBigTruck );
