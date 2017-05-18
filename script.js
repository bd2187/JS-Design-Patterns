//========== The Prototype Pattern
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
