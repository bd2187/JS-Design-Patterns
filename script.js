"use strict"

//========== The Prototype Pattern
// Creates objects based on a template of an existing object.
// Objects delegating to other objects.
var vehicle = {
  make: '<Enter Vehicle Make>',
  model: '<Enter Model>',
  year: '<Enter Year>',
  plate: "000",
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
// 'vehicle' is the prototype for 'mazdaMX5' and 'fordMustang'
// These objects can delegate to 'vehicles' properties
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





//========== The Mixin Pattern
// In traditional programming languages such as C++ and Lisp, Mixins are classes which offer functionality that can be easily inherited by a sub-class or group of sub-classes for the purpose of function re-use.
// Collecting functionality through extension/augmentation
// Function re-use

//=== Sub-classing without classes. Only objects:
var Person = { // "super class"
  firstName(firstName) {
    return this.firstName = firstName;
  },
  lastName(lastName) {
    return this.lastName = lastName;
  },
  gender: 'male'
}

var clark = Object.create(Person);
clark.firstName('Clark');
clark.lastName('Kent');

var SuperHero = Object.create(Person); // "sub class"
SuperHero.powers = function(powers = []) {
  return this.powers = powers;
}

var superman = Object.create(SuperHero);
superman.firstName('Clark');
superman.lastName('Kent');
superman.powers(['flight', 'heat-vision']);


// === Mixin Example:
var Car = {
  model(model) {
    return this.model = model || 'no model provided';
  },
  color(color) {
    return this.color = color || 'no color provided';
  }
}

var Mixin = {
  driveForward() {
    console.log('drive forward');
  },
  driveBackward() {
    console.log('drive backward');
  },
  driveSideways() {
    console.log('drive sideways');
  }
}

// Extend an existing object with a method from another
function augment(...objs) {
  var [receivingObj, givingObj] = objs;
  // only provide certain methods
  if (givingObj) {
    for (let i = 2, len = objs.length; i < len; i++) {
      receivingObj[objs[i]] = givingObj[objs[i]];
    }
  }
  // provide all methods
  else {
    for (var methodName in givingObj) {
      // check to make sure receiving class doesn't have a method of the same
      // name as the one currrently being processed
      if ( !Object.hasOwnProperty.call(receivingObj, methodName) ) {
        receivingObj[methodName] = givingObj[methodName];
      }
    }
  }
}

// Augment the Car constructor to include "driveForward" and "driveBackward"
augment(Car, Mixin, "driveForward", "driveBackward");

// Create a new car
var myCar = Object.create(Car);
myCar.model('MX-5');
myCar.color('Ceramic Metallic');

// Test to make sure we have access to new methods
myCar.driveForward();
myCar.driveBackward();


augment(Car, Mixin, 'driveSideways');
var myTruck = Object.create(Car);
myTruck.model('Ford F-150 Raptor');
myTruck.color('Black');
myTruck.driveSideways();





//========== The Decorator Pattern
// The Decorator pattern isn't heavily tied to how objects are created but instead focuses on the problem of extending their functionality. Rather than just relying on prototypal inheritance, we work with a single base object and progressively add decorator objects which provide the additional capabilities.

// They can be used to modify existing systems where we wish to add additional features to objects without the need to heavily modify the underlying code using them.
const AnotherVehicle = {
  vehicleType(vehicleType) {
    return this.vehicleType = vehicleType || 'car';
  },
  model(model) {
    return this.model = "default";
  },
  license(license) {
    return this.license = "00000-000"
  }
}

// Test instance for a basic vehicle
const testInstance = Object.create(AnotherVehicle);
testInstance.vehicleType('car');
console.log(testInstance);

// New instance of vehicle, to be decorated
const truck = Object.create(AnotherVehicle);
truck.setModel = function(modelName) {
  return this.model = modelName;
}
truck.setColor = function(color) {
  return this.color = color;
}

// Test the value setters and value assignment works correctly
truck.setModel("CAT");
truck.setColor("blue");
console.log(truck);

// Demonstrate "vehicle" is still unaltered
var secondInstance = Object.create(AnotherVehicle);
console.log(secondInstance);


// === Decorating Objects with Multiple Decorators:
// Object to decorate
const Macbook = {
  cost(){
    return this.cost = 997;
  },
  screenSize(){
    return this.screenSize = 11.6;
  }
}

// Decorator 1
function memory(macbook) {
  var v = macbook.cost();
  macbook.cost = function() {
    return v + 75;
  }
}

// Decorator 2
function engraving(macbook) {
  var v = macbook.cost();
  macbook.cost = function() {
    return v + 200;
  }
}

// Decorator 3
function insurance(macbook) {
  var v = macbook.cost();
  macbook.cost = function() {
    return v + 250;
  }
}

var mb = Object.create(Macbook);
memory(mb);
engraving(mb);
insurance(mb);

console.log(mb.cost(), mb.screenSize());
// Our decorators are overriding Macbook's cost() function to return the current price of the Macbook plus the cost of upgrades.





//========== The Flyweight Pattern
// Optimizes code that is repetitive, slow and inefficiently shares data.
// Minimizes the use of memory in an application by sharing as much data as possible with related objects.
// Can involve taking similar objects used by a number of objects and placing this data into a single external object.
// Intrinsic and Extrinsic states
// Objects with the same intrinsic data can be replaced with a single shared object created by a factory method.

// === Prior to Flyweight Patten
const Book = {
  id(id) {
    return this.id = id;
  },
  title(title) {
    return this.title = title;
  },
  author(author) {
    return this.author = author;
  },
  genre(genre){
    return this.genre = genre;
  },
  pageCount(pageCount) {
    return this.pageCount = pageCount;
  },
  publisherID(publisherID){
    return this.publisherID = publisherID;
  },
  ISBN(ISBN) {
    return this.ISBN = ISBN;
  },
  checkoutDate(checkoutDate) {
    return this.checkoutDate = checkoutDate;
  },
  checkoutMember(checkoutMember) {
    return this.checkoutMember = checkoutMember;
  },
  dueReturnDate(dueReturnDate) {
    return this.dueReturnDate = dueReturnDate;
  },
  availability(availability) {
    return this.availability = availability;
  }
};


const BookMethods = Object.create(Book);
BookMethods.getTitle = function() { return this.title; };
BookMethods.getAuthor = function() { return this.author; };
BookMethods.getISBN = function() { return this.ISBN; };
BookMethods.updateCheckoutStatus = function(bookID, newStatus, checkoutDate,
  checkoutMember, newReturnDate) {
    this.id = bookID;
    this.availability = newStatus;
    this.cechkoutDate = checkoutDate;
    this.checkoutMember = checkoutMember;
    this.dueReturnDate = newReturnDate;
};
BookMethods.extendCheckoutPeriod = function(bookID, newReturnDate) {
  this.id = bookID;
  this.dueReturnDate = newReturnDate;
};
BookMethods.isPastDue = function(bookID) {
  var currentDate = new Date();
  return currentDate.getTime() > Date.parse(this.dueReturnDate);
};


// === Flyweight Optimized Version
const Book2 = {
  title(title) {
    return this.title = title;
  },
  author(author) {
    return this.author = author;
  },
  genre(genre) {
    return this.genre = genre;
  },
  pageCount(pageCount) {
    return this.pageCount = pageCount;
  },
  publisherID(publisherID) {
    return this.publisherID = publisherID;
  },
  ISBN(ISBN) {
    return this.ISBN = ISBN;
  }
};

// Extrinsic states have been removed. Everything to do with library check-outs will be moved to a manager and as the object data is now segmented, a factory can be used for instantiation.

// Book Factory Singleton
const BookFactory = (function(){
  var existingBooks = {};
  var existingBook;

  console.log(existingBooks)
  return {
    createBook(title, author, genre, pageCount, publisherID, ISBN) {
      existingBook = existingBooks[ISBN];
      if (!!existingBook) {
        return existingBook;
      } else {
        var book = Object.create(Book2);
        book.title = title;
        book.author = author;
        book.genre = genre;
        book.pageCount = pageCount;
        book.publisherID = publisherID;
        book.ISBN = ISBN;

        existingBooks[ISBN] = book;
        return book;
      }
    }
  };
})();

// Book Record Manager Singleton
const BookRecordManager = (function(){
  var bookRecordDatabase = {};
  return {
    addBookRecord(id, title, author, genre, pageCpunt, publisherID, ISBN,
      checkoutDate, checkoutMember, dueReturnDate, availability) {
        var book = BookFactory.createBook(title, author, genre, pageCount, publishderID, ISBN);

        bookRecordDatabase[id] = {
          checkoutMember: checkoutMember,
          checkoutDate: checkoutDate,
          dueReturnDate: dueReturnDate,
          availability: availability,
          book: book
        };
    },
    updateCheckoutStatus(bookID, newStatus, checkoutDate, checkoutMember,
      newReturnDate) {
        var record = bookRecordDatabase[bookID];
        record.availability = newStatus;
        record.checkoutDate = checkoutDate;
        record.checkoutMember = checkoutMember;
        record.dueReturnDate = newReturnDate;
    },
    extendCheckoutPeriod(bookID, newReturnDate) {
      bookRecordDatabase[bookID].dueReturnDate = newReturnDate;
    },
    isPastDue(bookID) {
      var currentDate = new Date();
      return currentDate.getTime() > Date.parse(bookRecordDatabase[bookID].dueReturnDate);
    }
  };
})();
